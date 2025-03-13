-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_instituicaoId_fkey";

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "instituicao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
