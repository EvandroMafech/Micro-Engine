import { positionAdjust, spriteCoordinates } from "../utils/imageData.js";
import AnimatedImage from "../entities/AnimatedImage.js";
import Tile from "../entities/Tile.js";
import { tileSetCanvasFrameInfo } from "../utils/tilesetCanvas.js";
import Player from "../entities/Player.js";
import Fruit from "../entities/Fruit.js";
import Saw from "../entities/Saw.js";
import Spykes from "../entities/Spykes.js";
import Trampoline from "../entities/Trampoline.js";
import Platform from "../entities/Platform.js";
import Fan from "../entities/Fan.js";
import Spikedball from "../entities/Spikedball.js";
import Checkpoint from "../entities/Checkpoint.js";
import End from "../entities/End.js";
import Start from "../entities/Start.js";
import Box from "../entities/Box.js";
import { functionButtons, gameState, keyboardShortcuts } from "../../game/ui/gameState.js";
import { allSetIdsArray, animatedImagesArray, backgroundArray, columns, imageSizeFactor, lines, tileArray, tileSetSpriteheet_image_path, tileSize, tilesWithImages } from "../utils/constants.js";
import { animatePlayer, createBackgroundGrid, createGrid, createMapBoundaries, setImageOnBackgroundTiles } from "./engine.js";

//canvas para os tilesets   
export const tileSetCanvas = document.querySelector(".tileset") 
const ctx = tileSetCanvas.getContext("2d")

export const backgroundCanvas = document.querySelector(".background") //
const ctxBackground = backgroundCanvas.getContext("2d")

export const gridCanvas = document.querySelector(".grid") 
const ctxGrid = gridCanvas.getContext("2d")

export const editorCanvas = document.querySelector(".editor")
const ctxEditor = editorCanvas.getContext("2d")

// canvas para imagens animadas
export const animationCanvas = document.querySelector(".animations") 
const ctxAnimations = animationCanvas.getContext("2d")

tileSetCanvas.width = animationCanvas.width = backgroundCanvas.width = 1984
tileSetCanvas.height = animationCanvas.height = backgroundCanvas.height = 832

export let animatedImagesArrayLastSave = [] //usado para salvar o estado anterior do array de imagens animadas
export let tileArrayLastSave = [] //usado para salvar o estado anterior do array de tiles
export let frames = 0 //usado para salvar os frames de cada animação
export const player = new Player(ctxAnimations) //(ctx,image,x,y,sheetPosition){

//retira o efeito que deixa a imagem ruim
ctx.imageSmoothingEnabled = false
ctxAnimations.imageSmoothingEnabled = false
ctxBackground.imageSmoothingEnabled = false
ctxEditor.imageSmoothingEnabled = false

export const activeSelectedImage = { //usada para salvar a ultima imagem selecionada pelo cliente
    imageUrl: "",
    imageId: "",
    type: "",
    instance: ""
}

let fruitsId = 0 //id de cada fruta plotada na tela 
let boxId = 0 //id de cada fruta plotada na tela 

function undoImages(){ //apaga imagens da tela pelo atalho CTRL-Z


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

export function createTileId(event){ //cria um Id para cada tile do canvas principal
    const rect = tileSetCanvas.getBoundingClientRect(); // usado para referenciar a posição do mouse
    const {clientX , clientY} = event
    const positionX = clientX - rect.left
    const positionY = clientY - rect.top
    const id = `l${Math.floor(positionX/tileSize)}` + `c${Math.floor(positionY/tileSize)}`
    return id
}

export function drawGrid(){// desenha o grid do editor
    tileArray.forEach(tile => tile.draw(ctxGrid)) 
}

export function clearGrid(){//limpa tela do canvas das animações
    ctxGrid.clearRect(0,0, tileSetCanvas.width,tileSetCanvas.height) 
}

export function setTileSetImageOnCanvas(TileId){ //posiciona os tilesets de terreno no canvas

    tileArray.forEach(tile => {
    
       if(tile.id == TileId){
            tile.activeImage = tileSetCanvasFrameInfo.id
            tile.drawImage(tileSetCanvasFrameInfo)
            tile.tileSetInfo = tileSetCanvasFrameInfo
            allSetIdsArray.push({id: tileSetCanvasFrameInfo.id,type: "tileset"})
    }
})
}

export function createAnimatedImage(TileId,event){ //cria uma imagem animada
    
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
            const boxImageId = boxId++




            let animatedImage
            if (activeSelectedImage.imageId.includes("fruit")) {
                animatedImage = new Fruit(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,fruitImageId)
            }else if(activeSelectedImage.imageId.includes("saw")){
                 animatedImage = new Saw(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("enemy")){
                 animatedImage = new AnimatedImage(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("platform")){
                 animatedImage = new Platform(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
            }else if(activeSelectedImage.imageId.includes("block")){
                 animatedImage = new Box(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id,boxImageId,1) //o ultimo é a vida
            }else if(activeSelectedImage.imageId.includes("box1")){
                 animatedImage = new Box(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id,boxImageId,2)//o ultimo é a vida
            }else if(activeSelectedImage.imageId.includes("box2")){
                 animatedImage = new Box(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id,boxImageId,4)//o ultimo é a vida
            }else if(activeSelectedImage.imageId.includes("box3")){
                 animatedImage = new Box(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id,boxImageId,6)//o ultimo é a vida
            }else if(activeSelectedImage.imageId.includes("checkpoint")){
                 animatedImage = new Checkpoint(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
                }else if(activeSelectedImage.imageId.includes("end")){
                if(!gameState.endPointPlaced){   
                    gameState.endPointPlaced = true
                    animatedImage = new End(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
                }else{
                    const placedEndIndex = animatedImagesArray.findIndex((element) => element.name == "end-idle")
                    animatedImagesArray.splice(placedEndIndex,1)
                    animatedImage = new End(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)    
                 }
                // animatedImage = new End(sheetImage,x - adjustX,y - adjustY,activeSelectedImage.imageId,frames,line,w,h,ctxAnimations,imageSizeFactor,id)
         
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

export function manageImages(event){ //pega a imagem selecionada e joga na função correspondente para criar plotar a imagem
 
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

export function selectedImage(clientX, clientY){
    const rect = tileSetCanvas.getBoundingClientRect(); // usado para referenciar a posição do mouse
    const positionX = clientX - rect.left
    const positionY = clientY - rect.top
    
    let range = 30 //range de detecção da imagem mais proxima

    const imageIndex = animatedImagesArray.findIndex(image => {
        let imageOffsetX = (image.width/2)*image.size 
        let imageOffsetY = (image.height/2)*image.size  
        
        if( image.x + imageOffsetX > positionX - range && 
            image.x + imageOffsetX < positionX + range &&
            image.y + imageOffsetY > positionY - range && 
            image.y + imageOffsetY < positionY + range){


               
                return true
            }
        })
        if(imageIndex != -1) animatedImagesArray.splice(imageIndex,1)

}

export function animationLoop(){ //loop principal
    
    

    if(gameState.pause == false){  
    ctxAnimations.clearRect(0,0, tileSetCanvas.width,tileSetCanvas.height) //limpa tela do canvas das animações


    animatedImagesArray.forEach(image => {
        image.animate()  //atualiza os quadros de todas as imagens animadas
        image.checkCollisionWithPlayer() //verifica se colidiu com o player
    }) 
   
  
    if(gameState.gameRunning) {
        animatePlayer() // anima o player na tela
            
    }else{
        player.position.y = 5000
        player.position.x = 5000
    }

    if(player.MoveAction.left || player.MoveAction.right) player.move()
    if(player.MoveAction.jump == true) player.jump()
  
    frames++
}
    window.requestAnimationFrame(animationLoop)


}


createGrid(ctx)
createBackgroundGrid(ctxBackground)
drawGrid()
setTimeout(createMapBoundaries, 10); //por algum motivo se eu chamar direto na sequencia de funções acima nao funciona
animationLoop()


editorCanvas.addEventListener("mousedown", (event) => {
    if(functionButtons.eraser == true){
        selectedImage(event.clientX, event.clientY)
    }else if(gameState.gameRunning == false &&
             functionButtons.selectItens == true   
    ){ // so pode adicionar imagens se o jogo não estiver rodando

    manageImages(event)
    }
})

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

window.addEventListener("keyup",(event) => { //usado para fazer debugs apertando p para gerar informaçãos no console
    const key = event.key.toLowerCase() 

    if(key == "p"){
    console.log(activeSelectedImage.imageUrl)
    }

})

   
editorCanvas.addEventListener("mousemove",event => {

        const origin = tileSetCanvas.getBoundingClientRect()
        ctxEditor.clearRect(0,0,2000,2000)
        const image = new Image()
   
        if(functionButtons.eraser){
            image.src = "/assets/images/icons/cut.png"
            ctxEditor.drawImage(image,event.clientX-origin.left-image.height/2,event.clientY-origin.top-image.height/2)
        }else if(functionButtons.selectItens == true &&
                 functionButtons.selectTileset == false
        ){
            image.src = activeSelectedImage.imageUrl
            ctxEditor.drawImage(image,event.clientX-origin.left-image.height/2,event.clientY-origin.top-image.height/2)
        }else if(functionButtons.selectTileset == true){
            image.src = tileSetSpriteheet_image_path
            //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

            const {x , y} = tileSetCanvasFrameInfo
            ctxEditor.drawImage(image,x,y,16,16,event.clientX-origin.left-16,
                event.clientY-origin.top-16,32,32)
          //  ctxEditor.drawImage(image,this.x,this.y,this.width,this.height)
        }
    })

    editorCanvas.addEventListener("mouseleave",() => {
        ctxEditor.clearRect(0,0,2000,2000)
    })


