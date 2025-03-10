import { Request, Response } from 'express'
import { prismaClient } from '../../prismaClient'

import { Prisma } from '@prisma/client';


export class LerAssuntos {
  async handle(request: Request, response: Response) {

    try {
      const Assuntos = await prismaClient.assuntos.findMany({
        orderBy: {
          nome: 'asc'
        }
      })

      return response.status(200).json(Assuntos)
    }
    catch (e) {

      if (e instanceof Prisma.PrismaClientUnknownRequestError) {

        return response.status(409).json(e)
      }
      return response.status(500).json({ erro: 'Erro no servidor' });
    }
  }
}