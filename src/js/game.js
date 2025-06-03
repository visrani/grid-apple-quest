let score = 0;
let gameActive = false;

// Make score and gameActive global
window.score = score;
window.gameActive = gameActive;

function initializeGame() {
    console.log('Initializing game...'); // Debug: Confirm initializeGame call
    createGrid(10, 10);
    resetGame();
}

function startGame() {
    gameActive = true;
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('message').textContent = 'Game started! Collect the apples!';
    
    // Clear grid first
    grid.cells.fill(null);
    grid.createGrid();
    
    // Spawn entities in order
    spawnPlayer();
    spawnApple();
    spawnMonster();
    console.log('Entities spawned.'); // Debug: Confirm entity spawning
}

function resetGame() {
    gameActive = false;
    score = 0;
    clearMonsters();
    document.getElementById('score').textContent = score;
    document.getElementById('message').textContent = 'Press Start to play!';
    grid.cells.fill(null);
    grid.createGrid();
}

function gameOver() {
    gameActive = false;
    document.getElementById('message').textContent = `Game Over! Final Score: ${score}`;
}

function spawnApple() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        grid.setCell(pos.x, pos.y, 'apple');
    } else {
        console.warn('No empty position to spawn apple!');
    }
}

function spawnMonster() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        const monster = new Monster(pos.x, pos.y);
        monsters.push(monster);
        grid.setCell(pos.x, pos.y, 'monster');
    } else {
        console.warn('No empty position to spawn monster!');
    }
}

function spawnPlayer() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        player = new Player();
        player.x = pos.x;
        player.y = pos.y;
        grid.setCell(player.x, player.y, 'player');
    } else {
        console.warn('No empty position to spawn player!');
    }
}

function increaseScore() {
    score += 10;
    document.getElementById('score').textContent = score;
    if (score % 50 === 0) {
        spawnMonster();
    }
}

document.addEventListener('keydown', function(event) {
    if (!gameActive) return;
    
    switch(event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            movePlayer(event.key);
            event.preventDefault();
            break;
    }
});

// Make functions global
window.initializeGame = initializeGame;
window.startGame = startGame;
window.resetGame = resetGame;
window.gameOver = gameOver;
window.spawnApple = spawnApple;
window.spawnMonster = spawnMonster;
window.spawnPlayer = spawnPlayer;
window.increaseScore = increaseScore;