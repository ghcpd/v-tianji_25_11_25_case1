import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render app title', () => {
    render(<App />);
    expect(screen.getByText('Short Video Browser')).toBeInTheDocument();
  });

  it('should render video list', () => {
    render(<App />);
    expect(screen.getByText('User A')).toBeInTheDocument();
    expect(screen.getByText('User B')).toBeInTheDocument();
    expect(screen.getByText('User C')).toBeInTheDocument();
  });

  it('should be able to like videos', () => {
    render(<App />);
    const likeButtons = screen.getAllByLabelText('Like');
    const initialLikes = screen.getAllByText(/^\d+$/).find(
      (el) => el.textContent === '1234'
    );

    if (likeButtons[0]) {
      fireEvent.click(likeButtons[0]);
      // Like count should increase
      expect(screen.getByText('1235')).toBeInTheDocument();
    }
  });

  it('should be able to comment on videos', () => {
    render(<App />);
    const commentButtons = screen.getAllByLabelText('Comment');
    
    if (commentButtons[0]) {
      fireEvent.click(commentButtons[0]);
      // Comment count should increase
      expect(screen.getByText('57')).toBeInTheDocument();
    }
  });

  it('should be able to share videos', () => {
    render(<App />);
    const shareButtons = screen.getAllByLabelText('Share');
    
    if (shareButtons[0]) {
      fireEvent.click(shareButtons[0]);
      // Share count should increase
      expect(screen.getByText('13')).toBeInTheDocument();
    }
  });
});

