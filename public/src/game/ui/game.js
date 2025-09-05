// import { animatedImagesArray, animatePlayer, createBackgroundGrid, createGrid, createMapBoundaries, drawGrid, player, setImageOnBackgroundTiles } from "../../core/engine/main.js";
// import { startGame } from "../../editor/ui/interfaceButtons.js";
// import { loadLevel } from "../../editor/ui/saveLoad.js";

import { createGrid } from "../../core/engine/engine"

 const tileSetCanvasGame = document.querySelector(".game-tileset") 
 const ctxGame = tileSetCanvasGame.getContext("2d")

 const backgroundCanvasGame = document.querySelector(".game-background") //
 const ctxBackgroundGame = backgroundCanvasGame.getContext("2d")

 const gridCanvasGame = document.querySelector(".game-grid") 
 const ctxGridGame = gridCanvasGame.getContext("2d")

 export const animationCanvasGame = document.querySelector(".game-animations") 
 const ctxAnimations = animationCanvasGame.getContext("2d")


tileSetCanvasGame.width = animationCanvasGame.width = backgroundCanvasGame.width = animationCanvasGame.width =  1984
tileSetCanvasGame.height = animationCanvasGame.height = backgroundCanvasGame.height = animationCanvasGame.height = 832


//function gameLoop(){ //loop principal
      
    // ctxAnimations.clearRect(0,0, tileSetCanvas.width,tileSetCanvas.height) //limpa tela do canvas das animações


    // animatedImagesArray.forEach(image => {
    //     image.animate()  //atualiza os quadros de todas as imagens animadas
    //     image.checkCollisionWithPlayer() //verifica se colidiu com o player
    // }) 
   
  

    //     animatePlayer() // anima o player na tela
 
    // if(player.MoveAction.left || player.MoveAction.right) player.move()
    // if(player.MoveAction.jump == true) player.jump()
  
    // frames++
    // window.requestAnimationFrame(animationLoop)

//}

createGrid(ctxGridGame)
//createBackgroundGrid(ctxBackgroundGame)
//drawGrid()
//setTimeout(createMapBoundaries, 10); //por algum motivo se eu chamar direto na sequencia de funções acima nao funciona
//gameLoop()


// window.addEventListener("keydown",(event) => {
//     const key = event.key.toLowerCase() 
    
//     if(key == "arrowleft"){player.MoveAction.left = true}
//     if(key == "arrowright"){player.MoveAction.right = true}
//     if(key == " ") {
//         event.preventDefault();
//         player.MoveAction.jump = true
//     }
// })

// window.addEventListener("keyup",(event) => {
//     const key = event.key.toLowerCase() 
    

//     if(key == "arrowleft"){player.MoveAction.left = false}
//     if(key == "arrowright"){player.MoveAction.right = false}
//     if(key == " ") {
//         event.preventDefault();
//         player.MoveAction.jump = false
//         player.playerState.keyJumpIsUp = true
//     }
// })




window.addEventListener("DOMContentLoaded", async () => { // espera o HTML carregar
  const url = new URL(window.location.href);// cria um objeto URL
  const faseId = url.searchParams.get("id");

  if (faseId) {
    // carrega fase do servidor
    const response = await fetch(`http://localhost:3000/fases/${faseId}`);
    const fase = await response.json();

    console.log("Fase carregada do servidor:", fase);
    //loadLevel(fase)
    //console.log("Fase carregada no editor:", fase.background);
    
    //startGame()
    //setImageOnBackgroundTiles("../../" + fase.background,typeof fase.background)
    // inicia o jogo com essa fase
   // iniciarModoJogo(fase);
  } else {

   // console.log("Nenhum ID de fase fornecido na URL.");
    // se não tem id, abre editor normalmente
   // iniciarEditor();
  }
});