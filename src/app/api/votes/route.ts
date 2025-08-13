import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/votes - Add or update a vote on a submission
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { submissionId, value } = await request.json();

    if (!submissionId || value === undefined) {
      return NextResponse.json(
        { error: 'Submission ID and vote value are required' },
        { status: 400 }
      );
    }

    if (value !== 1 && value !== -1) {
      return NextResponse.json(
        { error: 'Vote value must be either 1 (upvote) or -1 (downvote)' },
        { status: 400 }
      );
    }

    // Check if submission exists
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId }
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Check if user has already voted on this submission
    const existingVote = await prisma.vote.findUnique({
      where: {
        submissionId_userId: {
          submissionId,
          userId: session.user.id
        }
      }
    });

    if (existingVote) {
      // Update existing vote
      const updatedVote = await prisma.vote.update({
        where: { id: existingVote.id },
        data: { value }
      });

      return NextResponse.json(updatedVote);
    } else {
      // Create new vote
      const newVote = await prisma.vote.create({
        data: {
          submissionId,
          userId: session.user.id,
          value
        }
      });

      return NextResponse.json(newVote, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating/updating vote:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}

// DELETE /api/votes - Remove a vote
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    // Find and delete the user's vote for this submission
    const deletedVote = await prisma.vote.delete({
      where: {
        submissionId_userId: {
          submissionId,
          userId: session.user.id
        }
      }
    });

    if (!deletedVote) {
      return NextResponse.json(
        { error: 'Vote not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Vote removed successfully' });
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json(
      { error: 'Failed to remove vote' },
      { status: 500 }
    );
  }
}
