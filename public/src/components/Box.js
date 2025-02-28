import { animatedImagesArray, player } from "../main.js";
import { spriteCoordinates } from "../utils/animatedImagesInfo.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Box extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id,boxImageId,life){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id,boxImageId,life)
        this.activated = false
        this.life = life
        this.boxImageId = boxImageId
        
    }

    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(!this.activated && super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
              //muda a animação do player

              

              
              
              
            if( player.phisics.velocityY < 0 && 
                player.position.y <= this.y + this.height*this.size &&
                player.position.y + player.spriteHeight*player.spriteSize >= this.y + this.height*this.size) 
                {
             
                    player.phisics.velocityY = 10
                    player.playerState.isJumping = false

                    this.image.src = spriteCoordinates[`${this.id}-hit`].location[0].image 
                    this.spriteFrames = spriteCoordinates[`${this.id}-hit`].location[0].frames
                    this.activated = true
                    this.life--
                    this.frameCounter = 0

            }else if(player.phisics.velocityY > 0 &&
                     player.position.y + player.spriteHeight*player.spriteSize >= this.y  &&
                     player.position.y  <= this.y               
            ){
                player.phisics.velocityY = -10
                player.playerState.isJumping = false

                this.image.src = spriteCoordinates[`${this.id}-hit`].location[0].image 
                this.spriteFrames = spriteCoordinates[`${this.id}-hit`].location[0].frames
                this.activated = true
                this.life--
                this.frameCounter = 0
            }else if(player.position.y + player.spriteHeight*player.spriteSize > this.y && 
                player.position.y < this.y + this.height*this.size){     


           if (player.position.x + player.spriteWidth*player.spriteSize > this.x + this.width*this.size  &&
               player.position.x  < this.x + this.width*this.size){ 
                   console.log("oi")
                   player.leftBlocked = true
                   player.position.x += player.phisics.speed

           }else if (player.position.x < this.x && 
                     player.position.x + player.spriteWidth*player.spriteSize > this.x) {
                       player.rightBlocked = true
                       console.log("oi")
                       player.position.x -= player.phisics.speed

           }
       }

         }
    }

    animate(){
        const position = super.animate() //pega a posição do position na superclasse 
        
        if(this.life == 0) {

            animatedImagesArray.forEach((image,index) => {
                if(image.boxImageId == this.boxImageId){
                    animatedImagesArray.splice(index,1) //deleta o objeto de imagem inteiro
                }
            })
            
        }
        if(this.activated){this.handleAnimation(position)}
    }


    handleAnimation(position){
        
        this.frameCounter++
        if(this.frameCounter == this.spriteFrames){
            this.image.src = spriteCoordinates[`${this.id}-idle`].location[0].image 
            this.spriteFrames = spriteCoordinates[`${this.id}-idle`].location[0].frames
            this.activated = false
        }
    }
}



