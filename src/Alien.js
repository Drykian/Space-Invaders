import { Entity } from "./Entity.js";
const alien = "../images/alien.png";

export class Alien extends Entity{
    constructor({x = 433, y = 100} = {}){
        super({src: alien, speed: 1, size: "40px"})
        this.initialX = x
        this.fallingSpeed = 10
        this.setX(x)
        this.setY(y)
    }
    move(direction){
        if (direction){
            this.speed = -this.speed
            this.setY(this.y + this.fallingSpeed)
        }
        this.setX(this.x + this.speed)
    }
    shoot({createBullet}){
        createBullet({alien: true, x: this.x + 35, y: this.y - 15})
    }
    remove(){
        this.el.remove();
    }
}
