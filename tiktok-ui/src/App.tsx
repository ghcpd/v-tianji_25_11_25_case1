import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { VideoCard } from './components/VideoCard'
import { videos as library } from './data/videos'

function App() {
  const [clips, setClips] = useState(library)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const current = clips[currentIndex]

  const goNext = useCallback(() => {
    setCurrentIndex((idx) => (idx + 1) % clips.length)
  }, [clips.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((idx) => (idx - 1 + clips.length) % clips.length)
  }, [clips.length])

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (event.deltaY > 0) {
        goNext()
      } else if (event.deltaY < 0) {
        goPrev()
      }
    },
    [goNext, goPrev],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        goNext()
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        goPrev()
      }
      if (event.key.toLowerCase() === 'm') {
        setMuted((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0].clientY)
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return
    const delta = event.changedTouches[0].clientY - touchStart
    if (Math.abs(delta) < 30) return
    if (delta < 0) {
      goNext()
    } else {
      goPrev()
    }
    setTouchStart(null)
  }

  const onLike = useCallback(
    (id: string) => {
      setClips((prev) =>
        prev.map((clip) => (clip.id === id ? { ...clip, likes: clip.likes + 1 } : clip)),
      )
    },
    [setClips],
  )

  const topTags = useMemo(() => Array.from(new Set(clips.flatMap((clip) => clip.tags))).slice(0, 4), [clips])

  return (
    <div className="page">
      <header className="top-nav">
        <div className="brand">
          <div className="pulse" aria-hidden />
          <span>Loopwave</span>
          <span style={{ opacity: 0.6 }}>— Shortform live</span>
        </div>
        <div className="nav-actions">
          {topTags.map((tag) => (
            <span key={tag} className="tag-chip">
              <span className="dot" />
              {tag}
            </span>
          ))}
          <button className="primary-button" aria-label="Launch stream">
            Go live
          </button>
        </div>
      </header>

      <section className="stacked">
        <div className="hero-copy">
          <span className="eyebrow">Designed for kinetic stories</span>
          <h1 className="hero-title">Swipeable, cinematic, TikTok-style rails.</h1>
          <p className="hero-subtitle">
            Scroll, tap, and key through a high-touch reel experience. Smooth transitions, inline controls, and elegant
            overlays keep the focus on motion while staying keyboard and touch friendly.
          </p>
        </div>

        <div className="grid-shell" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="rail">
            <div className="card-shell" aria-live="polite">
              <div
                className="video-track"
                role="listbox"
                aria-label="Short video rail"
                aria-activedescendant={`video-${current.id}`}
              >
                <div className="video-stack" style={{ transform: `translateY(-${currentIndex * 100}%)` }}>
                  {clips.map((video, index) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      active={index === currentIndex}
                      muted={muted}
                      onNext={goNext}
                      onLike={() => onLike(video.id)}
                      onToggleMute={() => setMuted((state) => !state)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rail">
            <aside>
              <h4>Live controls</h4>
              <div className="hint-grid">
                <div className="hint">
                  <span className="dot" />
                  Wheel or swipe to change the active card.
                </div>
                <div className="hint">
                  <span className="dot" />
                  Use ↑ ↓ keys (or Page Up/Down) for keyboard navigation.
                </div>
                <div className="hint">
                  <span className="dot" />
                  Press M to toggle sound instantly.
                </div>
                <div className="hint">
                  <span className="dot" />
                  Likes increment in real time so you can test feedback.
                </div>
              </div>
            </aside>
            <aside>
              <h4>Now playing</h4>
              <p>{current.title}</p>
              <p style={{ color: '#dfe5ff' }}>@{current.creator}</p>
              <p style={{ color: '#9da6c0' }}>{current.description}</p>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
