import { Router } from "express";

import {
  AtualizarInstituicao,
  CriarInstituicao,
  LerInstituicoes,
  RemoverInstituicao,
} from "./controllers/instituicao";
import {
  AtualizarPaciente,
  CriarPaciente,
  LerPacientes,
  RemoverPaciente,
} from "./controllers/paciente";
import {
  AtualizarUsuario,
  CriarUsuario,
  LerUsuarios,
  RemoverUsuario,
} from "./controllers/usuario";
import { AtualizarEcg, CriarEcg, LerEcgs, RemoverEcg } from "./controllers/ecg";
import {
  AtualizarEndereco,
  CriarEndereco,
  LerEnderecos,
  RemoverEndereco,
} from "./controllers/endereco";
// import express, {  } from "express";
const router = Router();

// const app = express();

router.post("/instituicao/criar", CriarInstituicao);
router.get("/instituicao/ler", LerInstituicoes);
router.post("/instituicao/atualizar", AtualizarInstituicao);
router.post("/instituicao/remover", RemoverInstituicao);

router.post("/paciente/criar", CriarPaciente);
router.get("/paciente/ler", LerPacientes);
router.post("/paciente/atualizar", AtualizarPaciente);
router.post("/paciente/remover", RemoverPaciente);

router.post("/usuario/criar", CriarUsuario);
router.get("/usuario/ler", LerUsuarios);
router.post("/usuario/atualizar", AtualizarUsuario);
router.post("/usuario/remover", RemoverUsuario);

router.post("/ecg/criar", CriarEcg);
router.get("/ecg/ler", LerEcgs);
router.post("/ecg/atualizar", AtualizarEcg);
router.post("/ecg/remover", RemoverEcg);

router.post("/endereco/criar", CriarEndereco);
router.get("/endereco/ler", LerEnderecos);
router.post("/endereco/atualizar", AtualizarEndereco);
router.post("/endereco/remover", RemoverEndereco);

export default router;
