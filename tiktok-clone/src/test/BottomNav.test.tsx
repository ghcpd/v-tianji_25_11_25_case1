import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BottomNav } from '../components/BottomNav';

describe('BottomNav', () => {
  it('renders bottom navigation', () => {
    render(<BottomNav />);
    
    expect(screen.getByTestId('bottom-nav')).toBeInTheDocument();
  });

  it('renders home button', () => {
    render(<BottomNav />);
    
    expect(screen.getByTestId('nav-home')).toBeInTheDocument();
  });

  it('renders discover button', () => {
    render(<BottomNav />);
    
    expect(screen.getByTestId('nav-discover')).toBeInTheDocument();
  });

  it('renders create button', () => {
    render(<BottomNav />);
    
    expect(screen.getByTestId('nav-create')).toBeInTheDocument();
  });

  it('renders inbox button', () => {
    render(<BottomNav />);
    
    expect(screen.getByTestId('nav-inbox')).toBeInTheDocument();
  });

  it('renders profile button', () => {
    render(<BottomNav />);
    
    expect(screen.getByTestId('nav-profile')).toBeInTheDocument();
  });

  it('home button has active class by default', () => {
    render(<BottomNav />);
    
    const homeBtn = screen.getByTestId('nav-home');
    expect(homeBtn).toHaveClass('active');
  });

  it('create button has create-btn class', () => {
    render(<BottomNav />);
    
    const createBtn = screen.getByTestId('nav-create');
    expect(createBtn).toHaveClass('create-btn');
  });

  it('all nav items have correct aria-labels', () => {
    render(<BottomNav />);
    
    expect(screen.getByTestId('nav-home')).toHaveAttribute('aria-label', 'Home');
    expect(screen.getByTestId('nav-discover')).toHaveAttribute('aria-label', 'Discover');
    expect(screen.getByTestId('nav-create')).toHaveAttribute('aria-label', 'Create');
    expect(screen.getByTestId('nav-inbox')).toHaveAttribute('aria-label', 'Inbox');
    expect(screen.getByTestId('nav-profile')).toHaveAttribute('aria-label', 'Profile');
  });
});
