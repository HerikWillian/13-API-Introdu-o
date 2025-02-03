import dotenv from "dotenv"; // Carregar variáveis de ambiente
import express from "express"; // Requisição do pacote express
import { selectUsuarios } from "./db/index.js"; // Importa o método selectUsuarios

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
import { selectUsuarios, selectUsuario } from "./db/index.js";

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

//index.js
app.use(express.json());

//index.js
import { selectUsuarios, selectUsuario, insertUsuario } from "./db/index.js";

//index.js
app.post("/usuario", async (req, res) => {
  console.log("Rota POST /usuario solicitada");
  try {
    await insertUsuario(req.body);
    res.status(201).json({ message: "Usuário inserido com sucesso!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

//index.js
import { selectUsuarios, selectUsuario, insertUsuario, deleteUsuario } from "./db/index.js";

//index.js
app.delete("/usuario/:id", async (req, res) => {
  console.log("Rota DELETE /usuario/# solicitada");
  try {
    const usuario = await selectUsuario(req.params.id);
    if (usuario.length > 0) {
      await deleteUsuario(req.params.id);
      res.status(200).json({ message: "Usuário excluido com sucesso!!" });
    } else res.status(404).json({ message: "Usuário não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

//index.js
import { selectUsuarios, selectUsuario, insertUsuario, deleteUsuario, updateUsuario } from "./db/index.js";

//index.js
app.put("/usuario/:id", async (req, res) => {
  console.log("Rota PUT /usuario/# solicitada");
  try {
    const id = req.params.id;
    const usuario = await selectUsuario(id);
    if (usuario.length > 0) {
      await updateUsuario(id, req.body);
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } else res.status(404).json({ message: "Usuário não encontrado!" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

//src/routes/usuario.js
import { Router } from "express";

//src/routes/usuario.js
const router = Router();

router.get("/usuario", async (req, res) => {
  console.log(`Rota GET /usuarios solicitada pelo usuario ${req.userId}`);
  try {
    const usuarios = await selectUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});
export default router;