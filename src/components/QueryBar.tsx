'use client';

import { useState } from 'react';

export default function QueryBar({ onQuerySubmit }: { onQuerySubmit: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onQuerySubmit(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="w-full bg-[--primary-white] py-8 border-t border-b border-[--gray-200]">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about your next base..."
              className="w-full px-6 py-4 text-lg border border-[--gray-300] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary-blue] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-[--primary-blue] text-[--primary-white] hover:bg-[--light-blue] px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
