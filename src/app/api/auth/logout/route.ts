import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the session cookie
  cookies().delete('next-auth.session-token');
  
  return NextResponse.json({ message: 'Logged out successfully' });
}