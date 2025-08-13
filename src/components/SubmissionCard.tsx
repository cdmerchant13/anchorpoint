'use client';

import { useState } from 'react';

interface Submission {
  id: string;
  baseId: string;
  userId: string;
  rawText: string;
  processedJson: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SubmissionCardProps {
  submission: Submission & {
    base: { id: string; name: string; location: string };
    user: { id: string; name: string };
    voteScore: number;
    userVote: number;
    _count: { votes: number; comments: number };
  };
  onVote: (submissionId: string, value: number) => void;
  onComment: (submissionId: string) => void;
  className?: string;
}

export default function SubmissionCard({ 
  submission, 
  onVote, 
  onComment, 
  className = '' 
}: SubmissionCardProps) {
  const [showRaw, setShowRaw] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  let processedData: { processedText: string; tags: string[] } | null = null;
  
  try {
    processedData = submission.processedJson ? JSON.parse(submission.processedJson) : null;
  } catch (error) {
    console.error('Error parsing processed JSON:', error);
  }

  const handleVote = async (value: number) => {
    if (submission.userVote === value) {
      // Remove vote if clicking the same button
      await onVote(submission.id, 0);
    } else {
      await onVote(submission.id, value);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`card ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[--gray-900] mb-1">
            {submission.base.name}
          </h3>
          <p className="text-sm text-[--gray-600]">
            {submission.base.location} • {formatDate(submission.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[--gray-600]">
            {submission._count.comments} comments
          </span>
        </div>
      </div>

      <div className="mb-4">
        {processedData ? (
          <>
            <div className="mb-3">
              <p className="text-[--gray-700] leading-relaxed">
                {processedData.processedText}
              </p>
            </div>
            
            {processedData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {processedData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[--primary-blue] text-[--primary-white] text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mb-3">
            <p className="text-[--gray-700] leading-relaxed">
              {submission.rawText}
            </p>
          </div>
        )}

        {submission.rawText !== (processedData?.processedText || submission.rawText) && (
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="text-sm text-[--primary-blue] hover:text-[--secondary-blue-light] mb-3"
          >
            {showRaw ? 'Show AI-processed version' : 'Show original version'}
          </button>
        )}

        {showRaw && (
          <div className="bg-[--gray-100] p-3 rounded-md mb-3">
            <p className="text-[--gray-700] leading-relaxed">
              {submission.rawText}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-[--gray-200]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote(1)}
              disabled={processing}
              className={`p-1 rounded ${
                submission.userVote === 1 
                  ? 'text-[--primary-blue]' 
                  : 'text-[--gray-500] hover:text-[--primary-blue]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <span className={`font-medium ${submission.voteScore > 0 ? 'text-[--primary-blue]' : 'text-[--gray-700]'}`}>
              {submission.voteScore}
            </span>
            <button
              onClick={() => handleVote(-1)}
              disabled={processing}
              className={`p-1 rounded ${
                submission.userVote === -1 
                  ? 'text-[--primary-red]' 
                  : 'text-[--gray-500] hover:text-[--primary-red]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-[--gray-600]">
          <span>by {submission.user.name}</span>
          <button
            onClick={() => onComment(submission.id)}
            className="text-[--primary-blue] hover:text-[--secondary-blue-light] flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
