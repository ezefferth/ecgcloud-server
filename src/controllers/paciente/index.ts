import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { Prisma } from "@prisma/client";

export async function CriarPaciente(request: Request, response: Response) {
  const {
    nome,
    email,
    contato,
    dataNascimento,
    genero,
    historicoMedico,
    observacoes,
    instituicaoId,
    enderecoId,
  } = request.body;

  try {
    const paciente = await prismaClient.paciente.create({
      data: {
        nome,
        email,
        contato,
        dataNascimento,
        genero,
        historicoMedico,
        observacoes,
        instituicaoId,
        enderecoId,
      },
    });
    return response.status(200).json(paciente);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(409).json(e);
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function LerPacientes(request: Request, response: Response) {
  try {
    const pacientes = await prismaClient.paciente.findMany();
    return response.status(200).json(pacientes);
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao buscar pacientes" });
  }
}

export async function AtualizarPaciente(request: Request, response: Response) {
  const { id } = request.params;
  const {
    nome,
    email,
    contato,
    dataNascimento,
    genero,
    historicoMedico,
    observacoes,
    instituicaoId,
    enderecoId,
  } = request.body;

  try {
    const paciente = await prismaClient.paciente.update({
      where: { id },
      data: {
        nome,
        email,
        contato,
        dataNascimento,
        genero,
        historicoMedico,
        observacoes,
        instituicaoId,
        enderecoId,
      },
    });
    return response.status(200).json(paciente);
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao atualizar paciente" });
  }
}

export async function RemoverPaciente(request: Request, response: Response) {
  const { id } = request.params;
  try {
    await prismaClient.paciente.delete({
      where: { id },
    });
    return response
      .status(200)
      .json({ message: "Paciente removido com sucesso" });
  } catch (e) {
    return response.status(500).json({ erro: "Erro ao remover paciente" });
  }
}
