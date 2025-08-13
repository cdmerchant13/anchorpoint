'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import BaseSelector from '@/components/BaseSelector';
import SubmissionForm from '@/components/SubmissionForm';
import SubmissionCard from '@/components/SubmissionCard';
import CommentsSection from '@/components/CommentsSection';

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

export default function ResourcesPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [viewingSubmission, setViewingSubmission] = useState<string | null>(null);
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);

  const checkAuth = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
      router.push('/auth/login');
    } else {
      setSession(session);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchSubmissions();
    fetchTags();
  }, [checkAuth]); // Added checkAuth to dependencies

  useEffect(() => {
    if (selectedBase) {
      fetchSubmissions(selectedBase);
    } else {
      fetchSubmissions();
    }
  }, [selectedBase]);

  const fetchSubmissions = async (baseId?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (baseId) params.append('baseId', baseId);
      
      const response = await fetch(`/api/submissions?${params}`);
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags');
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleSubmission = async (baseId: string, text: string) => {
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseId, rawText: text })
      });

      if (response.ok) {
        setShowSubmissionForm(false);
        await fetchSubmissions(selectedBase || undefined);
      }
    } catch (error) {
      console.error('Error creating submission:', error);
    }
  };

  const handleVote = async (submissionId: string, value: number) => {
    try {
      const method = value === 0 ? 'DELETE' : 'POST';
      const response = await fetch('/api/votes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: value === 0 
          ? JSON.stringify({ submissionId })
          : JSON.stringify({ submissionId, value })
      });

      if (response.ok) {
        await fetchSubmissions(selectedBase || undefined);
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleComment = (submissionId: string) => {
    setViewingSubmission(submissionId);
  };

  const handleBackToSubmissions = () => {
    setViewingSubmission(null);
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  if (viewingSubmission) {
    return (
      <div className="min-h-screen bg-[--gray-50]">
        <header className="bg-[--primary-white] border-b border-[--gray-200]">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button 
              onClick={handleBackToSubmissions}
              className="text-[--primary-blue] hover:text-[--secondary-blue-light] flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Submissions
            </button>
            <h1 className="text-2xl font-bold text-[--primary-blue]">AnchorPoint</h1>
            <div></div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <CommentsSection submissionId={viewingSubmission} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--gray-50]">
      <header className="bg-[--primary-white] border-b border-[--gray-200]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[--primary-blue]">AnchorPoint Resource Library</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Home</a></li>
              <li><a href="/dashboard" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Dashboard</a></li>
              <li>
                <form action="/api/auth/logout" method="POST">
                  <button type="submit" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">
                    Logout
                  </button>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[--gray-900] mb-4">Resource Library</h2>
            <p className="text-lg text-[--gray-700] mb-6">
              Share and discover insights about military bases from fellow military spouses.
            </p>

            <BaseSelector
              selectedBase={selectedBase || undefined}
              onBaseSelect={setSelectedBase}
              onCreateNew={(name, location) => {
                console.log('New base created:', name, location);
              }}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[--gray-900]">
              {selectedBase ? 'Base Submissions' : 'All Submissions'}
            </h3>
            <button
              onClick={() => setShowSubmissionForm(!showSubmissionForm)}
              className="btn-primary"
            >
              {showSubmissionForm ? 'Cancel' : 'Add Submission'}
            </button>
          </div>

          {showSubmissionForm && (
            <SubmissionForm
              baseId={selectedBase || undefined}
              onSubmit={handleSubmission}
              onCancel={() => setShowSubmissionForm(false)}
              className="mb-8"
            />
          )}

          {loading ? (
            <div className="text-center py-8">Loading submissions...</div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8 text-[--gray-600]">
              {selectedBase 
                ? 'No submissions for this base yet. Be the first to share!' 
                : 'No submissions yet. Start by adding one above!'
              }
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  onVote={handleVote}
                  onComment={handleComment}
                />
              ))}
            </div>
          )}

          {/* Tags Section */}
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[--gray-200]">
              <h3 className="text-xl font-semibold text-[--gray-900] mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 20).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[--gray-100] text-[--gray-700] text-sm rounded-full"
                  >
                    {tag.name} ({tag.count})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[--gray-100] border-t border-[--gray-200] py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[--gray-600]">
            &copy; {new Date().getFullYear()} AnchorPoint. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
