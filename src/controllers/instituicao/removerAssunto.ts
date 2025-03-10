import { Request, Response } from 'express'
import { prismaClient } from '../../prismaClient'

import { Prisma } from '@prisma/client';


export class RemoverAssunto {
  async handle(request: Request, response: Response) {

    const { id } = request.body

    try {
      const Assunto = await prismaClient.assuntos.delete({
        where: {
          id: id,
        },
      })

      return response.status(200).json(Assunto)
    }
    catch (e) {

      if (e instanceof Prisma.PrismaClientUnknownRequestError) {

        return response.status(409).json(e)
      }
      return response.status(500).json({ erro: 'Erro no servidor' });
    }
  }
}