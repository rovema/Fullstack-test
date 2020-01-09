import express = require("express");
import BookCtrl from "../controllers/bookCtrl";
import firewallbase from "../middleware/firewallbase";
var rota = express.Router();

rota.use(firewallbase);
rota.get("/books", BookCtrl.getAllBooks);
rota.post("/book", BookCtrl.postBook);

export = rota;
