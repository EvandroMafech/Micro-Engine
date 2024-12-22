import AnimatedImage from "./AnimatedImage.js";

export default class Saw extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
        this.hit = true
    }

    checkCollisionWithPlayer(){
        //checa colisão com o player
        if(super.checkCollisionWithPlayer()){ // chama a função de colisão da classe super
                //muda a animação
              //  this.image.src = spriteCoordinates["fruit-collected"].location[0].image
              //  this.spriteFrames = spriteCoordinates["fruit-collected"].location[0].frames
                this.hit = true
                console.log("hit by saw, kk")
            }
    }

    animate(){
        super.animate()
    }

}