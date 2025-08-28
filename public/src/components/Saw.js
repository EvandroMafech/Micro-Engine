import { player } from "../main.js";
import AnimatedImage from "./AnimatedImage.js";
import { gameOverModal } from "../logic/InterfaceButtons.js";
import { gameState } from "../state/gameState.js";

export default class Saw extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
        this.hit = false
    }

    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
              //muda a animação do player
              this.hit = true
              player.spriteState = player.selectAvatar() + "-desappearing"
              
              if(gameState.gameRunning == true) gameOverModal()
            }
    }

    animate(){
        super.animate()
    }

}