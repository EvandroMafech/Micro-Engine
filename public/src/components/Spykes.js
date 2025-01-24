import { player } from "../main.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Spykes extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id,rotateAngle){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id,rotateAngle)
        this.hit = false
        this.size = 4
    }

    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
              //muda a animação do player
              this.hit = true
              player.spriteState = player.selectAvatar() + "-desappearing"
            }
    }

    animate(){
        super.rotateImage()
    }

}


