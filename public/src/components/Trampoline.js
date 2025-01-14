import { player } from "../main.js";
import { spriteCoordinates } from "../utils/animatedImagesInfo.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Trampoline extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
        this.activated = false
    }

    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
              //muda a animação do player

              this.image.src = spriteCoordinates["trampoline-jump"].location[0].image 
              this.spriteFrames = spriteCoordinates["trampoline-jump"].location[0].frames
      
              player.phisics.jumpStrength = -30
              player.trampolineJump()
              player.playerState.keyJumpIsUp = true
              player.phisics.jumpStrength = -18
              this.activated = true
              this.frameCounter = 0
            }
    }

    animate(){
        const position = super.animate() //pega a posição do position na superclasse 
        
        if(this.activated){this.handleAnimation(position)}
    }


    handleAnimation(position){
        
        this.frameCounter++
        if(this.frameCounter == 8){
            this.image.src = spriteCoordinates["trampoline-idle"].location[0].image 
            this.spriteFrames = spriteCoordinates["trampoline-idle"].location[0].frames
            this.activated = false
        }
       
    }
}