import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

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

describe('App', () => {
  it('renders the app', () => {
    render(<App />);
    
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('renders the header', () => {
    render(<App />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders the video feed', () => {
    render(<App />);
    
    expect(screen.getByTestId('video-feed')).toBeInTheDocument();
  });

  it('renders the bottom navigation', () => {
    render(<App />);
    
    expect(screen.getByTestId('bottom-nav')).toBeInTheDocument();
  });

  it('renders multiple video cards', () => {
    render(<App />);
    
    const videoCards = screen.getAllByTestId('video-card');
    expect(videoCards.length).toBeGreaterThan(0);
  });

  it('has correct app structure', () => {
    render(<App />);
    
    const app = screen.getByTestId('app');
    expect(app).toHaveClass('app');
  });
});
