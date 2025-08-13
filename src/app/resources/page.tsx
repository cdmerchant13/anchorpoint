import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth';
import { redirect } from 'next/navigation';
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

interface SubmissionsResponse {
  submissions: Submission[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface TagsResponse {
  tags: { name: string; count: number }[];
}

async function fetchSubmissions(baseId?: string): Promise<SubmissionsResponse> {
  const params = new URLSearchParams();
  if (baseId) params.append('baseId', baseId);
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/submissions?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch submissions');
  }
  
  return response.json();
}

async function fetchTags(): Promise<TagsResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/tags`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }
  
  return response.json();
}

export default async function ResourcesPage() {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth/login');
  }

  let submissions: Submission[] = [];
  let tags: { name: string; count: number }[] = [];
  let error: string | null = null;

  try {
    // Fetch initial data
    const [submissionsData, tagsData] = await Promise.all([
      fetchSubmissions(),
      fetchTags()
    ]);
    
    submissions = submissionsData.submissions;
    tags = tagsData.tags;
  } catch (err) {
    console.error('Error fetching initial data:', err);
    error = 'Failed to load content. Please try again later.';
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
              selectedBase={undefined}
              onBaseSelect={(baseId) => {
                // In a real implementation, this would trigger a server action or redirect
                console.log('Base selected:', baseId);
              }}
              onCreateNew={(name, location) => {
                console.log('New base created:', name, location);
              }}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[--gray-900]">All Submissions</h3>
            <button
              onClick={() => {
                // In a real implementation, this would show/hide the submission form
                console.log('Toggle submission form');
              }}
              className="btn-primary"
            >
              Add Submission
            </button>
          </div>

          {error ? (
            <div className="text-center py-8 text-[--red-600]">
              {error}
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8 text-[--gray-600]">
              No submissions yet. Start by adding one above!
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  onVote={(submissionId, value) => {
                    // In a real implementation, this would call the API
                    console.log('Vote:', submissionId, value);
                  }}
                  onComment={(submissionId) => {
                    // In a real implementation, this would navigate to the submission detail
                    console.log('View comments:', submissionId);
                  }}
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
