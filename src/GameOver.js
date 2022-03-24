const gameOverImage = "../images/gameOver.png"

export class GameOver{
    constructor() {
        this.el = document.createElement("img")
        this.el.src = gameOverImage
        this.el.className = "gameOverScreen"
        document.body.appendChild(this.el)
        
    }
}
