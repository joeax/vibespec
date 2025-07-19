// ui.js
// Score, lines, and next piece display logic

function updateScore(score) {
  document.getElementById('score').textContent = `Score: ${score}`;
}

function updateLines(lines) {
  document.getElementById('lines').textContent = `Lines: ${lines}`;
}

function showGameOver(show) {
  const el = document.getElementById('game-over');
  if (show) {
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
}

function drawNextPiece(nextPiece) {
  const canvas = document.getElementById('next');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!nextPiece) return;
  const shape = nextPiece.shape;
  const color = nextPiece.color;
  const blockSize = Math.floor(canvas.width / shape.length);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        ctx.fillStyle = color;
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        ctx.strokeStyle = '#222';
        ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }
}
