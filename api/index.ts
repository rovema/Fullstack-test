import rota = require("./routes/rotas");
import express = require("express");
import mongoose = require("mongoose");
import bodyParser = require("body-parser");
import moment = require("moment");
import admin = require("firebase-admin");
const dynamicStatic = require('express-dynamic-static')();
const path = require('path');

var cors = require("cors");
var app = express();
require("dotenv").config();

moment.locale("pt-BR");

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false); // biblioteca depreciada
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(
      "🚀 Mongo DB inicializado com sucesso as",
      moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    );
  })
  .catch(e => {
    console.log("🤦🛑🛑🛑🤦", e);
  });

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.options("*", function(req, res, next) {
  if (req.method == "OPTIONS") res.sendStatus(200);
});

app.use("/api", rota); //rotas api

app.use('/', function(req,res,next){
  next();
});
app.use("/", express.static(__dirname + "/front"));

app.use(function(req, res, next) {
  let err: any;
  err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong. Please try again",
    status: err.status || 500
  });
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      status: err.status || 500
    });
  });
}

var port = process.env.PORT || 1337;

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
  console.log("🚀 Server app firebase iniciado -", process.env.projectId);
} catch (e) {
  console.log("🤦🛑 Server app firebase falhou: \n", e);
}
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/api`);
});
