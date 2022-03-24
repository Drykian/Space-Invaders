import { Entity } from "./Entity.js";
const shipBullet = "../images/bullet.png";
const alienBullet = "../images/laser.png";

export class Bullet extends Entity{
    constructor({alien, x, y} = {}){
        super({src: alien ? alienBullet:shipBullet, speed: 3, size: "10px"})
        this.alien = alien
        this.setX(x);
        this.setY(y);

    }
    update(){
        this.setY(this.y + (this.alien ? this.speed : -this.speed))
    }
    remove(){
        this.el.remove();
    }
}
