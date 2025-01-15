import { activeSelectedImage, clearGrid, drawGrid, player } from "../main.js"
import Player from "./Player.js"

const leftAsideMainButtons = document.querySelectorAll(".main-btn")
const button = document.querySelectorAll(".dropdown")
const headerButtons = document.querySelectorAll(".headerButtons")

const header = document.querySelector(".header")
const leftAside = document.querySelector(".left-aside")
const rightAside = document.querySelector(".right-aside")

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
                  header.style.display = "none"
                  leftAside.style.display = "none"
                  rightAside.style.display = "none"

            break;


          
          
        }
        })
       

    })
