import React, { useState, useRef } from 'react'
import './App.css'

function App() {
  const [deckA, setDeckA] = useState(null)
  const [deckB, setDeckB] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRefA = useRef(null)
  const audioRefB = useRef(null)

  const handleFileUpload = (event, deck) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      if (deck === 'A') {
        setDeckA({ file, url, name: file.name })
      } else {
        setDeckB({ file, url, name: file.name })
      }
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (audioRefA.current) {
      isPlaying ? audioRefA.current.pause() : audioRefA.current.play()
    }
    if (audioRefB.current) {
      isPlaying ? audioRefB.current.pause() : audioRefB.current.play()
    }
  }

  return (
    <div className="dj-app">
      <header className="app-header">
        <h1>🎛️ FusionMix Quantum</h1>
        <p>Your DJ Studio - Now Live!</p>
      </header>

      <div className="mixer-interface">
        {/* Deck A */}
        <div className="deck">
          <h3>Deck A</h3>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={(e) => handleFileUpload(e, 'A')}
          />
          {deckA && (
            <div className="track-info">
              <p>📀 {deckA.name}</p>
              <audio ref={audioRefA} src={deckA.url} controls />
            </div>
          )}
          <div className="waveform">Waveform Display</div>
        </div>

        {/* Mixer Section */}
        <div className="mixer">
          <h3>Mixer</h3>
          <div className="crossfader">
            <input type="range" min="0" max="100" defaultValue="50" />
          </div>
          <button onClick={togglePlay} className="play-button">
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
        </div>

        {/* Deck B */}
        <div className="deck">
          <h3>Deck B</h3>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={(e) => handleFileUpload(e, 'B')}
          />
          {deckB && (
            <div className="track-info">
              <p>📀 {deckB.name}</p>
              <audio ref={audioRefB} src={deckB.url} controls />
            </div>
          )}
          <div className="waveform">Waveform Display</div>
        </div>
      </div>

      <div className="features-coming">
        <h3>🚀 Features Coming Soon:</h3>
        <ul>
          <li>🤖 AI-Powered Transitions</li>
          <li>🌍 Live Streaming</li>
          <li>📱 Mobile Controller</li>
          <li>🎵 Real Waveforms</li>
        </ul>
      </div>
    </div>
  )
}

export default App
