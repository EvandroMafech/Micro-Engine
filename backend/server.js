// API RESTful simples com Express.js
const express = require("express"); // importa o Express
const app = express(); // cria uma aplicação Express
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path"); //usado para facilitar os caminhos do frontend
const API_url = "https://micro-engine.onrender.com";
const port = process.env.PORT || 3600; //define a porta do servidor dinamicamente
const JWT_SECRET = "meusegredosuperseguro";
app.use(express.static(path.join(__dirname,"..", "public"))); // serve arquivos estáticos da pasta public
app.use(cors()); // permite requisições de qualquer origem // habilita CORS para todas as origens
app.use(express.json()); // permite trabalhar com JSON no body das requisições

// Banco de dados (em memória)
let levels = []; // objeto para armazenar levels
let users = []; // objeto para listar usuários

app.get("/", (req, res) => { //define a rota da página inicial
  res.sendFile(path.join(__dirname,"..", "public", "index.html"));
});

// app.get("/", (req, res) => {
//   //define a rota da página inicial
//   res.send("Servidor rodando!");
// });

//  Listar usuários -
app.get("/saved-levels", (req, res) => {
  res.json(levels);
});

app.get("/users/usernames", (req, res) => {
  const userNames = users.map(u => {
    if(u.Usarname =! "") return u.userName 
})
  res.json(userNames);
});

app.get("/info", (req, res) => {
  res.json(`Numero de contas criadas: ${users.length}`);
});


app.get("/saved-levels/lastsave/:id", (req, res) => {
  const saveId = req.params.id;
  const save = levels.find(u => u.id === saveId);
  const result = save ? "true": "false"
  res.json(result); 
});


app.get("/saved-levels/:id", (req, res) => {
  const levelId = req.params.id
  const level = levels.find(f => f.id === levelId);

  if (!level) return res.status(404).json({ erro: "Fase não encontrada" });

  res.json(level);
});


app.post("/save-level", authMiddleware, (req, res) => {
  const novaFase = { id: req.body.userId, ...req.body.fase }; // cria uma nova fase com ID único
  levels.push(novaFase);

  res.json({
    gameLink: `${API_url}/game.html?id=${novaFase.id}`,
  });
});

// [PUT] Atualizar save
app.put("/save-level/:id",authMiddleware, (req, res) => {
  const id = req.params.id
  let level = levels.find(u => u.id === id);
   
  if (!level) return res.status(404).json({ msg: "Sua sessão foi encerrada" });

  const saveIndex = levels.indexOf(level);
  levels[saveIndex] = { id: id, ...req.body }
  
   res.json({
     gameLink: `${API_url}/game.html?id=${level.id}`,
   });
});

app.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  const userExist = users.find((u) => u.userName === userName);
  if (userExist) return res.status(400).json({ msg: "Usuário já existe" });

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ userName, passwordHash });

  res
    .status(201)
    .json({ msg: "Usuário cadastrado com sucesso!", liberation: true });
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = users.find((u) => u.userName === userName);
  if (!user) {
    return res.status(404).json({ msg: "Usuário Não encontrado" });
  }
  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return res.status(401).json({ msg: "Senha Incorreta" });
  }

  const token = jwt.sign({ user: user.userName }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    msg: "login bem-sucedido",
    liberation: true,
    user: user.userName,
    token
  });
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Token não fornecido" });
 
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // salva info do usuário na req
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Sessão expirada, faça o login para salvar"});
  }
}

// Iniciar servidor

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em ${API_url} 
               💾 ${API_url}/saved-levels
               🌐 ${API_url}/saved-levels/lastsave `);
});
