import { NextResponse } from 'next/server';
import { testDbConnection } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbTest = await testDbConnection();

  return NextResponse.json({
    status: dbTest.ok ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
    vercel: process.env.VERCEL ? 'true' : 'false',
    region: process.env.VERCEL_REGION || 'unknown',
    database: dbTest,
  });
}