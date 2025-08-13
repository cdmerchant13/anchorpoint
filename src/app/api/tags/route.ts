import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/tags - Get all tags across all submissions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const baseId = searchParams.get('baseId');

    if (baseId) {
      // Get tags for a specific base
      const submissions = await prisma.submission.findMany({
        where: { baseId },
        select: { processedJson: true }
      });

      const tagCounts = new Map<string, number>();
      
      submissions.forEach(submission => {
        if (submission.processedJson) {
          try {
            const processed = JSON.parse(submission.processedJson);
            if (processed.tags && Array.isArray(processed.tags)) {
              processed.tags.forEach((tag: string) => {
                const normalizedTag = tag.trim().toLowerCase();
                tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
              });
            }
          } catch (error) {
            console.error('Error parsing processed JSON:', error);
          }
        }
      });

      const tags = Array.from(tagCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.name.localeCompare(b.name)); // Sort by count descending, then name

      return NextResponse.json({ tags, baseId });
    } else {
      // Get all tags across all bases
      const submissions = await prisma.submission.findMany({
        select: { processedJson: true }
      });

      const tagCounts = new Map<string, number>();
      
      submissions.forEach(submission => {
        if (submission.processedJson) {
          try {
            const processed = JSON.parse(submission.processedJson);
            if (processed.tags && Array.isArray(processed.tags)) {
              processed.tags.forEach((tag: string) => {
                const normalizedTag = tag.trim().toLowerCase();
                tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
              });
            }
          } catch (error) {
            console.error('Error parsing processed JSON:', error);
          }
        }
      });

      const tags = Array.from(tagCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.name.localeCompare(b.name)); // Sort by count descending, then name

      return NextResponse.json({ tags });
    }
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
