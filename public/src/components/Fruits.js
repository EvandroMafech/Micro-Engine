import { player } from "../main.js";
import { spriteCoordinates } from "../utils/animatedImagesInfo.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Fruits extends AnimatedImage{
    constructor(image,x,y,name,frames,line,w,h,canvas,imageSizeFactor,hitbox,offset){
            super(image,x,y,name,frames,line,w,h,canvas,imageSizeFactor,hitbox,offset)
    }
    
    checkIfCollected(){
        //atualiza o valor da hitbox
        player.playerHitbox = player.calculateHitbox() 
        this.hitbox = this.calculateHitbox() 

        //checa colisão com o player
        if( player.playerHitbox.bottom >= this.hitbox.top &&
            player.playerHitbox.top <= this.hitbox.bottom + 20 && // + Tiles.height &&
            player.playerHitbox.right >= this.hitbox.left &&
            player.playerHitbox.left <= this.hitbox.right ){
            this.changeAnimation()
        }
    }
    
    animate(){super.animate()}
    
    calculatetHitbox(){super.calculateHitbox()}

    changeAnimation(){
        this.image.src = spriteCoordinates["fruit-collected"].location[0].image
        this.frames = spriteCoordinates["fruit-collected"].location.lenght
    }

    
}

