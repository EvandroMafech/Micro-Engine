import AnimatedImage from "./AnimatedImage.js";

export default class saw extends AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        super(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id)
    }

    animate(){
        super.animate()
    }


}