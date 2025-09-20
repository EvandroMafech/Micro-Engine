import { setImageOnBackgroundTiles } from "../../core/engine/engine.js";
import { API_URL, backgroundArray } from "../../core/utils/constants.js";
import { startGame } from "../../editor/ui/interfaceButtons.js";
import { loadLevel } from "../../editor/ui/saveLoad.js";
import { gameState } from "./gameState.js";

window.addEventListener("DOMContentLoaded", async () => {
  // espera o HTML carregar
  const url = new URL(window.location.href); // cria um objeto URL
  const faseId = url.searchParams.get("id");

  if (faseId) {
    // carrega fase do servidor
    const response = await fetch(`${API_URL}/saved-levels/${faseId}`);
    const fase = await response.json();
    gameState.onGamePage = true;
    loadLevel(fase).then(() => {
      startGame();
      //por algum motivo tenho que duplicar isso
      setTimeout(() => {
        setImageOnBackgroundTiles("/public/" + fase.background);
      }, 50);
      setTimeout(() => {
        setImageOnBackgroundTiles("/public/" + fase.background);
      }, 1000);
    });
  } else {
    console.log("Nenhum ID de fase fornecido na URL.");
  }
});

window.addEventListener("keyup", (event) => {
  //usado para fazer debugs apertando p para gerar informaçãos no console
  const key = event.key.toLowerCase();

  if (key == "t") {
    console.log(backgroundArray);
  }
});
