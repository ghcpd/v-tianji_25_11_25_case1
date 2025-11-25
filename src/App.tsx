import { useState, useEffect } from 'react';
import VideoList from './components/VideoList';
import { VideoData } from './types';
import './styles/App.css';

// Mock video data
const mockVideos: VideoData[] = [
  {
    id: '1',
    title: 'Amazing Moment #1',
    author: 'User A',
    likes: 1234,
    comments: 56,
    shares: 12,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://via.placeholder.com/300x500/FF6B6B/FFFFFF?text=Video+1',
  },
  {
    id: '2',
    title: 'Amazing Moment #2',
    author: 'User B',
    likes: 2345,
    comments: 78,
    shares: 23,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://via.placeholder.com/300x500/4ECDC4/FFFFFF?text=Video+2',
  },
  {
    id: '3',
    title: 'Amazing Moment #3',
    author: 'User C',
    likes: 3456,
    comments: 90,
    shares: 34,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://via.placeholder.com/300x500/45B7D1/FFFFFF?text=Video+3',
  },
];

function App() {
  const [videos, setVideos] = useState<VideoData[]>(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    // Simulate loading more videos
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        // Can load more videos here
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoChange = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const handleLike = (videoId: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === videoId ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  const handleComment = (videoId: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === videoId ? { ...video, comments: video.comments + 1 } : video
      )
    );
  };

  const handleShare = (videoId: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === videoId ? { ...video, shares: video.shares + 1 } : video
      )
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Short Video Browser</h1>
      </header>
      <VideoList
        videos={videos}
        currentIndex={currentVideoIndex}
        onVideoChange={handleVideoChange}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
      />
    </div>
  );
}

export default App;

