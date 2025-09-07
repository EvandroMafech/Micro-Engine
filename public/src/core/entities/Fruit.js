import {  player } from "../engine/editor.js";
import { animatedImagesArray } from "../utils/constants.js";
import { spriteCoordinates } from "../utils/imageData.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Fruit extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
            super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
            this.collected = false
    }
    
    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
                //muda a animação
                this.image.src = spriteCoordinates["fruit-collected"].location[0].image 
                this.spriteFrames = spriteCoordinates["fruit-collected"].location[0].frames
                this.collected = true
            }
    }
    
    animate(){
        const position = super.animate() //pega a posição do position na superclasse 
        
        if(this.collected){this.collectFruit(position)}
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

    calculatetHitbox(){super.calculateHitbox()}
  
}

