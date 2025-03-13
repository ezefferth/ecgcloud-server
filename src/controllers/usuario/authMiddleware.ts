import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "chave_secreta_super_segura";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    nomeUsuario: string;
  };
}
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; nomeUsuario: string };
    req.user = decoded; // 🔹 Agora o TypeScript sabe que `req.user` existe
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}