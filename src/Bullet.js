import { Entity } from "./Entity.js";
const shipBullet = "../images/bullet.png";
const alienBullet = "../images/laser.png";

export class Bullet extends Entity{
    constructor({alien = false, x = 0, y = 0} = {}){
        super({src: shipBullet, speed: 3, size: "10px"})
        if (alien){
            this.speed = this.speed*(-1)
            this.el.src = alienBullet
        }
        this.x = x
        this.y = y
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;

    }
    update(){
        this.setY(this.y - this.speed)
    }
    remove(){
        this.el.remove();
    }
}
