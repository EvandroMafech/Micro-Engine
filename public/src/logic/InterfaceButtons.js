import { activeSelectedImage, allSetIdsArray, animatedImagesArray, animatedImagesArrayLastSave, cameraPosition, clearGrid, 
    createBaseForTests, drawGrid, functionButtons, gameState, loadLevel, moveCamera, placeInitialCameraPosition, 
    player, saveLevel, tileArray, tileArrayLastSave, tilesWithImages } from "../main.js"
import Player from "../components/Player.js"
import Tile from "../components/Tile.js"

const modalInfo = {
    font: "",
    yes: false,
    no: false
}


const leftAsideMainButtons = document.querySelectorAll(".main-btn")
const button = document.querySelectorAll(".dropdown")
const headerButtons = document.querySelectorAll(".headerButtons")
const canvasContainer = document.querySelector(".scroll-container")

const header = document.querySelector(".header")
const leftAside = document.querySelector(".left-aside")
const rightAside = document.querySelector(".right-aside")

const modal = document.getElementById("customModal");
const btnYes = modal.querySelector(".btn-yes");
const btnNo = modal.querySelector(".btn-no");
const btnOk = modal.querySelector(".btn-ok");
const modalText = modal.querySelector(".text");


//limpa o canvas
function cleanCanvas(){

    animatedImagesArray.splice(0, animatedImagesArray.length)
    tilesWithImages.splice(0, tilesWithImages.length)
    allSetIdsArray.splice(0, allSetIdsArray.length)

    //reseta os estados dos checkpoints
    gameState.endPointPlaced = false
    gameState.startPointPlaced = false

    tileArray.forEach(tile => {
        tile.activeImage = " "
        tile.cleanTile() 
    })
}

//botoes principais do menu à esquerda
leftAsideMainButtons.forEach(element => {
    element.addEventListener("click", () => {
        const mainButtonId = element.id
        const dropdown = document.getElementById(`dropdown-${mainButtonId}`)
        dropdown.classList.toggle("show")

    })
})

//botões principais do menu à direita
document.getElementById("toggle-right-aside").addEventListener("click", () => {
    const rightAside = document.getElementById('right-aside')
    rightAside.classList.toggle('expanded');
})
document.getElementById("toggle-left-aside").addEventListener("click", () => {
    const rightAside = document.getElementById('left-aside')
    rightAside.classList.toggle('expanded');
})

//evita redimencionamento da tela
window.addEventListener("wheel", (event) => {
    if (event.ctrlKey) {event.preventDefault();}
}, {passive: false})
    
//evita redimencionamento da tela
window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()

    if ((event.ctrlKey || event.metaKey) && (key === '+' || key === '-')) {event.preventDefault();}
  
    if(key == "escape") {
      
        functionButtons.selectIntens = false
        returToEditor()
    } 
})

//botões menores com imagens à esquerda
button.forEach(element => {

    element.addEventListener("click", (event) => {
    const selectedImageStyle = window.getComputedStyle(event.target) //pega as informações do target
    let match = selectedImageStyle.backgroundImage.match(/public.*?\.png/); //pega tudo que começa com public e termina com .png. operador lazy (.*?)
  
    console.log("String crua:  " + match[0]); 
   
        let selectedImageUrl = "../../../" + match[0] //o slice é usado para retirar o http.. e etc na hora do deploy ou teste com servidor local
 
        console.log("String certa: " + selectedImageUrl)  
     
        activeSelectedImage.imageId = event.target.id
        activeSelectedImage.imageUrl = selectedImageUrl

        if(event.target.getAttribute("data-type") == "background"){
            activeSelectedImage.type = "background"
        }else{
            activeSelectedImage.type = "animated"
        }

    })
})

const headerButtonsState = {
    displayGrid: true
}

//botoes do topo
headerButtons.forEach(headerButton => {
    headerButton.addEventListener("click", (event) =>{

        switch(event.target.id){
          
            case "grid":
                if(headerButtonsState.displayGrid == true){ 
                    clearGrid()
                    headerButtonsState.displayGrid = false
                  }else{
                    drawGrid()
                    headerButtonsState.displayGrid = true
                  }
            break;

            case "eraser":
                if(functionButtons.selectIntens == false) functionButtons.selectIntens = true
                else if(functionButtons.selectIntens == true) functionButtons.selectIntens = false
            break;
          
            case "player":
                player.playerState.avatarNumber++
                if(player.playerState.avatarNumber >= 4) player.playerState.avatarNumber = 0

            break;

            case "play":
                
                 if(animatedImagesArray.some(element => element.name == "start-idle")){  
                modal.style.display = "flex";
                modalText.innerHTML = "O mapa será salvo automaticamente antes de iniciar o jogo. Deseja continuar?"
                btnNo.style.display = "inline-block"
                btnYes.style.display = "inline-block"
                btnOk.style.display = "none"
                modalInfo.font = "play"    
              }else{
        modal.style.display = "flex";
        modalText.innerHTML = "Não é possível iniciar o jogo sem um ponto de Start. Coloque o Start no Mapa"
        btnNo.style.display = "none"
        btnYes.style.display = "none"
        btnOk.style.display = "inline-block"
        modalInfo.font = "play"
    }

            break;

            case "clear":
                modal.style.display = "flex";
                modalText.innerHTML = "Tem certeza que quer excluir todos os elementos da tela? qualquer alteração não salva será perdida."
                btnNo.style.display = "inline-block"
                btnYes.style.display = "inline-block"
                btnOk.style.display = "none"
                modalInfo.font = "clear"

            break;

            case "save":
                modal.style.display = "flex";
                modalText.innerHTML = "Tem certeza que deseja salvar?"
                btnNo.style.display = "inline-block"
                btnYes.style.display = "inline-block"
                btnOk.style.display = "none"
                modalInfo.font = "save"

            break;

            case "open":
            
                modal.style.display = "flex";
                modalText.innerHTML = "Tem certeza que deseja abrir outro save? Qualquer alteração não salva será perdida."
                btnNo.style.display = "inline-block"
                btnYes.style.display = "inline-block"
                btnOk.style.display = "none"
                modalInfo.font = "open"

            break;
      
        }
        })
       

    })


///////////////////////////////

    // Mostrar o modal
    // showModalBtn.addEventListener("click", () => {
    //   modal.style.display = "flex";
    // });

    // Botão Sim
    btnYes.addEventListener("click", () => {
        switch(modalInfo.font){
            case "clear":
                cleanCanvas()
            break

            case "save":
                 saveLevel()
            break

            case "open":
                 loadLevel()    
            break
     
            case "play":
                saveLevel()
                startGame()    
            break

            case "gameOver":
                startGame()
                canvasContainer.classList.toggle("canvas-container-centered") // como ja tem na função, tem q fazer donovo aqui para não repetir
            break;    
            case "gameEnd":
                startGame()
                canvasContainer.classList.toggle("canvas-container-centered") // como ja tem na função, tem q fazer donovo aqui para não repetir
            break;    
        }

        
      modal.style.display = "none";
    });

    // Botão Não
    btnNo.addEventListener("click", () => {
        modal.style.display = "none";
      
        switch(modalInfo.font){
            case "gameOver":
                returToEditor()
            break;
                
            case "gameEnd":
                returToEditor()
            break;    
        }

    });
    btnOk.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fechar o modal ao clicar fora dele
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });


    export function gameOverModal(){
        modal.style.display = "flex";
        modalText.innerHTML = "Ops! Você... Morreu. Trágico. Deseja Jogar Novamente?"
        btnNo.style.display = "inline-block"
        btnYes.style.display = "inline-block"
        btnOk.style.display = "none"
        modalInfo.font = "gameOver"
    }
    export function gameEnd(){
        modal.style.display = "flex";
        modalText.innerHTML = "Parabés! Você conseguiu!!! Deseja Jogar Novamente?"
        btnNo.style.display = "inline-block"
        btnYes.style.display = "inline-block"
        btnOk.style.display = "none"
        modalInfo.font = "gameEnd"
    }

    function startGame(){
        if(animatedImagesArray.some(element => element.name == "start-idle")){
            gameState.gameRunning = true
            const xPositonStart = animatedImagesArray.find((element) => element.name == "start-idle")
            cameraPosition.startH = -xPositonStart.x+1000 //mudar essa linha para ficar dinamico
            cameraPosition.currentPositionH = cameraPosition.startH
            placeInitialCameraPosition(cameraPosition.startH,cameraPosition.startV)
                       
            
            canvasContainer.classList.toggle("canvas-container-centered")
            
            gameState.gameRunning = true
            const startPosition = animatedImagesArray.find(element =>  element.name === "start-idle")
            player.phisics.velocityY = 0
            player.position.x = startPosition.x + startPosition.width 
            player.position.y = startPosition.y + startPosition.height
            header.style.display = "none"
            leftAside.style.display = "none" 
            rightAside.style.display = "none"
  
    }
    }


    function returToEditor(){
        header.style.display = "flex"
        leftAside.style.display = "flex"
        rightAside.style.display = "flex"
        modal.style.display = "none"
        placeInitialCameraPosition(0,0) 
      
        if(gameState.gameRunning) {
            canvasContainer.classList.toggle("canvas-container-centered")
            gameState.gameRunning = false
        }
    }