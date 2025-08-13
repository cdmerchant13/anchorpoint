'use client';

import { useState } from 'react';

interface SubmissionFormProps {
  baseId?: string;
  onSubmit: (baseId: string, text: string) => void;
  onCancel?: () => void;
  className?: string;
}

export default function SubmissionForm({ 
  baseId, 
  onSubmit, 
  onCancel, 
  className = '' 
}: SubmissionFormProps) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter your submission');
      return;
    }

    if (!baseId) {
      setError('Please select a base');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit(baseId, text.trim());
      setText('');
    } catch (error) {
      setError('Failed to submit. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[--gray-700] mb-2">
            Your Submission
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your tips, experiences, or questions about this base..."
            rows={4}
            className="w-full p-3 border border-[--gray-300] rounded-md focus:ring-2 focus:ring-[--primary-blue] focus:border-transparent resize-none"
          />
          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-[--gray-600]">
            {text.length}/1000 characters
          </div>
          <div className="flex gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="btn-tertiary px-4 py-2"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting || !text.trim() || !baseId}
              className="btn-primary px-6 py-2 disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
