# Tic Tac Toe — Ocean Professional

A clean, modern Tic Tac Toe game built with React. Features a centered 3x3 grid, player turn indicator, modes (2 Players or vs Computer), result messages, and restart. Styled with an “Ocean Professional” theme using blue and amber accents.

## Features
- Centered 3x3 grid with smooth transitions and subtle shadows
- Player turn indicator and game result (win/draw) message
- Play vs another player or vs computer (simple but smart AI)
- Restart button to begin a new game
- Responsive layout, accessible labels and roles
- Minimal dependencies

## Theme
- primary: `#2563EB` (blue)
- secondary/success: `#F59E0B` (amber)
- error: `#EF4444`
- background: `#f9fafb`
- surface: `#ffffff`
- text: `#111827`

## Getting Started
In the project directory:

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm test`
Launches the test runner.

### `npm run build`
Builds the app for production to `build`.

## How to Play
1. Choose mode: “2 Players” or “vs Computer”.
2. Player X always starts.
3. Click any square to make a move. In vs Computer, you are X and the computer is O.
4. The status area will indicate the current turn or show the winner/draw.
5. Click “Restart” to reset the board at any time.

## Accessibility
- Board uses role="grid" for better screen reader compatibility.
- Squares are buttons with clear labels.
- Status messages use distinct visual emphasis and descriptive text.

## Folder Structure
- `src/App.js` — main component and game logic
- `src/App.css` — theme and component styles
- `src/index.js` — React entry point

Enjoy playing!
