import { Entity } from "./Entity.js";
const heart = "../images/life.png"

export class Life extends Entity{
    constructor() {
        super({tag: "heart", src: heart, size: "10px"})
        this.setX(window.innerWidth/2 - 28);
        this.setY(window.innerHeight - 25);
    }
    remove(){
        this.el.remove()
    }
}
