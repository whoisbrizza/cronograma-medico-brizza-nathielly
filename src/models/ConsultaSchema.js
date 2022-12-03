const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    nome_do_paciente: {
      type: String,
      required: true,
    },
    idade_do_paciente: {
      type: Number,
      required: true,
    },
    cpf_do_paciente: {
      type: String,
      required: true,
    },
    consulta: {
      type: String,
      required: true,
    },
    local_da_consulta: {
      type: String,
      required: true,
    },
    data_da_consulta: {
      type: String,
      required: true,
    },
    horario_da_consulta: {
      type: String,
      required: true,
    },
    alguma_observacao: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("consulta", consultaSchema);
