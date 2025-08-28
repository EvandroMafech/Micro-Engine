import { animationCanvas, backgroundCanvas, gridCanvas, player, tileSetCanvas } from "../main.js";
import { cameraPosition } from "../state/gameState.js";

export function placeInitialCameraPosition(positionX,positionY){
    tileSetCanvas.style.left = `${positionX }px` 
    backgroundCanvas.style.left = `${positionX }px` 
    gridCanvas.style.left = `${positionX }px`
    animationCanvas.style.left = `${positionX }px`
    tileSetCanvas.style.top = `${positionY}px` 
    backgroundCanvas.style.top = `${positionY}px` 
    gridCanvas.style.top = `${positionY}px` 
    animationCanvas.style.top = `${positionY}px`

    cameraPosition.initPositionX = positionX
    cameraPosition.initPositionY = positionY


    console.log(cameraPosition)

}

export function moveCamera(directionHorizontal,level,distance) {

const dirFactorH = directionHorizontal == "left" ? 1 : directionHorizontal == "right" ? -1 : 0
//const moveSpeedH = player.phisics.speed*dirFactorH

//move canvas horizontalmente
tileSetCanvas.style.left = `${cameraPosition.currentPositionH+distance*dirFactorH}px` 
backgroundCanvas.style.left = `${cameraPosition.currentPositionH+distance*dirFactorH}px` 
gridCanvas.style.left = `${cameraPosition.currentPositionH+distance*dirFactorH}px` 
animationCanvas.style.left = `${cameraPosition.currentPositionH+distance*dirFactorH}px`
// tileSetCanvas.style.left = `${cameraPosition.currentPositionH+moveSpeedH}px` 
// backgroundCanvas.style.left = `${cameraPosition.currentPositionH+moveSpeedH}px` 
// gridCanvas.style.left = `${cameraPosition.currentPositionH+moveSpeedH}px` 
// animationCanvas.style.left = `${cameraPosition.currentPositionH+moveSpeedH}px`

//move canvas verticalmente
// tileSetCanvas.style.top = `${level}px` 
// backgroundCanvas.style.top = `${level}px` 
// gridCanvas.style.top = `${level}px` 
// animationCanvas.style.top = `${level}px`

//cameraPosition.currentPositionH += moveSpeedH
cameraPosition.currentPositionH += distance*dirFactorH


    
}