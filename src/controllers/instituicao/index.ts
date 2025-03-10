import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { Prisma } from "@prisma/client";

export async function CriarInstituicao(request: Request, response: Response) {
  const { nome, contato, responsavel, enderecoId } = request.body;

  try {
    const instituicao = await prismaClient.instituicao.create({
      data: { nome, contato, responsavel, enderecoId },
    });

    return response.status(200).json(instituicao);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(409).json(e);
    }
    return response.status(500).json({ erro: "Erro no servidor", detalhe: e });
  }
}

export async function LerInstituicoes(request: Request, response: Response) {
  try {
    const instituicoes = await prismaClient.instituicao.findMany();
    return response.status(200).json(instituicoes);
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao buscar instituições" });
  }
}

export async function AtualizarInstituicao(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const { nome, contato, responsavel, enderecoId } = request.body;

  try {
    const instituicao = await prismaClient.instituicao.update({
      where: { id },
      data: {
        nome,
        contato,
        responsavel,
        enderecoId,
      },
    });
    return response.status(200).json(instituicao);
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao atualizar instituição" });
  }
}

export async function RemoverInstituicao(request: Request, response: Response) {
  const { id } = request.params;
  try {
    await prismaClient.instituicao.delete({
      where: { id },
    });
    return response
      .status(200)
      .json({ message: "Instituição removida com sucesso" });
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao remover instituição" });
  }
}
