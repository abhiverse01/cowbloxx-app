import React, { useEffect, useRef, useState } from 'react';
import { Cow, GameState } from '../types/types';
import { useGameLoop } from '../hooks/useGameLoop';

const canvasWidth = 800;
const canvasHeight = 600;
const cowSpeed = 2;

const cowSize = 40;

const initialGameState: GameState = {
  cows: [
    {
      id: 'cow1',
      x: 100,
      y: 500,
      width: cowSize,
      height: cowSize,
      color: '#ffffff', // White cow
      hasBlock: false,
      isTrembling: false,
    },
    {
      id: 'cow2',
      x: 600,
      y: 500,
      width: cowSize,
      height: cowSize,
      color: '#a0522d', // Brown cow
      hasBlock: false,
      isTrembling: false,
    },
  ],
  blocks: [],
};

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>({ ...initialGameState });
  const keys = useRef<{ [key: string]: boolean }>({});
  const [playerScores, setPlayerScores] = useState({ cow1: 0, cow2: 0 });

  // Sprites (placeholder for now)
  const cowSpriteRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Load cow sprite (optional placeholder, not used yet)
    const img = new Image();
    img.src = '/assets/cow.png'; // Add cow.png to public/assets/
    cowSpriteRef.current = img;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const moveCow = (cow: Cow, id: string) => {
    if (id === 'cow1') {
      if (keys.current['ArrowLeft']) cow.x -= cowSpeed;
      if (keys.current['ArrowRight']) cow.x += cowSpeed;
      if (keys.current['ArrowUp']) cow.y -= cowSpeed;
      if (keys.current['ArrowDown']) cow.y += cowSpeed;
    } else if (id === 'cow2') {
      if (keys.current['a']) cow.x -= cowSpeed;
      if (keys.current['d']) cow.x += cowSpeed;
      if (keys.current['w']) cow.y -= cowSpeed;
      if (keys.current['s']) cow.y += cowSpeed;
    }

    cow.x = Math.max(0, Math.min(canvasWidth - cow.width, cow.x));
    cow.y = Math.max(0, Math.min(canvasHeight - cow.height, cow.y));
  };

  const render = (ctx: CanvasRenderingContext2D, state: GameState) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#b3e58c';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Render cows
    state.cows.forEach((cow) => {
      ctx.fillStyle = cow.color;
      ctx.fillRect(cow.x, cow.y, cow.width, cow.height);

      // Optional sprite draw (future upgrade)
      // const sprite = cowSpriteRef.current;
      // if (sprite) {
      //   ctx.drawImage(sprite, cow.x, cow.y, cow.width, cow.height);
      // }
    });

    // Render blocks
    state.blocks.forEach((block) => {
      ctx.fillStyle = '#228B22';
      ctx.fillRect(block.x, block.y, block.width, block.height);
    });
  };

  // Game loop logic
  useGameLoop(() => {
    const state = gameStateRef.current;

    state.cows.forEach((cow) => moveCow(cow, cow.id));

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) render(ctx, state);

    // Update score (mock logic — will be real once block delivery is added)
    setPlayerScores({
      cow1: state.cows[0].hasBlock ? 1 : 0,
      cow2: state.cows[1].hasBlock ? 1 : 0,
    });
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="game-canvas"
      />
      <div className="hud">
        <p>
          <strong>Player 1 (White Cow):</strong> 🐮 Blocks Delivered: {playerScores.cow1}
        </p>
        <p>
          <strong>Player 2 (Brown Cow):</strong> 🐮 Blocks Delivered: {playerScores.cow2}
        </p>
      </div>
    </>
  );
};
