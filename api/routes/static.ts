import express = require("express");
const path = require("path");
var front = path.join(__dirname, "../front");
var app = express.Router();

app.get("/", function(req, res) {
  res.sendFile(path.join(front, "index.html"));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(front, "index.html"));
});

app.get("/auth", function(req, res) {
  res.sendFile(path.join(front, "index.html"));
});

app.get("/new-book", function(req, res) {
  res.sendFile(path.join(front, "index.html"));
});

app.get("/edit-book", function(req, res) {
  res.sendFile(path.join(front, "index.html"));
});

app.get("/books", function(req, res) {
  res.sendFile(path.join(front, "index.html"));
});


export = app;
