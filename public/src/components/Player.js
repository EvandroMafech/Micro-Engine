import { frames, moveCamera, player, staggerFrames,tileArray} from "../main.js"
import { spriteCoordinates } from "../utils/animatedImagesInfo.js"

export default class Player{
    constructor(ctx){
        this.position = {
            x: 1200,
            y: 500
        }
        this.MoveAction = {
            left: false,
            right: false,
            jump: false
        }
        this.playerState = {
            isOnPlatform: false,
            isJumping: false,
            keyJumpIsUp: true,
            leftBlocked: false,
            rightBlocked: false,
            doubleJump: false,
            avatarNumber: 0,
            currentDirection: "right"
        }
        this.ctx = ctx
       
        this.phisics = {
        gravity: 1,
        velocityY: 0,
        speed: 8,
        jumpStrength: -18
        }
      
        this.gameFrame = 1
        this.staggerFrames = 3
        this.spriteState = this.selectAvatar() + "-idle"
        this.spriteSize = 3
        
        this.spriteOffset = {
            bottom: 0,
            left: 10, //10
            right: 10, //10
            top: 10
        }
        this.spriteWidth = spriteCoordinates[this.spriteState].location[0].w
        this.spriteHeight = spriteCoordinates[this.spriteState].location[0].h
        this.playerHitbox = this.calculateHitbox()

    }


selectAvatar(){

    switch(this.playerState.avatarNumber){
  
        case 0: return "ninjafrog";
        case 1: return "pinkman";
        case 2: return "maskdude";
        case 3: return "virtualguy";
        default: return "ninjafrog";
    }
}

calculateHitbox(){
    return {
        top: this.position.y+this.spriteOffset.top*this.spriteSize,
        bottom: this.position.y + this.spriteHeight*this.spriteSize - this.spriteOffset.bottom*this.spriteSize,
        left: this.position.x + this.spriteOffset.left*this.spriteSize,
        right: this.position.x + this.spriteWidth*this.spriteSize - this.spriteOffset.right*this.spriteSize
    }
}

performJump(jumpType) {
    this.phisics.velocityY = this.phisics.jumpStrength;
    this.position.y += this.phisics.velocityY;
    this.playerState.isJumping = true
    this.playerState.keyJumpIsUp = false
    this.spriteState = this.selectAvatar() + jumpType;
}

getLettersAfterChar(str, char) {
    const index = str.indexOf(char);
    
    // Verifica se a letra foi encontrada
    if (index !== -1 && index + 1 < str.length) {
      return str.substring(index + 1);
    } else {
      return ''; // Retorna string vazia se a letra não for encontrada ou for a última
    }
  }

jump(){
    
    if (!this.playerState.isJumping && !this.playerState.isOnPlatform && this.playerState.keyJumpIsUp) {
        this.performJump("-jump")
        this.playerState.doubleJump = true
    }
    
    if (this.playerState.doubleJump && !this.playerState.isOnPlatform && this.playerState.keyJumpIsUp) {
        this.performJump("-doublejump")
        this.playerState.doubleJump = false
    }
}

showImageBorder(){//mostra contorno na imagem
    this.ctx.strokeRect( this.position.x,
                    this.position.y,
                    this.spriteWidth*this.spriteSize,
                    this.spriteHeight*this.spriteSize)
}

animate(){
  
    let position = Math.floor(frames/staggerFrames)%spriteCoordinates[this.spriteState].location.length

    const image = spriteCoordinates[this.spriteState].location[0].imageInstance
    image.src = spriteCoordinates[this.spriteState].location[0].image

    let frameX = position*this.spriteWidth
    let frameY = spriteCoordinates[this.spriteState].location[position].y

    //retirar comentario para mostrar contorno na imagem
    this.showImageBorder()
  
    if (this.MoveAction.left || this.playerState.currentDirection == "left") {
        this.ctx.save(); // Salva o estado original do contexto
        this.ctx.translate(this.position.x + this.spriteWidth * this.spriteSize, this.position.y); // Ajusta o ponto de origem
        this.ctx.scale(-1, 1); // Inverte a escala horizontal
        this.ctx.drawImage(
            image,
            frameX, frameY,
            this.spriteWidth, this.spriteHeight,
            0, 0, // Ajustado para o sistema de coordenadas transformado
            this.spriteWidth * this.spriteSize, this.spriteHeight * this.spriteSize
        )
        this.ctx.restore(); // Restaura o estado original
    } else if(this.MoveAction.right || this.playerState.currentDirection == "right"){
        this.ctx.drawImage(
            image,
            frameX, frameY,
            this.spriteWidth, this.spriteHeight,
            this.position.x, this.position.y,
            this.spriteWidth * this.spriteSize, this.spriteHeight * this.spriteSize
        )
    }

}

move() 
{
    this.checkCollisionOnWalls()
     
    if(!this.playerState.isJumping){
    this.spriteState = this.selectAvatar() +  "-run"
    }
    
    if(this.MoveAction.left && !this.leftBlocked){
         this.playerState.currentDirection = "left"
         this.position.x -= this.phisics.speed
         this.rightBlocked = false
         moveCamera(1)
    }else if(this.MoveAction.right && !this.rightBlocked){
         this.playerState.currentDirection = "right"
         this.position.x += this.phisics.speed
         this.leftBlocked = false
         moveCamera(-1)
    }
}

calculatePlayerEdges() {
    return {
        left: this.position.x + this.spriteOffset.left * this.spriteSize,
        right: this.position.x + this.spriteWidth * this.spriteSize - this.spriteOffset.right * this.spriteSize,
        top: this.position.y,
        bottom: this.position.y + this.spriteHeight * this.spriteSize - this.spriteOffset.bottom * this.spriteSize,
        offsetBottom: this.spriteHeight * this.spriteSize - this.spriteOffset.bottom * this.spriteSize
    }
}

calculateTileEdges(tile) {
    return {
        left: tile.x,
        right: tile.x + tile.width,
        top: tile.y,
        bottom: tile.y + tile.height
    }
}

checkCollisionOnTiles(){
   
    const playerEdges = this.calculatePlayerEdges();

    if(this.playerState.isJumping && this.phisics.velocityY > 0){
        this.spriteState = this.selectAvatar() + "-fall"
    }

    tileArray.some(Tiles => {
        const tileEdges = this.calculateTileEdges(Tiles);
        let upperTileLine = +this.getLettersAfterChar(Tiles.id, "c") - 1
        let upperTileColumn = this.getLettersBeforeChar(Tiles.id, "c")
        let upperTileId = upperTileColumn + "c" + upperTileLine
        const UpperTile = tileArray.find(upperTile => upperTile.id === upperTileId )


        if(playerEdges.bottom >= tileEdges.top &&
            playerEdges.bottom <= tileEdges.bottom &&
            playerEdges.right >= tileEdges.left &&
            playerEdges.left <= tileEdges.right &&
            this.phisics.velocityY > 0 &&
            Tiles.activeImage != " "
        )
        {
           //rotina que retira o bug das paredes

            
            if(UpperTile.activeImage != " ") {

            }else {
                this.playerState.isOnTiles = true
                this.phisics.velocityY = 0
                this.position.y = Tiles.y - this.spriteWidth*this.spriteSize 
                this.playerState.isJumping = false
                this.spriteState = this.selectAvatar() + "-idle"
                return true
            }
   
        }else  if(playerEdges.top + this.spriteOffset.top*this.spriteSize<= tileEdges.bottom &&
            playerEdges.bottom >= tileEdges.bottom &&
            playerEdges.right >= tileEdges.left + 10 &&
            playerEdges.left <= tileEdges.right - 10 &&
            this.phisics.velocityY < 0 &&
            Tiles.activeImage != " "
        )
        {

            
            this.phisics.velocityY = 0
            this.position.y = Tiles.y + Tiles.width 
            return true

        }
    })
this.playerState.isOnPlatform = false
}

getLettersBeforeChar(str, char) {
    const index = str.indexOf(char);
    
    // Verifica se a letra foi encontrada
    if (index !== -1) {
      return str.substring(0, index);
    } else {
      return ''; // Retorna string vazia se a letra não for encontrada
    }
  }
  

checkCollisionOnWalls(){
    const playerEdges = this.calculatePlayerEdges();
    
this.leftBlocked = false
this.rightBlocked = false

tileArray.some(Tiles => {
    const tileEdges = this.calculateTileEdges(Tiles);

        // Verifica se está tentando mover para a esquerda
        if(playerEdges.bottom > tileEdges.top && 
            playerEdges.top < tileEdges.bottom && 
            Tiles.activeImage !== " "){
        if (playerEdges.right > tileEdges.right && 
            playerEdges.left < tileEdges.right) {
            this.leftBlocked = true;
        } else if (playerEdges.left < tileEdges.left && 
                   playerEdges.right > tileEdges.left) {
                   this.rightBlocked = true;
        }
    }
})

}

applyGravity(){ //aplica gravidade no player

    if(this.playerState.isOnPlatform == false){
        this.phisics.velocityY += this.phisics.gravity
        this.position.y += this.phisics.velocityY
    }
}

}







