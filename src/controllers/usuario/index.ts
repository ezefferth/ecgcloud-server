import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function CriarUsuario(request: Request, response: Response) {
  const {
    nome,
    email,
    sobreNome,
    nomeUsuario,
    senha,
    contato,
    instituicaoId,
    admin,
  } = request.body;

  const senhaHashed = await bcrypt.hash(senha, 10);

  try {
    const usuario = await prismaClient.usuario.create({
      data: {
        nome,
        sobreNome,
        nomeUsuario,
        senha: senhaHashed,
        email,
        contato,
        instituicaoId,
        admin,
      },
    });
    return response.status(200).json(usuario);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(409).json(e);
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function LerUsuarios(request: Request, response: Response) {
  const { id } = request.body;
  try {
    const usuarios = await prismaClient.usuario.findMany({
      // where: {
      //   id,
      // },
    });
    return response.status(200).json(usuarios);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function AtualizarUsuario(request: Request, response: Response) {
  const { id } = request.body;
  const {
    nome,
    email,
    contato,
    instituicaoId,
    admin,
    tipoLogradouro,
    logradouro,
    numero,
    bairro,
    cep,
    estado,
    cidade,
  } = request.body;

  try {
    const usuario = await prismaClient.usuario.update({
      where: { id },
      data: {
        nome,
        email,
        contato,
        instituicaoId,
        admin,
        tipoLogradouro,
        logradouro,
        numero,
        bairro,
        cep,
        estado,
        cidade,
      },
    });
    return response.status(200).json(usuario);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function RemoverUsuario(request: Request, response: Response) {
  const { id } = request.body;
  try {
    await prismaClient.usuario.delete({
      where: { id },
    });
    return response
      .status(200)
      .json({ message: "Usuário removido com sucesso" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

/* Login de usuário */
export async function LoginUsuario(request: Request, response: Response) {
  const { nomeUsuario, senha } = request.body;
  try {
    const usuario = await prismaClient.usuario.findUnique({
      where: { nomeUsuario: nomeUsuario },
    });
    if (!usuario) {
      return response.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(senha, usuario.senha);
    if (!passwordMatch) {
      return response.status(401).json({ mensagem: "Senha incorreta" });
    }
    const token = jwt.sign({ id: usuario.id, nomeUsuario }, "3cgcl0ud1", {
      expiresIn: "2h",
    });
    response.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Proteção contra CSRF
      maxAge: 2 * 60 * 60 * 1000,
    });

    return response.status(200).json({ usuario, token });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

import { AuthRequest } from "./authMiddleware";

export async function VerificaLogin(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    const usuario = await prismaClient.usuario.findUnique({
      where: { id: req.user.id }, // 🔹 Agora `req.user.id` é reconhecido pelo TypeScript
    });

    if (!usuario) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    return res.status(200).json({ usuario });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao verificar usuário" });
  }
}
