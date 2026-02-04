import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoList from '../VideoList';
import { VideoData } from '../../types';

const mockVideos: VideoData[] = [
  {
    id: '1',
    title: 'Video 1',
    author: 'User 1',
    likes: 100,
    comments: 50,
    shares: 10,
    videoUrl: 'https://example.com/video1.mp4',
    thumbnail: 'https://example.com/thumb1.jpg',
  },
  {
    id: '2',
    title: 'Video 2',
    author: 'User 2',
    likes: 200,
    comments: 60,
    shares: 20,
    videoUrl: 'https://example.com/video2.mp4',
    thumbnail: 'https://example.com/thumb2.jpg',
  },
];

describe('VideoList', () => {
  const mockOnVideoChange = vi.fn();
  const mockOnLike = vi.fn();
  const mockOnComment = vi.fn();
  const mockOnShare = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all videos', () => {
    render(
      <VideoList
        videos={mockVideos}
        currentIndex={0}
        onVideoChange={mockOnVideoChange}
        onLike={mockOnLike}
        onComment={mockOnComment}
        onShare={mockOnShare}
      />
    );

    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  it('should correctly display current active video index', () => {
    const { rerender } = render(
      <VideoList
        videos={mockVideos}
        currentIndex={0}
        onVideoChange={mockOnVideoChange}
        onLike={mockOnLike}
        onComment={mockOnComment}
        onShare={mockOnShare}
      />
    );

    const firstVideo = screen.getByText('User 1').closest('.video-player');
    expect(firstVideo).toHaveClass('active');

    rerender(
      <VideoList
        videos={mockVideos}
        currentIndex={1}
        onVideoChange={mockOnVideoChange}
        onLike={mockOnLike}
        onComment={mockOnComment}
        onShare={mockOnShare}
      />
    );

    const secondVideo = screen.getByText('User 2').closest('.video-player');
    expect(secondVideo).toHaveClass('active');
  });
});

