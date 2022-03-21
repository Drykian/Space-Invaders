import { Ship } from "./Ship.js";
import { Bullet } from "./Bullet.js";
import { Alien } from "./Alien.js";
import { Life } from "./Life.js";

const ship = new Ship();
const shipBullets = [];
const aliens = [];
const alienBullets = [];
const lives = []
var shootingAliens = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
var alienCount = 50
const key = {
    a: false,
    d: false,
    [" "]: false
}

for(var j=100; j < 350; j += 50){
    for (var i=433; i < 923; i += 50){
        aliens.push(new Alien({x: i, y: j}));
    }
}
for(var i=0; i < ship.lives; i += 1){
    lives.push(new Life)
}

document.addEventListener("keydown", (event) => {
    key[event.key] = true
})
document.addEventListener("keyup", (event) => {
    key[event.key] = false
})
console.log(ship.y + 30)
var alienShots = setInterval(() => {
    if (ship.lives -1 < 0){
        clearInterval(alienShots)
    }
    if(alienCount > 0){
        const i = Math.floor(Math.random() * shootingAliens.length);
        var x = aliens[shootingAliens[i]].x
        var y = aliens[shootingAliens[i]].y
        alienBullets.push(new Bullet({alien: true, x: x, y: y},))
    }else{
        clearInterval(alienShots);
    } 
},1000)

var game = setInterval(() => {
    ship.moveLeft(key["a"]);
    ship.moveRight(key["d"]);
    aliens.forEach((alien) => {
        if(alien !== 0){
            alien.move()
        }
    })
    
    alienBullets.forEach((alienBullet) => {
        alienBullet.update();
    })
    shipBullets.forEach((shipBullet) => {
        shipBullet.update();
    })

    shipBullets.forEach((shipBullet) => {
        aliens.forEach((alien) => {
            if (shipBullet.y > alien.y && shipBullet.y < (alien.y + 30) &&
                shipBullet.x > (alien.x - 10) && shipBullet.x < (alien.x + 40)){
                    var deletedAlien = aliens.indexOf(alien)
                    alien.remove()
                    aliens[deletedAlien] = 0
                    shipBullet.remove()
                    shipBullets.splice(shipBullets.indexOf(shipBullet), 1)
                    alienCount -= 1;
                    if (shootingAliens.includes(deletedAlien)){
                        var i = shootingAliens.indexOf(deletedAlien);
                        var newShootingAlien = deletedAlien - 10
                        console.log(newShootingAlien)
                        if (newShootingAlien > 0){
                            shootingAliens[i] = newShootingAlien
                        }else{
                            shootingAliens.splice(i, 1)
                        }
                    }
                }
        })
    })
    alienBullets.forEach((alienBullet) => {
            if (!ship.invulnerable && 
                alienBullet.y > (ship.y + 20) && alienBullet.y < (ship.y + 70) &&
                alienBullet.x > (ship.x - 10) && alienBullet.x < (ship.x + 80)){
                    alienBullet.remove();
                    alienBullets.splice(alienBullets.indexOf(alienBullet), 1);
                    ship.loseLife();
                    lives[ship.lives].remove();
                    lives.pop();
                    if (ship.lives -1 < 0){
                        var gameOver = document.createElement("img")
                        gameOver.src = "../images/gameOver.png"
                        gameOver.className = "gameOverScreen"
                        document.body.appendChild(gameOver)
                        clearInterval(game)
                    }
                }
    })

    if (key[" "]){
        if ((shipBullets.length === 0) || shipBullets[shipBullets.length - 1].y < 325){
            shipBullets.push(new Bullet({x: ship.x + 35, y: ship.y - 15}))
        }
    }
    if ((shipBullets.length > 0) && shipBullets[0].y < 0){
        shipBullets[0].remove();
        shipBullets.shift();
        
    }
    if ((alienBullets.length > 0) && alienBullets[0].y > 635){
        alienBullets[0].remove();
        alienBullets.shift();
    }
}, 20)
