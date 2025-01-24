import { tileSetSpriteheet_image_path } from "../utils/constants.js"

export default class Tile{
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
            if(image != " "){
                this.ctx.drawImage(image,x,y,16,16,this.x,this.y,this.width,this.height)
            }
            
        }

        drawBackground(url){
            const image = new Image()
            image.src = url

            this.ctx.drawImage(image,this.x,this.y,this.width,this.height)
        }

        draw(ctxGrid){

          if(this.activeImage == " "){
                ctxGrid.strokeStyle = "#555"
                ctxGrid.strokeRect(this.x,this.y,this.height,this.width) // (x, y, largura, altura)
           }
        }

        cleanTile(){
            this.ctx.clearRect(this.x,this.y,this.height,this.width) // (x, y, largura, altura)
        }
}

