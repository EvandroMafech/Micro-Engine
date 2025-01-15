import { frames, staggerFrames,tileArray} from "../main.js"
import { spriteCoordinates } from "../utils/animatedImagesInfo.js"

export default class Player{
    constructor(ctx){
        this.position = {
            x: 1000,
            y: 100
        }
        this.MoveAction = {
            left: false,
            right: false,
            jump: false
        }
        this.playerState = {
            isOnPlatform: false,
            isJumping: false,
            keyJumpIsUp: true,
            leftBlocked: false,
            rightBlocked: false,
            doubleJump: false,
            avatarNumber: 0
        }
        this.ctx = ctx
       
        this.phisics = {
        gravity: 1,
        velocityY: 0,
        speed: 8,
        jumpStrength: -18
        }
      
        this.gameFrame = 1
        this.staggerFrames = 3
        this.spriteState = this.selectAvatar() + "-idle"
        this.spriteSize = 3
        
        this.spriteOffset = {
            bottom: 0,
            left: 10,
            right: 10,
            top: 10
        }
        this.spriteWidth = spriteCoordinates[this.spriteState].location[0].w
        this.spriteHeight = spriteCoordinates[this.spriteState].location[0].h
        this.playerHitbox = this.calculateHitbox()

    }


selectAvatar(){

    switch(this.playerState.avatarNumber){
  
        case 0: return "ninjafrog";
        case 1: return "pinkman";
        case 2: return "maskdude";
        case 3: return "virtualguy";

        default: return "ninjafrog";
    }
}

calculateHitbox(){
    return {
        top: this.position.y+this.spriteOffset.top*this.spriteSize,
        bottom: this.position.y + this.spriteHeight*this.spriteSize - this.spriteOffset.bottom*this.spriteSize,
        left: this.position.x + this.spriteOffset.left*this.spriteSize,
        right: this.position.x + this.spriteWidth*this.spriteSize - this.spriteOffset.right*this.spriteSize
    }
}

jump(){
    
    if(!this.playerState.isJumping && !this.playerState.isOnPlatform && this.playerState.keyJumpIsUp){
 
      this.phisics.velocityY = this.phisics.jumpStrength
      this.position.y += this.phisics.velocityY
      this.playerState.isJumping = true
      this.playerState.keyJumpIsUp = false
      this.spriteState = this.selectAvatar() + "-jump"
      this.playerState.doubleJump = true 
      console.log(this.selectAvatar())    
    }

    if(this.playerState.doubleJump && !this.playerState.isOnPlatform && this.playerState.keyJumpIsUp){
        this.phisics.velocityY = this.phisics.jumpStrength
        this.position.y += this.phisics.velocityY
        this.playerState.isJumping = true
        this.playerState.keyJumpIsUp = false
        this.spriteState = this.selectAvatar() + "-doublejump"
        this.playerState.doubleJump = false
    }
}

showImageBorder(){//mostra contorno na imagem
    this.ctx.strokeRect( this.position.x,
                    this.position.y,
                    this.spriteWidth*this.spriteSize,
                    this.spriteHeight*this.spriteSize)
}

animate(){
  
    let position = Math.floor(frames/staggerFrames)%spriteCoordinates[this.spriteState].location.length

    const image = spriteCoordinates[this.spriteState].location[0].imageInstance
    image.src = spriteCoordinates[this.spriteState].location[0].image

    let frameX = position*this.spriteWidth
    let frameY = spriteCoordinates[this.spriteState].location[position].y

    //retirar comentario para mostrar contorno na imagem
    //this.showImageBorder()
  
    this.ctx.drawImage(image,frameX,frameY, this.spriteWidth,this.spriteHeight, this.position.x, this.position.y , this.spriteWidth*this.spriteSize,this.spriteHeight*this.spriteSize) //(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

move() 
{
    this.checkCollisionOnWalls()
     
    if(!this.playerState.isJumping){
    this.spriteState = this.selectAvatar() +  "-run"
    }
    
    if(this.MoveAction.left && !this.leftBlocked){
         this.position.x -= this.phisics.speed
         this.rightBlocked = false
    }else if(this.MoveAction.right && !this.rightBlocked){
         this.position.x += this.phisics.speed
         this.leftBlocked = false
    }
}

checkCollisionOnFloor(){
   
        const playerBottomY = this.position.y + this.spriteHeight*this.spriteSize - this.spriteOffset.bottom*this.spriteSize
        const playerOffSetBottom = this.spriteHeight*this.spriteSize - this.spriteOffset.bottom*this.spriteSize
        const playerLeftX = this.position.x + this.spriteOffset.left*this.spriteSize
        const playerRightX = this.position.x + this.spriteWidth*this.spriteSize - this.spriteOffset.right*this.spriteSize

        if(this.playerState.isJumping && this.phisics.velocityY > 0){
            this.spriteState = this.selectAvatar() + "-fall"
        }

        tileArray.some(Tiles => {

                const topTiles = Tiles.y
                const leftTiles = Tiles.x
                const rightTiles = Tiles.x + Tiles.width

            if(playerBottomY >= topTiles &&
                playerBottomY <= topTiles + 200 &&// + Tiles.height &&
                playerRightX >= leftTiles &&
                playerLeftX <= rightTiles &&
                this.phisics.velocityY > 0 &&
                Tiles.activeImage != " "
            )
            {
                this.playerState.isOnTiles = true
                this.phisics.velocityY = 0
                this.position.y = Tiles.y - playerOffSetBottom 
                this.playerState.isJumping = false
                this.spriteState = this.selectAvatar() + "-idle"
                return true
            }
        })
    this.playerState.isOnPlatform = false
}

checkCollisionOnWalls(){
      
    this.leftBlocked = false
    this.rightBlocked = false
    
    tileArray.some(Tiles => {
        const platformRightEdge = Tiles.x + Tiles.width
        const platformLeftEdge = Tiles.x
        const platformTopEdge = Tiles.y
        const platformBottomEdge = Tiles.y + Tiles.height

        const playerLeftEdge = this.position.x + this.spriteOffset.left*this.spriteSize
        const playerRightEdge = this.position.x + this.spriteWidth*this.spriteSize - this.spriteOffset.right*this.spriteSize
        const playerBottomEdge = this.position.y + this.spriteHeight*this.spriteSize - this.spriteOffset.bottom*this.spriteSize
        const playerTopEdge = this.position.y 
      
        // Verifica colisão do jogador com a parede
        const leftColisison = 
            (playerRightEdge > platformRightEdge && 
             playerLeftEdge < platformRightEdge)
    
        const RightColisison = 
            (playerLeftEdge < platformLeftEdge && 
             playerRightEdge > platformLeftEdge)

        const VerticalCollision = 
            (playerBottomEdge > platformTopEdge && 
            playerTopEdge < platformBottomEdge)

            // Verifica se está tentando mover para a esquerda
            if(leftColisison && VerticalCollision && Tiles.activeImage != " ") {
                this.leftBlocked = true
            }else if(RightColisison && VerticalCollision && Tiles.activeImage != " ") {
                this.rightBlocked = true
            } 
    })

}

applyGravity(){ //aplica gravidade no player

    if(this.playerState.isOnPlatform == false){
        this.phisics.velocityY += this.phisics.gravity
        this.position.y += this.phisics.velocityY
    }
}


}







