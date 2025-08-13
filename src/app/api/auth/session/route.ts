import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    return NextResponse.json(session || {});
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }
}
