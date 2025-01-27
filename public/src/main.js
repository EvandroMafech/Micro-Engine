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
import Checkpoint from "./components/Checkpoint.js";
import End from "./components/End.js";
import Start from "./components/Start.js";
import Box from "./components/Box.js";

//canvas para os tilesets
const tileSetCanvas = document.querySelector(".tileset") 
const ctx = tileSetCanvas.getContext("2d")

const backgroundCanvas = document.querySelector(".background") 
const ctxBackground = backgroundCanvas.getContext("2d")

const gridCanvas = document.querySelector(".grid") 
const ctxGrid = gridCanvas.getContext("2d")

// canvas para imagens animadas
const animationCanvas = document.querySelector(".animations") 
const ctxAnimations = animationCanvas.getContext("2d")

const lines = 15 //linhas do editor
const columns = 40 // clounas do editor

const player = new Player(ctxAnimations) //(ctx,image,x,y,sheetPosition){

const gameState = {
    startPointPlaced: false,
    endPointPlaced: false,
    gameRunning: false
}
//dimensoes fixas do canvas
// tileSetCanvas.width = animationCanvas.width = backgroundCanvas.width = window.innerWidth 
// tileSetCanvas.height = animationCanvas.height = backgroundCanvas.height = window.innerHeight

tileSetCanvas.width = animationCanvas.width = backgroundCanvas.width = 2000 
tileSetCanvas.height = animationCanvas.height = backgroundCanvas.height = 1000

//retira o efeito que deixa a imagem ruim
ctx.imageSmoothingEnabled = false
ctxAnimations.imageSmoothingEnabled = false
ctxBackground.imageSmoothingEnabled = false

const keyboardShortcuts = {
    alignItens: false,
    rotateImage: 0
}

const tilesWithImages = [] // salva somente tiles com imagens do tileset
const tileArray = [] //guarda uma instancia para cada frame do editor
const backgroundArray = [] //salva as instancia de cada frame do background
const animatedImagesArray = [] //salva em sequencia todas as imagens animadas
const allSetIdsArray = [] //salva todas as imagens em sequencia para ser usada ao apertar a tecla CTRL+Z
const tileSize = 64 //tamanho de cada frame do grid
const imageSizeFactor = 3 //fator para aumentar ou diminuir as dimensões das imagens na tela
const staggerFrames = 4 //constante usada para mudar a velocidade da animação dos sprites

const activeSelectedImage = { //usada para salvar a ultima imagem selecionada pelo cliente
    imageUrl: "",
    imageId: "",
    type: "",
    instance: ""
}

let frames = 0 //contator de frames do loop principal
let fruitsId = 0 //id de cada fruta plotada na tela 

export {staggerFrames,frames,activeSelectedImage,animatedImagesArray,player,tileArray,tilesWithImages,allSetIdsArray,gameState}

function undoImages(){ //apaga imagens da tela pelo atalho CTRL-Z

console.log(animatedImagesArray)
let lastImage = allSetIdsArray[allSetIdsArray.length-1].type 
    
if(lastImage == "animated"){
     
    //essas 3 linhas são para eliminar o bug que fazia com que ao apertar CTL+Z fazer com que mudar a posição do start ou end apagava um ao outro
    const lastImageId = animatedImagesArray[animatedImagesArray.length-1].name 
    if(lastImageId == "end-idle") gameState.endPointPlaced = false
    if(lastImageId == "start-idle") gameState.startPointPlaced = false

        animatedImagesArray.pop()
        allSetIdsArray.pop()

}else if(lastImage == "tileset"){
        
        let lastTileImageId = tilesWithImages.pop()
        allSetIdsArray.pop()
     
        tileArray.some(tile => {
             if(tile.id == lastTileImageId){
                 tile.activeImage = " "
                 tile.cleanTile() 
                 return 
             }
        })

    }
}

function createBaseForTests(){ //posiciona os tilesets de terreno no canvas para testes

    const baseTiles = [
        "l0c11", "l1c11", "l2c11", "l3c11", "l4c11", "l5c11", "l6c11", "l7c11", "l8c11", 
        "l9c11", "l10c11", "l11c11", "l12c11", "l13c11", "l14c11", "l15c11", "l16c11", 
        "l17c11", "l18c11", "l19c11", "l20c11", "l21c11", "l22c11", "l23c11", "l24c11",
        "l25c11", "l26c11", "l27c11", "l28c11", "l29c11", "l30c11","l0c12", "l1c12", "l2c12",
         "l3c12", "l4c12", "l5c12", "l6c12", "l7c12", "l8c12","l9c12", "l10c12", "l11c12",
         "l12c12", "l13c12", "l14c12", "l15c12", "l16c12","l17c12", "l18c12", "l19c12", 
         "l20c12", "l21c12", "l22c12", "l23c12", "l24c12","l25c12", "l26c12", "l27c12", 
         "l28c12", "l29c12", "l30c12","l0c13", "l1c13", "l2c13", "l3c13", "l4c13", "l5c13", "l6c13", "l7c13", "l8c13", 
"l9c13", "l10c13", "l11c13", "l12c13", "l13c13", "l14c13", "l15c13", "l16c13", 
"l17c13", "l18c13", "l19c13", "l20c13", "l21c13", "l22c13", "l23c13", "l24c13",
"l25c13", "l26c13", "l27c13", "l28c13", "l29c13", "l30c13"


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
            //allSetIdsArray.push(tileSetInfo.id)
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

function createBackgroundGrid(){ //cria os blocos so background (instancias)
const tileSize = 64*3
    for(let c = 0; c < lines; c++){
        for(let l = 0; l <columns ; l++){
            let x = tileSize*l
            let y = tileSize*c
            let id = `l${x/tileSize}` + `c${y/tileSize}` //adiciona um id único para cada um
            const imagePath = "../public/assets/images/Background/Blue.png"
            const tile = new Tile(x,y,tileSize,tileSize,ctxBackground,id,imagePath)
            backgroundArray.push(tile)
            
            
        }
    }

}

function drawGrid(){// desenha o grid do editor
    tileArray.forEach(tile => tile.draw(ctxGrid)) 
}

function clearGrid(){//limpa tela do canvas das animações
    ctxGrid.clearRect(0,0, tileSetCanvas.width,tileSetCanvas.height) 
}

export {drawGrid,clearGrid}

function setTileSetImageOnCanvas(TileId){ //posiciona os tilesets de terreno no canvas

    tileArray.forEach(tile => {
    
       if(tile.id == TileId){
            tile.activeImage = tileSetCanvasFrameInfo.id
            tile.drawImage(tileSetCanvasFrameInfo)
            allSetIdsArray.push({id: tileSetCanvasFrameInfo.id,type: "tileset"})
    }
})
}

function setImageOnBackgroundTiles(){ //posiciona os quadrados de background no canvas
    backgroundArray.forEach(tile => {tile.drawBackground(activeSelectedImage.imageUrl)})
}

function createAnimatedImage(TileId,event){ //cria uma imagem animada
    console.log(animatedImagesArray)
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
            }else{
                x = tile.x
                y = tile.y
            }

            const sheetImage = new Image()
            sheetImage.src = image
            const fruitImageId = fruitsId++




            let animatedImage
            if (activeSelectedImage.imageId.includes("fruit")) {
                animatedImage = new Fruits(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,fruitImageId,id)
            }else if(activeSelectedImage.imageId.includes("saw")){
                 animatedImage = new Saw(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("enemy")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("platform")){
                 animatedImage = new Platform(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("block")){
                 animatedImage = new Box(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("box1")){
                 animatedImage = new Box(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("box2")){
                 animatedImage = new Box(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("box3")){
                 animatedImage = new Box(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("checkpoint")){
                 animatedImage = new Checkpoint(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
                }else if(activeSelectedImage.imageId.includes("end")){
                if(!gameState.endPointPlaced){   
                    gameState.endPointPlaced = true
                    animatedImage = new End(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
                 }else{
                    const placedEndIndex = animatedImagesArray.findIndex((element) => element.name == "end-idle")
                    console.log(placedEndIndex)
                    animatedImagesArray.splice(placedEndIndex,1)
                    animatedImage = new End(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)    
                 }
                 animatedImage = new End(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
         
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
            }else if(activeSelectedImage.imageId.includes("fan")){
                 animatedImage = new Fan(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("spykes")){
                 animatedImage = new Spykes(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id,keyboardShortcuts.rotateImage)

                 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
            }else if(activeSelectedImage.imageId.includes("start")){
                 if(!gameState.startPointPlaced){   
                    gameState.startPointPlaced = true
                    animatedImage = new Start(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
                 }else{
                    const placedStartIndex = animatedImagesArray.findIndex((element) => element.name == "start-idle")
                    animatedImagesArray.splice(placedStartIndex,1)
                    animatedImage = new Start(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)    
                 }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                
                 

            }else if(activeSelectedImage.imageId.includes("trampoline")){
                 animatedImage = new Trampoline(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("spikedball")){
                 animatedImage = new Spikedball(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }

            animatedImagesArray.push(animatedImage)
            allSetIdsArray.push({id: activeSelectedImage.imageId,type: "animated"})
            

        }
     })
    
}

function manageImages(event){ //pega a imagem selecionada e joga na função correspondente para criar plotar a imagem

    const TileId = createTileId(event)    

    if(activeSelectedImage.type === "tileset"){
        setTileSetImageOnCanvas(TileId)
        tilesWithImages.push(TileId)
    }
    else if(activeSelectedImage.type === "animated"){
        createAnimatedImage(TileId,event)
    }else if(activeSelectedImage.type === "background")
    {
        setImageOnBackgroundTiles()
    }
}

function animatePlayer(){ //funções para animar o player
    player.animate()
    player.applyGravity()
    player.checkCollisionOnFloor()
}

function moveCamera(){

    animatedImagesArray.forEach(element => {
        element.x -= tileSize
    })

    tileArray.forEach(element => {
 
        const newPosition = {x: 96, y: 108}
        element.x -= tileSize
        element.drawImage(newPosition)
    })
    
}

function animationLoop(){ //loop principal
      
    ctxAnimations.clearRect(0,0, tileSetCanvas.width,tileSetCanvas.height) //limpa tela do canvas das animações
 
    animatedImagesArray.forEach(image => {
        image.animate()  //atualiza os quadros de todas as imagens animadas
        image.checkCollisionWithPlayer() //verifica se colidiu com o player
    }) 
   
    animatePlayer() // anima o player na tela

    if(player.MoveAction.left || player.MoveAction.right) player.move()
    if(player.MoveAction.jump == true) player.jump()

    
    frames++
    window.requestAnimationFrame(animationLoop)
}

createGrid()
createBackgroundGrid()
drawGrid()
animationLoop()
createBaseForTests()

tileSetCanvas.addEventListener("mousedown", (event) => {manageImages(event)})

animationCanvas.addEventListener("mousedown", (event) => {manageImages(event)})

window.addEventListener("keydown",(event) => {
    const key = event.key.toLowerCase() 
    
    if(key == "arrowleft"){player.MoveAction.left = true}
    if(key == "arrowright"){player.MoveAction.right = true}
    if(key == " ") {
        event.preventDefault();
        player.MoveAction.jump = true
    }
    if(key == "shift"){keyboardShortcuts.alignItens = true}
    if(event.ctrlKey && key == "z"){undoImages()}
    if(key == "r"){keyboardShortcuts.rotateImage += 90}
})

window.addEventListener("keyup",(event) => {
    const key = event.key.toLowerCase() 
    

    if(key == "arrowleft"){player.MoveAction.left = false}
    if(key == "arrowright"){player.MoveAction.right = false}
    if(key == " ") {
        event.preventDefault();
        player.MoveAction.jump = false
        player.playerState.keyJumpIsUp = true
    }
    if(key == "shift"){keyboardShortcuts.alignItens = false}
})




