import { test, expect } from '@playwright/test';

test.describe('TikTok Clone App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application', async ({ page }) => {
    await expect(page.getByTestId('app')).toBeVisible();
  });

  test('should display the header with navigation tabs', async ({ page }) => {
    await expect(page.getByTestId('header')).toBeVisible();
    await expect(page.getByTestId('following-tab')).toBeVisible();
    await expect(page.getByTestId('foryou-tab')).toBeVisible();
    await expect(page.getByTestId('search-button')).toBeVisible();
  });

  test('should display the video feed', async ({ page }) => {
    await expect(page.getByTestId('video-feed')).toBeVisible();
  });

  test('should display video cards', async ({ page }) => {
    const videoCards = page.getByTestId('video-card');
    await expect(videoCards.first()).toBeVisible();
    expect(await videoCards.count()).toBeGreaterThan(0);
  });

  test('should display the bottom navigation', async ({ page }) => {
    await expect(page.getByTestId('bottom-nav')).toBeVisible();
    await expect(page.getByTestId('nav-home')).toBeVisible();
    await expect(page.getByTestId('nav-discover')).toBeVisible();
    await expect(page.getByTestId('nav-create')).toBeVisible();
    await expect(page.getByTestId('nav-inbox')).toBeVisible();
    await expect(page.getByTestId('nav-profile')).toBeVisible();
  });

  test('should display user info on video cards', async ({ page }) => {
    const userInfo = page.getByTestId('user-info').first();
    await expect(userInfo).toBeVisible();
    
    const username = page.getByTestId('username').first();
    await expect(username).toBeVisible();
    await expect(username).toHaveText(/@\w+/);
  });

  test('should display action buttons on video cards', async ({ page }) => {
    const actionButtons = page.getByTestId('action-buttons').first();
    await expect(actionButtons).toBeVisible();
    
    await expect(page.getByTestId('like-button').first()).toBeVisible();
    await expect(page.getByTestId('comment-button').first()).toBeVisible();
    await expect(page.getByTestId('share-button').first()).toBeVisible();
  });

  test('should toggle like state when clicking like button', async ({ page }) => {
    const likeButton = page.getByTestId('like-button').first();
    
    // Check initial state
    const initialClass = await likeButton.getAttribute('class');
    const wasLiked = initialClass?.includes('liked');
    
    // Click to toggle
    await likeButton.click();
    
    // Verify state changed
    if (wasLiked) {
      await expect(likeButton).not.toHaveClass(/liked/);
    } else {
      await expect(likeButton).toHaveClass(/liked/);
    }
  });

  test('should toggle follow state when clicking follow button', async ({ page }) => {
    const followButton = page.getByTestId('follow-button').first();
    
    // Check initial state
    const initialText = await followButton.textContent();
    
    // Click to toggle
    await followButton.click();
    
    // Verify state changed
    if (initialText === 'Follow') {
      await expect(followButton).toHaveText('Following');
    } else {
      await expect(followButton).toHaveText('Follow');
    }
  });

  test('should have For You tab active by default', async ({ page }) => {
    const forYouTab = page.getByTestId('foryou-tab');
    await expect(forYouTab).toHaveClass(/active/);
  });

  test('should have home nav item active by default', async ({ page }) => {
    const homeNav = page.getByTestId('nav-home');
    await expect(homeNav).toHaveClass(/active/);
  });
});
