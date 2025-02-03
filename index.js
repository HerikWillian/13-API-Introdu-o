import dotenv from "dotenv"; // Carregar variáveis de ambiente
import express from "express"; // Requisição do pacote express
import { selectUsuarios } from "./bd.js"; // Importa o método selectUsuarios

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const app = express(); // Instancia o Express (sem parâmetros)
const port = process.env.PORT || 3000; // Porta definida via variável de ambiente ou padrão 3000

// Rota da raiz do projeto
app.get("/", (req, res) => {
  console.log("Rota / solicitada");
  res.json({
    nome: "Herik Willian Nogueira Soares e Yury Gabriel", // Substitua pelo seu nome
  });
});

// Rota /usuarios para buscar usuários
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await selectUsuarios(); // Busca os usuários
    res.json(usuarios);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }

  console.log("Rota GET/usuarios solicitada");
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Serviço escutando na porta: ${port}`);
});

//index.js
import { selectUsuarios, selectUsuario } from "./bd.js";

//index.js
app.get("/usuario/:id", async (req, res) => {
  console.log("Rota GET /usuario/# solicitada");
  try {
    const usuario = await selectUsuario(req.params.id);
    if (usuario.length > 0) res.json(usuario);
    else res.status(404).json({ message: "Usuário não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});