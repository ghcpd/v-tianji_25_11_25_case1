import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from '../VideoPlayer';
import { VideoData } from '../../types';

const mockVideo: VideoData = {
  id: '1',
  title: 'Test Video',
  author: 'Test User',
  likes: 100,
  comments: 50,
  shares: 10,
  videoUrl: 'https://example.com/video.mp4',
  thumbnail: 'https://example.com/thumb.jpg',
};

describe('VideoPlayer', () => {
  const mockOnLike = vi.fn();
  const mockOnComment = vi.fn();
  const mockOnShare = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render video information correctly', () => {
    render(
      <VideoPlayer
        video={mockVideo}
        isActive={true}
        onLike={mockOnLike}
        onComment={mockOnComment}
        onShare={mockOnShare}
      />
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should call onLike callback when like button is clicked', () => {
    render(
      <VideoPlayer
        video={mockVideo}
        isActive={true}
        onLike={mockOnLike}
        onComment={mockOnComment}
        onShare={mockOnShare}
      />
    );

    const likeButton = screen.getByLabelText('Like');
    fireEvent.click(likeButton);

    expect(mockOnLike).toHaveBeenCalledTimes(1);
  });

  it('should call onComment callback when comment button is clicked', () => {
    render(
      <VideoPlayer
        video={mockVideo}
        isActive={true}
        onLike={mockOnLike}
        onComment={mockOnComment}
        onShare={mockOnShare}
      />
    );

    const commentButton = screen.getByLabelText('Comment');
    fireEvent.click(commentButton);

    expect(mockOnComment).toHaveBeenCalledTimes(1);
  });

  it('should call onShare callback when share button is clicked', () => {
    render(
      <VideoPlayer
        video={mockVideo}
        isActive={true}
        onLike={mockOnLike}
        onComment={mockOnComment}
        onShare={mockOnShare}
      />
    );

    const shareButton = screen.getByLabelText('Share');
    fireEvent.click(shareButton);

    expect(mockOnShare).toHaveBeenCalledTimes(1);
  });

  it('should not show play overlay when inactive', () => {
    render(
      <VideoPlayer
        video={mockVideo}
        isActive={false}
        onLike={mockOnLike}
        onComment={mockOnComment}
        onShare={mockOnShare}
      />
    );

    const playOverlay = screen.queryByText('▶');
    expect(playOverlay).not.toBeInTheDocument();
  });
});

