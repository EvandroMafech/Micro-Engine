
import { spriteCoordinates } from "../logic/animatedImagesInfo.js";
import AnimatedImage from "./AnimatedImage.js";
import { gameEnd } from "../logic/InterfaceButtons.js";
import { gameState } from "../state/gameState.js";


export default class End extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,hitbox,offset,id){
            super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,hitbox,offset,id)
            this.CheckpointActivated = false
    }
    
    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(!this.CheckpointActivated && super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
                //muda a animação

                    this.image.src = spriteCoordinates["end-pressed"].location[0].image 
                    this.spriteFrames = spriteCoordinates["end-pressed"].location[0].frames
                    this.CheckpointActivated = true
                    this.frameCounter = 0
                    if(gameState.gameRunning == true) gameEnd()

            }
    }
    
    animate(){
        const position = super.animate() //pega a posição do position na superclasse 
        if(this.CheckpointActivated){this.handleAnimation(position)}
        
        
    }
    
    handleAnimation(position){
        
        this.frameCounter++
        if(this.frameCounter >= this.spriteFrames){ //roda 8 frames e muda a imagem
            this.image.src = spriteCoordinates["end-idle"].location[0].image 
            this.spriteFrames = spriteCoordinates["end-idle"].location[0].frames
            if(gameState.gameRunning)
                this.CheckpointActivated = false
        }
       
    }
  
}

