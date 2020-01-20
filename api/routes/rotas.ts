import express = require("express");
import BookCtrl from "../controllers/bookCtrl";
import firewallbase from "../middleware/firewallbase";
var rota = express.Router();

rota.use(firewallbase);

rota.get("/books", BookCtrl.getAllBooks);
rota.get("/searchbooks:title?:read?:notRead?", BookCtrl.getAllBooksWithParams);
rota.get("/book:id?", BookCtrl.getById);
rota.post("/book", BookCtrl.postBook);
rota.put("/book:id?", BookCtrl.putBook);
rota.delete("/book", BookCtrl.deleteBook);

export = rota;
