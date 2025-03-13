import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import router from "./routes"; // ✅ Importando as rotas corretamente



const app = express();

// Habilita CORS para qualquer origem (Apenas para desenvolvimento, restrinja em produção)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

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
