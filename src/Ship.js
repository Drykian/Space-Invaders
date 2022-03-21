import { Entity } from "./Entity.js";
const ship = "../images/ship.png"

export class Ship extends Entity{
    constructor() {
        super({src: ship, size: "80px"})
        this.setX(window.innerWidth/2 - 40);
        this.setY(window.innerHeight - 95);
        this.invulnerable = false
        this.lives = 3
    }
    moveRight(move){
        if (move && (this.x < 933)) {
            this.setX(this.x + this.speed)
        }
    }
    moveLeft(move){
        if (move && (this.x > 433)){
            this.setX(this.x - this.speed)
        }
    }
    loseLife(){
        var flickingTimes = 10
        this.invulnerable = true
        this.el.remove();
        var shipFlickering = setInterval(()=> {
            this.el.remove();
            setTimeout(() => document.body.appendChild(this.el), 75)
            flickingTimes -= 1
            if (flickingTimes < 0){
                this.invulnerable = false
                clearInterval(shipFlickering)
            }
        }, 150)
        this.lives -= 1
    }
}

