'use client';

import { useState, useEffect } from 'react';
import ResourcesClient from '@/components/ResourcesClient';
import { mockApi, mockDelay } from '@/lib/mock/api';

interface Base {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface Tag {
  name: string;
  count: number;
}

interface Submission {
  id: string;
  baseId: string;
  userId: string;
  rawText: string;
  processedJson: string | null;
  createdAt: string;
  updatedAt: string;
  base: { id: string; name: string; location: string };
  user: { id: string; name: string };
  voteScore: number;
  userVote: number;
  _count: { votes: number; comments: number };
}

// Client component for layout and data fetching
export default function ResourcesPage() {
  // Mock authentication
  const session = {
    user: {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com'
    }
  };

  // Mock data state
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMockData = async () => {
      setLoading(true);
      setError(null);

      try {
        await mockDelay(500); // Simulate network delay

        // Fetch mock data
        const submissionsResult = await mockApi.getSubmissions();
        const basesResult = await mockApi.getBases();
        
        // Format mock data to match expected structure
        if (submissionsResult.success) {
          const formattedSubmissions = submissionsResult.data.map((sub: any) => ({
            id: String(sub.id),
            baseId: String(sub.baseId),
            userId: '1',
            rawText: sub.content,
            processedJson: JSON.stringify({
              processedText: sub.content,
              tags: sub.tags
            }),
            createdAt: sub.createdAt.toISOString(),
            updatedAt: sub.createdAt.toISOString(),
            base: { id: String(sub.baseId), name: 'Mock Base', location: 'Mock Location' },
            user: { id: '1', name: sub.author },
            voteScore: sub.voteCount,
            userVote: 0,
            _count: { votes: sub.voteCount, comments: sub.commentCount }
          }));
          setSubmissions(formattedSubmissions);
        }

        // Mock tags data
        setTags([
          { name: 'healthcare', count: 15 },
          { name: 'food', count: 12 },
          { name: 'housing', count: 8 },
          { name: 'education', count: 6 },
          { name: 'activities', count: 10 }
        ]);

        // Format mock bases data
        if (basesResult.success) {
          const formattedBases = basesResult.data.map((base: any) => ({
            id: String(base.id),
            name: base.name,
            location: `${base.branch}, ${base.state}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          setBases(formattedBases);
        }
      } catch (error) {
        console.error('Error fetching mock data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchMockData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[--gray-50] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--primary-blue] mx-auto"></div>
          <p className="mt-4 text-[--gray-600]">Loading resource library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ResourcesClient 
        initialSubmissions={submissions}
        initialTags={tags}
        initialBases={bases}
        session={session}
      />
    </div>
  );
}
