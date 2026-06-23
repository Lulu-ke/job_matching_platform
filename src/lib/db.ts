import { PrismaClient } from '@prisma/client'

// ============================================================
// Connection URL — optimized for Vercel serverless
// ============================================================

const FALLBACK_DATABASE_URL =
  'mysql://jobready_database_admin:Admincyber@d7.my-control-panel.com:3306/jobready_database'

function buildServerlessUrl(base: string): string {
  try {
    const u = new URL(base)
    u.searchParams.set('connection_limit', '1')
    u.searchParams.set('connect_timeout', '10')
    u.searchParams.set('pool_timeout', '5')
    return u.toString()
  } catch {
    return base
  }
}

const rawUrl = process.env.DATABASE_URL || FALLBACK_DATABASE_URL
const databaseUrl = process.env.VERCEL ? buildServerlessUrl(rawUrl) : rawUrl
process.env.DATABASE_URL = databaseUrl

// ============================================================
// PrismaClient factory
// ============================================================

function createClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.VERCEL ? ['error'] : ['error', 'warn'],
    datasources: { db: { url: databaseUrl } },
  })
}

// ============================================================
// Proxy-based singleton with hot-swap reconnect
//
// Why a Proxy? `db` is exported as a module-level binding.
// All data files import it once and hold that reference forever.
// When the MySQL connection goes stale, we can't reassign a `const`.
// The Proxy solves this: it always delegates to the current live client.
// When we swap _client, every existing import of `db` instantly uses
// the new client — no code changes needed in data files.
// ============================================================

let _client: PrismaClient = createClient()

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, _receiver) {
    const value = Reflect.get(_client as any, prop)
    if (typeof value === 'function') {
      return value.bind(_client)
    }
    return value
  },
  set(_target, prop, value) {
    return Reflect.set(_client as any, prop, value)
  },
}) as unknown as PrismaClient

// ============================================================
// Auto-reconnect on stale connection errors
// ============================================================

const RETRYABLE_CODES = new Set(['P1001', 'P1008', 'P2024', 'P2025'])

async function reconnect(): Promise<void> {
  console.warn('[db] Connection lost, creating fresh client...')
  try { await _client.$disconnect() } catch { /* ignore */ }
  _client = createClient()
}

/**
 * Wrap any Prisma query with auto-retry on connection errors.
 * Usage: const jobs = await withRetry(() => db.job.findMany(...))
 */
export async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (err: any) {
    if (RETRYABLE_CODES.has(err?.code)) {
      await reconnect()
      return await fn()
    }
    throw err
  }
}

// ============================================================
// Health check (for /api/health)
// ============================================================

export async function testDbConnection(): Promise<{
  ok: boolean
  latencyMs?: number
  error?: string
  dbUrlPrefix?: string
  isVercel?: boolean
}> {
  const start = Date.now()
  try {
    await _client.$queryRaw`SELECT 1 as ping`
    return {
      ok: true,
      latencyMs: Date.now() - start,
      dbUrlPrefix: databaseUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@').slice(0, 100),
      isVercel: !!process.env.VERCEL,
    }
  } catch (err: unknown) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      dbUrlPrefix: databaseUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@').slice(0, 100),
      isVercel: !!process.env.VERCEL,
    }
  }
}