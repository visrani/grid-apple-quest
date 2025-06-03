// player.js

class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    spawn() {
        const pos = grid.getRandomEmptyPosition();
        this.x = pos.x;
        this.y = pos.y;
        grid.setCell(this.x, this.y, 'player');
    }

    move(direction) {
        let newX = this.x;
        let newY = this.y;

        switch(direction) {
            case 'ArrowUp': newY = Math.max(0, this.y - 1); break;
            case 'ArrowDown': newY = Math.min(grid.height - 1, this.y + 1); break;
            case 'ArrowLeft': newX = Math.max(0, this.x - 1); break;
            case 'ArrowRight': newX = Math.min(grid.width - 1, this.x + 1); break;
        }

        const targetCell = grid.getCell(newX, newY);
        if (targetCell === 'apple') {
            increaseScore();
            spawnApple();
        } else if (targetCell === 'monster') {
            gameOver();
            return;
        }

        grid.clearCell(this.x, this.y);
        this.x = newX;
        this.y = newY;
        grid.setCell(this.x, this.y, 'player');
    }
}

let player = null;

function spawnPlayer() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        player = new Player();
        player.x = pos.x;
        player.y = pos.y;
        grid.setCell(player.x, player.y, 'player');
        console.log('Player spawned at:', player.x, player.y); // Debug: Confirm player spawn
    } else {
        console.warn('No empty position to spawn player!');
    }
}

function movePlayer(direction) {
    if (player && gameActive) {
        player.move(direction);
        moveMonsters();
    }
}

// Make Player and functions global
window.Player = Player;
window.player = player;
window.spawnPlayer = spawnPlayer;
window.movePlayer = movePlayer;