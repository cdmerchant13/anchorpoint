'use client';

import { useState, useEffect } from 'react';

interface Base {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface BaseSelectorProps {
  selectedBase?: string;
  onBaseSelect: (baseId: string | null) => void;
  onCreateNew?: (name: string, location: string) => void;
  className?: string;
}

export default function BaseSelector({ 
  selectedBase, 
  onBaseSelect, 
  onCreateNew, 
  className = '' 
}: BaseSelectorProps) {
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBaseName, setNewBaseName] = useState('');
  const [newBaseLocation, setNewBaseLocation] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = async () => {
    try {
      const response = await fetch('/api/bases');
      if (response.ok) {
        const data = await response.json();
        setBases(data);
      }
    } catch (error) {
      console.error('Error fetching bases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBase = async () => {
    if (!newBaseName.trim() || !newBaseLocation.trim()) return;

    setCreating(true);
    try {
      const response = await fetch('/api/bases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newBaseName.trim(),
          location: newBaseLocation.trim()
        })
      });

      if (response.ok) {
        const newBase = await response.json();
        setBases(prev => [...prev, newBase]);
        setNewBaseName('');
        setNewBaseLocation('');
        setShowCreateForm(false);
        onBaseSelect(newBase.id);
        
        if (onCreateNew) {
          onCreateNew(newBase.name, newBase.location);
        }
      }
    } catch (error) {
      console.error('Error creating base:', error);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <select className={`w-full p-2 border border-[--gray-300] rounded-md ${className}`} disabled>
        <option>Loading bases...</option>
      </select>
    );
  }

  return (
    <div className={className}>
      <div className="flex gap-2 mb-4">
        <select
          value={selectedBase || ''}
          onChange={(e) => onBaseSelect(e.target.value || null)}
          className="flex-1 p-2 border border-[--gray-300] rounded-md bg-[--primary-white]"
        >
          <option value="">Select a base...</option>
          {bases.map((base) => (
            <option key={base.id} value={base.id}>
              {base.name} ({base.location})
            </option>
          ))}
        </select>
        
        {onCreateNew && (
          <button
            type="button"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-tertiary px-4"
          >
            {showCreateForm ? 'Cancel' : '+ New Base'}
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className="bg-[--gray-100] p-4 rounded-md border border-[--gray-200]">
          <h3 className="text-lg font-semibold mb-3">Add New Base</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-[--gray-700] mb-1">
                Base Name
              </label>
              <input
                type="text"
                value={newBaseName}
                onChange={(e) => setNewBaseName(e.target.value)}
                placeholder="e.g., Fort Bragg"
                className="w-full p-2 border border-[--gray-300] rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[--gray-700] mb-1">
                Location
              </label>
              <input
                type="text"
                value={newBaseLocation}
                onChange={(e) => setNewBaseLocation(e.target.value)}
                placeholder="e.g., North Carolina"
                className="w-full p-2 border border-[--gray-300] rounded-md"
              />
            </div>
            <button
              onClick={handleCreateBase}
              disabled={creating || !newBaseName.trim() || !newBaseLocation.trim()}
              className="btn-primary px-4 py-2 disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create Base'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
