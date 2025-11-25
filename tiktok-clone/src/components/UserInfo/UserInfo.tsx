import React from 'react';
import './UserInfo.css';

interface UserInfoProps {
  username: string;
  userAvatar: string;
  description: string;
  music: string;
  isFollowing: boolean;
  onFollow: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  username,
  userAvatar,
  description,
  music,
  isFollowing,
  onFollow
}) => {
  return (
    <div className="user-info" data-testid="user-info">
      <div className="user-header">
        <img 
          src={userAvatar} 
          alt={`${username}'s avatar`} 
          className="user-avatar"
          data-testid="user-avatar"
        />
        <span className="username" data-testid="username">{username}</span>
        <button 
          className={`follow-btn ${isFollowing ? 'following' : ''}`}
          onClick={onFollow}
          data-testid="follow-button"
          aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
      
      <p className="description" data-testid="description">{description}</p>
      
      <div className="music-info" data-testid="music-info">
        <svg className="music-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <span className="music-text">{music}</span>
      </div>
    </div>
  );
};
