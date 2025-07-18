# Tetris Clone

A minimalist Tetris clone built with vanilla JavaScript, CSS, and HTML canvas. The game features classic Tetris mechanics, keyboard controls, and a simple scoring system that increases speed as lines are cleared.

## About
- **version**: 1.0
- **author**: Joe Agster (vibespec), [Alexey Pajitnov](https://en.wikipedia.org/wiki/Alexey_Pajitnov) (original Tetris creator)
- **last updated**: 2025-07-17

## Specs
- type: web
- frameworks: none
- languages: JavaScript, CSS, HTML

## Features
- Classic Tetris gameplay
- Keyboard controls
- Score and lines tracking
- Increasing difficulty
- Next piece preview
- Game over and restart

## Requirements
- Render the game board using an HTML canvas element.
- Support standard Tetris controls:
  - Left/Right arrow keys: move piece horizontally
  - Down arrow key: soft drop
  - Up arrow key: hard drop (instantly drop piece)
  - Z key: rotate piece counterclockwise
  - X key: rotate piece clockwise
- Display the current score and lines cleared.
- Increase game speed as more lines are cleared.
- Show the next piece in a preview area.
- End the game when the stack reaches the top of the board.
- Display a game over message and allow restarting the game.

### Future Considerations
- Add classic Tetris music.
- Add sound effects for piece movement, rotation, and line clears.
- Implement a high score system that is stored in local storage.

## UI
- Minimalist design with a centered game board.
- Page and canvas should fill the viewport while maintaining proportions. 
- Background color should be dark gray.
- Score and lines cleared displayed above or beside the board.
- Next piece preview shown in a small box in the top right of the main game board.
- Responsive layout for desktop and mobile screens.
- Use CSS for simple color themes for each tetromino.

## Domain 

### Entities

#### Tetromino
- `shape`: 2D array of numbers representing the tetromino's blocks (e.g., `[[1, 1, 1, 1]]` for the I piece)
- `rotationState`: number indicating the current rotation (0–3)
- `color`: string (CSS color value) for the tetromino's display color

#### Board
- 2D Array (Array of Arrays). Represents the game grid, where each cell is either empty (`0`) or contains a value indicating the color/index of a tetromino block

#### GameState
- `score`: number (current player score)
- `linesCleared`: number (total lines cleared)
- `currentPiece`: Tetromino (the piece currently falling)
- `nextPiece`: Tetromino (the upcoming piece)
- `speed`: number (interval in milliseconds between automatic drops)
- `isGameOver`: boolean (true if the game has ended)

## Architecture
- `index.html`: Main HTML file with canvas and UI elements
- `styles.css`: CSS for layout and colors
- `tetris.js`: Main game logic, rendering, and input handling
- `tetromino.js`: Tetromino definitions and rotation logic
- `ui.js`: Score, lines, and next piece display logic

## Considerations
- Performance: Efficient rendering and game loop
- Accessibility: Keyboard-only controls, clear visual feedback
- Scalability: Code organized for easy extension (e.g., adding sound, mobile controls)

## Setup
- No build tools required; pure HTML/CSS/JS.
- All files in a single directory for simplicity.
- Open `index.html` in a browser to play.

## Testing
- Manual testing: Play the game and verify controls, scoring, and game over.
- (Optional) Add simple unit tests for tetromino rotation and line clearing logic.

## Deployment
- Host on GitHub Pages or any static file server.

## Glossary
- Tetromino: The geometric shapes used in Tetris (I, O, T, S, Z, J, L)
- Hard Drop: Instantly dropping the piece to the bottom
- Soft Drop: Moving the piece down one row

## References
- [Tetris Wikipedia](https://en.wikipedia.org/wiki/Tetris)
- [Classic Tetris Controls](https://tetris.fandom.com/wiki/Tetris_Guideline)
