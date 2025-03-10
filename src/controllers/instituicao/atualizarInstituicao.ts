import { Request, Response } from 'express'
import { prismaClient } from '../../prismaClient'

import { Prisma } from '@prisma/client';


export class AtualizarInstituicao{
  async handle(request: Request, response: Response) {

    const { id, nome, contato, responsavel } = request.body

    try {
      const instituicao = await prismaClient.instituicao.update({
        where: {
          id: id,
        },
        data: {
          nome,
          contato,
          responsavel,
        }
      })

      return response.status(200).json(instituicao)
    }
    catch (e) {

      if (e instanceof Prisma.PrismaClientUnknownRequestError) {

        return response.status(409).json(e)
      }
      return response.status(500).json({ erro: 'Erro no servidor' });
    }
  }
}