import { spriteCoordinates } from "../logic/animatedImagesInfo.js";
import AnimatedImage from "../logic/AnimatedImage.js";

export default class Start extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,hitbox,offset,id){
            super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,hitbox,offset,id)
            this.CheckpointActivated = false
    }
    
    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(!this.CheckpointActivated && super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
                //muda a animação

                    this.image.src = spriteCoordinates["start-moving"].location[0].image 
                    this.spriteFrames = spriteCoordinates["start-moving"].location[0].frames
                    this.CheckpointActivated = true
                    this.frameCounter = 0

            }
    }
    
    animate(){
        const position = super.animate() //pega a posição do position na superclasse 
        if(!super.checkCollisionWithPlayer()){
            
            this.image.src = spriteCoordinates["start-idle"].location[0].image 
            this.spriteFrames = spriteCoordinates["start-idle"].location[0].frames
            this.CheckpointActivated = false
        }
    }
    


  
}

