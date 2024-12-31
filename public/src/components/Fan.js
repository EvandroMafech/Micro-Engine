import { player } from "../main.js";
import { spriteCoordinates } from "../utils/animatedImagesInfo.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Fan extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
        this.active = false
    }

    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
              //muda a animação do player
             // player.phisics.jumpStrength = -30
             this.active = true
             player.phisics.velocityY = -30
              //player.jump()
              player.playerState.keyJumpIsUp = true
             // player.phisics.jumpStrength = -18
            }
    }

    animate(){
        super.animate() //pega a posição do position na superclasse 

        if(this.active &&
           player.position.x < this.x + this.width &&
           player.position.x + player.spriteWidth > this.x)
            {
                if(player.phisics.velocityY >= 5) player.phisics.velocityY = -Math.random()*10
            }

    }


}