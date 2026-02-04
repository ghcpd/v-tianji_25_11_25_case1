import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { VideoCard } from '../components/VideoCard'
import { videos } from '../data/videos'

describe('VideoCard', () => {
  const sample = { ...videos[0] }

  it('renders metadata and forwards actions', async () => {
    const onLike = vi.fn()
    const onNext = vi.fn()
    const onToggleMute = vi.fn()

    render(
      <VideoCard video={sample} active muted onLike={onLike} onNext={onNext} onToggleMute={onToggleMute} />,
    )

    expect(screen.getByText(sample.title)).toBeInTheDocument()
    expect(screen.getByText(sample.music)).toBeInTheDocument()

    await userEvent.click(screen.getByLabelText(/Like video/i))
    expect(onLike).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByLabelText(/Toggle sound/i))
    expect(onToggleMute).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByLabelText(/Next video/i))
    expect(onNext).toHaveBeenCalledTimes(1)
  })
})
