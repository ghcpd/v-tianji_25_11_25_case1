import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { videos } from '../data/videos'

describe('App end-to-end flow', () => {
  it('supports keyboard navigation, liking, and muting', async () => {
    const user = userEvent.setup()
    render(<App />)

    const listbox = screen.getByRole('listbox', { name: /Short video rail/i })
    expect(listbox.getAttribute('aria-activedescendant')).toContain(videos[0].id)

    await user.keyboard('{ArrowDown}')
    expect(listbox.getAttribute('aria-activedescendant')).toContain(videos[1].id)

    const activeCard = screen.getByTestId(`video-${videos[1].id}`)
    const likeButton = within(activeCard).getByLabelText(/Like video/i)
    const before = videos[1].likes

    await user.click(likeButton)

    expect(within(activeCard).getByText((before + 1).toLocaleString())).toBeInTheDocument()

    expect(screen.getAllByText(/Muted/).length).toBeGreaterThan(0)
    await user.keyboard('m')
    expect(screen.getAllByText(/Sound on/).length).toBeGreaterThan(0)
  })
})
