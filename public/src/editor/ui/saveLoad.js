import { setImageOnBackgroundTiles } from "../../core/engine/engine.js";
import {
  activeSelectedImage,
  createAnimatedImage,
} from "../../core/engine/editor.js";
import {
  activeBackgroundImage,
  animatedImagesArray,
  API_URL,
  backgroundArray,
  tileArray,
  tileSize,
  tilesWithImages,
} from "../../core/utils/constants.js";
import {
  spriteCoordinates,
  positionAdjust,
} from "../../core/utils/imageData.js";
import { gameState } from "../../game/ui/gameState.js";
import { checkIfSaved } from "./interfaceButtons.js";

export function saveLevel() {
  const saveData = {
    tiles: tileArray
      .filter((tile) => tile.activeImage !== " ") // só pega tiles que receberam imagem
      .map((tile) => ({
        id: tile.id,
        activeImage: tile.activeImage,
        tileSetInfo: tile.tileSetInfo,
      })),
    animated: animatedImagesArray.map((img) => ({
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
        rotation: img.rotation ?? null,
      },
    })),
    background: activeBackgroundImage[activeBackgroundImage.length - 1],
  };

  sendToServer(saveData); // salvar no servidor
  //alert("Mapa salvo com sucesso!")
}

export async function loadLevel(save) {
  gameState.startPointPlaced = false;
  gameState.endPointPlaced = false;
  const token = localStorage.getItem("token");

  let savedOnServer;
 
  if (save === undefined) {
    savedOnServer = await getSaveOnServer();
  } else {
    savedOnServer = save;
  }

  const saved = JSON.stringify(savedOnServer); // pegar do servidor
  if (!saved) {
    alert("Nenhum save encontrado")
    return;
  }

  const saveData = JSON.parse(saved);

  // limpar arrays antes de reconstruir
  animatedImagesArray.length = 0;
  tilesWithImages.length = 0;
  tileArray.forEach((tile) => {
    tile.activeImage = " ";
    tile.cleanTile();
  });
  backgroundArray.forEach((tile) => {
    tile.activeBackgroundImage = "";
  });

  // recriar tiles
  saveData.tiles.forEach((savedTile) => {
    const tile = tileArray.find((t) => t.id === savedTile.id);
    if (tile) {
      tile.activeImage = savedTile.activeImage;
      tile.tileSetInfo = savedTile.tileSetInfo;

      tile.drawImage({ x: tile.tileSetInfo.x, y: tile.tileSetInfo.y });
      tilesWithImages.push(tile.id);
    }
  });
  //Carrega background
  setImageOnBackgroundTiles(saveData.background);

  // recriar imagens animadas
  saveData.animated.forEach((savedImg) => {
    activeSelectedImage.imageId = savedImg.name;
    activeSelectedImage.imageUrl =
      spriteCoordinates[savedImg.name].location[0].image;
    activeSelectedImage.type = "animated";

    let type = savedImg.type.toLowerCase(); // sem aspas artificiais
    let adjustX = positionAdjust[type]?.x ?? 0;
    let adjustY = positionAdjust[type]?.y ?? 0;

    let TileId =
      `l${Math.floor((savedImg.x + adjustX) / tileSize)}` +
      `c${Math.floor((savedImg.y + adjustY) / tileSize)}`;
    createAnimatedImage(TileId, { clientX: savedImg.x, clientY: savedImg.y });
  });

}

// Exemplo: enviando uma fase para o servidor
async function sendToServer(fase) {
  
  const isSaved = await checkIfSaved()
  if (isSaved === "true") {
      overWriteSave(fase)

  } else {
     createNewSave(fase);
  }
}

async function overWriteSave(fase) {
  try {
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/save-level/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fase),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error);
      return;
    }
    const result = await response.json();
    gameState.link = result.gameLink;

    } catch (error) {
    console.error("Erro:", error);
  }


}



async function createNewSave(fase) {
  try {
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/save-level`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fase, userId }),
    });

   if (!response.ok) {
     const error = await response.json();
     alert(error);
     return;
   }
    const result = await response.json() 
    gameState.link = result.gameLink;

  } catch (error) {
    console.error("Erro:", error);
  }
}


async function getSaveOnServer() {

    const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
    const response = await fetch(`${API_URL}/saved-levels/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("Fase não encontrada");
      return
    }

    const fase = await response.json();
    return fase;

}


export async function getSave() {
  const url = new URL(window.location.href); // cria um objeto URL
  const faseId = url.searchParams.get("id");
  if (!faseId) return;
  const response = await fetch(`${API_URL}/saved-levels/${faseId}`);

      if (!response.ok) {
        alert("Fase não encontrada");
        return;
      }

  const fase = await response.json();
  return fase;
}