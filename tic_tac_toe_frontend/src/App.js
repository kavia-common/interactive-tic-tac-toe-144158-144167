import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * Ocean Professional theme palette
 * primary: #2563EB (blue)
 * secondary/success: #F59E0B (amber)
 * error: #EF4444
 * background: #f9fafb
 * surface: #ffffff
 * text: #111827
 */

// Helpers for game logic
const LINES = [
  [0, 1, 2],[3, 4, 5],[6, 7, 8], // rows
  [0, 3, 6],[1, 4, 7],[2, 5, 8], // cols
  [0, 4, 8],[2, 4, 6]            // diagonals
];

function calculateWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function getAvailableMoves(squares) {
  const moves = [];
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) moves.push(i);
  }
  return moves;
}

// Simple computer strategy: win > block > center > corner > random
function computeAIMove(squares, ai, human) {
  const empty = getAvailableMoves(squares);

  // Try to win
  for (const idx of empty) {
    const next = squares.slice();
    next[idx] = ai;
    if (calculateWinner(next)?.player === ai) return idx;
  }

  // Block opponent
  for (const idx of empty) {
    const next = squares.slice();
    next[idx] = human;
    if (calculateWinner(next)?.player === human) return idx;
  }

  // Center
  if (empty.includes(4)) return 4;

  // Corners
  const corners = empty.filter(i => [0, 2, 6, 8].includes(i));
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

  // Otherwise random
  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : null;
}

// Board Square Component
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`ttt-square ${highlight ? 'highlight' : ''}`}
      onClick={onClick}
      aria-label={`Square ${value || 'empty'}`}
    >
      {value}
    </button>
  );
}

// Board Component
function Board({ squares, onSquareClick, winningLine }) {
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onSquareClick(idx)}
          highlight={winningLine ? winningLine.includes(idx) : false}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** This is the main Tic Tac Toe app with mode selection and game logic. */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('pvp'); // 'pvp' | 'cpu'
  const [theme] = useState('light'); // Fixed light theme for Ocean Professional background
  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = !winnerInfo && squares.every(Boolean);

  const currentPlayer = xIsNext ? 'X' : 'O';
  const humanPlayer = 'X';
  const aiPlayer = 'O';

  // Let AI make a move when in cpu mode and it's O's turn and game not over
  useEffect(() => {
    if (mode !== 'cpu') return;
    if (winnerInfo || isDraw) return;
    if (!xIsNext) {
      const timer = setTimeout(() => {
        const idx = computeAIMove(squares, aiPlayer, humanPlayer);
        if (idx !== null) {
          setSquares(prev => {
            const next = prev.slice();
            next[idx] = aiPlayer;
            return next;
          });
          setXIsNext(true);
        }
      }, 450); // smooth delay for UX
      return () => clearTimeout(timer);
    }
  }, [mode, xIsNext, squares, winnerInfo, isDraw]);

  const handleSquareClick = (i) => {
    if (winnerInfo || squares[i]) return;
    // In CPU mode, human is X and only clicks when it's X's turn
    if (mode === 'cpu' && !xIsNext) return;

    setSquares(prev => {
      const next = prev.slice();
      next[i] = xIsNext ? 'X' : 'O';
      return next;
    });
    setXIsNext(prev => !prev);
  };

  // PUBLIC_INTERFACE
  const restart = () => {
    /** Reset the game to initial state. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // PUBLIC_INTERFACE
  const changeMode = (newMode) => {
    /** Switch between Player vs Player and Player vs Computer modes, resets game. */
    setMode(newMode);
    restart();
  };

  let statusMessage = '';
  if (winnerInfo) {
    statusMessage = `Player ${winnerInfo.player} wins!`;
  } else if (isDraw) {
    statusMessage = 'It’s a draw!';
  } else {
    statusMessage = `Turn: Player ${currentPlayer}`;
  }

  return (
    <div className="ocean-app" data-theme={theme}>
      <div className="ocean-container">
        <header className="ocean-header">
          <h1 className="ocean-title">Tic Tac Toe</h1>
          <p className="ocean-subtitle">Ocean Professional — Blue & amber accents</p>
        </header>

        <section className="ocean-controls">
          <div className="mode-toggle" role="radiogroup" aria-label="Game mode">
            <button
              className={`mode-btn ${mode === 'pvp' ? 'active' : ''}`}
              onClick={() => changeMode('pvp')}
              aria-pressed={mode === 'pvp'}
            >
              2 Players
            </button>
            <button
              className={`mode-btn ${mode === 'cpu' ? 'active' : ''}`}
              onClick={() => changeMode('cpu')}
              aria-pressed={mode === 'cpu'}
            >
              vs Computer
            </button>
          </div>

          <div className={`status ${winnerInfo ? 'win' : isDraw ? 'draw' : 'turn'}`}>
            {statusMessage}
          </div>
        </section>

        <main className="ocean-main">
          <div className="board-surface">
            <Board
              squares={squares}
              onSquareClick={handleSquareClick}
              winningLine={winnerInfo?.line || null}
            />
          </div>

          <div className="actions">
            <button className="restart-btn" onClick={restart} aria-label="Restart game">
              Restart
            </button>
          </div>
        </main>

        <footer className="ocean-footer">
          <span className="legend">
            X starts • {mode === 'cpu' ? 'You are X' : 'Both players alternate'}
          </span>
        </footer>
      </div>
    </div>
  );
}
