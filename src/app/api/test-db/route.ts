import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Test basic query
    const userCount = await prisma.user.count();
    const baseCount = await prisma.base.count();
    const submissionCount = await prisma.submission.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      counts: {
        users: userCount,
        bases: baseCount,
        submissions: submissionCount
      }
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { success: false, error: 'Database connection failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
