import { API_URL } from "../core/utils/constants.js";

const openLoginButton = document.querySelector(".btn");
const loginModal = document.querySelector(".loginModal");
const CreateAccount = document.querySelector(".noAcount");
const registerModal = document.querySelector(".CreateAccount");
const registerButton = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".submit");
const loginForm = document.querySelector(".form");
const registerForm = document.querySelector(".registerForm");

localStorage.removeItem("user");
localStorage.removeItem("token");
localStorage.removeItem("savedLevel");


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

  if (!registerForm.checkValidity()) {
    registerForm.reportValidity(); // mostra mensagens padrão do navegador
    return;
  }
  registerNewUser();
});

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!loginForm.checkValidity()) {
    loginForm.reportValidity(); // mostra mensagens padrão do navegador
    return;
  }
  login();
});

async function registerNewUser() {
  const userName = document.getElementById("newUsername").value;
  const password1 = document.getElementById("password1").value;
  const password2 = document.getElementById("password2").value;

  if (password1 != password2) {
    alert("As duas senhas não são iguais");
    return;
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

  if (!register.ok) {
    const errorMsg = await register.json();
    alert(errorMsg.msg);
  }
  const result = await register.json();

  if (result.liberation) {
    alert("Conta criada com sucesso!");
    loginModal.style.display = "flex";
    registerModal.style.display = "none";
  }
}

async function login() {
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

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

  if (!login.ok) {
    const errorMsg = await login.json();
    alert(errorMsg.msg);
  }

  const result = await login.json();

  if (result.liberation) {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
    window.location.href = "/public/editor.html";
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", result.user);
  }
  //alert(result.msg);
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
    //viewUsers();
  }
});

async function viewUsers() {
  const users = await fetch(`${API_URL}/users`);

  const result = await users.json();
}
