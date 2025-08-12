import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ 
      message: 'This is a protected API route', 
      user: {
        id: session.user?.id,
        name: session.user?.name,
        email: session.user?.email
      }
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}