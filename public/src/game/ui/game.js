import { setImageOnBackgroundTiles } from "../../core/engine/engine.js";
import { API_URL, backgroundArray } from "../../core/utils/constants.js";
import { startGame } from "../../editor/ui/interfaceButtons.js";
import { loadLevel } from "../../editor/ui/saveLoad.js";
import { gameState } from "./gameState.js";

let oi 

window.addEventListener("DOMContentLoaded", async () => { // espera o HTML carregar
  const url = new URL(window.location.href);// cria um objeto URL
  const faseId = url.searchParams.get("id");

  if (faseId) {
    // carrega fase do servidor
    const response = await fetch(`${API_URL}/saved-levels/${faseId}`);
    const fase = await response.json();

    oi = fase

    gameState.onGamePage = true
    //console.log("Fase carregada do servidor:", fase);
    loadLevel(fase).then(() =>{
    startGame()
    console.log("Onload",fase.background)
    
    })


  } else {

    console.log("Nenhum ID de fase fornecido na URL.");
  }
});

window.addEventListener("keyup",(event) => { //usado para fazer debugs apertando p para gerar informaçãos no console
    const key = event.key.toLowerCase() 

    if(key == "t"){
    setImageOnBackgroundTiles("assets/images/Background/Green.png")
    console.log(backgroundArray)
    }

})