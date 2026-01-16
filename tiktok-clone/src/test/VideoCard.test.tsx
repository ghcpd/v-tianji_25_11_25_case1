import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoCard } from '../components/VideoCard';
import type { Video } from '../types';

describe('VideoCard', () => {
  const mockVideo: Video = {
    id: 'video-1',
    url: '',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Test video description #test',
    username: '@test_user',
    userAvatar: 'https://example.com/avatar.jpg',
    likes: 1500,
    comments: 200,
    shares: 50,
    music: '♪ Test Track',
    isLiked: false,
    isFollowing: false
  };

  const defaultProps = {
    video: mockVideo,
    isActive: false,
    onVideoChange: vi.fn()
  };

  it('renders video card', () => {
    render(<VideoCard {...defaultProps} />);
    
    expect(screen.getByTestId('video-card')).toBeInTheDocument();
  });

  it('sets data-video-id attribute', () => {
    render(<VideoCard {...defaultProps} />);
    
    const videoCard = screen.getByTestId('video-card');
    expect(videoCard).toHaveAttribute('data-video-id', 'video-1');
  });

  it('applies active class when isActive is true', () => {
    render(<VideoCard {...defaultProps} isActive={true} />);
    
    const videoCard = screen.getByTestId('video-card');
    expect(videoCard).toHaveClass('active');
  });

  it('does not apply active class when isActive is false', () => {
    render(<VideoCard {...defaultProps} isActive={false} />);
    
    const videoCard = screen.getByTestId('video-card');
    expect(videoCard).not.toHaveClass('active');
  });

  it('renders video background with gradient', () => {
    render(<VideoCard {...defaultProps} />);
    
    const background = screen.getByTestId('video-background');
    expect(background).toHaveStyle({
      background: mockVideo.thumbnail
    });
  });

  it('shows play indicator when not active', () => {
    render(<VideoCard {...defaultProps} isActive={false} />);
    
    expect(screen.getByTestId('play-indicator')).toBeInTheDocument();
  });

  it('hides play indicator when active', () => {
    render(<VideoCard {...defaultProps} isActive={true} />);
    
    expect(screen.queryByTestId('play-indicator')).not.toBeInTheDocument();
  });

  it('shows progress bar when active', () => {
    render(<VideoCard {...defaultProps} isActive={true} />);
    
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('hides progress bar when not active', () => {
    render(<VideoCard {...defaultProps} isActive={false} />);
    
    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
  });

  it('renders UserInfo component', () => {
    render(<VideoCard {...defaultProps} />);
    
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
  });

  it('renders ActionButtons component', () => {
    render(<VideoCard {...defaultProps} />);
    
    expect(screen.getByTestId('action-buttons')).toBeInTheDocument();
  });

  it('calls onVideoChange when like button is clicked', () => {
    const onVideoChange = vi.fn();
    render(<VideoCard {...defaultProps} onVideoChange={onVideoChange} />);
    
    fireEvent.click(screen.getByTestId('like-button'));
    expect(onVideoChange).toHaveBeenCalled();
  });

  it('updates like count when like button is clicked', () => {
    const onVideoChange = vi.fn();
    render(<VideoCard {...defaultProps} onVideoChange={onVideoChange} />);
    
    fireEvent.click(screen.getByTestId('like-button'));
    
    const updatedVideo = onVideoChange.mock.calls[0][0];
    expect(updatedVideo.likes).toBe(1501);
    expect(updatedVideo.isLiked).toBe(true);
  });

  it('calls onVideoChange when follow button is clicked', () => {
    const onVideoChange = vi.fn();
    render(<VideoCard {...defaultProps} onVideoChange={onVideoChange} />);
    
    fireEvent.click(screen.getByTestId('follow-button'));
    expect(onVideoChange).toHaveBeenCalled();
  });

  it('toggles following state when follow button is clicked', () => {
    const onVideoChange = vi.fn();
    render(<VideoCard {...defaultProps} onVideoChange={onVideoChange} />);
    
    fireEvent.click(screen.getByTestId('follow-button'));
    
    const updatedVideo = onVideoChange.mock.calls[0][0];
    expect(updatedVideo.isFollowing).toBe(true);
  });

  it('toggles play state when video background is clicked', () => {
    render(<VideoCard {...defaultProps} isActive={true} />);
    
    // Initially playing, so no play indicator
    expect(screen.queryByTestId('play-indicator')).not.toBeInTheDocument();
    
    // Click to pause
    fireEvent.click(screen.getByTestId('video-background'));
    
    // Now should show play indicator
    expect(screen.getByTestId('play-indicator')).toBeInTheDocument();
  });
});
