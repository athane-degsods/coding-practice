import './App.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Import all packs statically
const soundPacks = {
  audio1: require.context('./sounds/audio1', false, /\.mp3$/),
  audio2: require.context('./sounds/audio2', false, /\.mp3$/),
  // Add more packs here as needed
  // audio3: require.context('./sounds/audio3', false, /\.mp3$/),
};

const PAD_KEYS = ['Q','W','E','A','S','D','Z','X','C'];

function importAll(r) {
  return r.keys().map((key, idx) => {
    // Extract file name without extension for id/label
    const fileName = key.replace('./', '').replace('.mp3', '');
    return {
      key: PAD_KEYS[idx],
      file: r(key),
      id: fileName, // unique id for pad
      label: fileName // display string
    };
  });
}

function importSoundPack(pack) {
  const context = soundPacks[pack];
  if (!context) return [];
  return importAll(context);
}

function App() {
  const [power, setPower] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [soundPack, setSoundPack] = useState('audio1');
  const [sounds, setSounds] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState('');
  const audioRefs = useRef({});

  useEffect(() => {
    const initialSounds = importSoundPack(soundPack);
    setSounds(initialSounds);
    setCurrentDisplay(`Sound Pack ${soundPack === 'audio1' ? 1 : 2}`);
  }, [soundPack]);

  // Play sound by key (Q, W, ...)
  const playSound = useCallback((k) => {
    if (power) {
      const sound = sounds.find(sound => sound.key === k);
      if (sound && audioRefs.current[k]) {
        const audioElem = audioRefs.current[k];
        if (audioElem) {
          audioElem.pause();
          audioElem.currentTime = 0;
          audioElem.volume = volume;
          audioElem.play();
        }
        setCurrentDisplay(sound.label);
      }
    }
  }, [power, sounds, volume]);

  // Keyboard event
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (PAD_KEYS.includes(key)) {
        playSound(key);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [playSound]);

  return (
    <div id="drum-machine" className="DrumMachine">
      <div className="DrumCase">
        <div className="DrumPad">
          {sounds.map((sound) => (
            <button
              className="drum-pad DrumPadButton"
              id={sound.id}
              key={sound.key}
              onClick={e => {
                if (power) {
                  const audioElem = e.currentTarget.querySelector('audio');
                  if (audioElem) {
                    audioElem.pause();
                    audioElem.currentTime = 0;
                    audioElem.volume = volume;
                    audioElem.play();
                  }
                  setCurrentDisplay(sound.label);
                }
              }}
              tabIndex="0"
            >
              {sound.key}
              <audio
                ref={el => audioRefs.current[sound.key] = el}
                className="clip"
                id={sound.key}
                src={sound.file}
              />
            </button>
          ))}
        </div>
        <div className="Controls">
          <div className="SwitchContainer">
            <label className="switch">
              <input
                type="checkbox"
                checked={power}
                onChange={() => {
                  setPower(!power);
                  setCurrentDisplay(!power ? 'Power On' : 'Power Off');
                }}
              />
              <span className="slider"></span>
            </label>
            <span>Power</span>
          </div>
          <div className="SwitchContainer">
            <label className="switch">
              <input
                type="checkbox"
                checked={soundPack === 'audio2'}
                onChange={() => {
                  setSoundPack(soundPack === 'audio1' ? 'audio2' : 'audio1');
                  setCurrentDisplay(soundPack === 'audio1' ? 'Sound Pack 2' : 'Sound Pack 1');
                }}
              />
              <span className="slider"></span>
            </label>
            <span>Sound Pack</span>
          </div>
          <div className="Display" id="display">
            <h2>{currentDisplay}</h2>
          </div>
          <div className="VolumeControl">
            <label htmlFor="volume">Volume: </label>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
