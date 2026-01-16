import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Video } from '../../types';
import { VideoCard } from '../VideoCard';
import { generateMockVideos } from '../../data/mockData';
import './VideoFeed.css';

export const VideoFeed: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(() => generateMockVideos(10));
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleVideoChange = useCallback((updatedVideo: Video) => {
    setVideos(prev => 
      prev.map(v => v.id === updatedVideo.id ? updatedVideo : v)
    );
  }, []);

  // Load more videos when reaching near the end
  const loadMoreVideos = useCallback(() => {
    const newVideos = generateMockVideos(5);
    // Update IDs to be unique
    const startId = videos.length;
    const updatedNewVideos = newVideos.map((v, i) => ({
      ...v,
      id: `video-${startId + i + 1}`
    }));
    setVideos(prev => [...prev, ...updatedNewVideos]);
  }, [videos.length]);

  // Set up intersection observer to detect active video
  useEffect(() => {
    const options = {
      root: feedRef.current,
      rootMargin: '0px',
      threshold: 0.5
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const videoId = entry.target.getAttribute('data-video-id');
          if (videoId) {
            const index = videos.findIndex(v => v.id === videoId);
            if (index !== -1) {
              setActiveIndex(index);
              
              // Load more videos when near the end
              if (index >= videos.length - 3) {
                loadMoreVideos();
              }
            }
          }
        }
      });
    }, options);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [videos, loadMoreVideos]);

  // Observe video cards
  useEffect(() => {
    const videoCards = feedRef.current?.querySelectorAll('[data-video-id]');
    videoCards?.forEach(card => {
      observerRef.current?.observe(card);
    });

    return () => {
      videoCards?.forEach(card => {
        observerRef.current?.unobserve(card);
      });
    };
  }, [videos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        if (activeIndex < videos.length - 1) {
          const nextCard = feedRef.current?.querySelector(
            `[data-video-id="video-${activeIndex + 2}"]`
          );
          nextCard?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        if (activeIndex > 0) {
          const prevCard = feedRef.current?.querySelector(
            `[data-video-id="video-${activeIndex}"]`
          );
          prevCard?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, videos.length]);

  return (
    <div className="video-feed" ref={feedRef} data-testid="video-feed">
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          isActive={index === activeIndex}
          onVideoChange={handleVideoChange}
        />
      ))}
      
      {/* Loading indicator */}
      <div className="loading-indicator" data-testid="loading-indicator">
        <div className="spinner" />
        <span>Loading more videos...</span>
      </div>
    </div>
  );
};
