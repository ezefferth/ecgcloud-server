import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import router from "./routes"; // ✅ Importando as rotas corretamente

import { MongoClient } from "mongodb";

const uri = "mongodb+srv://zefao:ecaf261996@cluster0.m32o0.mongodb.net/ecgcloud_server?retryWrites=true&w=majority&appName=Cluster0"

async function testMongoConnection() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Conexão bem-sucedida com o MongoDB!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
  } finally {
    await client.close();
  }
}

testMongoConnection();


/* 67cf58f83a012901656f9f9d */
const app = express();

// Habilita CORS para qualquer origem (Apenas para desenvolvimento, restrinja em produção)
app.use(cors({ origin: "*", credentials: true }));

// Middleware para leitura de JSON e URL Encoded
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser());

// ✅ Adicionando o uso do router
app.use(router); // Agora todas as rotas devem ser acessadas via /api

// Rota de teste
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Servidor rodando no localhost!" });
});

// Tratamento global de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro:", err.message);
  res.status(500).json({ error: err.message });
});

// Inicializa o servidor HTTP
const PORT = 3000;
http.createServer(app).listen(PORT, "localhost", () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
