import { animatedImagesArray, player } from "../main.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Platform extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
        this.phisics = {
            velocityY: 0,
            gravity: 0.1
        }
        this.activated = false

            
    }

    checkCollisionOnFloor(){
   
        const playerBottomY = player.position.y + player.spriteHeight*player.spriteSize - player.spriteOffset.bottom*player.spriteSize
        const playerOffSetBottom = player.spriteHeight*player.spriteSize - player.spriteOffset.bottom*player.spriteSize
        const playerLeftX = player.position.x + player.spriteOffset.left*player.spriteSize
        const playerRightX = player.position.x + player.spriteWidth*player.spriteSize - player.spriteOffset.right*player.spriteSize

        // if(player.playerState.isJumping && player.phisics.velocityY > 0){
        //     player.spriteState = "ninjafrog-fall"
        // }
                const topTiles = this.y
                const leftTiles = this.x
                const rightTiles = this.x + this.width

            if( playerBottomY >= topTiles &&
                playerBottomY <= topTiles + this.height*5 &&
                playerRightX >= leftTiles &&
                playerLeftX <= rightTiles &&
                player.phisics.velocityY > 0 
            )
            {
                player.playerState.isOnTiles = true
                player.phisics.velocityY = 0
                player.position.y = this.y - playerOffSetBottom 
                player.playerState.isJumping = false
                player.spriteState = "ninjafrog-idle"
                return true
            }

    player.playerState.isOnPlatform = false
}



    checkCollisionWithPlayer(){
        //checa colisão com o player
        
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
              //muda a animação do player
             this.activated = true
             
            }
    }

    applyGravity(){ //aplica gravidade no player
        
        this.phisics.velocityY += this.phisics.gravity
        this.y += this.phisics.velocityY
    }

    animate(){
        super.animate()
        this.checkCollisionOnFloor()
        if(this.activated) this.applyGravity()
      
            // if(this.y >= 5000){
        //     animatedImagesArray.forEach((image,index) => {
        //         if(image.id == this.id){
        //             animatedImagesArray.splice(index,1) //deleta o objeto de imagem inteiro
        //         }
        //     })
        // }  
            
    }


}