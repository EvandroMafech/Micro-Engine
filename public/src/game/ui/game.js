import { setImageOnBackgroundTiles } from "../../core/engine/engine.js";
import { API_URL, backgroundArray } from "../../core/utils/constants.js";
import { startGame } from "../../editor/ui/interfaceButtons.js";
import { getSave, loadLevel } from "../../editor/ui/saveLoad.js";
import { gameState } from "./gameState.js";

window.addEventListener("DOMContentLoaded", async () => {
  // espera o HTML carregar
  gameState.onGameLink = true;
  gameState.onGamePage = true;
  const fase = await getSave();

    loadLevel(fase).then(() => {
      startGame();
      //por algum motivo tenho que duplicar isso
      setTimeout(() => {
        setImageOnBackgroundTiles("/public/" + fase.background);
      }, 500);
      setTimeout(() => {
        setImageOnBackgroundTiles("/public/" + fase.background);
      }, 1200);
    });

});



window.addEventListener("keyup", (event) => {
  //usado para fazer debugs apertando p para gerar informaçãos no console
  const key = event.key.toLowerCase();

  if (key == "t") {

  }
});
