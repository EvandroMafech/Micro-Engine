import { setImageOnBackgroundTiles } from "../../core/engine/engine.js";
import {  activeSelectedImage, createAnimatedImage} from "../../core/engine/main.js";
import { animatedImagesArray, backgroundArray, tileArray, tileSize, tilesWithImages } from "../../core/utils/constants.js";
import { spriteCoordinates, positionAdjust } from "../../core/utils/imageData.js";
import { gameState } from "../../game/ui/gameState.js";

export function saveLevel() {
    const saveData = {
        tiles: tileArray
            .filter(tile => tile.activeImage !== " ") // só pega tiles que receberam imagem
            .map(tile => ({
                id: tile.id,
                activeImage: tile.activeImage,
                tileSetInfo: tile.tileSetInfo
            })),
        animated: animatedImagesArray.map(img => ({
            x: img.x,
            y: img.y,
            name: img.name,
            frames: img.frames,
            line: img.line,
            width: img.width,
            height: img.height,
            type: img.constructor.name, // identifica a classe (Fruit, Saw, Box, etc.)
            extra: {
                id: img.id ?? null,
                life: img.life ?? null,
                rotation: img.rotation ?? null
            }
        })),
        background: backgroundArray[0].backgroundImageSource
    }

    //localStorage.setItem("savedLevel", JSON.stringify(saveData)) // salvar no localStorage
    sendToServer(saveData) // salvar no servidor
        //alert("Mapa salvo com sucesso!")
}

export async function loadLevel(save){

  gameState.startPointPlaced = false
  gameState.endPointPlaced = false

  let savedOnServer
  if(save === undefined){
   savedOnServer = await getSaveOnServer(1)
  console.log("Fase recuperada do servidor: ",savedOnServer)
  } else{
   savedOnServer = save
  }
      //const saved = localStorage.getItem("savedLevel") // pegar do localStorage
   const saved = JSON.stringify(savedOnServer) // pegar do servidor
    if(!saved) {
        //alert("Nenhum save encontrado")
        return
    }

    const saveData = JSON.parse(saved)

    // limpar arrays antes de reconstruir
    animatedImagesArray.length = 0
    tilesWithImages.length = 0
    tileArray.forEach(tile => { tile.activeImage = " "; tile.cleanTile() })

    // recriar tiles
    saveData.tiles.forEach(savedTile => {
        const tile = tileArray.find(t => t.id === savedTile.id)
        if(tile) {
            tile.activeImage = savedTile.activeImage
            tile.tileSetInfo = savedTile.tileSetInfo 
 
            tile.drawImage({ x: tile.tileSetInfo.x, y: tile.tileSetInfo.y })
            tilesWithImages.push(tile.id)
        }
    })
    //Carrega background
    //setImageOnBackgroundTiles("../../" + saveData.background,typeof saveData.background)
    //console.log("Background carregado:", "../../" + saveData.background)


    // recriar imagens animadas
    saveData.animated.forEach(savedImg => {
        activeSelectedImage.imageId = savedImg.name
        activeSelectedImage.imageUrl = spriteCoordinates[savedImg.name].location[0].image
        activeSelectedImage.type = "animated"

    let type = savedImg.type.toLowerCase(); // sem aspas artificiais
    let adjustX = positionAdjust[type]?.x ?? 0
    let adjustY = positionAdjust[type]?.y ?? 0

    //console.log(adjustX, adjustY)


    let TileId = `l${Math.floor((savedImg.x+adjustX)/tileSize)}` + 
                 `c${Math.floor((savedImg.y+adjustY)/tileSize)}`

       // console.log({ clientX: savedImg.x, clientY: savedImg.y},TileId)
        createAnimatedImage(TileId, { clientX: savedImg.x, clientY: savedImg.y})

    })
        
    //alert("Mapa carregado com sucesso!")
}




// Exemplo: enviando uma fase para o servidor
async function sendToServer(fase) {
  try {
    const response = await fetch("http://localhost:3000/fase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fase)
    });
    

    if (!response.ok) {
      throw new Error("Erro ao salvar fase");
    }

    const result = await response.json();
    console.log("Fase salva em: ", result.link);
    console.log("Link para jogar: ", result.gameLink);
    return result.link; // você pode mostrar para o usuário ou salvar
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function getSaveOnServer(id) {
  try {
    const response = await fetch(`http://localhost:3000/fases/${id}`);
  
    if (!response.ok) {throw new Error("Fase não encontrada");}
   
    const fase = await response.json();
   
    //console.log("Fase encontrada:", fase);
    return fase;
  } catch (error) {
    console.error("Erro:", error);
  }
}


