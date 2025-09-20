import { functionButtons } from "../../game/ui/gameState.js";
import { activeSelectedImage } from "../engine/editor.js";
import { tileSetSpriteheet_image_path } from "./constants.js";

let tileSetCanvasFrameInfo = {};
const tileSizeTilesetCanvas = 16;
const tileSizeFactor = 2;

const tileSetSheetCanvas = document.querySelector(".tileSet-canvas");
const tileSetCanvasCtx = tileSetSheetCanvas.getContext("2d");

tileSetSheetCanvas.width = 176 * tileSizeFactor;
tileSetSheetCanvas.height = 368 * tileSizeFactor;

tileSetSheetCanvas.imageSmoothingEnabled = false;

const tileSetSpriteSheet = new Image();
tileSetSpriteSheet.src = tileSetSpriteheet_image_path;

function selectTilesetImageFromGrid(event) {
  const rect = tileSetSheetCanvas.getBoundingClientRect();
  const { clientX, clientY } = event;
  const positionX = (clientX - rect.left) / tileSizeFactor;
  const positionY = (clientY - rect.top) / tileSizeFactor;
  const line = Math.floor(positionX / tileSizeTilesetCanvas);
  const column = Math.floor(positionY / tileSizeTilesetCanvas);
  const id = `l${line}` + `c${column}`;
  tileSetCanvasFrameInfo = {
    x: line * tileSizeTilesetCanvas,
    y: column * tileSizeTilesetCanvas,
    id: id,
  };

  activeSelectedImage.type = "tileset";
}

export { tileSetCanvasFrameInfo };

function drawGridTilesetCanvas() {
  tileSetCanvasCtx.strokeStyle = "#555";
  const lines = 24;
  const columns = 11;

  for (let c = 0; c < lines; c++) {
    for (let l = 0; l < columns; l++) {
      let x = tileSizeTilesetCanvas * l * tileSizeFactor;
      let y = tileSizeTilesetCanvas * c * tileSizeFactor;
      tileSetCanvasCtx.strokeRect(
        x,
        y,
        tileSizeTilesetCanvas * tileSizeFactor,
        tileSizeTilesetCanvas * tileSizeFactor,
      ); // (x, y, largura, altura)
    }
  }
}

function drawTilesetImages() {
  tileSetCanvasCtx.drawImage(
    tileSetSpriteSheet,
    0,
    0,
    176 * tileSizeFactor,
    368 * tileSizeFactor,
  );
  drawGridTilesetCanvas();
  requestAnimationFrame(drawTilesetImages);
}

drawTilesetImages();

tileSetSheetCanvas.addEventListener("click", (event) => {
  functionButtons.selectItens = true;
  functionButtons.eraser = false;
  functionButtons.selectTileset = true;

  selectTilesetImageFromGrid(event);
});
