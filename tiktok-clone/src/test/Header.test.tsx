import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header', () => {
  it('renders header', () => {
    render(<Header />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders Following tab', () => {
    render(<Header />);
    
    expect(screen.getByTestId('following-tab')).toBeInTheDocument();
    expect(screen.getByTestId('following-tab')).toHaveTextContent('Following');
  });

  it('renders For You tab', () => {
    render(<Header />);
    
    expect(screen.getByTestId('foryou-tab')).toBeInTheDocument();
    expect(screen.getByTestId('foryou-tab')).toHaveTextContent('For You');
  });

  it('For You tab has active class by default', () => {
    render(<Header />);
    
    const forYouTab = screen.getByTestId('foryou-tab');
    expect(forYouTab).toHaveClass('active');
  });

  it('Following tab does not have active class by default', () => {
    render(<Header />);
    
    const followingTab = screen.getByTestId('following-tab');
    expect(followingTab).not.toHaveClass('active');
  });

  it('renders search button', () => {
    render(<Header />);
    
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('search button has correct aria-label', () => {
    render(<Header />);
    
    const searchBtn = screen.getByTestId('search-button');
    expect(searchBtn).toHaveAttribute('aria-label', 'Search');
  });
});
