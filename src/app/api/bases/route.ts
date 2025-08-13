import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { prisma } from '@/lib/prisma';

// Helper function to set CORS headers
function setCORSHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// OPTIONS /api/bases - Handle CORS preflight requests
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCORSHeaders(response);
}

// GET /api/bases - Get all bases
export async function GET() {
  try {
    const bases = await prisma.base.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { submissions: true }
        }
      }
    });

    const response = NextResponse.json(bases);
    return setCORSHeaders(response);
  } catch (error) {
    console.error('Error fetching bases:', error);
    const response = NextResponse.json(
      { error: 'Failed to fetch bases: ' + (error as Error).message },
      { status: 500 }
    );
    return setCORSHeaders(response);
  }
}

// POST /api/bases - Create a new base
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      const response = NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
      return setCORSHeaders(response);
    }

    const { name, location } = await request.json();

    if (!name || !location) {
      const response = NextResponse.json(
        { error: 'Name and location are required' },
        { status: 400 }
      );
      return setCORSHeaders(response);
    }

    // Improved duplicate detection - check for exact name AND location match
    const existingBase = await prisma.base.findFirst({
      where: {
        name: { equals: name.trim(), mode: 'insensitive' },
        location: { equals: location.trim(), mode: 'insensitive' }
      }
    });

    if (existingBase) {
      const response = NextResponse.json(
        { error: 'A base with this name and location already exists' },
        { status: 409 }
      );
      return setCORSHeaders(response);
    }

    const base = await prisma.base.create({
      data: {
        name: name.trim(),
        location: location.trim(),
      }
    });

    const response = NextResponse.json(base, { status: 201 });
    return setCORSHeaders(response);
  } catch (error) {
    console.error('Error creating base:', error);
    const response = NextResponse.json(
      { error: 'Failed to create base: ' + (error as Error).message },
      { status: 500 }
    );
    return setCORSHeaders(response);
  }
}
