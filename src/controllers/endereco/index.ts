import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { Prisma } from "@prisma/client";

export async function CriarEndereco(request: Request, response: Response) {
  const {
    tipoLogradouro,
    logradouro,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    tipo,
    fkId,
  } = request.body;

  try {
    // 🔹 Verifica se o ID fornecido existe no banco antes de criar o endereço
    let entidadeExiste;
    if (tipo === "instituicao") {
      entidadeExiste = await prismaClient.instituicao.findUnique({
        where: { id: fkId },
      });
    } else if (tipo === "paciente") {
      entidadeExiste = await prismaClient.paciente.findUnique({
        where: { id: fkId },
      });
    } else if (tipo === "usuario") {
      entidadeExiste = await prismaClient.usuario.findUnique({
        where: { id: fkId },
      });
    } else {
      return response.status(400).json({ erro: "Tipo inválido." });
    }

    if (!entidadeExiste) {
      return response.status(404).json({ erro: "ID não encontrado no banco." });
    }

    // 🔹 Cria o endereço
    const endereco = await prismaClient.endereco.create({
      data: {
        tipoLogradouro,
        logradouro,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        ...(tipo === "instituicao"
          ? { instituicao: { connect: { id: fkId } } }
          : tipo === "paciente"
          ? { paciente: { connect: { id: fkId } } }
          : tipo === "usuario"
          ? { usuario: { connect: { id: fkId } } }
          : {}),
      },
    });

    return response
      .status(201)
      .json({ mensagem: "Endereço criado com sucesso!", endereco });
  } catch (e) {
    console.error("Erro ao criar endereço:", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(409).json({ erro: e.message });
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}
export async function LerEnderecos(request: Request, response: Response) {
  const { id } = request.body;
  try {
    const enderecos = await prismaClient.endereco.findMany({
      // where: {
      //   id: id,
      // },
    });
    return response.status(200).json(enderecos);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function AtualizarEndereco(request: Request, response: Response) {
  const { id } = request.body;
  const { tipoLogradouro, logradouro, numero, bairro, cep, cidade, estado } =
    request.body;

  try {
    const endereco = await prismaClient.endereco.update({
      where: { id },
      data: {
        tipoLogradouro,
        logradouro,
        numero,
        bairro,
        cep,
        cidade,
        estado,
      },
    });
    return response.status(200).json(endereco);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function RemoverEndereco(request: Request, response: Response) {
  const { id } = request.body;
  try {
    await prismaClient.endereco.delete({
      where: { id },
    });
    return response
      .status(200)
      .json({ message: "Endereço removido com sucesso" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}
