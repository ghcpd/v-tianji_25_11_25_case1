import { useEffect, useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import { VideoData } from '../types';
import './VideoList.css';

interface VideoListProps {
  videos: VideoData[];
  currentIndex: number;
  onVideoChange: (index: number) => void;
  onLike: (videoId: string) => void;
  onComment: (videoId: string) => void;
  onShare: (videoId: string) => void;
}

const VideoList = ({
  videos,
  currentIndex,
  onVideoChange,
  onLike,
  onComment,
  onShare,
}: VideoListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentIndex < videos.length - 1) {
        onVideoChange(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        onVideoChange(currentIndex - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex, videos.length, onVideoChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        onVideoChange(currentIndex + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        onVideoChange(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length, onVideoChange]);

  return (
    <div className="video-list" ref={containerRef}>
      {videos.map((video, index) => (
        <VideoPlayer
          key={video.id}
          video={video}
          isActive={index === currentIndex}
          onLike={() => onLike(video.id)}
          onComment={() => onComment(video.id)}
          onShare={() => onShare(video.id)}
        />
      ))}
    </div>
  );
};

export default VideoList;

