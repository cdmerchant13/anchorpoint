'use client';

import { useState } from 'react';
import SubmissionCard from '@/components/SubmissionCard';

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

interface Base {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface ResourcesClientProps {
  initialSubmissions: Submission[];
  initialTags: { name: string; count: number }[];
  initialBases: Base[];
  session: any;
}

export default function ResourcesClient({ 
  initialSubmissions, 
  initialTags, 
  initialBases,
  session
}: ResourcesClientProps) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [tags, setTags] = useState(initialTags);
  const [bases, setBases] = useState(initialBases);
  const [selectedBaseId, setSelectedBaseId] = useState<string | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        // Update local state
        setSubmissions(prev => prev.map(sub => {
          if (sub.id === submissionId) {
            const newVoteScore = value === 0 
              ? sub.voteScore - (sub.userVote || 0)
              : sub.voteScore + value - (sub.userVote || 0);
            
            return {
              ...sub,
              voteScore: newVoteScore,
              userVote: value === 0 ? 0 : value
            };
          }
          return sub;
        }));
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleComment = (submissionId: string) => {
    // Navigate to submission detail page
    window.location.href = `/resources/${submissionId}`;
  };

  const handleBaseSelect = (baseId: string | null) => {
    setSelectedBaseId(baseId);
    // Filter submissions based on selected base
    fetchSubmissions(baseId);
  };

  const handleCreateBase = async (name: string, location: string) => {
    try {
      const response = await fetch('/api/bases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), location: location.trim() })
      });

      if (response.ok) {
        const newBase = await response.json();
        setBases(prev => [...prev, newBase]);
        return newBase;
      }
    } catch (error) {
      console.error('Error creating base:', error);
      throw error;
    }
  };

  const handleCreateNewBase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const name = newBaseName.trim();
    const location = newBaseLocation.trim();
    
    if (!name || !location) {
      alert('Please fill in both name and location');
      return;
    }

    setCreatingBase(true);
    
    try {
      const newBase = await handleCreateBase(name, location);
      
      // Reset form and close modal
      setNewBaseName('');
      setNewBaseLocation('');
      setShowCreateBaseModal(false);
      
      // Auto-select the newly created base
      setSelectedBaseId(newBase.id);
      await fetchSubmissions(newBase.id);
      
      // Show success feedback
      setSuccessMessage(`Base "${newBase.name}" created successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert('Failed to create base. Please try again.');
    } finally {
      setCreatingBase(false);
    }
  };

  const fetchSubmissions = async (baseId?: string | null) => {
    setLoading(true);
    try {
      const url = baseId ? `/api/submissions?baseId=${baseId}` : '/api/submissions';
      const response = await fetch(url, {
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const baseSelect = form.querySelector('#base-select') as HTMLSelectElement;
    const textarea = form.querySelector('textarea') as HTMLTextAreaElement;
    
    const baseId = baseSelect.value;
    const rawText = textarea.value.trim();
    
    if (!baseId || !rawText) {
      setError('Please select a base and enter your submission');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Show AI processing indicator
      setProcessing(true);

      // Call submission API with AI processing
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseId, rawText })
      });

      if (response.ok) {
        const newSubmission = await response.json();
        
        // Reset form
        form.reset();
        setShowSubmissionForm(false);
        
        // Refresh submissions list
        await fetchSubmissions(selectedBaseId);
        
        // Show success feedback
        setSuccessMessage('Submission processed successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      setError('An unexpected error occurred');
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  };

  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showCreateBaseModal, setShowCreateBaseModal] = useState(false);
  const [newBaseName, setNewBaseName] = useState('');
  const [newBaseLocation, setNewBaseLocation] = useState('');
  const [creatingBase, setCreatingBase] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[--gray-900] mb-4">Resource Library</h2>
        <p className="text-lg text-[--gray-700] mb-6">
          Share and discover insights about military bases from fellow military spouses.
        </p>

        {/* Base Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[--gray-700] mb-2">
            Select a Base
          </label>
          <div className="flex gap-2">
            <div className="flex gap-2">
              <select
                value={selectedBaseId || ''}
                onChange={(e) => handleBaseSelect(e.target.value || null)}
                className="flex-1 p-2 border border-[--gray-300] rounded-md bg-[--primary-white]"
              >
                <option value="">All bases</option>
                {bases.map((base) => (
                  <option key={base.id} value={base.id}>
                    {base.name} ({base.location})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowCreateBaseModal(true)}
                className="btn-tertiary px-4 py-2 whitespace-nowrap"
                title="Add new base"
              >
                + Add Base
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[--gray-900]">
          {selectedBaseId ? 'Base Submissions' : 'All Submissions'}
        </h3>
        <button
          onClick={() => setShowSubmissionForm(!showSubmissionForm)}
          className="btn-primary"
        >
          {showSubmissionForm ? 'Cancel' : 'Add Submission'}
        </button>
      </div>

      {showSubmissionForm && (
        <div className="mb-8 p-6 bg-[--gray-100] rounded-lg border border-[--gray-200]">
          <h4 className="text-lg font-semibold mb-3">Add New Submission</h4>
          <p className="text-[--gray-600] mb-4">
            Select a base and share your insights, tips, or experiences. Our AI will help process and improve your content.
          </p>
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
              {successMessage}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmitSubmission} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[--gray-700] mb-1">
                Base <span className="text-red-500">*</span>
              </label>
              <select
                id="base-select"
                required
                className="w-full p-2 border border-[--gray-300] rounded-md bg-[--primary-white] focus:ring-2 focus:ring-[--primary-blue] focus:border-transparent"
              >
                <option value="">Select a base...</option>
                {bases.map((base) => (
                  <option key={base.id} value={base.id}>
                    {base.name} ({base.location})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[--gray-700] mb-1">
                Your Submission <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                placeholder="Share your tips, experiences, or questions about this base..."
                rows={4}
                className="w-full p-3 border border-[--gray-300] rounded-md focus:ring-2 focus:ring-[--primary-blue] focus:border-transparent resize-none"
                disabled={processing}
              />
              {processing && (
                <div className="mt-2 text-sm text-[--primary-blue] flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AI processing your submission...
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowSubmissionForm(false)}
                className="btn-tertiary px-4 py-2"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading || processing}
                className="btn-primary px-6 py-2 disabled:opacity-50 flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {submissions.length === 0 ? (
        <div className="text-center py-8 text-[--gray-600]">
          {selectedBaseId 
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

      {/* Base Creation Modal */}
      {showCreateBaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[--primary-white] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Base</h3>
              <button
                onClick={() => setShowCreateBaseModal(false)}
                className="text-[--gray-500] hover:text-[--gray-700]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateNewBase} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[--gray-700] mb-1">
                  Base Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newBaseName}
                  onChange={(e) => setNewBaseName(e.target.value)}
                  placeholder="e.g., Fort Bragg"
                  className="w-full p-2 border border-[--gray-300] rounded-md focus:ring-2 focus:ring-[--primary-blue] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[--gray-700] mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newBaseLocation}
                  onChange={(e) => setNewBaseLocation(e.target.value)}
                  placeholder="e.g., North Carolina"
                  className="w-full p-2 border border-[--gray-300] rounded-md focus:ring-2 focus:ring-[--primary-blue] focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateBaseModal(false)}
                  className="btn-tertiary px-4 py-2"
                  disabled={creatingBase}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingBase}
                  className="btn-primary px-4 py-2 disabled:opacity-50 flex items-center gap-2"
                >
                  {creatingBase ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create Base'
                  )}
                </button>
              </div>
            </form>
          </div>
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
  );
}
