import { startGame } from "./logic/InterfaceButtons.js";
import { loadLevel } from "./logic/saveLoad.js";

window.addEventListener("DOMContentLoaded", async () => { // espera o HTML carregar
  const url = new URL(window.location.href);// cria um objeto URL
  const faseId = url.searchParams.get("id");

  if (faseId) {
    // carrega fase do servidor
    const response = await fetch(`http://localhost:3000/fases/${faseId}`);
    const fase = await response.json();

    console.log("Fase carregada do servidor:", fase);
    loadLevel(fase)
    startGame()
    // inicia o jogo com essa fase
   // iniciarModoJogo(fase);
  } else {

    console.log("Nenhum ID de fase fornecido na URL.");
    // se não tem id, abre editor normalmente
   // iniciarEditor();
  }
});