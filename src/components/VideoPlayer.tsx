import { useRef, useEffect, useState } from 'react';
import { VideoData } from '../types';
import './VideoPlayer.css';

interface VideoPlayerProps {
  video: VideoData;
  isActive: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const VideoPlayer = ({ video, isActive, onLike, onComment, onShare }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isActive) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay may be blocked, this is normal
        });
      }
      setIsPlaying(true);
    } else {
      if (videoElement.pause) {
        videoElement.pause();
      }
      setIsPlaying(false);
    }
  }, [isActive]);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      if (videoElement.pause) {
        videoElement.pause();
      }
      setIsPlaying(false);
    } else {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handle playback failure
        });
      }
      setIsPlaying(true);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <div className={`video-player ${isActive ? 'active' : ''}`}>
      <div className="video-container">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="video-element"
          loop
          muted
          playsInline
          onClick={handlePlayPause}
        />
        {!isPlaying && isActive && (
          <div className="play-overlay" onClick={handlePlayPause}>
            <div className="play-button">▶</div>
          </div>
        )}
      </div>
      <div className="video-info">
        <div className="video-author">
          <h3>{video.author}</h3>
          <p>{video.title}</p>
        </div>
        <div className="video-actions">
          <button
            className={`action-button like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            aria-label="Like"
          >
            <span className="icon">❤</span>
            <span className="count">{video.likes}</span>
          </button>
          <button className="action-button" onClick={onComment} aria-label="Comment">
            <span className="icon">💬</span>
            <span className="count">{video.comments}</span>
          </button>
          <button className="action-button" onClick={onShare} aria-label="Share">
            <span className="icon">🔗</span>
            <span className="count">{video.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

