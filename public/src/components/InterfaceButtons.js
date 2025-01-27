import { activeSelectedImage, allSetIdsArray, animatedImagesArray, clearGrid, drawGrid, gameState, player, tileArray, tilesWithImages } from "../main.js"
import Player from "./Player.js"

const modalInfo = {
    font: "",
    yes: false,
    no: false
}


const leftAsideMainButtons = document.querySelectorAll(".main-btn")
const button = document.querySelectorAll(".dropdown")
const headerButtons = document.querySelectorAll(".headerButtons")

const header = document.querySelector(".header")
const leftAside = document.querySelector(".left-aside")
const rightAside = document.querySelector(".right-aside")

const modal = document.getElementById("customModal");
const showModalBtn = document.getElementById("showModal");
const btnYes = modal.querySelector(".btn-yes");
const btnNo = modal.querySelector(".btn-no");
const btnOk = modal.querySelector(".btn-ok");
const modalText = modal.querySelector(".text");


function cleanCanvas(){

    animatedImagesArray.splice(0, animatedImagesArray.length)
    tilesWithImages.splice(0, tilesWithImages.length)
    allSetIdsArray.splice(0, allSetIdsArray.length)

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

//evita redimencionamento da tela
window.addEventListener("wheel", (event) => {
    if (event.ctrlKey) {event.preventDefault();}
}, {passive: false})
    
//evita redimencionamento da tela
window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()

    if ((event.ctrlKey || event.metaKey) && (key === '+' || key === '-')) {event.preventDefault();}
  
    if(key == "escape") {
      
        header.style.display = "flex"
        leftAside.style.display = "flex"
        rightAside.style.display = "flex"
        
    } 
})

//botões menores com imagens à esquerda
button.forEach(element => {

    element.addEventListener("click", (event) => {
        const selectedImageStyle = window.getComputedStyle(event.target) //pega as informações do target
        const selectedImageUrl = "../../../" + selectedImageStyle.backgroundImage.slice(27, -2) //o slice é usado para retirar o http.. e etc na hora do deploy ou teste com servidor local
        //console.log(event.target.getAttribute("data-type"))
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
          
            case "player":
                player.playerState.avatarNumber++
                if(player.playerState.avatarNumber >= 4) player.playerState.avatarNumber = 0

            break;

            case "play":
                
                if(animatedImagesArray.some(element => element.name == "start-idle")){

                        gameState.gameRunning = true
                        const startPosition = animatedImagesArray.find(element =>  element.name === "start-idle")
                        player.phisics.velocityY = 0
                        player.position.x = startPosition.x + startPosition.width 
                        player.position.y = startPosition.y + startPosition.height
                        header.style.display = "none"
                        leftAside.style.display = "none" 
                        rightAside.style.display = "none"
               
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
                alert("jogo salvo")
            break

            case "open":
                alert("Você ainda não tem fases salvas")
            break
        }

        
      modal.style.display = "none";
    });

    // Botão Não
    btnNo.addEventListener("click", () => {


        modal.style.display = "none";
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