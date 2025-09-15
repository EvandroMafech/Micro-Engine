import Tile from "../entities/Tile.js"
import { backgroundArray, columns, lines, tileArray, tileSize } from "../utils/constants.js"
import { activeSelectedImage, player } from "./editor.js"

export function createGrid(ctx){ //cria todas as instancias do grid principal do editor

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


export function createMapBoundaries(){ //posiciona os tilesets de terreno no canvas para testes
    
    const baseTiles = []
    
    for(let n=0;n <= columns;n++){
       baseTiles.push(`l${n}c${lines-1}`)
       baseTiles.push(`l${n}c${0}`)
    }
    for(let n=0;n <= lines;n++){
       baseTiles.push(`l${0}c${n}`)
       baseTiles.push(`l${columns-1}c${n}`)
    }

    const tileSetInfo = { //
        x: 16,
        y: 272,
        id: "l1c17",
        info: {x: 16, y: 272, id: 'l1c17'}   
    }

    tileArray.forEach(tile => {
       if(baseTiles.includes(tile.id)){
            tile.activeImage = tileSetInfo.id
            tile.tileSetInfo = tileSetInfo.info 
            tile.drawImage(tileSetInfo)
            
        }

})
}

export function createBackgroundGrid(ctx){ //cria os blocos do background (instancias)
const tileSize = 64*3
    for(let c = 0; c < lines; c++){
        for(let l = 0; l <columns ; l++){
            let x = tileSize*l
            let y = tileSize*c
            let id = `l${x/tileSize}` + `c${y/tileSize}` //adiciona um id único para cada um
            const imagePath = "/assets/images/Background/Blue.png"
            const tile = new Tile(x,y,tileSize,tileSize,ctx,id,imagePath)
            backgroundArray.push(tile)
            
            
        }
    }

}


export function setImageOnBackgroundTiles(image){ //posiciona os quadrados de background no canvas
    const bgImage = image ?? activeSelectedImage.imageUrl;

    backgroundArray.forEach(tile => {tile.drawBackground(bgImage)})
}


export function animatePlayer(){ //funções para animar o player
    player.animate()
    player.applyGravity()
    player.checkCollisionOnTiles()
}

export function hidePlayer(){
    player.position.y = 5000
    player.position.x = 5000
}