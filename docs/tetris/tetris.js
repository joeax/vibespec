// tetris.js
// Main game logic, rendering, and input handling
let touchStartX = null;
let touchStartY = null;
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const DROP_START = 1000;

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let score = 0;
let lines = 0;
let speed = DROP_START;
let dropTimer = null;
let isGameOver = false;
let isPaused = false;

let currentPiece = null;
let nextPiece = null;
let currentX = 0;
let currentY = 0;
let rotationState = 0;


const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// ...existing code...

function randomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const key = keys[Math.floor(Math.random() * keys.length)];
  const tet = TETROMINOS[key];
  return {
    shape: tet.shape.map(row => row.slice()),
    color: tet.color,
    type: key,
    rotation: 0,
  };
}

function resetGame() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  score = 0;
  lines = 0;
  speed = DROP_START;
  isGameOver = false;
  isPaused = false;
  currentPiece = randomTetromino();
  nextPiece = randomTetromino();
  currentX = 3;
  currentY = 0;
  updateScore(score);
  updateLines(lines);
  showGameOver(false);
  draw();
  if (dropTimer) clearInterval(dropTimer);
  dropTimer = setInterval(drop, speed);
  drawNextPiece(nextPiece);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw board
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (board[y][x]) {
        ctx.fillStyle = board[y][x];
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = '#222';
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
  // Draw current piece
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          ctx.fillStyle = currentPiece.color;
          ctx.fillRect((currentX + x) * BLOCK_SIZE, (currentY + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          ctx.strokeStyle = '#222';
          ctx.strokeRect((currentX + x) * BLOCK_SIZE, (currentY + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  }
}

function validMove(shape, offsetX, offsetY) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        let newX = currentX + x + offsetX;
        let newY = currentY + y + offsetY;
        if (
          newX < 0 ||
          newX >= COLS ||
          newY >= ROWS ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

function mergePiece() {
  for (let y = 0; y < currentPiece.shape.length; y++) {
    for (let x = 0; x < currentPiece.shape[y].length; x++) {
      if (currentPiece.shape[y][x]) {
        let boardY = currentY + y;
        let boardX = currentX + x;
        if (boardY >= 0) {
          board[boardY][boardX] = currentPiece.color;
        }
      }
    }
  }
}

function clearLines() {
  let linesCleared = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every(cell => cell)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      linesCleared++;
      y++;
    }
  }
  if (linesCleared > 0) {
    score += linesCleared * 100;
    lines += linesCleared;
    updateScore(score);
    updateLines(lines);
    if (lines % 10 === 0 && speed > 100) {
      speed -= 100;
      clearInterval(dropTimer);
      dropTimer = setInterval(drop, speed);
    }
  }
}

function drop() {
  if (isPaused || isGameOver) return;
  if (validMove(currentPiece.shape, 0, 1)) {
    currentY++;
  } else {
    mergePiece();
    clearLines();
    currentPiece = nextPiece;
    nextPiece = randomTetromino();
    currentX = 3;
    currentY = 0;
    drawNextPiece(nextPiece);
    if (!validMove(currentPiece.shape, 0, 0)) {
      isGameOver = true;
      showGameOver(true);
      clearInterval(dropTimer);
      return;
    }
  }
  draw();
}

function move(dx) {
  if (validMove(currentPiece.shape, dx, 0)) {
    currentX += dx;
    draw();
  }
}

function softDrop() {
  if (validMove(currentPiece.shape, 0, 1)) {
    currentY++;
    draw();
  }
}

function hardDrop() {
  while (validMove(currentPiece.shape, 0, 1)) {
    currentY++;
  }
  draw();
}

function rotatePiece(clockwise = true) {
  let newShape = clockwise ? rotate(currentPiece.shape) : rotateCounter(currentPiece.shape);
  if (validMove(newShape, 0, 0)) {
    currentPiece.shape = newShape;
    draw();
  }
}

// ...existing code...


document.getElementById('restart').addEventListener('click', resetGame);

// --- All event listeners at the bottom for clarity ---

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (isGameOver || isPaused) return;
  switch (e.key) {
    case 'ArrowLeft':
      move(-1);
      break;
    case 'ArrowRight':
      move(1);
      break;
    case 'ArrowDown':
      softDrop();
      break;
    case 'ArrowUp':
      hardDrop();
      break;
    case 'z':
    case 'Z':
      rotatePiece(false);
      break;
    case 'x':
    case 'X':
      rotatePiece(true);
      break;
  }
});

// Touch controls (mobile swipe/drag/tap)
canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  if (touchStartX === null || touchStartY === null) return;
  const touch = e.touches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  // Prevent pinch-to-zoom
  if (e.touches.length > 1) {
    e.preventDefault();
    return;
  }
  // Horizontal swipe: move
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
    if (dx > 0) {
      move(1);
    } else {
      move(-1);
    }
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }
  // Vertical swipe down: hard drop
  if (Math.abs(dy) > Math.abs(dx) && dy > 30) {
    hardDrop();
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
  // Tap: rotate clockwise if no significant movement
  if (touchStartX !== null && touchStartY !== null && e.changedTouches.length === 1) {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      rotatePiece(true);
    }
  }
  touchStartX = null;
  touchStartY = null;
});

// Prevent pinch-to-zoom on mobile (gesturestart)
window.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

// Also prevent double-tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Prevent double rotate on mobile: only fire click if not after a touch
let recentTouch = false;
canvas.addEventListener('touchend', () => {
  recentTouch = true;
  setTimeout(() => { recentTouch = false; }, 500);
});
canvas.addEventListener('click', (e) => {
  // Only rotate if not paused/game over and not a button click, and not after a touch event
  if (!isPaused && !isGameOver && e.target === canvas && !recentTouch) {
    rotatePiece(true);
  }
});

// Pause/resume on click outside the canvas
document.getElementById('page-wrapper')?.addEventListener('click', (e) => {
  if (isGameOver) return;
  // Only pause/resume if click is NOT on the canvas or a button
  const target = e.target;
  if (
    target === canvas ||
    target.closest('.controls') ||
    target.id === 'restart' ||
    target.closest('.next-piece')
  ) return;
  isPaused = !isPaused;
  if (!isPaused) {
    // Resume drop timer
    if (dropTimer) clearInterval(dropTimer);
    dropTimer = setInterval(drop, speed);
    draw();
  } else {
    // Pause drop timer
    if (dropTimer) clearInterval(dropTimer);
    // Overlay a pause message
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 2rem Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }
});

// On-screen control buttons
window.onload = () => {
  resetGame();
  // On-screen control buttons (wait for DOM)
  document.getElementById('rotate-ccw')?.addEventListener('click', () => {
    if (!isGameOver && !isPaused) rotatePiece(false);
  });
  document.getElementById('rotate-cw')?.addEventListener('click', () => {
    if (!isGameOver && !isPaused) rotatePiece(true);
  });
  document.getElementById('soft-drop')?.addEventListener('click', () => {
    if (!isGameOver && !isPaused) softDrop();
  });
  document.getElementById('hard-drop')?.addEventListener('click', () => {
    if (!isGameOver && !isPaused) hardDrop();
  });
};
