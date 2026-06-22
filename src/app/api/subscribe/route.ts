import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, frequency, query, source } = body;

    // Validate email is present
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate frequency
    const freq = (frequency || 'DAILY').toUpperCase();
    const validFrequencies = ['DAILY', 'WEEKLY'];
    if (!validFrequencies.includes(freq)) {
      return NextResponse.json(
        { error: 'Frequency must be "daily" or "weekly"' },
        { status: 400 }
      );
    }

    // Persist to database (upsert — if email exists, update query/source)
    await db.newsletterSubscription.upsert({
      where: { email: email.toLowerCase().trim() },
      create: {
        email: email.toLowerCase().trim(),
        frequency: freq,
        query: query || '',
        source: source || 'general',
      },
      update: {
        frequency: freq,
        query: query || '',
        source: source || 'general',
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to the newsletter',
    });
  } catch (error: any) {
    // Handle unique constraint violation gracefully
    if (error?.code === 'P2002') {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed — your preferences have been updated',
      });
    }

    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}