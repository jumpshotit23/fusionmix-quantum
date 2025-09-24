import React, { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [deckA, setDeckA] = useState(null)
  const [deckB, setDeckB] = useState(null)
  const [isPlayingA, setIsPlayingA] = useState(false)
  const [isPlayingB, setIsPlayingB] = useState(false)
  const [volumeA, setVolumeA] = useState(100)
  const [volumeB, setVolumeB] = useState(100)
  const [crossfader, setCrossfader] = useState(50)
  const audioRefA = useRef(null)
  const audioRefB = useRef(null)

  // Handle file upload
  const handleFileUpload = (event, deck) => {
    const file = event.target.files[0]
    if (file && file.type.includes('audio')) {
      const url = URL.createObjectURL(file)
      const track = { file, url, name: file.name }
      
      if (deck === 'A') {
        setDeckA(track)
      } else {
        setDeckB(track)
      }
    }
  }

  // Play/pause controls
  const togglePlay = (deck) => {
    if (deck === 'A') {
      setIsPlayingA(!isPlayingA)
      if (audioRefA.current) {
        isPlayingA ? audioRefA.current.pause() : audioRefA.current.play()
      }
    } else {
      setIsPlayingB(!isPlayingB)
      if (audioRefB.current) {
        isPlayingB ? audioRefB.current.pause() : audioRefB.current.play()
      }
    }
  }

  // Volume controls
  const handleVolumeChange = (deck, value) => {
    if (deck === 'A') {
      setVolumeA(value)
      if (audioRefA.current) audioRefA.current.volume = value / 100
    } else {
      setVolumeB(value)
      if (audioRefB.current) audioRefB.current.volume = value / 100
    }
  }

  // Crossfader effect
  useEffect(() => {
    if (audioRefA.current && audioRefB.current) {
      const fadeA = crossfader / 100
      const fadeB = 1 - fadeA
      audioRefA.current.volume = (volumeA / 100) * fadeA
      audioRefB.current.volume = (volumeB / 100) * fadeB
    }
  }, [crossfader, volumeA, volumeB])

  return (
    <div className="dj-app">
      <header className="app-header">
        <h1>🎛️ FusionMix Quantum</h1>
        <p>LIVE DJ STUDIO - PLAYING NOW</p>
      </header>

      {/* MAIN MIXER INTERFACE */}
      <div className="mixer-interface">
        
        {/* DECK A */}
        <div className="deck">
          <h3>🎧 DECK A</h3>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={(e) => handleFileUpload(e, 'A')}
            className="file-input"
          />
          
          {deckA ? (
            <div className="track-info">
              <div className="track-name">📀 {deckA.name}</div>
              <div className="deck-controls">
                <button 
                  onClick={() => togglePlay('A')} 
                  className={`play-button ${isPlayingA ? 'playing' : ''}`}
                >
                  {isPlayingA ? '⏸️' : '▶️'}
                </button>
                <div className="volume-control">
                  <span>🔊</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volumeA}
                    onChange={(e) => handleVolumeChange('A', e.target.value)}
                  />
                  <span>{volumeA}%</span>
                </div>
              </div>
              <audio ref={audioRefA} src={deckA.url} loop />
            </div>
          ) : (
            <div className="empty-deck">Drop audio file here</div>
          )}
          
          <div className="waveform">
            <div className="wave-bars">
              {Array.from({length: 20}).map((_, i) => (
                <div key={i} className="wave-bar" style={{height: `${Math.random() * 60 + 20}%`}} />
              ))}
            </div>
          </div>
        </div>

        {/* CENTRAL MIXER */}
        <div className="mixer">
          <h3>⚡ MIXER</h3>
          <div className="crossfader-container">
            <div className="crossfader-label">A ← → B</div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={crossfader}
              onChange={(e) => setCrossfader(parseInt(e.target.value))}
              className="crossfader"
            />
            <div className="crossfader-value">{crossfader}%</div>
          </div>
          
          <div className="master-controls">
            <button className="master-play" onClick={() => { togglePlay('A'); togglePlay('B'); }}>
              🎶 MASTER PLAY
            </button>
          </div>
        </div>

        {/* DECK B */}
        <div className="deck">
          <h3>🎧 DECK B</h3>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={(e) => handleFileUpload(e, 'B')}
            className="file-input"
          />
          
          {deckB ? (
            <div className="track-info">
              <div className="track-name">📀 {deckB.name}</div>
              <div className="deck-controls">
                <button 
                  onClick={() => togglePlay('B')} 
                  className={`play-button ${isPlayingB ? 'playing' : ''}`}
                >
                  {isPlayingB ? '⏸️' : '▶️'}
                </button>
                <div className="volume-control">
                  <span>🔊</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volumeB}
                    onChange={(e) => handleVolumeChange('B', e.target.value)}
                  />
                  <span>{volumeB}%</span>
                </div>
              </div>
              <audio ref={audioRefB} src={deckB.url} loop />
            </div>
          ) : (
            <div className="empty-deck">Drop audio file here</div>
          )}
          
          <div className="waveform">
            <div className="wave-bars">
              {Array.from({length: 20}).map((_, i) => (
                <div key={i} className="wave-bar" style={{height: `${Math.random() * 60 + 20}%`}} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATUS AND NEXT FEATURES */}
      <div className="status-panel">
        <div className="live-indicator">🔴 LIVE</div>
        <div className="next-features">
          <h4>🚀 NEXT FEATURES BEING BUILT:</h4>
          <ul>
            <li>🤖 AI Transition Assistant</li>
            <li>🌍 YouTube/Twitch Streaming</li>
            <li>📱 Mobile Controller App</li>
            <li>🎵 Real-time Stem Separation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
