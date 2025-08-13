import ResourcesClient from '@/components/ResourcesClient';

// Server component for layout and data fetching
async function ResourcesPage() {
  // Fetch initial data with proper error handling
  let submissions = { submissions: [] };
  let tags = { tags: [] };
  let bases = [];

  try {
    // Use Promise.allSettled to handle partial failures gracefully
    const [submissionsResponse, tagsResponse, basesResponse] = await Promise.allSettled([
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

    // Handle submissions response
    if (submissionsResponse.status === 'fulfilled' && submissionsResponse.value.ok) {
      submissions = await submissionsResponse.value.json();
    }

    // Handle tags response
    if (tagsResponse.status === 'fulfilled' && tagsResponse.value.ok) {
      tags = await tagsResponse.value.json();
    }

    // Handle bases response
    if (basesResponse.status === 'fulfilled' && basesResponse.value.ok) {
      bases = await basesResponse.value.json();
    }
  } catch (error) {
    console.error('Error fetching initial data:', error);
    // Continue with empty data rather than failing completely
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ResourcesClient 
        initialSubmissions={submissions.submissions || []}
        initialTags={tags.tags || []}
        initialBases={bases}
        session={null} // Session will be handled by the layout
      />
    </div>
  );
}

export default ResourcesPage;
