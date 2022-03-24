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

const createBullet = ({alien = false, x, y}) => {
    bullets.push(new Bullet({alien, x, y,}))
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
    const i = Math.floor(Math.random() * aliens.length);
    const j = aliens[i].length - 1
    aliens[i][j].shoot({createBullet,})
}, 500)


var game = setInterval(() => {
    ship.moveLeft(key["a"]);
    ship.moveRight(key["d"]);
    if (alienCount > 0 && aliens[0][0].x < 344 || aliens[aliens.length - 1][0].x > 1022){
        changeDirection = true
      
    }
    aliens.forEach((alienColumn) => {
        alienColumn.forEach((alien) =>{
            alien.move(changeDirection)
        })
    })
    
    changeDirection = false
   
    bullets.forEach((bullet) => {
        bullet.update();
    })

    bullets.forEach((bullet) => {
        if (!ship.invulnerable && bullet.alien &&
            bullet.y > (ship.y + 20) && bullet.y < (ship.y + 70) &&
            bullet.x > (ship.x - 10) && bullet.x < (ship.x + 80)){
                bullet.remove();
                bullets.splice(bullets.indexOf(bullet), 1);
                ship.loseLife();
                lives[ship.lives].remove();
                lives.pop();
                if (ship.lives -1 < 0){
                    new GameOver()
                    clearInterval(game)
                    clearInterval(alienShots)
                }
            }else{
                aliens.forEach((alienColumn) => {
                    alienColumn.forEach((alien) => {
                        if (!bullet.alien &&
                            bullet.y > alien.y && bullet.y < (alien.y + 30) &&
                            bullet.x > (alien.x - 10) && bullet.x < (alien.x + 40)){
                                var alienIndex = alienColumn.indexOf(alien)
                                var shipBulletIndex = bullets.indexOf(bullet)
                                alien.remove()
                                alienColumn.splice(alienIndex, 1)
                                bullet.remove()
                                bullets.splice(shipBulletIndex, 1)
                                if (alienColumn.length < 1){
                                    aliens.splice(aliens.indexOf(alienColumn), 1)
                                }
                                alienCount -= 1;
                                score += 200
                                $(".score").html("Score: " + score)
                            }
                   
                        if(alien.y > 530){
                            new GameOver()
                            clearInterval(game)
                            clearInterval(alienShots)
                        }
                    })
                })
            }
            if (!bullet.alien && bullet.y < 0){
                bullet.remove();
                bullets.splice(bullets.indexOf(bullet), 1)
                if (score > 0){
                    score -= 100
                    $(".score").html("Score: " + score)
                }
            }else if (bullet.y > 635){
                    bullet.remove();
                    bullets.splice(bullets.indexOf(bullet), 1)
            }
    })

    if (key[" "]){
        ship.shoot({createBullet,})
    }

    if (alienCount < 1){
        new GameOver()
        clearInterval(game)
        clearInterval(alienShots)
    }
}, 20)
