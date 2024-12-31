import { animatedImagesArray, player } from "../main.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Platform extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
        this.phisics = {
            velocityY: 0,
            gravity: 0.8
        }
        this.activated = false

            
    }

    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
              //muda a animação do player
             this.activated = true

            }
    }

    applyGravity(){ //aplica gravidade no player
        
        this.phisics.velocityY += this.phisics.gravity
        this.y += this.phisics.velocityY
    }

    animate(){
        super.animate()
        if(this.activated) this.applyGravity()
        // if(this.y >= 5000){
        //     animatedImagesArray.forEach((image,index) => {
        //         if(image.id == this.id){
        //             animatedImagesArray.splice(index,1) //deleta o objeto de imagem inteiro
        //         }
        //     })
        // }  
            
    }


}