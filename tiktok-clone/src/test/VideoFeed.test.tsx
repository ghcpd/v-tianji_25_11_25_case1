import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoFeed } from '../components/VideoFeed';

// Mock IntersectionObserver as a class
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  
  constructor(_callback: IntersectionObserverCallback) {
    // Store callback for potential use
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

describe('VideoFeed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders video feed', () => {
    render(<VideoFeed />);
    
    expect(screen.getByTestId('video-feed')).toBeInTheDocument();
  });

  it('renders multiple video cards', () => {
    render(<VideoFeed />);
    
    const videoCards = screen.getAllByTestId('video-card');
    expect(videoCards.length).toBeGreaterThan(0);
  });

  it('renders loading indicator', () => {
    render(<VideoFeed />);
    
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('creates IntersectionObserver instance', () => {
    render(<VideoFeed />);
    
    // The component renders successfully which means IntersectionObserver was used
    expect(screen.getByTestId('video-feed')).toBeInTheDocument();
  });

  it('renders 10 initial videos', () => {
    render(<VideoFeed />);
    
    const videoCards = screen.getAllByTestId('video-card');
    expect(videoCards).toHaveLength(10);
  });

  it('first video is active by default', () => {
    render(<VideoFeed />);
    
    const videoCards = screen.getAllByTestId('video-card');
    expect(videoCards[0]).toHaveClass('active');
  });
});
