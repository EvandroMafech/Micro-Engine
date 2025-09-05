export const tileSetSpriteheet_image_path = "../public/assets/images/Terrain/Terrain (16x16) vertical.png"
const chain = new Image()
chain.src = "../public/assets/images/Traps/Spiked Ball/Chain.png"
export {chain}


export const lines = 13 //linhas do editor
export const columns = 31 // clounas do editor
export const tileSize = 64 //tamanho de cada frame do grid
export const imageSizeFactor = 3 //fator para aumentar ou diminuir as dimensões das imagens na tela
export const staggerFrames = 4 //constante usada para mudar a velocidade da animação dos sprites

export const tilesWithImages = [] // salva somente tiles com imagens do tileset
export const tileArray = [] //guarda uma instancia para cada frame do editor
export const backgroundArray = [] //salva as instancia de cada frame do background
export const animatedImagesArray = [] //salva em sequencia todas as imagens animadas
export const allSetIdsArray = [] //salva todas as imagens em sequencia para ser usada ao apertar a tecla CTRL+Z


export const specialTilesIds = [ //ids de tiles que são como plataformas (o player pode pular por baixo deles)
  "l6c20",
  "l7c20",
  "l8c20",
  "l6c21",
  "l7c21",
  "l8c21",
  "l6c22",
  "l7c22",
  "l8c22"
];


