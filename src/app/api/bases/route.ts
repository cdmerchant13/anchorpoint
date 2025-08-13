import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { prisma } from '@/lib/prisma';

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

    return NextResponse.json(bases);
  } catch (error) {
    console.error('Error fetching bases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bases: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/bases - Create a new base
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, location } = await request.json();

    if (!name || !location) {
      return NextResponse.json(
        { error: 'Name and location are required' },
        { status: 400 }
      );
    }

    // Improved duplicate detection - check for exact name AND location match
    const existingBase = await prisma.base.findFirst({
      where: {
        name: { equals: name.trim(), mode: 'insensitive' },
        location: { equals: location.trim(), mode: 'insensitive' }
      }
    });

    if (existingBase) {
      return NextResponse.json(
        { error: 'A base with this name and location already exists' },
        { status: 409 }
      );
    }

    const base = await prisma.base.create({
      data: {
        name: name.trim(),
        location: location.trim(),
      }
    });

    return NextResponse.json(base, { status: 201 });
  } catch (error) {
    console.error('Error creating base:', error);
    return NextResponse.json(
      { error: 'Failed to create base: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
