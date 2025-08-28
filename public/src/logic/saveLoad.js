import { tileArray, tilesWithImages, animatedImagesArray, activeSelectedImage, createAnimatedImage } from "../main.js";
import { tileSize } from "../utils/constants.js";
import { spriteCoordinates, positionAdjust } from "./animatedImagesInfo.js";


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
        }))
    }
   //console.log(saveData)

    localStorage.setItem("savedLevel", JSON.stringify(saveData))
    //alert("Mapa salvo com sucesso!")
}

export function loadLevel() {
    const saved = localStorage.getItem("savedLevel")
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
