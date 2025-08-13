import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.id) {
      // Invalidate the user's sessions
      await prisma.session.deleteMany({
        where: {
          userId: session.user.id
        }
      });
    }
    
    return Response.json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Error signing out:', error);
    return Response.json({ error: 'Failed to sign out' }, { status: 500 });
  }
}
