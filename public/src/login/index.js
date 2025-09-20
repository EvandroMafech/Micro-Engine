import { API_URL } from "../core/utils/constants.js";

const openLoginButton = document.querySelector(".btn");
const loginModal = document.querySelector(".loginModal");
const CreateAccount = document.querySelector(".noAcount");
const registerModal = document.querySelector(".CreateAccount");
const registerButton = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".submit");



openLoginButton.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

CreateAccount.addEventListener("click", (event) => {
    event.preventDefault();
  loginModal.style.display = "none";
  registerModal.style.display = "flex";
});

registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    registerNewUser();
});

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  login();
});


async function registerNewUser() {
const userName = document.getElementById("newUsername").value;
const password1 = document.getElementById("password1").value;
const password2 = document.getElementById("password2").value;
   

  try {
        
       if (password1 != password2) {
          alert("As duas senhas não são iguais")
          return
        }

        const register = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            password: password1,
          }),
        });

        if (!register.ok) throw new Error("Erro ao criar novo usuário")
        
        const result = await register.json()

    if (result.liberation) {
      alert("Conta criada com sucesso!");
      console.log(result);
      loginModal.style.display = "flex";
      registerModal.style.display = "none";
    }
        
      } catch(error) {
        console.error(error);
      
      }
}
    

async function login() {
  
  const userName = document.getElementById("username").value
  const password = document.getElementById("username").value

  try {

    const login = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
 if (!login.ok) throw new Error("Erro ao entrar");
    const result = await login.json()

    if (result.liberation) {
            loginModal.style.display = "none";
            registerModal.style.display = "none";
      console.log("liberado")
      window.location.href = "/public/editor.html";

    }
          console.log(result.msg);


  } catch (error) {
    console.error(error)
    
  }



}




window.addEventListener("keyup", (event) => {
  const key = event.key.toLocaleLowerCase();
  if (key === "escape") {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
  }
});


window.addEventListener("keyup", (event) => {
  //usado para fazer debugs apertando p para gerar informaçãos no console
  const key = event.key.toLowerCase();

  if (key == "t") {

    viewUsers();
  }
});


async function viewUsers() {

  const users = await fetch(`${API_URL}/users`)
  
  const result = await users.json()
  console.log(result)


}