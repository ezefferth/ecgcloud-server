/*
  Warnings:

  - You are about to drop the column `enderecoId` on the `instituicao` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoId` on the `paciente` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "instituicao" DROP CONSTRAINT "instituicao_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "paciente" DROP CONSTRAINT "paciente_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_enderecoId_fkey";

-- DropIndex
DROP INDEX "instituicao_enderecoId_key";

-- AlterTable
ALTER TABLE "instituicao" DROP COLUMN "enderecoId",
ADD COLUMN     "bairro" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "cep" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "cidade" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "logradouro" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "numero" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "pais" TEXT NOT NULL DEFAULT 'BR',
ADD COLUMN     "tipoLogradouro" TEXT NOT NULL DEFAULT ' ';

-- AlterTable
ALTER TABLE "paciente" DROP COLUMN "enderecoId",
ADD COLUMN     "bairro" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "cep" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "cidade" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "logradouro" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "numero" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "pais" TEXT NOT NULL DEFAULT 'BR',
ADD COLUMN     "tipoLogradouro" TEXT NOT NULL DEFAULT ' ';

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "enderecoId",
ADD COLUMN     "bairro" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "cep" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "cidade" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "logradouro" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "numero" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "pais" TEXT NOT NULL DEFAULT 'BR',
ADD COLUMN     "tipoLogradouro" TEXT NOT NULL DEFAULT ' ';

-- DropTable
DROP TABLE "endereco";
