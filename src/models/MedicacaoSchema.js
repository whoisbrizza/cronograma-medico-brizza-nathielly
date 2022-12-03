const mongoose = require("mongoose");

const medicacaoSchema = new mongoose.Schema(
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
    medicacao: {
      type: String,
      required: true,
    },
    precisa_de_receita: {
      type: Boolean,
      required: true,
    },
    precisa_comprar: {
      type: Boolean,
      required: true,
    },
    dosagem: {
      type: String,
      required: true,
    },
    horario_da_medicacao: {
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

module.exports = mongoose.model("medicacao", medicacaoSchema);
