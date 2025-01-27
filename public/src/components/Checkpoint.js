import { spriteCoordinates } from "../utils/animatedImagesInfo.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Checkpoint extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,hitbox,offset,id){
            super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,hitbox,offset,id)
            this.CheckpointActivated = false
    }
    
    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(!this.CheckpointActivated && super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
                //muda a animação

                    this.image.src = spriteCoordinates["checkpoint-out"].location[0].image 
                    this.spriteFrames = spriteCoordinates["checkpoint-out"].location[0].frames
                    this.CheckpointActivated = true
                    this.frameCounter = 0

            }
    }
    
    animate(){
        const position = super.animate() //pega a posição do position na superclasse 
        if(this.CheckpointActivated){this.handleAnimation(position)}
    }
    
    handleAnimation(position){
        
        this.frameCounter++
        if(this.frameCounter == this.spriteFrames){ //roda 27 frames e muda a imagem
            this.image.src = spriteCoordinates["checkpoint-idle"].location[0].image 
            this.spriteFrames = spriteCoordinates["checkpoint-idle"].location[0].frames
        }
       
    }
  
}

