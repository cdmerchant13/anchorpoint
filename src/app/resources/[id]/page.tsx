import { redirect } from 'next/navigation';
import CommentsSection from '@/components/CommentsSection';

interface SubmissionDetailPageProps {
  params: {
    id: string;
  };
}

// Server component for layout and data fetching
async function SubmissionDetailPage({ params }: SubmissionDetailPageProps) {
  const { id } = params;

  // Check authentication on the server side
  const sessionResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/session`, {
    cache: 'no-store'
  });

  if (!sessionResponse.ok) {
    redirect('/auth/login');
  }

  const session = await sessionResponse.json();

  // Fetch submission details
  const submissionResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/submissions/${id}`, {
    cache: 'no-store'
  });

  let submission = null;
  if (submissionResponse.ok) {
    submission = await submissionResponse.json();
  }

  // Fetch comments for this submission
  const commentsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/comments?submissionId=${id}`, {
    cache: 'no-store'
  });

  const comments = commentsResponse.ok ? await commentsResponse.json() : [];

  return (
    <div className="min-h-screen bg-[--gray-50]">
      <header className="bg-[--primary-white] border-b border-[--gray-200]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[--primary-blue]">AnchorPoint Resource Library</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Home</a></li>
              <li><a href="/dashboard" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Dashboard</a></li>
              <li><a href="/resources" className="text-[--primary-blue] hover:text-[--secondary-blue-light]">Back to Library</a></li>
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
        {submission ? (
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <div className="mb-6">
              <a 
                href="/resources" 
                className="text-[--primary-blue] hover:text-[--secondary-blue-light] flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Library
              </a>
            </div>

            {/* Submission Header */}
            <div className="bg-[--primary-white] rounded-lg shadow-sm border border-[--gray-200] p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[--gray-900] mb-2">
                    {submission.base?.name} - {submission.base?.location}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-[--gray-600]">
                    <span>By {submission.user?.name}</span>
                    <span>•</span>
                    <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-[--gray-900]">
                    {submission.voteScore || 0}
                  </span>
                  <button className="p-2 text-[--gray-600] hover:text-[--primary-blue]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="p-2 text-[--gray-600] hover:text-[--primary-blue]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tags */}
              {submission.tags && submission.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {submission.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[--gray-100] text-[--gray-700] text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Processed Content */}
              <div className="prose prose-sm max-w-none">
                <p className="text-[--gray-800] leading-relaxed">
                  {submission.processedJson ? 
                    JSON.parse(submission.processedJson).processedText || submission.rawText : 
                    submission.rawText
                  }
                </p>
              </div>

              {/* Raw Content Toggle (for debugging) */}
              <details className="mt-4">
                <summary className="text-sm text-[--primary-blue] cursor-pointer">View raw submission</summary>
                <pre className="mt-2 p-3 bg-[--gray-100] rounded text-xs text-[--gray-700] overflow-x-auto">
                  {submission.rawText}
                </pre>
              </details>
            </div>

            {/* Comments Section */}
            <CommentsSection 
              submissionId={id}
              comments={comments}
              session={session}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center py-12">
            <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Submission Not Found</h2>
            <p className="text-[--gray-600] mb-6">
              The submission you're looking for doesn't exist or has been removed.
            </p>
            <a 
              href="/resources" 
              className="btn-primary inline-block"
            >
              Back to Resource Library
            </a>
          </div>
        )}
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

export default SubmissionDetailPage;
