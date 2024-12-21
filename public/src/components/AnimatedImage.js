import { frames, staggerFrames } from "../main.js"

class AnimatedImage{
    constructor(image,x,y,name,frames,line,w,h,canvas,imageSizeFactor){
        this.x = x
        this.y = y
        this.name = name
        this.spriteFrames = frames
        this.line = line
        this.width = w
        this.height = h
        this.image = image
        this.ctxAnimations = canvas
        this.size = imageSizeFactor
        this.offset = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        }
        this.hitbox = this.calculateHitbox()
    }
     

    calculateHitbox(){
        return {
                top: this.y+this.offset.top*this.size,
                bottom: this.y + this.height*this.size - this.offset.bottom*this.size,
                left: this.x + this.offset.left*this.size,
                right: this.x + this.width*this.size - this.offset.right*this.size
                }
}


    animate(){
        
        const ctxAnimations = this.ctxAnimations
        const image = this.image

        let position = Math.floor(frames/staggerFrames)%this.spriteFrames
        let frameX = position*this.width
        let frameY = this.line*this.height
    
        ctxAnimations.drawImage(image,frameX,frameY, this.width,this.height, this.x, this.y, this.width*this.size , this.height*this.size) //(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}

export default AnimatedImage