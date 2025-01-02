import { frames, player, staggerFrames } from "../main.js"

class AnimatedImage{
    constructor(image,x,y,name,spriteFrames,line,w,h,canvas,imageSizeFactor,id){
        this.x = x
        this.y = y
        this.name = name
        this.spriteFrames = spriteFrames
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
        this.id = id
    }
    
    checkCollisionWithPlayer(){
        //atualiza a hitbox do player
        player.playerHitbox = player.calculateHitbox()  
        this.hitbox = this.calculateHitbox() 

        //checa colisão com o player
        if( player.playerHitbox.bottom >= this.hitbox.top &&
            player.playerHitbox.top <= this.hitbox.bottom + 20 && // + Tiles.height &&
            player.playerHitbox.right >= this.hitbox.left &&
            player.playerHitbox.left <= this.hitbox.right ){

                return true
            }
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
    
        ctxAnimations.strokeRect( this.x,
                                  this.y,
                                  this.width*this.size,
                                  this.height*this.size)

        ctxAnimations.drawImage(image,frameX,frameY, this.width,this.height, this.x, this.y, this.width*this.size , this.height*this.size) //(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        return position
    }
}

export default AnimatedImage