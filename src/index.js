import { Ship } from "./Ship.js";
import { Bullet } from "./Bullet.js";
import { Alien } from "./Alien.js";
import { Life } from "./Life.js";
import { GameOver } from "./GameOver.js";


const ship = new Ship();
const bullets = [];
const aliens = [];
const lives = []
var changeDirection = false
var alienCount = 50
var score = 0
const key = {
    a: false,
    d: false,
    [" "]: false
}


function createBullet({ alien = false, x, y }) {
    bullets.push(new Bullet({ alien, x, y, }))
}

function gameOver() {
    new GameOver()
    clearInterval(game)
    clearInterval(alienShots)
}

function updateScore(bulletMissTheTarget = false) {
    if(!bulletMissTheTarget){
        score += 200
        $(".score").html("Score: " + score)
    }else if (score > 0){
        score -= 100
        $(".score").html("Score: " + score)
    }
}

function checkIfShipIsHit(bullet) {
        if (!ship.invulnerable &&
            bullet.y > (ship.y + 20) && bullet.y < (ship.y + 70) &&
            bullet.x > (ship.x - 10) && bullet.x < (ship.x + 80)) {
            bullet.remove();
            bullets.splice(bullets.indexOf(bullet), 1);
            ship.loseLife();
            lives[ship.lives].remove();
            lives.pop();
        }
        if (bullet.y > window.innerHeight) {
            bullet.remove();
            bullets.splice(bullets.indexOf(bullet), 1)
        }
}

function checkIfAlienIsHit(bullet) {
        aliens.forEach((alienColumn) => {
            alienColumn.forEach((alien) => {
                if (bullet.y > alien.y && bullet.y < (alien.y + 30) &&
                    bullet.x > (alien.x - 10) && bullet.x < (alien.x + 40)) {
                    var alienIndex = alienColumn.indexOf(alien)
                    var shipBulletIndex = bullets.indexOf(bullet)
                    alien.remove()
                    alienColumn.splice(alienIndex, 1)
                    bullet.remove()
                    bullets.splice(shipBulletIndex, 1)
                    if (alienColumn.length < 1) {
                        aliens.splice(aliens.indexOf(alienColumn), 1)
                    }
                    alienCount -= 1;
                    updateScore();
                }
                if (bullet.y < 0){
                    bullet.remove();
                    bullets.splice(bullets.indexOf(bullet), 1)
                    updateScore(true);
                }
            }
            )
        })
}

for (var i = 433; i < 923; i += 50) {
    aliens.push([])
    for (var j = 100; j < 350; j += 50) {
        aliens[aliens.length - 1].push(new Alien({ x: i, y: j }));
    }
}
for (var i = 0; i < ship.lives; i += 1) {
    lives.push(new Life)
}


document.addEventListener("keydown", (event) => {
    key[event.key] = true
})
document.addEventListener("keyup", (event) => {
    key[event.key] = false
})


var alienShots = setInterval(() => {
    const i = Math.floor(Math.random() * aliens.length);
    const j = aliens[i].length - 1
    aliens[i][j].shoot({ createBullet, })
}, 500)


var game = setInterval(() => {
    ship.moveLeft(key["a"]);

    ship.moveRight(key["d"]);

    if (alienCount > 0 && aliens[0][0].x < 344 || aliens[aliens.length - 1][0].x > 1022) {
        changeDirection = true
    }

    aliens.forEach((alienColumn) => {
        alienColumn.forEach((alien) => {
            alien.move(changeDirection)
            if (alien.y > (ship.y + 70)) {
                gameOver();
            }
        })
    })

    changeDirection = false

    bullets.forEach((bullet) => {
        bullet.update();
        if(bullet.alien){
            checkIfShipIsHit(bullet);
        }else{
            checkIfAlienIsHit(bullet);
        }
    })
    

    if (key[" "]) {
        ship.shoot({ createBullet, })
    }

    if (alienCount < 1) {
        gameOver()
    }
    if (ship.lives - 1 < 0){
        gameOver()
    }
}, 20)
