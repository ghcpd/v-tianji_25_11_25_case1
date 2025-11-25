import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionButtons } from '../components/ActionButtons';

describe('ActionButtons', () => {
  const defaultProps = {
    likes: 12500,
    comments: 340,
    shares: 89,
    isLiked: false,
    onLike: vi.fn(),
    onComment: vi.fn(),
    onShare: vi.fn()
  };

  it('renders all action buttons', () => {
    render(<ActionButtons {...defaultProps} />);
    
    expect(screen.getByTestId('action-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('like-button')).toBeInTheDocument();
    expect(screen.getByTestId('comment-button')).toBeInTheDocument();
    expect(screen.getByTestId('share-button')).toBeInTheDocument();
    expect(screen.getByTestId('music-button')).toBeInTheDocument();
  });

  it('displays formatted like count', () => {
    render(<ActionButtons {...defaultProps} />);
    
    expect(screen.getByText('12.5K')).toBeInTheDocument();
  });

  it('displays formatted comment count', () => {
    render(<ActionButtons {...defaultProps} />);
    
    expect(screen.getByText('340')).toBeInTheDocument();
  });

  it('displays formatted share count', () => {
    render(<ActionButtons {...defaultProps} />);
    
    expect(screen.getByText('89')).toBeInTheDocument();
  });

  it('calls onLike when like button is clicked', () => {
    const onLike = vi.fn();
    render(<ActionButtons {...defaultProps} onLike={onLike} />);
    
    fireEvent.click(screen.getByTestId('like-button'));
    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it('calls onComment when comment button is clicked', () => {
    const onComment = vi.fn();
    render(<ActionButtons {...defaultProps} onComment={onComment} />);
    
    fireEvent.click(screen.getByTestId('comment-button'));
    expect(onComment).toHaveBeenCalledTimes(1);
  });

  it('calls onShare when share button is clicked', () => {
    const onShare = vi.fn();
    render(<ActionButtons {...defaultProps} onShare={onShare} />);
    
    fireEvent.click(screen.getByTestId('share-button'));
    expect(onShare).toHaveBeenCalledTimes(1);
  });

  it('applies liked class when isLiked is true', () => {
    render(<ActionButtons {...defaultProps} isLiked={true} />);
    
    const likeButton = screen.getByTestId('like-button');
    expect(likeButton).toHaveClass('liked');
  });

  it('does not apply liked class when isLiked is false', () => {
    render(<ActionButtons {...defaultProps} isLiked={false} />);
    
    const likeButton = screen.getByTestId('like-button');
    expect(likeButton).not.toHaveClass('liked');
  });

  it('has correct aria-label for unlike when liked', () => {
    render(<ActionButtons {...defaultProps} isLiked={true} />);
    
    const likeButton = screen.getByTestId('like-button');
    expect(likeButton).toHaveAttribute('aria-label', 'Unlike video');
  });

  it('has correct aria-label for like when not liked', () => {
    render(<ActionButtons {...defaultProps} isLiked={false} />);
    
    const likeButton = screen.getByTestId('like-button');
    expect(likeButton).toHaveAttribute('aria-label', 'Like video');
  });
});
