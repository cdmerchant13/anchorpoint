'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: { id: string; name: string };
  replies?: Comment[];
}

interface CommentsSectionProps {
  submissionId: string;
  comments: Comment[];
  session: any;
  className?: string;
}

export default function CommentsSection({ submissionId, comments: initialComments, session, className = '' }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Only fetch if no initial comments provided
    if (!initialComments) {
      fetchComments();
    }
  }, [submissionId, initialComments]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?submissionId=${submissionId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!session?.user?.id) {
      alert('Please sign in to post comments');
      return;
    }
    
    const text = parentId ? replyText : newComment;
    if (!text.trim()) return;

    setSubmitting(true);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          text: text.trim(),
          parentCommentId: parentId || undefined
        })
      });

      if (response.ok) {
        if (parentId) {
          setReplyText('');
          setReplyingTo(null);
        } else {
          setNewComment('');
        }
        await fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    setReplyText('');
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

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 border-l-2 border-[--gray-200] pl-4' : ''}`}>
      <div className="bg-[--gray-50] p-4 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="font-medium text-[--gray-900]">{comment.user.name}</span>
            <span className="text-sm text-[--gray-600] ml-2">{formatDate(comment.createdAt)}</span>
          </div>
          {!isReply && (
            <button
              onClick={() => handleReply(comment.id)}
              className="text-sm text-[--primary-blue] hover:text-[--secondary-blue-light]"
            >
              Reply
            </button>
          )}
        </div>
        <p className="text-[--gray-700] leading-relaxed">{comment.text}</p>
      </div>
      
      {replyingTo === comment.id && (
        <form onSubmit={(e) => handleSubmitComment(e, comment.id)} className="mt-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            rows={2}
            className="w-full p-2 border border-[--gray-300] rounded-md mb-2"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting || !replyText.trim()}
              className="btn-primary text-sm px-3 py-1 disabled:opacity-50"
            >
              {submitting ? 'Replying...' : 'Reply'}
            </button>
            <button
              type="button"
              onClick={() => {
                setReplyingTo(null);
                setReplyText('');
              }}
              className="btn-tertiary text-sm px-3 py-1"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {comment.replies && comment.replies.map(reply => renderComment(reply, true))}
    </div>
  );

  if (loading && !initialComments) {
    return (
      <div className={className}>
        <div className="text-center py-8">Loading comments...</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-[--gray-900] mb-4">
        Comments ({comments.length})
      </h3>

      {/* Add new comment form */}
      <form onSubmit={(e) => handleSubmitComment(e)} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts or ask a question..."
          rows={3}
          className="w-full p-3 border border-[--gray-300] rounded-md mb-3"
        />
        <button
          type="submit"
          disabled={submitting || !newComment.trim()}
          className="btn-primary px-4 py-2 disabled:opacity-50"
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-[--gray-600]">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
}
