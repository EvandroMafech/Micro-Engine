import { 
  activeSelectedImage,  animationLoop,  clearGrid,
  drawGrid,  player,  
} from "../../core/engine/editor.js";

import { cameraPosition, functionButtons, gameState } from "../../game/ui/gameState.js";
import { placeInitialCameraPosition } from "../../game/ui/camera.js";
import { loadLevel, saveLevel } from "./saveLoad.js";
import { tilesWithImages, allSetIdsArray, animatedImagesArray, backgroundArray, tileArray } from "../../core/utils/constants.js";
import { createMapBoundaries, hidePlayer } from "../../core/engine/engine.js";

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
const modalInfo = { 
  type: "", 
  yes: false, 
  no: false 
};

async function checkIfSaved() {

  const checkSave = await fetch("http://localhost:3000/saved-levels/lastsave")
  const result = await checkSave.json()
  
  return result === 0 ? false : true 

}


export function goToPage(page,newPage = false) {

  if(!newPage){
  window.location.href = page;
  }else{
    console.log(page)
    window.open(page,"_blank")
  }
}

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

  backgroundArray.forEach(bg => {
    bg.backgroundImageSource = "";
    bg.cleanTile();
  })

  activeSelectedImage.imageId = null;

  createMapBoundaries()
}

// ======================
// Modal Helpers
// ======================
function showModal(message, type, buttons = { yes: true, no: true, ok: false }) {
  gameState.pause = true
  UI.modal.style.display = "flex";
  UI.modal.text.innerHTML = message;
  modalInfo.type = type;

  UI.modal.btnYes.style.display = buttons.yes ? "inline-block" : "none";
  UI.modal.btnNo.style.display = buttons.no ? "inline-block" : "none";
  UI.modal.btnOk.style.display = buttons.ok ? "inline-block" : "none";
}

function hideModal() {
  gameState.pause = false
  UI.modal.style.display = "none";
}

// ======================
// Game Flow
// ======================
export function startGame() {
  const start = animatedImagesArray.find(e => e.name === "start-idle");
  const end = animatedImagesArray.find(e => e.name === "end-idle");

  if (!start || !end) return;

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
    loadLevel().then(() => {
    startGame(); 
    })

    UI.canvasContainer.classList.toggle("canvas-container-centered"); 
    break;
    case "gameOver-game": case "gameEnd-game": 
    hidePlayer()
    cleanCanvas();
    loadLevel().then(() => {
    startGame(); 
    })

    UI.canvasContainer.classList.toggle("canvas-container-centered"); 
    break;
    case "exit": 
    cleanCanvas();
    hidePlayer()
    loadLevel().then(() => {
    returToEditor();
    }) 
    break;
    case "exit-game":
      hideModal();
    break  
    case "link":
      checkIfSaved().then(save => {
      const isSaved = save
      if(isSaved) {
        goToPage(`${gameState.link}`,true)
      }else{
        hideModal()
        alert("Não há fases salvas!")
      } 

      })

    break  
  }
  hideModal();
}

function handleModalNo() {
  hideModal();

  switch(modalInfo.type){
    case "gameOver": case "gameEnd": 
    cleanCanvas();
    hidePlayer()
    loadLevel();
    returToEditor();
    break
    case "gameOver-game": case "gameEnd-game": 
      hideModal();
      goToPage("http://127.0.0.1:5500/public/index.html")
    break
    case "exit-game":
      hideModal();
      goToPage("http://127.0.0.1:5500/public/index.html")
    break   
}
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
document.getElementById("toggle-right-aside").addEventListener("click", () => {
  document.getElementById("right-aside").classList.toggle("expanded")
}
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
    
    functionButtons.selectItens = !functionButtons.selectItens;
    functionButtons.eraser = false 
    functionButtons.selectTileset = false 
    
    if (gameState.gameRunning & !gameState.onGamePage){
      showModal("Deseja voltar para o editor? O progresso no jogo será perdido.", "exit", { yes: true, no: true });
    }else if(gameState.onGamePage) {
      showModal("Jogo pausado, deseja continuar", "exit-game", { yes: true, no: true });
    }
     
  }
});

// Image selection
UI.dropdownButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    functionButtons.selectItens = true;
    functionButtons.selectTileset = false;
    functionButtons.eraser = false;
    const style = window.getComputedStyle(e.target);
    const match = style.backgroundImage.match(/assets.*?\.png/);
    console.log(match)
    if (!match) return;

    activeSelectedImage.imageId = e.target.id;
    //activeSelectedImage.imageUrl = "../../../" + match[0];
    activeSelectedImage.imageUrl = match[0];

    activeSelectedImage.type = e.target.getAttribute("data-type") === "background" ? "background" : "animated";
  });
});

// Header buttons
const headerButtonsState = { 
  displayGrid: true 
};
UI.headerButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    switch (e.target.id) {
      case "grid":
        headerButtonsState.displayGrid ? clearGrid() : drawGrid();
        headerButtonsState.displayGrid = !headerButtonsState.displayGrid;
        break;
      case "eraser": 
      functionButtons.eraser = !functionButtons.eraser; 
      break;
      case "player": 
      player.playerState.avatarNumber = (player.playerState.avatarNumber + 1) % 4; 
      const playBtn = document.getElementById("player")  
      switch(player.playerState.avatarNumber){
       
          case 0:
            playBtn.innerHTML = "Ninjafrog"
          break
          case 1:
            playBtn.innerHTML = "Pinkman"
          break
          case 2:
            playBtn.innerHTML = "Maskdude"
          break
          case 3:
            playBtn.innerHTML = "Virtualguy"
          break
        }
      break;
      case "play":
        if (animatedImagesArray.some(el => el.name === "start-idle") &&
            animatedImagesArray.some(el => el.name === "end-idle"))
          showModal("O mapa será salvo automaticamente antes de iniciar o jogo. Deseja continuar?", "play", { yes: true, no: true });
        else
          showModal("Não é possível iniciar sem um ponto de Start E Fim.", "play", { ok: true });
        break;
      case "clear": showModal("Excluir todos os elementos? Alterações não salvas serão perdidas.", "clear", { yes: true, no: true }); break;
      case "save": showModal("Deseja salvar?", "save", { yes: true, no: true }); break;
      case "open": showModal("Abrir outro save? Alterações não salvas serão perdidas.", "open", { yes: true, no: true }); break;
      case "link": showModal(`Acesse sua fase pelo link: ${gameState.link} Deseja acessar agora?`, "link", { yes: true, no: true }); break;
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
  if(gameState.onGamePage){
  showModal("Ops! Você... Morreu. Trágico. Deseja jogar novamente?", "gameOver-game", { yes: true, no: true });
  }else {
    showModal("Ops! Você... Morreu. Trágico. Deseja jogar novamente?", "gameOver", { yes: true, no: true });
  }
}
export function gameEnd() {
  hidePlayer()
    if(gameState.onGamePage){
  showModal("Parabéns! Você conseguiu!!! Deseja jogar novamente?", "gameEnd-game", { yes: true, no: true });
    }else{
  showModal("Parabéns! Você conseguiu!!! Deseja jogar novamente?", "gameEnd", { yes: true, no: true });
    }
}
