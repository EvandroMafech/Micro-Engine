import {
  animationCanvas,
  backgroundCanvas,
  gridCanvas,
  tileSetCanvas,
} from "../../core/engine/editor.js";
import { cameraPosition } from "./gameState.js";

export function placeInitialCameraPosition(positionX, positionY) {
  tileSetCanvas.style.left = `${positionX}px`;
  backgroundCanvas.style.left = `${positionX}px`;
  gridCanvas.style.left = `${positionX}px`;
  animationCanvas.style.left = `${positionX}px`;
  tileSetCanvas.style.top = `${positionY}px`;
  backgroundCanvas.style.top = `${positionY}px`;
  gridCanvas.style.top = `${positionY}px`;
  animationCanvas.style.top = `${positionY}px`;

  cameraPosition.initPositionX = positionX;
  cameraPosition.initPositionY = positionY;
}

export function moveCamera(directionHorizontal, level, distance) {
  const dirFactorH =
    directionHorizontal == "left" ? 1 : directionHorizontal == "right" ? -1 : 0;

  //move canvas horizontalmente
  tileSetCanvas.style.left = `${
    cameraPosition.currentPositionH + distance * dirFactorH
  }px`;
  backgroundCanvas.style.left = `${
    cameraPosition.currentPositionH + distance * dirFactorH
  }px`;
  gridCanvas.style.left = `${
    cameraPosition.currentPositionH + distance * dirFactorH
  }px`;
  animationCanvas.style.left = `${
    cameraPosition.currentPositionH + distance * dirFactorH
  }px`;

  //move canvas verticalmente
  // tileSetCanvas.style.top = `${level}px`
  // backgroundCanvas.style.top = `${level}px`
  // gridCanvas.style.top = `${level}px`
  // animationCanvas.style.top = `${level}px`

  cameraPosition.currentPositionH += distance * dirFactorH;
}
