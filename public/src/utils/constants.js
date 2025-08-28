export const tileSetSpriteheet_image_path = "../public/assets/images/Terrain/Terrain (16x16) vertical.png"
const chain = new Image()
chain.src = "../public/assets/images/Traps/Spiked Ball/Chain.png"
export {chain}


export const lines = 13 //linhas do editor
export const columns = 31 // clounas do editor

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


export const tileSize = 64 //tamanho de cada frame do grid
export const imageSizeFactor = 3 //fator para aumentar ou diminuir as dimensões das imagens na tela
export const staggerFrames = 4 //constante usada para mudar a velocidade da animação dos sprites
