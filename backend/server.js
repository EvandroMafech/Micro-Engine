// API RESTful simples com Express.js
const express = require("express"); // importa o Express
const app = express(); // cria uma aplicação Express
const cors = require("cors");
const path = require("path");

// serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname,"..", "public")));

// habilita CORS para todas as origens
app.use(cors()); // permite requisições de qualquer origem
app.use(express.json()); // permite trabalhar com JSON no body das requisições
const port = process.env.PORT || 3000;
// Banco de dados (em memória)
let fases = [] // objeto para armazenar fases

// Rota inicial - http://localhost:3000/
// app.get("/", (req, res) => {
//   res.send("Servidor rodando! 🚀");
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"..", "public", "index.html"));
});

// [GET] Listar usuários - http://localhost:3000/saved-levels
app.get("/saved-levels", (req, res) => {
  res.json(fases);
});

///http://localhost:3000/saved-levels/lastsave
app.get("/saved-levels/lastsave",(req,res) => {
  res.json(fases.length) // retorna a última fase salva
})

// [GET] Buscar usuário por ID - http://localhost:3000/fases/1
app.get("/saved-levels/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const fase = fases.find(f => f.id === id);
  
  if (!fase) return res.status(404).json({ erro: "Fase não encontrada" });

  res.json(fase);
});

// [POST] Criar novo usuário - http://localhost:3000/save-level
app.post("/save-level", (req, res) => {
const novaFase = { id: fases.length+1, ...req.body }; // cria uma nova fase com ID único
  fases.push(novaFase);

  res.json({
    message: `Fase salva com sucesso! Jogue em: https://micro-engine.onrender.com/game.html?id=${novaFase.id}`,
       link: `https://micro-engine.onrender.com/saved-levels/${novaFase.id}`,
       gameLink: `https://micro-engine.onrender.com/game.html?id=${novaFase.id}`
});
});

// Iniciar servidor

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em https://micro-engine.onrender.com 💾 https://micro-engine.onrender.com/saved-levels`);
  console.log(process.env)
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

