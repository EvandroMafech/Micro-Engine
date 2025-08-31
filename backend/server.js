// API RESTful simples com Express.js
const express = require("express"); // importa o Express
const app = express(); // cria uma aplicação Express
const cors = require("cors");
// habilita CORS para todas as origens
app.use(cors()); // permite requisições de qualquer origem
app.use(express.json()); // permite trabalhar com JSON no body das requisições
const port = 3000; // porta padrão
// Banco de dados (em memória)
let fases = [] // objeto para armazenar fases

// Rota inicial - http://localhost:3000/
app.get("/", (req, res) => {
  res.send("API para Salvar/Carregar Rodando! 🚀");
});

// [GET] Listar usuários - http://localhost:3000/fases
app.get("/fases", (req, res) => {
  res.json(fases);
});

// [GET] Buscar usuário por ID - http://localhost:3000/fases/1
app.get("/fases/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const fase = fases.find(f => f.id === id);
  
  if (!fase) return res.status(404).json({ erro: "Fase não encontrada" });

  res.json(fase);
});

// [POST] Criar novo usuário - http://localhost:3000/fase
app.post("/fase", (req, res) => {
const novaFase = { id: fases.length+1, ...req.body }; // cria uma nova fase com ID único
  fases.push(novaFase);

  res.json({
    message: "Fase salva com sucesso!",
    link: `http://localhost:${port}/fases/${novaFase.id}`,
});
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

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});