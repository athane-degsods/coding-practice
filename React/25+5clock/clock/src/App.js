import './App.css';
import React from 'react';
import sound from './Alarm02.wav';

function App() {
  const [currentTimeOut, setCurrentTimeOut] = React.useState('25:00');
  const [currentTimeOutType, setCurrentTimeOutType] = React.useState('session');
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [isRunning, setIsRunning] = React.useState(false);

  const audioRef = React.useRef(null);

  function timeOut() {
    if (currentTimeOut === '00:00') {
      if (currentTimeOutType === 'session') {
        setCurrentTimeOutType('break');
        setCurrentTimeOut(`${breakLength.toString().padStart(2, '0')}:00`);
      } else {
        setCurrentTimeOutType('session');
        setCurrentTimeOut(`${sessionLength.toString().padStart(2, '0')}:00`);
      }
      return;
    }
    let time = currentTimeOut.split(':');
    let minutes = parseInt(time[0]);
    let seconds = parseInt(time[1]);
    if (seconds === 0) {
      if (minutes === 0) {
        return;
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    if (seconds < 10) {
      seconds = seconds.toString().padStart(2, '0');
    }
    if (minutes < 10) {
      minutes = minutes.toString().padStart(2, '0');
    }
    setCurrentTimeOut(`${minutes}:${seconds}`);
  }

  React.useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        timeOut();
      }, 1000);
    } else if (!isRunning && currentTimeOut !== '25:00') {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  React.useEffect(() => {
    if (currentTimeOut === '00:00') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  }, [currentTimeOut]);

  return (
    <div className="Clock">
      <div className="Clock-header">
        <h1>Pomodoro Clock</h1>
      </div>
      <div className="Clock-body">
        <div className="center-timer">
          {/* Break Length Floating Top Left */}
          <div className="Clock-screen break-floating">
            <span className="screen-label" id="break-label">Break</span>
            <span className="screen-number" id="break-length">{breakLength}</span>
            <div className="screen-controls">
              <button id="break-decrement" onClick={() => {
                if (!isRunning && breakLength > 1) setBreakLength(breakLength - 1);
              }} title="Decrease Break"><span role="img" aria-label="down">🡇</span></button>
              <button id="break-increment" onClick={() => {
                if (!isRunning && breakLength < 60) setBreakLength(breakLength + 1);
              }} title="Increase Break"><span role="img" aria-label="up">🡅</span></button>
            </div>
          </div>
          {/* Session Length Floating Top Right */}
          <div className="Clock-screen session-floating">
            <span className="screen-label" id="session-label">Session</span>
            <span className="screen-number" id="session-length">{sessionLength}</span>
            <div className="screen-controls">
              <button id="session-decrement" onClick={() => {
                if (!isRunning && sessionLength > 1) {
                  setSessionLength(sessionLength - 1);
                  setCurrentTimeOut(`${sessionLength - 1}:00`);
                }
              }} title="Decrease Session"><span role="img" aria-label="down">🡇</span></button>
              <button id="session-increment" onClick={() => {
                if (!isRunning && sessionLength < 60) {
                  setSessionLength(sessionLength + 1);
                  setCurrentTimeOut(`${sessionLength + 1}:00`);
                }
              }} title="Increase Session"><span role="img" aria-label="up">🡅</span></button>
            </div>
          </div>
          {/* Session Screen (Timer) */}
          <div className="Clock-screen session-screen">
            <span className="screen-label" id="timer-label">{currentTimeOutType === 'session' ? 'Session' : 'Break'}</span>
            <span className="screen-number huge-number" id="time-left">{currentTimeOut.toString().padStart(5, '0')}</span>
            <div className="screen-controls">
              <button id="start_stop" onClick={() => setIsRunning(!isRunning)} title="Start/Stop">
                {isRunning ? <span role="img" aria-label="pause">⏹️</span> : <span role="img" aria-label="play">▶️</span>}
              </button>
              <button id="reset" onClick={() => {
                setCurrentTimeOut('25:00');
                setCurrentTimeOutType('session');
                setBreakLength(5);
                setSessionLength(25);
                setIsRunning(false);
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.pause();
                }
              }} title="Reset"><span role="img" aria-label="reset">🔁</span></button>
            </div>
          </div>
        </div>
      </div>
      <audio id="beep" src={sound} ref={audioRef}></audio>
    </div>
  );
}

export default App;
