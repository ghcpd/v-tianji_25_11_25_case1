import React from 'react';
import './BottomNav.css';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export const BottomNav: React.FC = () => {
  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      active: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      )
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
        </svg>
      )
    },
    {
      id: 'create',
      label: '',
      icon: (
        <div className="create-btn-inner">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      )
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
  ];

  return (
    <nav className="bottom-nav" data-testid="bottom-nav">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${item.active ? 'active' : ''} ${item.id === 'create' ? 'create-btn' : ''}`}
          data-testid={`nav-${item.id}`}
          aria-label={item.label || 'Create'}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label && <span className="nav-label">{item.label}</span>}
        </button>
      ))}
    </nav>
  );
};
