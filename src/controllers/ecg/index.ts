import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { Prisma } from "@prisma/client";

export async function CriarEcg(request: Request, response: Response) {
  const { pacienteId, idDispositivo, sinalECG, freqAmostragem, ritmoCardiaco } =
    request.body;

  try {
    const ecg = await prismaClient.ecg.create({
      data: {
        pacienteId,
        idDispositivo,
        sinalECG,
        freqAmostragem,
        ritmoCardiaco,
      },
    });
    return response.status(200).json(ecg);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(409).json(e);
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function LerEcgs(request: Request, response: Response) {
  try {
    const ecgs = await prismaClient.ecg.findMany();
    return response.status(200).json(ecgs);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function AtualizarEcg(request: Request, response: Response) {
  const { id } = request.body;
  const { pacienteId, idDispositivo, sinalECG, freqAmostragem, ritmoCardiaco } =
    request.body;

  try {
    const ecg = await prismaClient.ecg.update({
      where: { id },
      data: {
        pacienteId,
        idDispositivo,
        sinalECG,
        freqAmostragem,
        ritmoCardiaco,
      },
    });
    return response.status(200).json(ecg);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function RemoverEcg(request: Request, response: Response) {
  const { id } = request.body;
  try {
    await prismaClient.ecg.delete({
      where: { id },
    });
    return response.status(200).json({ message: "ECG removido com sucesso" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}
