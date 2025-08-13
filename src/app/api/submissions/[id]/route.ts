import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/submissions/[id] - Get a specific submission by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if submission exists
    const submission = await prisma.submission.findUnique({
      where: { id },
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
      }
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Calculate vote score
    const voteScore = submission.votes.reduce((sum, vote) => sum + vote.value, 0);
    const userVote = submission.votes.find(vote => vote.userId === submission.userId)?.value || 0;

    // Parse processed JSON if it exists
    let processedData = null;
    if (submission.processedJson) {
      try {
        processedData = JSON.parse(submission.processedJson);
      } catch (error) {
        console.error('Error parsing processed JSON:', error);
      }
    }

    const submissionWithDetails = {
      ...submission,
      voteScore,
      userVote,
      tags: processedData?.tags || [],
      processedText: processedData?.processedText || submission.rawText
    };

    return NextResponse.json(submissionWithDetails);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}

// DELETE /api/submissions/[id] - Delete a submission (only by author)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Check if submission exists and user is the author
    const submission = await prisma.submission.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    if (submission.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this submission' },
        { status: 403 }
      );
    }

    // Delete the submission (cascade will handle votes and comments)
    await prisma.submission.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
