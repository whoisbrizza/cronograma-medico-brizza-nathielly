const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const cronogramaController = require("../controllers/cronogramaController");

const { checkAuth } = require("../middlewares/auth");

router.post("/criar-usuario", cronogramaController.criarUsuario);
router.post("/login", authController.login);
router.get("/completo/:cpf_do_paciente", cronogramaController.completoPorCpf);
router.get("/consultas", cronogramaController.consultas);
router.get("/exames", cronogramaController.exames);
router.get("/cirurgias", cronogramaController.cirurgias);
router.get("/medicacoes", cronogramaController.medicacoes);
router.get("/buscar-por-id/:id", cronogramaController.buscarPorId);
router.post("/criar-consulta", cronogramaController.criarConsulta);
router.post("/criar-exame", cronogramaController.criarExame);
router.post("/criar-cirurgia", cronogramaController.criarCirurgia);
router.post("/criar-medicacao", cronogramaController.criarMedicacao);
router.put(
  "/atualizar-consulta/:id",
  checkAuth,
  cronogramaController.atualizarConsulta
);
router.put(
  "/atualizar-exame/:id",
  checkAuth,
  cronogramaController.atualizarExame
);
router.put(
  "/atualizar-cirurgia/:id",
  checkAuth,
  cronogramaController.atualizarCirurgia
);
router.put(
  "/atualizar-medicacao/:id",
  checkAuth,
  cronogramaController.atualizarMedicacao
);
router.delete("/deletar-item/:id", checkAuth, cronogramaController.deletarItem);

module.exports = router;
