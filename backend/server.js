// API RESTful simples com Express.js
const express = require("express"); // importa o Express
const app = express(); // cria uma aplicação Express
const cors = require("cors");
//const path = require("path"); //usado para facilitar os caminhos do frontend
const API_url = "http://localhost:3600"
const port = 3600; //define a porta do servidor dinamicamente


//app.use(express.static(path.join(__dirname,"..", "public"))); // serve arquivos estáticos da pasta public
app.use(cors()); // permite requisições de qualquer origem // habilita CORS para todas as origens
app.use(express.json()); // permite trabalhar com JSON no body das requisições

// Banco de dados (em memória)
let fases = [] // objeto para armazenar fases

// app.get("/", (req, res) => { //define a rota da página inicial
//   res.sendFile(path.join(__dirname,"..", "public", "index.html"));
// });

app.get("/", (req, res) => { //define a rota da página inicial
  res.send("Servidor rodando!");
});

// [GET] Listar usuários - http://localhost:3000/saved-levels
app.get("/saved-levels", (req, res) => {
  res.json(fases);
});

///http://localhost:3000/saved-levels/lastsave
app.get("/saved-levels/lastsave",(req,res) => {
  res.json(fases.length) // retorna a última fase salva
})

// [GET] Buscar usuário por ID - http://localhost:3000/saved-levels/1
app.get("/saved-levels/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fase = fases.find(f => f.id === id);
  
  if (!fase) return res.status(404).json({ erro: "Fase não encontrada" });

  res.json(fase);
});

// [POST] Criar nova fase - http://localhost:3000/save-level
app.post("/save-level", (req, res) => {
const novaFase = { id: fases.length+1, ...req.body }; // cria uma nova fase com ID único
  fases.push(novaFase);

  res.json({
    message: `Fase salva com sucesso! Jogue em: ${API_url}/game.html?id=${novaFase.id}`,
       link: `${API_url}/saved-levels/${novaFase.id}`,
       gameLink: `http://localhost:5500/public/game.html?id=${novaFase.id}`

      });
});

// Iniciar servidor

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em ${API_url} 
               💾 ${API_url}/saved-levels
               🌐 ${API_url}/saved-levels/lastsave `);
});


// // [PUT] Atualizar usuário
// app.put("/usuarios/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const usuario = usuarios.find(u => u.id === id);

//   if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

//   usuario.nome = req.body.nome;
//   res.json(usuario);
// });

// // [DELETE] Deletar usuário
// app.delete("/usuarios/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   usuarios = usuarios.filter(u => u.id !== id);

//   res.json({ mensagem: "Usuário deletado com sucesso" });
// });

