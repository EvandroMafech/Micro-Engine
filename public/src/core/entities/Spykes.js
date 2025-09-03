import { player } from "../engine/main.js";
import AnimatedImage from "./AnimatedImage.js";
import { gameState } from "../../game/ui/gameState.js";
import { gameOverModal } from "../../editor/ui/interfaceButtons.js";

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
              if(gameState.gameRunning == true) gameOverModal()
            }
    }

    animate(){
        super.rotateImage()
    }

}


