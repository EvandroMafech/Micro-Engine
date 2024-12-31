import { frames, staggerFrames,tileArray} from "../main.js"
import { spriteCoordinates } from "../utils/animatedImagesInfo.js"

class Player{
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
            keyJumpIsUp: true
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
        this.spriteState = "ninjafrog-idle"
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
      this.spriteState = "ninjafrog-jump"     
    }
}


animate(){
    const ctx = this.ctx
   
    let position = Math.floor(frames/staggerFrames)%spriteCoordinates[this.spriteState].location.length

    const image = spriteCoordinates[this.spriteState].location[0].imageInstance
    image.src = spriteCoordinates[this.spriteState].location[0].image

    let frameX = position*this.spriteWidth
    let frameY = spriteCoordinates[this.spriteState].location[position].y
   
    // ctx.strokeRect( this.position.x+this.spriteOffset.left*this.spriteSize,
    //                 this.position.y+this.spriteOffset.top*this.spriteSize,
    //                 this.spriteWidth*this.spriteSize-this.spriteOffset.right*this.spriteSize,
    //                 this.spriteHeight*this.spriteSize-this.spriteOffset.top*this.spriteSize)
  
    ctx.drawImage(image,frameX,frameY, this.spriteWidth,this.spriteHeight, this.position.x, this.position.y , this.spriteWidth*this.spriteSize,this.spriteHeight*this.spriteSize) //(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

move() 
{
    //this.checkCollisionOnWalls() 
    if(!this.playerState.isJumping){
    this.spriteState = "ninjafrog-run"
    }
    
    if(this.MoveAction.left){
         this.position.x -= this.phisics.speed
    }else{
         this.position.x += this.phisics.speed
    }
}

checkCollisionOnFloor(){
   
        const playerBottomY = this.position.y + this.spriteHeight*this.spriteSize - this.spriteOffset.bottom*this.spriteSize
        const playerOffSetBottom = this.spriteHeight*this.spriteSize - this.spriteOffset.bottom*this.spriteSize
        const playerLeftX = this.position.x + this.spriteOffset.left*this.spriteSize
        const playerRightX = this.position.x + this.spriteWidth*this.spriteSize - this.spriteOffset.right*this.spriteSize
        
        if(this.playerState.isJumping && this.phisics.velocityY > 0){
            this.spriteState = "ninjafrog-fall"
        }

        tileArray.some(Tiles => {

                const topTiles = Tiles.y
                const leftTiles = Tiles.x
                const rightTiles = Tiles.x + Tiles.width

            if(playerBottomY >= topTiles &&
                playerBottomY <= topTiles + 20 &&// + Tiles.height &&
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
                this.spriteState = "ninjafrog-idle"
                return true
            }
        });
    this.playerState.isOnPlatform = false
}

checkCollisionOnWalls(){
  
    
    let canMoveLeft = true
    let canMoveRight = true

    tileArray.some(wall => {
        const platformRightEdge = wall.x + wall.width
        const platformLeftEdge = wall.x
        const platformTopEdge = wall.y
        const platformBottomEdge = wall.y + wall.height

        const playerLeftEdge = this.position.x + this.spriteOffset.left*this.spriteSize
        const playerRightEdge = this.position.x + this.spriteWidth*this.spriteSize - this.spriteOffset.right*this.spriteSize
        const playerBottomEdge = this.position.y + this.spriteHeight*this.spriteSize - this.spriteOffset.bottom*this.spriteSize
        
        // Verifica colisão do jogador com a parede
        const leftColisison = 
            (this.position.x + playerLeftEdge <= platformRightEdge && 
             this.position.x + playerRightEdge >= platformLeftEdge)
    
        const RightColisison = 
            (this.position.x + playerRightEdge >= platformLeftEdge && 
             this.position.x + playerLeftEdge <= platformRightEdge)

        const VerticalCollision = 
            (this.position.y + playerBottomEdge >= platformTopEdge && 
             this.position.y + playerBottomEdge <= platformBottomEdge)

        const movingLeft = true//this.initXposition > this.position.x         
        const movingRight = true//this.initXposition < this.position.x         
        console.log(RightColisison)
           
            // Verifica se está tentando mover para a esquerda
            if (this.MoveAction.left && leftColisison && VerticalCollision && movingLeft) {
                canMoveLeft = false
                console.log("esquerda bloqueada")
            }

            // Verifica se está tentando mover para a direita
            if (this.MoveAction.right && RightColisison && VerticalCollision && movingRight) {
                canMoveRight = false
                console.log("direita bloqueada")
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


export default Player




