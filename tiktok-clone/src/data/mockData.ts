import type { Video } from '../types';

// Generate placeholder video data with gradient backgrounds as thumbnails
export const generateMockVideos = (count: number = 10): Video[] => {
  const usernames = ['@creative_star', '@dance_queen', '@funny_guy', '@travel_bug', '@food_lover', '@fitness_pro', '@music_vibes', '@art_master', '@comedy_king', '@nature_lover'];
  const descriptions = [
    'Check out this amazing view! 🌅 #travel #beautiful',
    'POV: When the beat drops 🎵 #dance #viral',
    'Wait for it... 😂 #funny #comedy',
    'Made this today! What do you think? 🍳 #food #cooking',
    'Morning routine that changed my life 💪 #fitness #motivation',
    'New track alert! 🎶 #music #newmusic',
    'Art therapy session 🎨 #art #creative',
    'This made my whole day 😊 #wholesome #cute',
    'Life hack you NEED to know! 💡 #tips #lifehack',
    'Nature never disappoints 🌿 #nature #peaceful'
  ];
  const musicTracks = [
    '♪ Original Sound - @user',
    '♪ Trending Beat 2024',
    '♪ Viral Song Remix',
    '♪ Chill Vibes Only',
    '♪ Dance Anthem',
    '♪ Lo-Fi Study Beats',
    '♪ Pop Hits 2024',
    '♪ Acoustic Cover'
  ];

  // Gradient colors for placeholder video backgrounds
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `video-${index + 1}`,
    url: '', // We'll use CSS gradients instead of actual video URLs
    thumbnail: gradients[index % gradients.length],
    description: descriptions[index % descriptions.length],
    username: usernames[index % usernames.length],
    userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    likes: Math.floor(Math.random() * 100000) + 1000,
    comments: Math.floor(Math.random() * 5000) + 100,
    shares: Math.floor(Math.random() * 2000) + 50,
    music: musicTracks[index % musicTracks.length],
    isLiked: Math.random() > 0.7,
    isFollowing: Math.random() > 0.8
  }));
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
