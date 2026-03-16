import React, { useState, useEffect, useRef } from 'react';

const JourneyGame = () => {
  const [position, setPosition] = useState(0);
  const [activeLevel, setActiveLevel] = useState(null);
  const gameRef = useRef(null);

  const levels = [
    { id: 1, pos: 25, icon: '🎓', title: 'Level 1: Education', text: 'Graduating with a B.Tech in Computer Science (2021-2025).' },
    { id: 2, pos: 50, icon: '💻', title: 'Level 2: Projects', text: 'Built complex microservices, CI/CD pipelines, and web apps unlocking new developer productivity.' },
    { id: 3, pos: 75, icon: '💼', title: 'Level 3: Experience', text: 'Leveled up as a Software Engineer at Dell Technologies, previously gained XP at TVS Motor Company.' },
    { id: 4, pos: 100, icon: '🏆', title: 'Boss Level: Victory!', text: 'You know all about my journey! Ready to team up in the real world?' },
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
      setPosition(p => Math.min(p + 2, 100));
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
      setPosition(p => Math.max(p - 2, 0));
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleGlobalKey = (e) => {
      // Only listen if game is focused or we might want global control if user scrolls here
      if (document.activeElement === gameRef.current) {
        handleKeyDown(e);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  useEffect(() => {
    // Check if character is near a level
    const current = levels.find(l => Math.abs(l.pos - position) < 4);
    if (current) {
      setActiveLevel(current);
    } else {
      setActiveLevel(null);
    }
  }, [position]);

  return (
    <div 
      className="game-container" 
      onClick={() => gameRef.current?.focus()} 
      ref={gameRef} 
      tabIndex="0"
    >
      <h2>Interactive Journey Game 🎮</h2>
      <p className="game-instructions">Click here to focus, then use <strong>Left/Right Arrows</strong> (or A/D) to move my character and unlock levels!</p>
      
      <div className="game-track">
        <div className="character" style={{ left: `${position}%` }}>
          🏃‍♀️
        </div>
        {levels.map(l => (
          <div 
            key={l.id} 
            className={`level-marker ${activeLevel?.id === l.id ? 'active-marker' : ''}`} 
            style={{ left: `${l.pos}%` }}
          >
            {l.icon}
          </div>
        ))}
      </div>

      <div className="game-popup-container">
        {activeLevel ? (
          <div className="game-popup">
            <h3>{activeLevel.title}</h3>
            <p>{activeLevel.text}</p>
          </div>
        ) : (
          <div className="game-popup placeholder-popup">
            <p>Keep moving to discover the next level...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyGame;