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
    pais,
    tipo,
    fkId,
  } = request.body;

  try {
    const endereco = await prismaClient.endereco.create({
      data: {
        tipoLogradouro,
        logradouro,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        pais,
      },
    });

    if (tipo === "instituicao") {
      await prismaClient.instituicao.update({
        where: { id: fkId },
        data: { enderecoId: endereco.id },
      });
    } else if (tipo === "paciente") {
      await prismaClient.paciente.update({
        where: { id: fkId },
        data: { enderecoId: endereco.id },
      });
    } else if (tipo === "usuario") {
      await prismaClient.usuario.update({
        where: { id: fkId },
        data: { enderecoId: endereco.id },
      });
    }

    return response.status(200).json(endereco);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(409).json(e);
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function LerEnderecos(request: Request, response: Response) {
  try {
    const enderecos = await prismaClient.endereco.findMany();
    return response.status(200).json(enderecos);
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao buscar endereços" });
  }
}

export async function AtualizarEndereco(request: Request, response: Response) {
  const { id } = request.params;
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
    return response.status(500).json({ erro: "Erro ao atualizar endereço" });
  }
}

export async function RemoverEndereco(request: Request, response: Response) {
  const { id } = request.params;
  try {
    await prismaClient.endereco.delete({
      where: { id },
    });
    return response
      .status(200)
      .json({ message: "Endereço removido com sucesso" });
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao remover endereço" });
  }
}
