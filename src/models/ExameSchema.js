const mongoose = require("mongoose");

const exameSchema = new mongoose.Schema(
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
    exame: {
      type: String,
      required: true,
    },
    preparo_do_exame: {
      type: String,
      required: false,
    },
    local_do_exame: {
      type: String,
      required: true,
    },
    data_do_exame: {
      type: String,
      required: true,
    },
    horario_do_exame: {
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

module.exports = mongoose.model("exame", exameSchema);
