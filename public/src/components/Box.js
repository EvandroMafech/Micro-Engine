import { player } from "../main.js";
import { spriteCoordinates } from "../utils/animatedImagesInfo.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Box extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
        this.activated = false
    }

    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(!this.activated && super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
              //muda a animação do player

              this.image.src = spriteCoordinates[`${this.id}-hit`].location[0].image 
              this.spriteFrames = spriteCoordinates[`${this.id}-hit`].location[0].frames

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
        if(this.frameCounter == this.spriteFrames){
            this.image.src = spriteCoordinates[`${this.id}-idle`].location[0].image 
            this.spriteFrames = spriteCoordinates[`${this.id}-idle`].location[0].frames
            this.activated = false
        }
    }
}