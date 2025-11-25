import { test, expect } from '@playwright/test';

test.describe('Short Video Browser E2E Tests', () => {
  test('should load and display the application', async ({ page }) => {
    await page.goto('/');
    
    // Check if title exists
    await expect(page.locator('h1')).toContainText('Short Video Browser');
  });

  test('should display video list', async ({ page }) => {
    await page.goto('/');
    
    // Wait for videos to load
    await page.waitForSelector('.video-player', { timeout: 10000 });
    
    // Check that at least one video player exists
    const videoPlayers = page.locator('.video-player');
    await expect(videoPlayers.first()).toBeVisible();
  });

  test('should be able to click like button', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('.like-button', { timeout: 10000 });
    
    // Get initial like count
    const likeButton = page.locator('.like-button').first();
    const initialLikes = await likeButton.locator('.count').textContent();
    
    // Click like button
    await likeButton.click();
    
    // Wait for state update
    await page.waitForTimeout(500);
    
    // Verify like count increased
    const newLikes = await likeButton.locator('.count').textContent();
    expect(parseInt(newLikes || '0')).toBeGreaterThan(parseInt(initialLikes || '0'));
  });

  test('should be able to click comment button', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('button[aria-label="Comment"]', { timeout: 10000 });
    
    const commentButton = page.locator('button[aria-label="Comment"]').first();
    const initialComments = await commentButton.locator('.count').textContent();
    
    await commentButton.click();
    await page.waitForTimeout(500);
    
    const newComments = await commentButton.locator('.count').textContent();
    expect(parseInt(newComments || '0')).toBeGreaterThan(parseInt(initialComments || '0'));
  });

  test('should be able to click share button', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('button[aria-label="Share"]', { timeout: 10000 });
    
    const shareButton = page.locator('button[aria-label="Share"]').first();
    const initialShares = await shareButton.locator('.count').textContent();
    
    await shareButton.click();
    await page.waitForTimeout(500);
    
    const newShares = await shareButton.locator('.count').textContent();
    expect(parseInt(newShares || '0')).toBeGreaterThan(parseInt(initialShares || '0'));
  });

  test('should be able to use keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('.video-player', { timeout: 10000 });
    
    // Get first video
    const firstVideo = page.locator('.video-player').first();
    await expect(firstVideo).toHaveClass(/active/);
    
    // Press down arrow key
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);
    
    // Second video should be active
    const secondVideo = page.locator('.video-player').nth(1);
    await expect(secondVideo).toHaveClass(/active/);
  });
});

