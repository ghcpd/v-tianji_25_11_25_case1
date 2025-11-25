import { useEffect, useRef } from 'react'
import type { VideoMeta } from '../data/videos'

type Props = {
  video: VideoMeta
  active: boolean
  muted: boolean
  onLike: () => void
  onNext: () => void
  onToggleMute: () => void
}

export const VideoCard = ({
  video,
  active,
  muted,
  onLike,
  onNext,
  onToggleMute,
}: Props) => {
  const ref = useRef<HTMLVideoElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = muted
    if (active) {
      const playPromise = el.play()
      if (playPromise) {
        playPromise.catch(() => {
          /* ignoring autoplay rejection in tests */
        })
      }
    } else {
      el.pause()
    }
  }, [active, muted])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleEnded = () => onNext()
    const handleTimeUpdate = () => {
      if (!progressRef.current || !el.duration) return
      const pct = Math.min(100, (el.currentTime / el.duration) * 100)
      progressRef.current.style.width = `${pct}%`
    }

    el.addEventListener('ended', handleEnded)
    el.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      el.removeEventListener('ended', handleEnded)
      el.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [onNext])

  return (
    <article className={`video-card ${active ? 'active' : 'inactive'}`} data-testid={`video-${video.id}`}>
      <video
        ref={ref}
        className="video-media"
        poster={video.poster}
        src={video.src}
        loop
        muted={muted}
        playsInline
      />
      <div className="gradient-overlay" aria-hidden />
      <div className="card-inner">
        <div className="hud">
          <div className="hud-left">
            <div className="hud-pill">#{video.mood}</div>
            <div className="hud-pill">by {video.creator}</div>
            <div className="muted-chip" role="status">
              {muted ? 'Muted (tap m to hear)' : 'Sound on'}
            </div>
          </div>
          <div className="hud-right">
            <button className="control" onClick={onToggleMute} aria-label="Toggle sound">
              {muted ? '🔇 Mute off' : '🔊 Sound on'}
            </button>
            <button className="control" onClick={onNext} aria-label="Next video">
              ⇩ Next
            </button>
            <div className="progress-track" aria-label="Playback progress">
              <div className="progress-fill" ref={progressRef} />
            </div>
          </div>
        </div>
        <div className="meta">
          <div className="tagline">
            <span>LIVE NOW</span>
            <span style={{ opacity: 0.8 }}>Swipe ▾</span>
          </div>
          <h2 className="title">{video.title}</h2>
          <p className="subtitle">{video.description}</p>
          <div className="chips">
            {video.tags.map((tag) => (
              <span key={tag} className="chip">
                #{tag}
              </span>
            ))}
          </div>
          <div className="music-bar">
            <div className="bar-visual">
              <span />
              <span />
              <span />
              <span />
            </div>
            <span>{video.music}</span>
          </div>
        </div>
      </div>
      <div className="action-bar">
        <button className="action-button" onClick={onLike} aria-label="Like video">
          <div className="action-icon">❤</div>
          <div className="action-meta">
            <span className="label">Appreciate</span>
            <span className="stat">{video.likes.toLocaleString()}</span>
          </div>
        </button>
        <div className="action-button" aria-label="Comments">
          <div className="action-icon">💬</div>
          <div className="action-meta">
            <span className="label">Comments</span>
            <span className="stat">{video.comments.toLocaleString()}</span>
          </div>
        </div>
        <div className="action-button" aria-label="Share">
          <div className="action-icon">↗</div>
          <div className="action-meta">
            <span className="label">Shares</span>
            <span className="stat">{video.shares.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
