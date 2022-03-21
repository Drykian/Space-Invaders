export class Entity {
    constructor({tag = "ship", src = "", speed = 4, size = ""} = {}) {
        this.el = document.createElement("img");
        this.el.src = src;
        this.speed = speed;
        this.el.style.width = size
        document.body.appendChild(this.el);
        this.el.className = tag;
    }

    setX(x){
        this.x = x;
        this.el.style.left = `${this.x}px`;
    }

    setY(y){
        this.y = y;
        this.el.style.top = `${this.y}px`;
    }
}