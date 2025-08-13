import { redirect } from 'next/navigation';
import ResourcesClient from '@/components/ResourcesClient';

// Server component for layout and data fetching
async function ResourcesLayout() {
  // Check authentication on the server side
  const sessionResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/session`, {
    cache: 'no-store'
  });

  if (!sessionResponse.ok) {
    redirect('/auth/login');
  }

  const session = await sessionResponse.json();

  // Fetch initial data
  const [submissionsResponse, tagsResponse, basesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/submissions`, {
      cache: 'no-store'
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/tags`, {
      cache: 'no-store'
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/bases`, {
      cache: 'no-store'
    })
  ]);

  const submissions = submissionsResponse.ok ? await submissionsResponse.json() : { submissions: [] };
  const tags = tagsResponse.ok ? await tagsResponse.json() : { tags: [] };
  const bases = basesResponse.ok ? await basesResponse.json() : [];

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
        <ResourcesClient 
          initialSubmissions={submissions.submissions || []}
          initialTags={tags.tags || []}
          initialBases={bases}
          session={session}
        />
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

export default ResourcesLayout;
