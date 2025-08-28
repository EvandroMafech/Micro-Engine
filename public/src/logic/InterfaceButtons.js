import { 
  activeSelectedImage, allSetIdsArray, animatedImagesArray, clearGrid,
  createMapBoundaries,
  drawGrid, hidePlayer, player, tileArray, tilesWithImages 
} from "../main.js";

import Player from "../components/Player.js";
import Tile from "../components/Tile.js";
import { cameraPosition, functionButtons, gameState } from "../state/gameState.js";
import { placeInitialCameraPosition } from "./camera.js";
import { loadLevel, saveLevel } from "./saveLoad.js";

// ======================
// UI Elements
// ======================
const UI = {
  leftAsideMainButtons: document.querySelectorAll(".main-btn"),
  dropdownButtons: document.querySelectorAll(".dropdown"),
  headerButtons: document.querySelectorAll(".headerButtons"),
  canvasContainer: document.querySelector(".scroll-container"),
  header: document.querySelector(".header"),
  leftAside: document.querySelector(".left-aside"),
  rightAside: document.querySelector(".right-aside"),
  modal: document.getElementById("customModal"),
};

UI.modal.btnYes = UI.modal.querySelector(".btn-yes");
UI.modal.btnNo = UI.modal.querySelector(".btn-no");
UI.modal.btnOk = UI.modal.querySelector(".btn-ok");
UI.modal.text = UI.modal.querySelector(".text");

// ======================
// Modal State
// ======================
const modalInfo = { type: "", yes: false, no: false };

// ======================
// Canvas Helpers
// ======================
function cleanCanvas() {
  animatedImagesArray.length = 0;
  tilesWithImages.length = 0;
  allSetIdsArray.length = 0;

  gameState.endPointPlaced = false;
  gameState.startPointPlaced = false;

  tileArray.forEach(tile => {
    tile.activeImage = " ";
    tile.cleanTile();
  });

  createMapBoundaries()
}

// ======================
// Modal Helpers
// ======================
function showModal(message, type, buttons = { yes: true, no: true, ok: false }) {
  UI.modal.style.display = "flex";
  UI.modal.text.innerHTML = message;
  modalInfo.type = type;

  UI.modal.btnYes.style.display = buttons.yes ? "inline-block" : "none";
  UI.modal.btnNo.style.display = buttons.no ? "inline-block" : "none";
  UI.modal.btnOk.style.display = buttons.ok ? "inline-block" : "none";
}

function hideModal() {
  UI.modal.style.display = "none";
}

// ======================
// Game Flow
// ======================
function startGame() {
  const start = animatedImagesArray.find(e => e.name === "start-idle");
  if (!start) return;

  gameState.gameRunning = true;

  cameraPosition.startH = -start.x + 1000; // TODO: tornar dinâmico
  cameraPosition.currentPositionH = cameraPosition.startH;
  placeInitialCameraPosition(cameraPosition.startH, cameraPosition.startV);

  UI.canvasContainer.classList.toggle("canvas-container-centered");

  player.phisics.velocityY = 0;
  player.position.x = start.x + start.width;
  player.position.y = start.y + start.height;

  cameraPosition.initPlayerPositionX = player.position.x
  cameraPosition.initPlayerPositionY = player.position.y

  UI.header.style.display = "none";
  UI.leftAside.style.display = "none";
  UI.rightAside.style.display = "none";
}

function returToEditor() {
  UI.header.style.display = "flex";
  UI.leftAside.style.display = "flex";
  UI.rightAside.style.display = "flex";
  hideModal();
  placeInitialCameraPosition(0, 0);

  if (gameState.gameRunning) {
    UI.canvasContainer.classList.toggle("canvas-container-centered");
    gameState.gameRunning = false;
  }
}

// ======================
// Modal Actions
// ======================
function handleModalYes() {
  switch (modalInfo.type) {
    case "clear": cleanCanvas(); break;
    case "save": saveLevel(); break;
    case "open": loadLevel(); break;
    case "play": saveLevel(); clearGrid(); startGame(); break;
    case "gameOver": case "gameEnd": 
    hidePlayer()
    cleanCanvas();
    loadLevel();
    startGame(); 
    UI.canvasContainer.classList.toggle("canvas-container-centered"); break;
    case "exit": 
    cleanCanvas();
    hidePlayer()
    loadLevel();
    returToEditor(); 
    break;
  }
  hideModal();
}

function handleModalNo() {
  hideModal();
  if (["gameOver", "gameEnd"].includes(modalInfo.type)) 
    cleanCanvas();
    hidePlayer()
    loadLevel();
    returToEditor(); 
}

// ======================
// Event Listeners
// ======================

// Left aside dropdown toggles
UI.leftAsideMainButtons.forEach(btn =>
  btn.addEventListener("click", () => {
    document.getElementById(`dropdown-${btn.id}`).classList.toggle("show");
  })
);

// Side panels toggle
document.getElementById("toggle-right-aside").addEventListener("click", () =>
  document.getElementById("right-aside").classList.toggle("expanded")
);
document.getElementById("toggle-left-aside").addEventListener("click", () =>
  document.getElementById("left-aside").classList.toggle("expanded")
);

// Prevent zoom shortcuts
window.addEventListener("wheel", e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
window.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  if ((e.ctrlKey || e.metaKey) && (key === "+" || key === "-")) e.preventDefault();
 
  if (key === "escape") { 
    
    functionButtons.selectItens = false; 
    
    if (gameState.gameRunning){
      showModal("Deseja voltar para o editor? O progresso no jogo será perdido.", "exit", { yes: true, no: true });
    }
     
  }
});

// Image selection
UI.dropdownButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    const style = window.getComputedStyle(e.target);
    const match = style.backgroundImage.match(/public.*?\.png/);
    if (!match) return;

    activeSelectedImage.imageId = e.target.id;
    activeSelectedImage.imageUrl = "../../../" + match[0];
    activeSelectedImage.type = e.target.getAttribute("data-type") === "background" ? "background" : "animated";
  });
});

// Header buttons
const headerButtonsState = { displayGrid: true };
UI.headerButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    switch (e.target.id) {
      case "grid":
        headerButtonsState.displayGrid ? clearGrid() : drawGrid();
        headerButtonsState.displayGrid = !headerButtonsState.displayGrid;
        break;
      case "eraser": functionButtons.selectItens = !functionButtons.selectItens; break;
      case "player": player.playerState.avatarNumber = (player.playerState.avatarNumber + 1) % 4; break;
      case "play":
        if (animatedImagesArray.some(el => el.name === "start-idle"))
          showModal("O mapa será salvo automaticamente antes de iniciar o jogo. Deseja continuar?", "play", { yes: true, no: true });
        else
          showModal("Não é possível iniciar sem um ponto de Start. Coloque o Start no mapa.", "play", { ok: true });
        break;
      case "clear": showModal("Excluir todos os elementos? Alterações não salvas serão perdidas.", "clear", { yes: true, no: true }); break;
      case "save": showModal("Deseja salvar?", "save", { yes: true, no: true }); break;
      case "open": showModal("Abrir outro save? Alterações não salvas serão perdidas.", "open", { yes: true, no: true }); break;
    }
  });
});

// Modal buttons
UI.modal.btnYes.addEventListener("click", handleModalYes);
UI.modal.btnNo.addEventListener("click", handleModalNo);
UI.modal.btnOk.addEventListener("click", hideModal);

// Close modal when clicking outside
window.addEventListener("click", e => { if (e.target === UI.modal) hideModal(); });

// ======================
// External Exports
// ======================
export function gameOverModal() {
  showModal("Ops! Você... Morreu. Trágico. Deseja jogar novamente?", "gameOver", { yes: true, no: true });
}
export function gameEnd() {
  hidePlayer()
  showModal("Parabéns! Você conseguiu!!! Deseja jogar novamente?", "gameEnd", { yes: true, no: true });
}
