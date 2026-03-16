import React from 'react';
import './RunnerSprite.css';

const RunnerSprite = ({ isMoving, isJumping, isCrouching }) => {
  let stateClass = 'idle';
  if (isJumping) stateClass = 'jumping';
  else if (isCrouching) stateClass = 'crouching';
  else if (isMoving) stateClass = 'running';

  return (
    <div className={`runner-container ${stateClass}`}>
      <div className="runner-head">
        <div className="runner-hair"></div>
      </div>
      <div className="runner-torso"></div>
      <div className="runner-arm arm-left"></div>
      <div className="runner-leg leg-left"></div>
      
      <div className="runner-leg leg-right"></div>
      <div className="runner-arm arm-right">
        <div className="runner-sword"></div>
      </div>
    </div>
  );
};

export default RunnerSprite;
