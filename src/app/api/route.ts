import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  return NextResponse.json({
    message: "Hello, world!",
    version: "mysql-fix-v2",
    dbUrlPrefix: dbUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@').slice(0, 80),
    hasDb: typeof dbUrl === 'string' && dbUrl.length > 10,
  });
}