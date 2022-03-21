import { Entity } from "./Entity.js";
const alien = "../images/alien.png";

export class Alien extends Entity{
    constructor({x = 433, y = 100} = {}){
        super({src: alien, speed: 1, size: "40px"})
        this.initialX = x
        this.fallingSpeed = 5
        this.setX(x)
        this.setY(y)
    }
    move(){
        if (this.x > (this.initialX + 100) || this.x < (this.initialX - 100)){
            this.speed = -this.speed
            this.setY(this.y + this.fallingSpeed)
        }
        this.setX(this.x + this.speed)
    }
    remove(){
        this.el.remove();
    }
}
