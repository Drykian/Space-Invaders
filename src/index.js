import { Ship } from "./Ship.js";
import { Bullet } from "./Bullet.js";
import { Alien } from "./Alien.js";
import { Life } from "./Life.js";


const ship = new Ship();
const shipBullets = [];
const aliens = [];
const alienBullets = [];
const lives = []
var alienCount = 50
var score = 0
const key = {
    a: false,
    d: false,
    [" "]: false
}


for (var i=433; i < 923; i += 50){
    aliens.push([])
    for(var j=100; j < 350; j += 50){
        aliens[aliens.length - 1].push(new Alien({x: i, y: j}));
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


var alienShots = setInterval(() => {
    if (ship.lives -1 < 0){
        clearInterval(alienShots)
    }
    if(alienCount > 0){
        const i = Math.floor(Math.random() * aliens.length);
        const j = aliens[i].length - 1
        var x = aliens[i][j].x
        var y = aliens[i][j].y
        alienBullets.push(new Bullet({alien: true, x: x, y: y},))
    }else{
        clearInterval(alienShots);
    } 
}, 300)

var game = setInterval(() => {
    ship.moveLeft(key["a"]);
    ship.moveRight(key["d"]);
    aliens.forEach((alienColumn) => {
        alienColumn.forEach((alien) =>{
            if(alien !== 0){
                alien.move()
            }
        })
    })
    
    alienBullets.forEach((alienBullet) => {
        alienBullet.update();
    })
    shipBullets.forEach((shipBullet) => {
        shipBullet.update();
    })

    shipBullets.forEach((shipBullet) => {
        aliens.forEach((alienColumn) => {
            alienColumn.forEach((alien) => {
                if (shipBullet.y > alien.y && shipBullet.y < (alien.y + 30) &&
                    shipBullet.x > (alien.x - 10) && shipBullet.x < (alien.x + 40)){
                        var alienIndex = alienColumn.indexOf(alien)
                        var shipBulletIndex = shipBullets.indexOf(shipBullet)
                        alien.remove()
                        alienColumn.splice(alienIndex, 1)
                        shipBullet.remove()
                        shipBullets.splice(shipBulletIndex, 1)
                        alienCount -= 1;
                        score += 200
                        $(".score").html("Score: " + score) 
                    }
            })
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
        if ((shipBullets.length === 0) || shipBullets[shipBullets.length - 1].y < 375){
            shipBullets.push(new Bullet({x: ship.x + 35, y: ship.y - 15}))
        }
    }
    if ((shipBullets.length > 0) && shipBullets[0].y < 0){
        shipBullets[0].remove();
        shipBullets.shift();
        if (score > 0){
            score -= 100
            $(".score").html("Score: " + score)
        }
    }
    if ((alienBullets.length > 0) && alienBullets[0].y > 635){
        alienBullets[0].remove();
        alienBullets.shift();
    }
    if (alienCount === 0){
        var gameOver = document.createElement("img")
        gameOver.src = "../images/gameOver.png"
        gameOver.className = "gameOverScreen"
        document.body.appendChild(gameOver)
        clearInterval(game)
    }
}, 20)
