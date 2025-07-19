// tetris.js
// Main game logic, rendering, and input handling
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

// Pause/resume on canvas click
canvas.addEventListener('click', () => {
  if (isGameOver) return;
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

document.getElementById('restart').addEventListener('click', resetGame);

window.onload = resetGame;
