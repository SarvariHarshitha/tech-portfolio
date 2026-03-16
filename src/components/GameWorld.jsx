import React, { useState, useEffect, useRef } from 'react';
import LeftSection from './LeftSection';
import ExperienceCard from './ExperienceCard';
import EducationCard from './EducationCard';
import ProjectsCard from './ProjectsCard';
import RunnerSprite from './RunnerSprite';

const WORLD_WIDTH = 400; // The world is 400 viewport widths wide

const OBSTACLES = [];

const playSound = (type) => {
  try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'jump') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(300, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
      }
  } catch (e) {
      // Ignore audio errors
  }
};

const GameWorld = () => {
  const [position, setPosition] = useState(0); // 0 to 100% of the world track
  const [direction, setDirection] = useState('right');
  const [isMoving, setIsMoving] = useState(false);
  
  const [isJumping, setIsJumping] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);

  const gameRef = useRef(null);
  const moveTimeoutRef = useRef(null);

  const handleKeyDown = (e) => {

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
      if (!isJumping && !isCrouching) {
        setIsJumping(true);
        playSound('jump');
        setTimeout(() => setIsJumping(false), 600);
      }
      e.preventDefault();
    }

    if (e.key === 'ArrowDown' || e.key === 's') {
      setIsCrouching(true);
      e.preventDefault();
    }

    const step = isCrouching ? 0.2 : 0.5; // Walking speed

    if (e.key === 'ArrowRight' || e.key === 'd') {
      setPosition(p => Math.min(p + step, 100));
      setDirection('right');
      setIsMoving(!isCrouching);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
      setPosition(p => Math.max(p - step, 0));
      setDirection('left');
      setIsMoving(!isCrouching);
      e.preventDefault();
    }

    // Reset the moving state after a short delay of no key presses
    if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    moveTimeoutRef.current = setTimeout(() => {
      setIsMoving(false);
    }, 150);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'ArrowDown' || e.key === 's') {
      setIsCrouching(false);
    }
  };

  useEffect(() => {
    gameRef.current?.focus();
  }, []);

  // Calculate the camera placement so that we slide through the WORLD_WIDTH naturally
  const cameraX = (position / 100) * (WORLD_WIDTH - 100);

  return (
    <div 
      className="full-game-container" 
      tabIndex="0" 
      onKeyDown={handleKeyDown} 
      onKeyUp={handleKeyUp}
      ref={gameRef}
      onClick={() => gameRef.current?.focus()}
    >
      <div className="game-camera" style={{ transform: `translateX(-${cameraX}vw)` }}>
        <div className="game-world" style={{ width: `${WORLD_WIDTH}vw` }}>
          
          <div className="ground-line"></div>

          {/* Intense Background Enhancements */}
          <div className="bg-decorations" style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none'}}>
            <div style={{position: 'absolute', bottom: '10vh', left: '15vw', fontSize: '10rem', filter: 'brightness(0.3)'}}>⛰️</div>
            <div style={{position: 'absolute', bottom: '10vh', left: '115vw', fontSize: '12rem', filter: 'brightness(0.4)'}}>🏔️</div>
            <div style={{position: 'absolute', bottom: '10vh', left: '210vw', fontSize: '8rem', filter: 'brightness(0.2)'}}>🌲</div>
            <div style={{position: 'absolute', bottom: '15vh', left: '320vw', fontSize: '15rem', filter: 'brightness(0.5)'}}>🏰</div>
          </div>

          {/* Character */}
          <div 
            className="main-character-sprite" 
            style={{ 
              left: `${position}%`,
              transform: `translateX(-50%) scaleX(${direction === 'left' ? -1 : 1})`,
              bottom: '10vh' /* Update bottom to align sprite */
            }}
          >
            <RunnerSprite isMoving={isMoving} isJumping={isJumping} isCrouching={isCrouching} />
          </div>

          {/* LEVEL 1: Origin */}
          <div className="level-zone" style={{ left: '10vw' }}>
            <div className="zone-sign">Level 1: The Origin</div>
            <div className="zone-content">
              <LeftSection />
            </div>
          </div>

          {/* LEVEL 2: Education */}
          <div className="level-zone" style={{ left: '110vw' }}>
            <div className="zone-sign">Level 2: Academy</div>
            <div className="zone-content">
               <EducationCard />
            </div>
          </div>

          {/* LEVEL 3: Experience */}
          <div className="level-zone" style={{ left: '210vw' }}>
            <div className="zone-sign">Level 3: The Guild</div>
            <div className="zone-content">
               <ExperienceCard />
            </div>
          </div>

          {/* LEVEL 4: Projects */}
          <div className="level-zone" style={{ left: '310vw' }}>
            <div className="zone-sign">Boss Level: Arsenal</div>
            <div className="zone-content">
               <ProjectsCard />
            </div>
          </div>

          {/* FINISH LINE */}
          <div className="finish-line" style={{ left: '385vw' }}>
            <div className="zone-sign finish-sign">Victory!</div>
            <div className="trophy">🏆</div>
            <p>You've completed the journey!<br/>Let's connect soon.</p>
          </div>

        </div>
      </div>
      
      <div className="game-hud">
         <p>Click here to focus, then use <strong>⬅️ / ➡️ Arrows</strong> or <strong>A / D keys</strong> to explore my world!</p>
         <div className="progress-bar-container">
           <div className="progress-bar" style={{ width: `${position}%` }}></div>
         </div>
      </div>
    </div>
  );
};

export default GameWorld;