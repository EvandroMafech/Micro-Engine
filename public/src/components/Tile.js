import { tileSetSpriteheet_image_path } from "../utils/constants.js"

class Tile{
    constructor(x,y,height,width,ctx,id,backgroundImageSource){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.ctx = ctx
        this.id = id
        this.color = "#3a3f3d"
        this.activeImage = " "
        this.backgroundImageSource = backgroundImageSource 
    }

        drawImage({x,y}){
            const image = new Image()
            image.src = tileSetSpriteheet_image_path
            const ctx = this.ctx
        
            if(image != " "){
                ctx.drawImage(image,x,y,16,16,this.x,this.y,this.width,this.height)
            }
            
        }

        drawBackground(url){
            const image = new Image()
            image.src = url
            const ctx = this.ctx

                ctx.drawImage(image,this.x,this.y,this.width,this.height)
                console.log(image.src) 
        }

        draw(){
           const ctx = this.ctx
           const color = this.color
           if(this.activeImage == " "){
          // ctx.fillStyle = color
          // ctx.fillRect(this.x,this.y,this.height,this.width) // (x, y, largura, altura)
           ctx.strokeStyle = "#555"
           ctx.strokeRect(this.x,this.y,this.height,this.width) // (x, y, largura, altura)
           }
        }

        cleanTile(){
            const ctx = this.ctx
            ctx.fillStyle = "#3a3f3d"
            ctx.fillRect(this.x,this.y,this.height,this.width) // (x, y, largura, altura)
            ctx.strokeStyle = "#555"
            ctx.strokeRect(this.x,this.y,this.height,this.width) // (x, y, largura, altura)
        }
}

export default Tile