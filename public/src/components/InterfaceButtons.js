import { activeSelectedImage } from "../main.js"

const leftAsideMainButtons = document.querySelectorAll(".main-btn")
const button = document.querySelectorAll(".dropdown")

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
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-')) {event.preventDefault();}
})

//botões menores com imagens à esquerda
button.forEach(element => {

    element.addEventListener("click", (event) => {
        const selectedImageStyle = window.getComputedStyle(event.target);
        const selectedImageUrl = "../../../" + selectedImageStyle.backgroundImage.slice(27, -2) //o slice é usado para retirar o http.. e etc na hora do deploy ou teste com servidor local

        activeSelectedImage.imageId = event.target.id
        activeSelectedImage.type = "animated"
        activeSelectedImage.imageUrl = selectedImageUrl

    })
})