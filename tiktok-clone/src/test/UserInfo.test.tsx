import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserInfo } from '../components/UserInfo';

describe('UserInfo', () => {
  const defaultProps = {
    username: '@test_user',
    userAvatar: 'https://example.com/avatar.jpg',
    description: 'This is a test description #test',
    music: '♪ Test Music Track',
    isFollowing: false,
    onFollow: vi.fn()
  };

  it('renders user info section', () => {
    render(<UserInfo {...defaultProps} />);
    
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
  });

  it('displays username', () => {
    render(<UserInfo {...defaultProps} />);
    
    expect(screen.getByTestId('username')).toHaveTextContent('@test_user');
  });

  it('displays description', () => {
    render(<UserInfo {...defaultProps} />);
    
    expect(screen.getByTestId('description')).toHaveTextContent('This is a test description #test');
  });

  it('displays music info', () => {
    render(<UserInfo {...defaultProps} />);
    
    expect(screen.getByTestId('music-info')).toHaveTextContent('♪ Test Music Track');
  });

  it('displays user avatar with correct src', () => {
    render(<UserInfo {...defaultProps} />);
    
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('displays user avatar with correct alt text', () => {
    render(<UserInfo {...defaultProps} />);
    
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toHaveAttribute('alt', "@test_user's avatar");
  });

  it('displays Follow button when not following', () => {
    render(<UserInfo {...defaultProps} isFollowing={false} />);
    
    const followBtn = screen.getByTestId('follow-button');
    expect(followBtn).toHaveTextContent('Follow');
    expect(followBtn).not.toHaveClass('following');
  });

  it('displays Following button when following', () => {
    render(<UserInfo {...defaultProps} isFollowing={true} />);
    
    const followBtn = screen.getByTestId('follow-button');
    expect(followBtn).toHaveTextContent('Following');
    expect(followBtn).toHaveClass('following');
  });

  it('calls onFollow when follow button is clicked', () => {
    const onFollow = vi.fn();
    render(<UserInfo {...defaultProps} onFollow={onFollow} />);
    
    fireEvent.click(screen.getByTestId('follow-button'));
    expect(onFollow).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-label for follow button when not following', () => {
    render(<UserInfo {...defaultProps} isFollowing={false} />);
    
    const followBtn = screen.getByTestId('follow-button');
    expect(followBtn).toHaveAttribute('aria-label', 'Follow user');
  });

  it('has correct aria-label for follow button when following', () => {
    render(<UserInfo {...defaultProps} isFollowing={true} />);
    
    const followBtn = screen.getByTestId('follow-button');
    expect(followBtn).toHaveAttribute('aria-label', 'Unfollow user');
  });
});
