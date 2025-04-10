import React from 'react';
import { GameCanvas } from './components/GameCanvas';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="game-wrapper">
      <h1>🐮 Cow Blocks</h1>
      <div className="canvas-container">
        <GameCanvas />
      </div>
    </div>
  );
};

export default App;
