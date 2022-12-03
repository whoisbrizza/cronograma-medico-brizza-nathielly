const mongoose = require("mongoose");

const cirurgiaSchema = new mongoose.Schema(
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
    cirurgia: {
      type: String,
      required: true,
    },
    profissional_responsavel_pela_cirurgia: {
      type: String,
      required: true,
    },
    preparo_da_cirurgia: {
      type: String,
      required: false,
    },
    local_da_cirurgia: {
      type: String,
      required: true,
    },
    data_da_cirurgia: {
      type: String,
      required: true,
    },
    horario_da_cirurgia: {
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

module.exports = mongoose.model("cirurgia", cirurgiaSchema);
