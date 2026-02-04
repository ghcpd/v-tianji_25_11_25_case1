import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock HTMLMediaElement methods for jsdom
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: vi.fn().mockResolvedValue(undefined),
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  value: vi.fn().mockImplementation(function() {
    this.paused = true;
  }),
});

Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
  writable: true,
  value: true,
});

afterEach(() => {
  cleanup();
});

