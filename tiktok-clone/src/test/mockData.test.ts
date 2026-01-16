import { describe, it, expect } from 'vitest';
import { generateMockVideos, formatNumber } from '../data/mockData';

describe('mockData', () => {
  describe('generateMockVideos', () => {
    it('generates specified number of videos', () => {
      const videos = generateMockVideos(5);
      expect(videos).toHaveLength(5);
    });

    it('generates 10 videos by default', () => {
      const videos = generateMockVideos();
      expect(videos).toHaveLength(10);
    });

    it('generates videos with unique ids', () => {
      const videos = generateMockVideos(5);
      const ids = videos.map(v => v.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(5);
    });

    it('generates videos with all required properties', () => {
      const videos = generateMockVideos(1);
      const video = videos[0];
      
      expect(video).toHaveProperty('id');
      expect(video).toHaveProperty('url');
      expect(video).toHaveProperty('thumbnail');
      expect(video).toHaveProperty('description');
      expect(video).toHaveProperty('username');
      expect(video).toHaveProperty('userAvatar');
      expect(video).toHaveProperty('likes');
      expect(video).toHaveProperty('comments');
      expect(video).toHaveProperty('shares');
      expect(video).toHaveProperty('music');
      expect(video).toHaveProperty('isLiked');
      expect(video).toHaveProperty('isFollowing');
    });

    it('generates videos with valid usernames starting with @', () => {
      const videos = generateMockVideos(5);
      videos.forEach(video => {
        expect(video.username).toMatch(/^@/);
      });
    });

    it('generates videos with gradient thumbnails', () => {
      const videos = generateMockVideos(5);
      videos.forEach(video => {
        expect(video.thumbnail).toContain('linear-gradient');
      });
    });

    it('generates videos with music tracks starting with ♪', () => {
      const videos = generateMockVideos(5);
      videos.forEach(video => {
        expect(video.music).toMatch(/^♪/);
      });
    });

    it('generates videos with numeric like/comment/share counts', () => {
      const videos = generateMockVideos(5);
      videos.forEach(video => {
        expect(typeof video.likes).toBe('number');
        expect(typeof video.comments).toBe('number');
        expect(typeof video.shares).toBe('number');
        expect(video.likes).toBeGreaterThan(0);
        expect(video.comments).toBeGreaterThan(0);
        expect(video.shares).toBeGreaterThan(0);
      });
    });

    it('generates videos with boolean isLiked and isFollowing', () => {
      const videos = generateMockVideos(5);
      videos.forEach(video => {
        expect(typeof video.isLiked).toBe('boolean');
        expect(typeof video.isFollowing).toBe('boolean');
      });
    });
  });

  describe('formatNumber', () => {
    it('formats numbers less than 1000 as-is', () => {
      expect(formatNumber(500)).toBe('500');
      expect(formatNumber(999)).toBe('999');
      expect(formatNumber(0)).toBe('0');
    });

    it('formats thousands with K suffix', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(12500)).toBe('12.5K');
      expect(formatNumber(999999)).toBe('1000.0K');
    });

    it('formats millions with M suffix', () => {
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(12500000)).toBe('12.5M');
    });
  });
});
