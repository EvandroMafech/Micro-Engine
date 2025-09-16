import { setImageOnBackgroundTiles } from "../../core/engine/engine.js";
import { API_URL } from "../../core/utils/constants.js";
import { startGame } from "../../editor/ui/interfaceButtons.js";
import { loadLevel } from "../../editor/ui/saveLoad.js";
import { gameState } from "./gameState.js";

window.addEventListener("DOMContentLoaded", async () => { // espera o HTML carregar
  const url = new URL(window.location.href);// cria um objeto URL
  const faseId = url.searchParams.get("id");

  if (faseId) {
    // carrega fase do servidor
    const response = await fetch(`${API_URL}/saved-levels/${faseId}`);
    const fase = await response.json();

    gameState.onGamePage = true
    //console.log("Fase carregada do servidor:", fase);
    loadLevel(fase).then(() =>{
    setImageOnBackgroundTiles(fase.background)  
    startGame()
    })


  } else {

    console.log("Nenhum ID de fase fornecido na URL.");
  }
});