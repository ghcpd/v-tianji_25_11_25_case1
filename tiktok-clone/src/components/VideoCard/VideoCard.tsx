import React, { useState, useRef, useEffect } from 'react';
import type { Video } from '../../types';
import { ActionButtons } from '../ActionButtons';
import { UserInfo } from '../UserInfo';
import './VideoCard.css';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onVideoChange: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, onVideoChange }) => {
  const [localVideo, setLocalVideo] = useState<Video>(video);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalVideo(video);
  }, [video]);

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleLike = () => {
    const updatedVideo = {
      ...localVideo,
      isLiked: !localVideo.isLiked,
      likes: localVideo.isLiked ? localVideo.likes - 1 : localVideo.likes + 1
    };
    setLocalVideo(updatedVideo);
    onVideoChange(updatedVideo);
  };

  const handleFollow = () => {
    const updatedVideo = {
      ...localVideo,
      isFollowing: !localVideo.isFollowing
    };
    setLocalVideo(updatedVideo);
    onVideoChange(updatedVideo);
  };

  const handleComment = () => {
    // In a real app, this would open a comments modal
    console.log('Open comments for video:', localVideo.id);
  };

  const handleShare = () => {
    // In a real app, this would open a share modal
    console.log('Share video:', localVideo.id);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      ref={cardRef}
      className={`video-card ${isActive ? 'active' : ''}`}
      data-testid="video-card"
      data-video-id={localVideo.id}
    >
      {/* Video Background (using gradient as placeholder) */}
      <div 
        className="video-background"
        style={{ background: localVideo.thumbnail }}
        onClick={togglePlayPause}
        data-testid="video-background"
      >
        {/* Play/Pause indicator */}
        {!isPlaying && (
          <div className="play-indicator" data-testid="play-indicator">
            <svg viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        )}

        {/* Animated content overlay for visual interest */}
        <div className="video-content-overlay">
          <div className="floating-element element-1">✨</div>
          <div className="floating-element element-2">🎵</div>
          <div className="floating-element element-3">❤️</div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="gradient-overlay" />

      {/* User info section */}
      <UserInfo
        username={localVideo.username}
        userAvatar={localVideo.userAvatar}
        description={localVideo.description}
        music={localVideo.music}
        isFollowing={localVideo.isFollowing}
        onFollow={handleFollow}
      />

      {/* Action buttons */}
      <ActionButtons
        likes={localVideo.likes}
        comments={localVideo.comments}
        shares={localVideo.shares}
        isLiked={localVideo.isLiked}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
      />

      {/* Progress bar (simulated) */}
      {isActive && (
        <div className="progress-bar" data-testid="progress-bar">
          <div className="progress-fill" />
        </div>
      )}
    </div>
  );
};
