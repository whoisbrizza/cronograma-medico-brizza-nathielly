const mongoose = require("mongoose");
const UserSchema = require("../models/UserSchema");
const CirurgiaSchema = require("../models/CirurgiaSchema");
const ConsultaSchema = require("../models/ConsultaSchema");
const ExameSchema = require("../models/ExameSchema");
const MedicacaoSchema = require("../models/MedicacaoSchema");
const bcrypt = require("bcrypt");

const criarUsuario = async (request, response) => {
  const senhaHasheada = bcrypt.hashSync(request.body.password, 10);
  request.body.password = senhaHasheada;

  const verificaEmail = await UserSchema.exists({
    email: request.body.email,
  });

  if (verificaEmail) {
    return response.status(409).send({
      message: "Esse email já foi cadastrado!",
    });
  }

  try {
    const novoUsuario = new UserSchema(request.body);

    const usuarioSalvo = await novoUsuario.save();

    response.status(201).send({
      message: "Usuário cadastrado com sucesso!",
      usuarioSalvo,
    });
  } catch (err) {
    console.error(err);
    response.status(500).send({
      message: err.message,
    });
  }
};

const completoPorCpf = async (request, response) => {
  const { cpf_do_paciente } = request.params;
  try {
    const listaDeCirurgias = await CirurgiaSchema.find({ cpf_do_paciente });
    const listaDeConsultas = await ConsultaSchema.find({ cpf_do_paciente });
    const listaDeExames = await ExameSchema.find({ cpf_do_paciente });
    const listaDeMedicacoes = await MedicacaoSchema.find({ cpf_do_paciente });

    return response.status(200).send({
      lista_de_cirurgias: `Consta no seu cronograma: ${listaDeCirurgias.length} cirurgia(s).`,
      listaDeCirurgias,
      lista_de_consultas: `Consta no seu cronograma: ${listaDeConsultas.length} consulta(s).`,
      listaDeConsultas,
      lista_de_exames: `Consta no seu cronograma: ${listaDeExames.length} exame(s).`,
      listaDeExames,
      lista_de_medicacoes: `Consta no seu cronograma: ${listaDeMedicacoes.length} medicação/medicações.`,
      listaDeMedicacoes,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const consultas = async (request, response) => {
  try {
    const consulta = await ConsultaSchema.find();
    if (consulta.length > 1) {
      return response.status(200).json({
        message: `Consta no seu cronograma: ${consulta.length} consultas.`,
        consulta,
      });
    } else if (consulta.length == 1) {
      return response.status(200).json({
        message: `Consta no seu cronograma: ${consulta.length} consulta.`,
        consulta,
      });
    } else {
      return response.status(404).json({
        message: `Nenhuma consulta foi cadastrada no seu cronograma até o momento.`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const exames = async (request, response) => {
  try {
    const exame = await ExameSchema.find();
    if (exame.length > 1) {
      return response.status(200).json({
        message: `Consta no seu cronograma: ${exame.length} exames.`,
        exame,
      });
    } else if (exame.length == 1) {
      return response.status(200).json({
        message: `Consta no seu cronograma: ${exame.length} exame.`,
        exame,
      });
    } else {
      return response.status(404).json({
        message: `Nenhum exame foi cadastrado no seu cronograma até o momento.`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const cirurgias = async (request, response) => {
  try {
    const cirurgia = await CirurgiaSchema.find();
    if (cirurgia.length > 1) {
      return response.status(200).json({
        message: `Consta no seu cronograma: ${cirurgia.length} cirurgias.`,
        cirurgia,
      });
    } else if (cirurgia.length == 1) {
      return response.status(200).json({
        message: `Consta no seu cronograma: ${cirurgia.length} cirurgia.`,
        cirurgia,
      });
    } else {
      return response.status(404).json({
        message: `Nenhuma cirurgia foi cadastrada no seu cronograma até o momento.`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const medicacoes = async (request, response) => {
  try {
    const medicacao = await MedicacaoSchema.find();
    if (medicacao.length > 1) {
      return response.status(200).json({
        message: `Consta no seu cronograma: ${medicacao.length} medicações.`,
        medicacao,
      });
    } else if (medicacao.length == 1) {
      return response.status(200).json({
        message: `Consta no seu cronograma: ${medicacao.length} medicação.`,
        medicacao,
      });
    } else {
      return response.status(404).json({
        message: `Nenhuma medicação foi cadastrada no seu cronograma até o momento.`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const buscarPorId = async (request, response) => {
  const { id } = request.params;

  if (id.length < 24 || id.length > 24) {
    return response.status(404).json({
      message: `Por favor digite o id do item corretamente, o mesmo possui 24 caracteres.`,
    });
  }

  if (buscarPorId.length == 0) {
    return response.status(404).json({
      message: `Nenhum item foi encontrado para este id.`,
    });
  }

  try {
    const { id } = request.params;
    const listaDeCirurgiasPorId = await CirurgiaSchema.find({ id });
    const listaDeConsultasPorId = await ConsultaSchema.find({ id });
    const listaDeExamesPorId = await ExameSchema.find({ id });
    const listaDeMedicacoesPorId = await MedicacaoSchema.find({ id });

    return response.status(200).send({
      lista_de_cirurgias_por_id: `Consta no cronograma: ${listaDeCirurgiasPorId.length} cirurgia(s) para este id.`,
      listaDeCirurgiasPorId,
      lista_de_consultas_por_id: `Consta no cronograma: ${listaDeConsultasPorId.length} consulta(s) para este id.`,
      listaDeConsultasPorId,
      lista_de_exames_por_id: `Consta no cronograma: ${listaDeExamesPorId.length} exame(s) para este id.`,
      listaDeExamesPorId,
      lista_de_medicacoes_por_id: `Consta no cronograma: ${listaDeMedicacoesPorId.length} medicação/medicações para este id.`,
      listaDeMedicacoesPorId,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const criarConsulta = async (request, response) => {
  const {
    id,
    nome_do_paciente,
    idade_do_paciente,
    cpf_do_paciente,
    consulta,
    local_da_consulta,
    data_da_consulta,
    horario_da_consulta,
    alguma_observacao,
  } = request.body;

  const pacientePeloCpf = await ConsultaSchema.find({ cpf_do_paciente });

  let existeData = pacientePeloCpf.filter(
    (data) => data.data_da_consulta === data_da_consulta
  );

  let consultaExisteHorario = existeData.find(
    (horario) => horario.horario_da_consulta === horario_da_consulta
  );

  if (consultaExisteHorario) {
    return response.status(401).send({
      message:
        "Não é possível cadastrar nova consulta pois já existe consulta agendada para este dia e horário.",
    });
  }

  if (idade_do_paciente < 60) {
    return response.status(401).json({
      message: `O cronograma é destinado apenas para pacientes idosos.`,
    });
  }

  try {
    const novaConsulta = new ConsultaSchema({
      id: id,
      nome_do_paciente: nome_do_paciente,
      idade_do_paciente: idade_do_paciente,
      cpf_do_paciente: cpf_do_paciente,
      idade_do_paciente: idade_do_paciente,
      consulta: consulta,
      local_da_consulta: local_da_consulta,
      data_da_consulta: data_da_consulta,
      horario_da_consulta: horario_da_consulta,
      alguma_observacao: alguma_observacao,
    });

    const salvarConsulta = await novaConsulta.save();
    response.status(201).send({
      consulta_cadastrada: "Consulta cadastrada com sucesso:",
      salvarConsulta,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
    });
  }
};

const criarExame = async (request, response) => {
  const {
    id,
    nome_do_paciente,
    idade_do_paciente,
    cpf_do_paciente,
    exame,
    preparo_do_exame,
    local_do_exame,
    data_do_exame,
    horario_do_exame,
    alguma_observacao,
  } = request.body;

  const pacientePeloCpf = await ExameSchema.find({ cpf_do_paciente });

  let existeData = pacientePeloCpf.filter(
    (data) => data.data_do_exame === data_do_exame
  );

  let exameExisteHorario = existeData.find(
    (horario) => horario.horario_do_exame === horario_do_exame
  );
  if (exameExisteHorario) {
    return response.status(401).send({
      message:
        "Não é possível cadastrar novo exame pois já existe exame agendado para este dia e horário.",
    });
  }

  if (idade_do_paciente < 60) {
    return response.status(401).json({
      message: `O cronograma é destinado apenas para pacientes idosos.`,
    });
  }

  try {
    const novoExame = new ExameSchema({
      id: id,
      nome_do_paciente: nome_do_paciente,
      idade_do_paciente: idade_do_paciente,
      cpf_do_paciente: cpf_do_paciente,
      exame: exame,
      preparo_do_exame: preparo_do_exame,
      local_do_exame: local_do_exame,
      data_do_exame: data_do_exame,
      horario_do_exame: horario_do_exame,
      alguma_observacao: alguma_observacao,
    });

    const salvarExame = await novoExame.save();
    response.status(201).send({
      exame_cadastrado: "Exame cadastrado com sucesso:",
      salvarExame,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
    });
  }
};

const criarCirurgia = async (request, response) => {
  const {
    id,
    nome_do_paciente,
    idade_do_paciente,
    cpf_do_paciente,
    cirurgia,
    profissional_responsavel_pela_cirurgia,
    preparo_da_cirurgia,
    local_da_cirurgia,
    data_da_cirurgia,
    horario_da_cirurgia,
    alguma_observacao,
  } = request.body;

  const pacientePeloCpf = await CirurgiaSchema.find({ cpf_do_paciente });

  let existeData = pacientePeloCpf.filter(
    (data) => data.data_da_cirurgia === data_da_cirurgia
  );

  let cirurgiaExisteHorario = existeData.find(
    (horario) => horario.horario_da_cirurgia === horario_da_cirurgia
  );

  if (cirurgiaExisteHorario) {
    return response.status(401).send({
      message:
        "Não é possível cadastrar nova cirurgia pois já existe cirurgia agendada para este dia e horário.",
    });
  }

  if (idade_do_paciente < 60) {
    return response.status(401).json({
      message: `O cronograma é destinado apenas para pacientes idosos.`,
    });
  }

  try {
    const novaCirurgia = new CirurgiaSchema({
      id: id,
      nome_do_paciente: nome_do_paciente,
      idade_do_paciente: idade_do_paciente,
      cpf_do_paciente: cpf_do_paciente,
      cirurgia: cirurgia,
      profissional_responsavel_pela_cirurgia:
        profissional_responsavel_pela_cirurgia,
      preparo_da_cirurgia: preparo_da_cirurgia,
      local_da_cirurgia: local_da_cirurgia,
      data_da_cirurgia: data_da_cirurgia,
      horario_da_cirurgia: horario_da_cirurgia,
      alguma_observacao: alguma_observacao,
    });

    const salvarCirurgia = await novaCirurgia.save();
    response.status(201).send({
      cirurgia_cadastrada: "Cirurgia cadastrada com sucesso:",
      salvarCirurgia,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
    });
  }
};

const criarMedicacao = async (request, response) => {
  const {
    id,
    nome_do_paciente,
    idade_do_paciente,
    cpf_do_paciente,
    medicacao,
    precisa_de_receita,
    precisa_comprar,
    dosagem,
    horario_da_medicacao,
    alguma_observacao,
  } = request.body;

  try {
    if (idade_do_paciente < 60) {
      return response.status(401).json({
        message: `O cronograma é destinado apenas para pacientes idosos.`,
      });
    }

    const novaMedicacao = new MedicacaoSchema({
      id: id,
      nome_do_paciente: nome_do_paciente,
      idade_do_paciente: idade_do_paciente,
      cpf_do_paciente: cpf_do_paciente,
      medicacao: medicacao,
      precisa_de_receita: precisa_de_receita,
      precisa_comprar: precisa_comprar,
      dosagem: dosagem,
      horario_da_medicacao: horario_da_medicacao,
      alguma_observacao: alguma_observacao,
    });

    const salvarMedicacao = await novaMedicacao.save();
    response.status(201).send({
      medicacao_cadastrada: "Medicação cadastrada com sucesso:",
      salvarMedicacao,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
    });
  }
};

const atualizarConsulta = async (request, response) => {
  const { id } = request.params;

  const {
    nome_do_paciente,
    idade_do_paciente,
    cpf_do_paciente,
    consulta,
    local_da_consulta,
    data_da_consulta,
    horario_da_consulta,
    alguma_observacao,
  } = request.body;

  const pacientePeloCpf = await ConsultaSchema.find({ cpf_do_paciente });

  let existeData = pacientePeloCpf.filter(
    (data) => data.data_da_consulta === data_da_consulta
  );

  let consultaExisteHorario = existeData.find(
    (horario) => horario.horario_da_consulta === horario_da_consulta
  );

  if (consultaExisteHorario) {
    return response.status(401).send({
      message:
        "Não é possível atualizar esta consulta pois já existe consulta agendada para este dia e horário.",
    });
  }

  if (id.length < 24 || id.length > 24) {
    return response.status(404).json({
      message: `Por favor digite o id da consulta corretamente, o mesmo possui 24 caracteres.`,
    });
  }

  try {
    const consultaAtualizada = await ConsultaSchema.find({
      id,
    }).updateOne({
      nome_do_paciente,
      idade_do_paciente,
      cpf_do_paciente,
      consulta,
      local_da_consulta,
      data_da_consulta,
      horario_da_consulta,
      alguma_observacao,
    });

    const fichaDaConsultaAtualizada = await ConsultaSchema.find({ id });

    if (fichaDaConsultaAtualizada.length == 0) {
      return response.status(404).json({
        message: `A consulta não foi encontrada.`,
      });
    }
    response.status(200).send({
      consulta_atualizada: "Consulta atualizada com sucesso:",
      fichaDaConsultaAtualizada,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const atualizarExame = async (request, response) => {
  const { id } = request.params;

  const {
    nome_do_paciente,
    idade_do_paciente,
    cpf_do_paciente,
    exame,
    preparo_do_exame,
    local_do_exame,
    data_do_exame,
    horario_do_exame,
    alguma_observacao,
  } = request.body;

  const pacientePeloCpf = await ExameSchema.find({ cpf_do_paciente });

  let existeData = pacientePeloCpf.filter(
    (data) => data.data_do_exame === data_do_exame
  );

  let exameExisteHorario = existeData.find(
    (horario) => horario.horario_do_exame === horario_do_exame
  );
  if (exameExisteHorario) {
    return response.status(401).send({
      message:
        "Não é possível atualizar este exame pois já existe exame agendado para este dia e horário.",
    });
  }

  try {
    if (id.length < 24 || id.length > 24) {
      return response.status(404).json({
        message: `Por favor digite o id do exame corretamente, o mesmo possui 24 caracteres.`,
      });
    }

    const exameAtualizado = await ExameSchema.find({
      id,
    }).updateOne({
      nome_do_paciente,
      idade_do_paciente,
      cpf_do_paciente,
      exame,
      preparo_do_exame,
      local_do_exame,
      data_do_exame,
      horario_do_exame,
      alguma_observacao,
    });

    const fichaDoExameAtualizada = await ExameSchema.find({ id });

    if (fichaDoExameAtualizada.length == 0) {
      return response.status(404).json({
        message: `O exame não foi encontrado.`,
      });
    }
    response.status(200).send({
      exame_atualizado: "Exame atualizado com sucesso:",
      fichaDoExameAtualizada,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const atualizarCirurgia = async (request, response) => {
  const { id } = request.params;

  const {
    nome_do_paciente,
    idade_do_paciente,
    cpf_do_paciente,
    cirurgia,
    profissional_responsavel_pela_cirurgia,
    preparo_da_cirurgia,
    local_da_cirurgia,
    data_da_cirurgia,
    horario_da_cirurgia,
    alguma_observacao,
  } = request.body;

  const pacientePeloCpf = await CirurgiaSchema.find({ cpf_do_paciente });

  let existeData = pacientePeloCpf.filter(
    (data) => data.data_da_cirurgia === data_da_cirurgia
  );

  let cirurgiaExisteHorario = existeData.find(
    (horario) => horario.horario_da_cirurgia === horario_da_cirurgia
  );

  if (cirurgiaExisteHorario) {
    return response.status(401).send({
      message:
        "Não é possível atualizar esta cirurgia pois já existe cirurgia agendada para este dia e horário.",
    });
  }

  try {
    if (id.length < 24 || id.length > 24) {
      return response.status(404).json({
        message: `Por favor digite o id da cirurgia corretamente, o mesmo possui 24 caracteres.`,
      });
    }

    const cirurgiaAtualizada = await CirurgiaSchema.find({
      id,
    }).updateOne({
      nome_do_paciente,
      idade_do_paciente,
      cpf_do_paciente,
      cirurgia,
      profissional_responsavel_pela_cirurgia,
      preparo_da_cirurgia,
      local_da_cirurgia,
      data_da_cirurgia,
      horario_da_cirurgia,
      alguma_observacao,
    });

    const fichaDaCirurgiaAtualizada = await CirurgiaSchema.find({ id });

    if (fichaDaCirurgiaAtualizada.length == 0) {
      return response.status(404).json({
        message: `A cirurgia não foi encontrada.`,
      });
    }
    response.status(200).send({
      cirurgia_atualizada: "Cirurgia atualizada com sucesso:",
      fichaDaCirurgiaAtualizada,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const atualizarMedicacao = async (request, response) => {
  const { id } = request.params;

  const {
    nome_do_paciente,
    idade_do_paciente,
    cpf_do_paciente,
    medicacao,
    precisa_de_receita,
    precisa_comprar,
    dosagem,
    horario_da_medicacao,
    alguma_observacao,
  } = request.body;

  try {
    if (id.length < 24 || id.length > 24) {
      return response.status(404).json({
        message: `Por favor digite o id da medicação corretamente, o mesmo possui 24 caracteres.`,
      });
    }

    const medicacaoAtualizada = await MedicacaoSchema.find({
      id,
    }).updateOne({
      nome_do_paciente,
      idade_do_paciente,
      cpf_do_paciente,
      medicacao,
      precisa_de_receita,
      precisa_comprar,
      dosagem,
      horario_da_medicacao,
      alguma_observacao,
    });

    const fichaDaMedicacaoAtualizada = await MedicacaoSchema.find({ id });

    if (fichaDaMedicacaoAtualizada.length == 0) {
      return response.status(404).json({
        message: `A medicação não foi encontrada.`,
      });
    }
    response.status(200).send({
      medicacao_atualizada: "Medicação atualizada com sucesso:",
      fichaDaMedicacaoAtualizada,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const deletarItem = async (request, response) => {
  const { id } = request.params;

  if (id.length < 24 || id.length > 24) {
    return response.status(404).json({
      message: `Por favor digite o id do item corretamente, o mesmo possui 24 caracteres.`,
    });
  }

  try {
    const deletarCirurgiaPorId = await CirurgiaSchema.deleteOne({ id });
    const deletarConsultaPorId = await ConsultaSchema.deleteOne({ id });
    const deletarExamePorId = await ExameSchema.deleteOne({ id });
    const deletarMedicacaoPorId = await MedicacaoSchema.deleteOne({ id });

    if (
      deletarCirurgiaPorId.deletedCount === 1 ||
      deletarConsultaPorId.deletedCount === 1 ||
      deletarExamePorId.deletedCount === 1 ||
      deletarMedicacaoPorId.deletedCount === 1
    ) {
      return response.status(200).send({
        message: `O item foi deletado com sucesso!`,
      });
    } else {
      return response.status(404).send({
        message: "O item não foi encontrado.",
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  criarUsuario,
  completoPorCpf,
  consultas,
  exames,
  cirurgias,
  medicacoes,
  buscarPorId,
  criarConsulta,
  criarExame,
  criarCirurgia,
  criarMedicacao,
  atualizarConsulta,
  atualizarExame,
  atualizarCirurgia,
  atualizarMedicacao,
  deletarItem,
};
