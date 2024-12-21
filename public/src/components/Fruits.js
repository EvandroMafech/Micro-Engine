import { animatedImagesArray, player } from "../main.js";
import { spriteCoordinates } from "../utils/animatedImagesInfo.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Fruits extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,hitbox,offset,id){
            super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,hitbox,offset,id)
            this.collected = false
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
                //muda a animação
                this.image.src = spriteCoordinates["fruit-collected"].location[0].image
                this.spriteFrames = spriteCoordinates["fruit-collected"].location[0].frames
                this.collected = true
            }
    }
    
    animate(){
        const position = super.animate()
        
        if(this.collected){
            this.collectFruit(position)
        }

    }
    
    collectFruit(position){

        if(position == this.spriteFrames - 1){ //só para a animação quando roda todos os frames
                animatedImagesArray.forEach((image,index) => {
                    if(image.id == this.id){
                        animatedImagesArray.splice(index,1) //deleta o objeto de imagem inteiro
                    }
                })

            }
    }


    calculatetHitbox(){
      
        super.calculateHitbox()
    }

   
}

