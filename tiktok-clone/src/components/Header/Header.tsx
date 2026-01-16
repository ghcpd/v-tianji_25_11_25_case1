import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header" data-testid="header">
      <nav className="nav-tabs">
        <button className="nav-tab" data-testid="following-tab">Following</button>
        <span className="nav-divider">|</span>
        <button className="nav-tab active" data-testid="foryou-tab">For You</button>
      </nav>
      
      <button className="search-btn" data-testid="search-button" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </button>
    </header>
  );
};
