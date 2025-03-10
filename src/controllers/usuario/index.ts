import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { Prisma } from "@prisma/client";

export async function CriarUsuario(request: Request, response: Response) {
  const {
    nome,
    email,
    contato,
    instituicaoId,
    // enderecoId,
    admin,
  } = request.body;

  try {
    const usuario = await prismaClient.usuario.create({
      data: {
        nome,
        email,
        contato,
        instituicaoId,
        // enderecoId,
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
  try {
    const usuarios = await prismaClient.usuario.findMany();
    return response.status(200).json(usuarios);
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao buscar usuários" });
  }
}

export async function AtualizarUsuario(request: Request, response: Response) {
  const { id } = request.params;
  const { nome, email, contato, instituicaoId, enderecoId, admin } =
    request.body;

  try {
    const usuario = await prismaClient.usuario.update({
      where: { id },
      data: {
        nome,
        email,
        contato,
        instituicaoId,
        enderecoId,
        admin,
      },
    });
    return response.status(200).json(usuario);
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
}

export async function RemoverUsuario(request: Request, response: Response) {
  const { id } = request.params;
  try {
    await prismaClient.usuario.delete({
      where: { id },
    });
    return response
      .status(200)
      .json({ message: "Usuário removido com sucesso" });
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao remover usuário" });
  }
}
