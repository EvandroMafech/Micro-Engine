import { animatedImagesArray, player } from "../main.js";
import AnimatedImage from "../logic/AnimatedImage.js";

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

        const topPlatform = this.y
        const leftPlatform = this.x
        const rightPlatform = this.x + this.width*this.size

            if( playerBottomY > topPlatform &&
                playerBottomY < topPlatform + this.height*3 &&
                playerRightX > leftPlatform &&
                playerLeftX < rightPlatform &&
                player.phisics.velocityY > 0 
            )
            {
                player.playerState.isOnTiles = true
                player.phisics.velocityY = 0
                player.position.y = this.y - playerOffSetBottom + this.phisics.velocityY 
                player.playerState.isJumping = false
                player.spriteState = player.selectAvatar() + "-idle"
                return true
            }

    player.playerState.isOnPlatform = false
}



    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
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
      
        //fazer com que a plataforma desapareça
        
            // if(this.y >= 5000){
        //     animatedImagesArray.forEach((image,index) => {
        //         if(image.id == this.id){
        //             animatedImagesArray.splice(index,1) //deleta o objeto de imagem inteiro
        //         }
        //     })
        // }  
            
    }


}