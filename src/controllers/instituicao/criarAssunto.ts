import { Request, Response } from 'express'
import { prismaClient } from '../../prismaClient'

import { Prisma } from '@prisma/client';


export class CriarAssunto {
  async handle(request: Request, response: Response) {

    const { nome, categoriaId, tempoLimite } = request.body

    try {
      const Assunto = await prismaClient.assuntos.create({
        data: {
          nome,
          categoriaId,
          tempoLimite
        },
      })
      //console.log('Usuário criado com sucesso:', usuario);
      return response.status(200).json(Assunto)
    }
    catch (e) {
      //console.error('Erro ao criar usuário:', e);
      if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        // The .code property can be accessed in a type-safe manner
        return response.status(409).json(e)
      }
      return response.status(500).json({ erro: 'Erro no servidor' });
    }
  }
}