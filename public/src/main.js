import {positionAdjust, spriteCoordinates } from "./utils/animatedImagesInfo.js";
import AnimatedImage from "./components/AnimatedImage.js";
import Tile from "./components/Tile.js";
import {tileSetCanvasFrameInfo} from "./components/tilesetCanvas.js";
import Player from "./components/Player.js";
import Fruits from "./components/Fruits.js";
import Saw from "./components/Saw.js";
import Spykes from "./components/spykes.js";
import Trampoline from "./components/Trampoline.js";
import Platform from "./components/Platform.js";
import Fan from "./components/Fan.js";
import Spikedball from "./components/Spikedball.js";

//canvas para os tilesets
const tileSetCanvas = document.querySelector(".tileset") 
const ctx = tileSetCanvas.getContext("2d")

// canvas para imagens animadas
const animationCanvas = document.querySelector(".animations") 
const ctxAnimations = animationCanvas.getContext("2d")

const player = new Player(ctxAnimations) //(ctx,image,x,y,sheetPosition){

//dimensoes fixas do canvas
tileSetCanvas.width = animationCanvas.width = 2000 
tileSetCanvas.height = animationCanvas.height = 2000

//retira o efeito que deixa a imagem ruim
ctx.imageSmoothingEnabled = false
ctxAnimations.imageSmoothingEnabled = false

const keyboardShortcuts = {
    alignItens: true

}


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
let numeralId = 0 

export {staggerFrames,frames,activeSelectedImage,animatedImagesArray,player,tileArray}

function createBaseForTests(){ //posiciona os tilesets de terreno no canvas para testes

    const baseTiles = [
        "l0c11", "l1c11", "l2c11", "l3c11", "l4c11", "l5c11", "l6c11", "l7c11", "l8c11", 
        "l9c11", "l10c11", "l11c11", "l12c11", "l13c11", "l14c11", "l15c11", "l16c11", 
        "l17c11", "l18c11", "l19c11", "l20c11", "l21c11", "l22c11", "l23c11", "l24c11",
        "l25c11", "l26c11", "l27c11", "l28c11", "l29c11", "l30c11"
    ]

    const tileSetInfo = {
        x: 16,
        y: 208,
        id: "l1c13"
    }

    tileArray.forEach(tile => {
       if(baseTiles.includes(tile.id)){

            tile.activeImage = tileSetInfo.id 
            tile.drawImage(tileSetInfo)
            allSetIdsArray.push(tileSetInfo.id)
        }
})
}

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

function createAnimatedImage(TileId,event){
  
    const newImage = new Image()
    let x 
    let y 
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

                
           
            if(keyboardShortcuts.alignItens){            
                const rect = tileSetCanvas.getBoundingClientRect(); // usado para referenciar a posição do mouse
                const {clientX , clientY} = event
                const positionX = clientX - rect.left
                const positionY = clientY - rect.top
                x = positionX
                y = positionY
                console.log("OI")
            }else{
                x = tile.x
                y = tile.y
            }

            const sheetImage = new Image()
            sheetImage.src = image
            const numeralImageId = numeralId++




            let animatedImage
            if (activeSelectedImage.imageId.includes("fruit")) {
                animatedImage = new Fruits(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,numeralImageId)
            }else if(activeSelectedImage.imageId.includes("saw")){
                 animatedImage = new Saw(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("enemy")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("platform")){
                 animatedImage = new Platform(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("block")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("box1")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("box2")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("box3")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("checkpoint")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("end")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("fan")){
                 animatedImage = new Fan(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("spykes")){
                 animatedImage = new Spykes(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("start")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("trampoline")){
                 animatedImage = new Trampoline(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }else if(activeSelectedImage.imageId.includes("spikedball")){
                 animatedImage = new Spikedball(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor)
            }

            
            
            animatedImagesArray.push(animatedImage)
            allSetIdsArray.push(activeSelectedImage.imageId)

        }
     })
    
}

function manageImages(event){

    const TileId = createTileId(event)    
    tilesWithImages.push(TileId)
        
    if(activeSelectedImage.type =="tileset"){setTileSetImageOnCanvas(TileId)}
    else if(activeSelectedImage.type === "animated"){createAnimatedImage(TileId,event)}
}

function animationLoop(){
      
    ctxAnimations.clearRect(0,0, tileSetCanvas.width,tileSetCanvas.height)
    animatedImagesArray.forEach(image => {
        image.animate()  //atualiza os quadros de todas as imagens animadas
        image.checkCollisionWithPlayer() //verifica se colidiu com o player
    }) 
    player.animate()
    player.applyGravity()
    player.checkCollisionOnFloor()
    //player.checkCollisionOnWalls()

    if(player.MoveAction.left || player.MoveAction.right)player.move()
    if(player.MoveAction.jump == true)player.jump()
    
    createBaseForTests()
    frames++
    window.requestAnimationFrame(animationLoop)
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
    if(key == "shift"){keyboardShortcuts.alignItens = true}
})

window.addEventListener("keyup",(event) => {
    const key = event.key.toLowerCase() 

    if(key == "arrowleft"){player.MoveAction.left = false}
    if(key == "arrowright"){player.MoveAction.right = false}
    if(key == " ") {
        player.MoveAction.jump = false
        player.playerState.keyJumpIsUp = true
    }
    if(key == "shift"){keyboardShortcuts.alignItens = false}
})




