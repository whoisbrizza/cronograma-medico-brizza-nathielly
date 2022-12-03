const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const login = (request, response) => {
  try {
    UserSchema.findOne({ email: request.body.email }, (err, user) => {
      console.log("Esse é o usuário:", user);

      if (!user) {
        return response.status(404).send({
          message: "Usuário não encontrado.",
          email: `${request.body.email}`,
        });
      }

      const validPassword = bcrypt.compareSync(
        request.body.password,
        user.password
      );

      if (!validPassword) {
        return response.status(401).send({
          message: "Senha inválida.",
          statusCode: 401,
        });
      }

      const token = jwt.sign({ name: user.name }, SECRET);
      console.log("O token é esse:", token);

      response.status(200).send({
        message: "Login efetuado com sucesso!",
        token,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  login,
};
