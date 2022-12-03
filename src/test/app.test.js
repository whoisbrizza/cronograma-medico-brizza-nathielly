const app = require("../app");
const request = require("supertest");
const modelCirurgia = require("../models/CirurgiaSchema");
const modelConsulta = require("../models/ConsultaSchema");
const modelExame = require("../models/ExameSchema");
const modelMedicacao = require("../models/MedicacaoSchema");
const modelUser = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

describe("Cronograma Controller", () => {
  const token = "bearer" + jwt.sign({ name: "Brizza Nathielly" }, SECRET);

  const cirurgiaMock = {
    nome_do_paciente: "Nome Paciente Teste",
    idade_do_paciente: 67,
    cpf_do_paciente: "12345678911",
    cirurgia: "Vitrectomia Olho Esquerdo",
    profissional_responsavel_pela_cirurgia: "Thiago Chagas",
    preparo_da_cirurgia: "Jejum",
    local_da_cirurgia: "IOCM",
    data_da_cirurgia: "19/12/2022",
    horario_da_cirurgia: "14h30",
    alguma_observacao: "Última cirurgia, graças à Deus!",
  };

  const consultaMock = {
    nome_do_paciente: "Nome Paciente Teste",
    idade_do_paciente: 67,
    cpf_do_paciente: "12345678911",
    consulta: "Gastro",
    local_da_consulta: "Hospital São José",
    data_da_consulta: "10/12/2022",
    horario_da_consulta: "09h00",
    alguma_observacao: "Levar o resultado da endoscopia",
  };

  const exameMock = {
    nome_do_paciente: "Nome Paciente Teste",
    idade_do_paciente: 67,
    cpf_do_paciente: "12345678911",
    exame: "Densiometria",
    preparo_do_exame: "Não tem preparo",
    local_do_exame: "Clínica Amise",
    data_do_exame: "05/12/2022",
    horario_do_exame: "10h00",
    alguma_observacao: "Perguntar quando sairá o resultado",
  };

  const medicacaoMock = {
    nome_do_paciente: "Nome Paciente Teste",
    idade_do_paciente: 67,
    cpf_do_paciente: "12345678911",
    medicacao: "Lubrificante Ocular",
    precisa_de_receita: false,
    precisa_comprar: false,
    dosagem: "1 gota, 3 vezes ao dia",
    horario_da_medicacao: "08h00, 15h00 e antes de dormir",
    alguma_observacao: "Tentar outra marca",
  };

  beforeAll(async () => {
    const newCirurgia = new modelCirurgia(cirurgiaMock);
    await newCirurgia.save();

    cirurgiaMock.id = newCirurgia.id;

    const newConsulta = new modelConsulta(consultaMock);
    await newConsulta.save();

    consultaMock.id = newConsulta.id;

    const newExame = new modelExame(exameMock);
    await newExame.save();

    exameMock.id = newExame.id;

    const newMedicacao = new modelMedicacao(medicacaoMock);
    await newMedicacao.save();

    medicacaoMock.id = newMedicacao.id;
  });

  // test("GET /cronograma/completo/:cpf_do_paciente", (done) => {
  //   request(app)
  //     .get("/cronograma/completo/:cpf_do_paciente")
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.message).toContain(
  //         "Consta no seu cronograma: cirurgia(s). consulta(s). exame(s). medicação"
  //       );
  //       // "Consta no seu cronograma: consulta(s).",
  //       // "Consta no seu cronograma: exame(s).",
  //       // "Consta no seu cronograma: medicação");
  //     })
  //     .end((err) => {
  //       if (err) return done(err);
  //       return done();
  //     });
  // });

  test("GET /cronograma/consultas", (done) => {
    request(app)
      .get("/cronograma/consultas")
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toContain("Consta no seu cronograma: ");
        expect(res.body.message).toContain(" consulta.");
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /cronograma/exames", (done) => {
    request(app)
      .get("/cronograma/exames")
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toContain("Consta no seu cronograma: ");
        expect(res.body.message).toContain(" exame.");
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /cronograma/cirurgias", (done) => {
    request(app)
      .get("/cronograma/cirurgias")
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toContain("Consta no seu cronograma: ");
        expect(res.body.message).toContain(" cirurgia.");
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /cronograma/medicacoes", (done) => {
    request(app)
      .get("/cronograma/medicacoes")
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toContain("Consta no seu cronograma: ");
        expect(res.body.message).toContain(" medica");
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  // test("GET /cronograma/buscar-por-id/:id", (done) => {
  //   request(app)
  //     .get("/cronograma/buscar-por-id/:id")
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.message).toContain("Consta no cronograma: ");
  //       expect(res.body.message).toContain(
  //         " cirurgia(s) para este id consulta(s) para este id exame(s) para este id medicação/medicações para este id"
  //       );
  //     })
  //     .end((err) => {
  //       if (err) return done(err);
  //       return done();
  //     });
  // });

  test("POST /cronograma/criar-consulta", (done) => {
    const consultaBody = {
      nome_do_paciente: "Nome Paciente Teste",
      idade_do_paciente: 67,
      cpf_do_paciente: "12345678911",
      consulta: "Gastro",
      local_da_consulta: "Hospital São José",
      data_da_consulta: "10/01/2023",
      horario_da_consulta: "09h00",
      alguma_observacao: "Levar o resultado da endoscopia",
    };
    request(app)
      .post("/cronograma/criar-consulta")
      .send(consultaBody)
      .expect(201)
      .expect((res) => {
        expect(res.body.consultaBody).toContain({
          "alguma_observacao": "Levar o resultado da endoscopia",
          "consulta": "Gastro",
          "cpf_do_paciente": "12345678911",
          "data_da_consulta": "10/01/2023",
          "horario_da_consulta": "09h00",
          "idade_do_paciente": 67,
          "local_da_consulta": "Hospital São José",
          "nome_do_paciente": "Nome Paciente Teste",
        });
      })
      .end((err) => {
        return done(err);
      });
  });

  // test("POST /produtos/create", (done) => {
  //   const produtosBody = {
  //     nome: "case 1",
  //     marca: "samsung",
  //     descricao: "Capinha de celular 1",
  //     categoria: "acessorio 1",
  //     preco: "30",
  //   };
  //   request(app)
  //     .post("/produtos/create")
  //     .send(produtosBody)
  //     .expect(201)
  //     .expect((res) => {
  //       expect(res.body.produtos.nome).toBe("case 1");
  //     })
  //     .end((err) => {
  //       return done(err);
  //     });
  // });

  // test("PUT /produtos/update/:id", (done) => {
  //   const produtosBody = {
  //     nome: "celular iphone 13",
  //     marca: "nome atualizado",
  //   };
  //   request(app)
  //     .put("/produtos/update/" + produtosMock.id)
  //     .send(produtosBody)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.produtos.nome).toBe("celular iphone 13");
  //       expect(res.body.produtos.marca).toBe("nome atualizado");
  //     })
  //     .end((err) => done(err));
  // });

  // test("DELETE /produtos/delete/:id", (done) => {
  //   const produtosBody = {
  //     id: "",
  //   };
  //   request(app)
  //     .delete("/produtos/delete/" + produtosMock.id)
  //     .send(produtosBody)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.message).toBe("Produto deletado com sucesso.");
  //     })
  //     .end((err) => {
  //       if (err) return done(err);
  //       return done();
  //     });
  // });

  afterAll(async () => {
    await modelCirurgia.deleteMany();
    await modelConsulta.deleteMany();
    await modelExame.deleteMany();
    await modelMedicacao.deleteMany();
  });
});
