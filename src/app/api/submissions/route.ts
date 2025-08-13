import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { PrismaClient } from '@prisma/client';
import { AIProcessor } from '@/lib/ai-processor';

const prisma = new PrismaClient();

// GET /api/submissions - Get all submissions with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const baseId = searchParams.get('baseId');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    const where = baseId ? { baseId } : {};

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        include: {
          base: true,
          user: {
            select: { id: true, name: true }
          },
          votes: true,
          comments: {
            select: { id: true }
          },
          _count: {
            select: { votes: true, comments: true }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take: limit
      }),
      prisma.submission.count({ where })
    ]);

    // Calculate vote scores
    const submissionsWithScores = submissions.map(submission => {
      const voteScore = submission.votes.reduce((sum, vote) => sum + vote.value, 0);
      return {
        ...submission,
        voteScore,
        userVote: submission.votes.find(vote => vote.userId === submission.userId)?.value || 0
      };
    });

    return NextResponse.json({
      submissions: submissionsWithScores,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

// POST /api/submissions - Create a new submission with AI processing
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { baseId, rawText } = await request.json();

    if (!baseId || !rawText) {
      return NextResponse.json(
        { error: 'Base ID and text are required' },
        { status: 400 }
      );
    }

    // Check if base exists
    const base = await prisma.base.findUnique({
      where: { id: baseId }
    });

    if (!base) {
      return NextResponse.json(
        { error: 'Base not found' },
        { status: 404 }
      );
    }

    // Process with AI
    const aiProcessor = new AIProcessor();
    const processed = await aiProcessor.processSubmission(rawText, base.name);

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        baseId,
        userId: session.user.id,
        rawText,
        processedJson: JSON.stringify({
          processedText: processed.processedText,
          tags: processed.tags
        })
      },
      include: {
        base: true,
        user: {
          select: { id: true, name: true }
        }
      }
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}
