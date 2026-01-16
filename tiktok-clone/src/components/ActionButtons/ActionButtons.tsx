import React from 'react';
import './ActionButtons.css';
import { formatNumber } from '../../data/mockData';

interface ActionButtonsProps {
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  likes,
  comments,
  shares,
  isLiked,
  onLike,
  onComment,
  onShare
}) => {
  return (
    <div className="action-buttons" data-testid="action-buttons">
      <button 
        className={`action-btn ${isLiked ? 'liked' : ''}`} 
        onClick={onLike}
        data-testid="like-button"
        aria-label={isLiked ? 'Unlike video' : 'Like video'}
      >
        <svg viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="action-count">{formatNumber(likes)}</span>
      </button>

      <button 
        className="action-btn" 
        onClick={onComment}
        data-testid="comment-button"
        aria-label="View comments"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="action-count">{formatNumber(comments)}</span>
      </button>

      <button 
        className="action-btn" 
        onClick={onShare}
        data-testid="share-button"
        aria-label="Share video"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16,6 12,2 8,6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span className="action-count">{formatNumber(shares)}</span>
      </button>

      <button 
        className="action-btn music-btn" 
        data-testid="music-button"
        aria-label="View music"
      >
        <div className="music-disc">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" fill="#000" />
          </svg>
        </div>
      </button>
    </div>
  );
};
