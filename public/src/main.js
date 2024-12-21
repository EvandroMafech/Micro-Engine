import {positionAdjust, spriteCoordinates } from "./utils/animatedImagesInfo.js";
import AnimatedImage from "./components/AnimatedImage.js";
import Tile from "./components/Tile.js";
import {tileSetCanvasFrameInfo} from "./components/tilesetCanvas.js";
import Player from "./components/Player.js";
import Fruits from "./components/Fruits.js";


// const fruit = new Fruits(1)

// fruit.changeAnimation()
// console.log(fruit)

//canvas para os tilesets
const tileSetCanvas = document.querySelector(".tileset") 
const ctx = tileSetCanvas.getContext("2d")

// canvas para imagens animadas
const animationCanvas = document.querySelector(".animations") 
const ctxAnimations = animationCanvas.getContext("2d")

const player = new Player(ctxAnimations) //(ctx,image,x,y,sheetPosition){
export {player}

//dimensoes fixas do canvas
tileSetCanvas.width = animationCanvas.width = 2000 
tileSetCanvas.height = animationCanvas.height = 2000

//retira o efeito que deixa a imagem ruim
ctx.imageSmoothingEnabled = false
ctxAnimations.imageSmoothingEnabled = false

const tilesWithImages = [] 
const tileArray = [] //guarda uma instancia para cada frame do editor
const animatedImagesArray = [] //salva em sequencia todas as imagens animadas
const allSetIdsArray = [] //salva todas as imagens em sequencia para ser usada ao apertar a tecla CTRL+Z
const tileSize = 64 //tamanho de cada frame do grid
const imageSizeFactor = 3 //fator para aumentar ou diminuir as dimensões das imagens na tela

const staggerFrames = 3 //constante usada para mudar a velocidade da animação dos sprites

const activeSelectedImage = { //usada para salvar a ultima imagem selecionada pelo cliente
    imageUrl: "",
    imageId: "",
    type: "",
    instance: ""
}

let frames = 0 //contator de frames do loop principal


export {staggerFrames,frames,activeSelectedImage}

function createTileId(event){ //cria um Id para cada tile do canvas principal
    const rect = tileSetCanvas.getBoundingClientRect(); // usado para referenciar a posição do mouse
    const {clientX , clientY} = event
    const positionX = clientX - rect.left
    const positionY = clientY - rect.top
    const id = `l${Math.floor(positionX/tileSize)}` + `c${Math.floor(positionY/tileSize)}`
    return id
}

function createGrid(){ //cria todas as instancias do grid principal do editor
    const lines = 15 //linhas do editor
    const columns = 40 // clounas do editor

    for(let c = 0; c < lines; c++){
        for(let l = 0; l <columns ; l++){
            let x = tileSize*l
            let y = tileSize*c
            let id = `l${x/tileSize}` + `c${y/tileSize}` //adiciona um id único para cada um
            const tile = new Tile(x,y,tileSize,tileSize,ctx,id)
            tileArray.push(tile)

        }
    }
}

function drawBaseTiles(){
    tileArray.forEach(tile => tile.draw()) // desenha o grid do editor
}

function setTileSetImageOnCanvas(TileId){ //posiciona os tilesets de terreno no canvas

    tileArray.forEach(tile => {
    
       if(tile.id == TileId){
       tile.activeImage = tileSetCanvasFrameInfo.id
       tile.drawImage(tileSetCanvasFrameInfo)
       allSetIdsArray.push(tileSetCanvasFrameInfo.id)
    }
})
}

function createAnimatedImage(TileId){
  
    const newImage = new Image()
    newImage.src = activeSelectedImage.imageUrl
    activeSelectedImage.instance = newImage
    
    const {w, line, h, image, frames, id} = spriteCoordinates[activeSelectedImage.imageId].location[0]
    let adjustX 
    let adjustY 
    tileArray.forEach(tile => {
         if(tile.id == TileId){
            
            if(positionAdjust[id] == undefined) //faz o ajuste de posição
                {
                     adjustX = 0
                     adjustY = tileSize*(w*imageSizeFactor/tileSize -1)
                }else{
                const {x: x, y: y} = positionAdjust[id]
                adjustX = x
                adjustY = y
                }

            const x = tile.x
            const y = tile.y
            const sheetImage = new Image()
            sheetImage.src = image
            //const animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            
            const animatedImage = new Fruits(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
           
            animatedImagesArray.push(animatedImage)
            allSetIdsArray.push(activeSelectedImage.imageId)

        }
     })
    
}

function animationLoop(){
      
    ctxAnimations.clearRect(0,0, tileSetCanvas.width,tileSetCanvas.height)
    animatedImagesArray.forEach(image => {image.animate()})

    animatedImagesArray.forEach((image) => {
        image.checkIfCollected()
    })

    player.animate()
    player.applyGravity()
    player.checkCollisionOnFloor(tileArray)

   
    if(player.MoveAction.left || player.MoveAction.right)player.move()
    if(player.MoveAction.jump == true)player.jump()
    
    
    frames++
    window.requestAnimationFrame(animationLoop)
}

// function undoImages(event){
//     const key = event.key.toLowerCase() 

//     if(event.ctrlKey && key == "z"){

//        let LastTileId = tilesWithImages.pop()
//        let LastImageId = allSetIdsArray.pop()
     
//        tileArray.forEach(tile => {
     
//         if(tile.id == LastTileId){

//             if(AnimatedImagesIds.includes(LastImageId)){

//                animatedImagesArray.pop()

//             }else{   
           
//                 const image = new Image()
//                 image.src =  " "//"../assets/Water.png"
//                 tile.activeImage = image
//                 tile.image(LastTileId)
//                 tile.activeImage = " "
           
//             }
//             }
//          })

        
//     }
// }

function manageImages(event){

    const TileId = createTileId(event)    
    tilesWithImages.push(TileId)
    
    if(activeSelectedImage.type =="tileset"){setTileSetImageOnCanvas(TileId)}
    else if(activeSelectedImage.type === "animated"){createAnimatedImage(TileId)}
}

createGrid()
drawBaseTiles()
animationLoop()



tileSetCanvas.addEventListener("mousedown", (event) => {manageImages(event)})

animationCanvas.addEventListener("mousedown", (event) => {manageImages(event)})


window.addEventListener("keydown",(event) => {
    const key = event.key.toLowerCase() 

    if(key == "arrowleft"){player.MoveAction.left = true}
    if(key == "arrowright"){player.MoveAction.right = true}
    if(key == " ") {player.MoveAction.jump = true}
})

window.addEventListener("keyup",(event) => {
    const key = event.key.toLowerCase() 

    if(key == "arrowleft"){player.MoveAction.left = false}
    if(key == "arrowright"){player.MoveAction.right = false}
    if(key == " ") {
        player.MoveAction.jump = false
        player.playerState.keyJumpIsUp = true
        //console.log(tileArray) //para debugar

          


        

    }
})



