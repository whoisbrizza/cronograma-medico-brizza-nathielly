require("dotenv").config();

const app = require("./src/app");
const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(
    `Cronograma Médico para Filhos que Cuidam dos Pais Idosos rodando na porta ${PORT}!`
  )
);
