const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const db = require("./config/database");
const cronogramaRoutes = require("./routes/cronogramaRoutes");

db.connect();

app.use(cors());
app.use(express.json());
app.use("/cronograma", cronogramaRoutes);

module.exports = app;
