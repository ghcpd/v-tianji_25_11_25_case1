export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  description: string;
  username: string;
  userAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
  isLiked: boolean;
  isFollowing: boolean;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  followers: number;
  following: number;
}
