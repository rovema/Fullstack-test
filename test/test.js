let chai = require("chai");
let chaiHttp = require("chai-http");
const admin = require("firebase-admin");
const rp = require("request-promise");
const serviceAccount = require("../firebase.json");
let HOST = "http://localhost";
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);
let token = null;
let id = null;

describe("CRUD TEST", () => {
  before(async () => {
    try {
      await admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://magno-test-rovema.firebaseio.com"
      });
      let tmptoken = await admin
        .auth()
        .createCustomToken("Q8fn26h1DZfiJagWxLi8Fg3hZRn1");
      const res = await rp({
        url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyCBOJ_F1wvRGa40_0bTDCWfEXLfPPP7810`,
        method: "POST",
        body: {
          token: tmptoken,
          returnSecureToken: true
        },
        json: true
      });
      token = res.idToken;
      console.log("Google admin ok, iniciando test")
    } catch (error) {
      console.log(error);
    }

  });

  describe("/POST book", () => {
    it("1 - Salvar livro sem token", done => {
      let livro = {
        title: "livro 1" + Date(),
        description: "Sobre o livro 1" + Date(),
        picture:
          "https://firebasestorage.googleapis.com/v0/b/magno-test-rovema.appspot.com/o/imagens%2FUfjWtKG0hTSv2nZ68wI9cUI0CQr1%2F9i10b6jg?alt=media&token=727f4af3-f4de-405e-b4f6-1feb38fc289f",
        status: true
      };
      chai
        .request(HOST)
        .post("/api/book")
        .send(livro)
        .end((err, res) => {
          // console.log('Resposta do primeiro teste\n', res);
          expect(res).to.have.status(405);
          done();
        });
    });
    it("2 - Salvar livro com token invalido", done => {
      let livro = {
        title: "livro 1" + Date(),
        description: "Sobre o livro 1" + Date(),
        picture:
          "https://firebasestorage.googleapis.com/v0/b/magno-test-rovema.appspot.com/o/imagens%2FUfjWtKG0hTSv2nZ68wI9cUI0CQr1%2F9i10b6jg?alt=media&token=727f4af3-f4de-405e-b4f6-1feb38fc289f",
        status: true
      };
      chai
        .request(HOST)
        .post("/api/book")
        .set("Authorization", "Bearer " + "invalido token")
        .send(livro)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it("3 - Salvar livro com token valido", done => {
      let livro = {
        title: "livro teste" + Date(),
        description: "Sobre o livro" + Date(),
        picture:
          "https://firebasestorage.googleapis.com/v0/b/magno-test-rovema.appspot.com/o/imagens%2FUfjWtKG0hTSv2nZ68wI9cUI0CQr1%2F9i10b6jg?alt=media&token=727f4af3-f4de-405e-b4f6-1feb38fc289f",
        status: true
      };
      chai
        .request(HOST)
        .post("/api/book")
        .set("Authorization", "Bearer " + token)
        .send(livro)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/GET BOOKS", async () => {
    it("1 - Buscar livros sem token", done => {
      chai
        .request("http://0.0.0.0")
        .get("/api/books")
        .end((err, res) => {
          expect(res).to.have.status(405);
          done();
        });
    });
    it("2 - Buscar livros com token invalido", done => {
      chai
        .request("http://localhost")
        .get("/api/books")
        .set("Authorization", "Token invalido")
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it("3 - Buscar livros com token valido", done => {
      chai
        .request(HOST)
        .get("/api/books")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          id = res.body[0]._id;
          expect(res).to.have.status(200);
          done();
        });
    });
    it("4 - Buscar livros por filtro de nome e lido com token valido", done => {
      chai
        .request(HOST)
        .get("/api/searchbooks?title=livro&read=true&notRead=true")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("5 - Buscar livro por ID com token valido", done => {
      chai
        .request(HOST)
        .get("/api/book?id=" + id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("/DELETE BOOK", async () => {
    it("1 - Deletar livro sem token", done => {
      chai
        .request(HOST)
        .delete("/api/book")
        .end((err, res) => {
          expect(res).to.have.status(405);
          done();
        });
    });

    it("2 - Deletar livro com token invalido", done => {
      chai
        .request(HOST)
        .delete("/api/book")
        .set("Authorization", "Token invalido")
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it("3 - Deletar livro com token valido", done => {
      chai
        .request(HOST)
        .delete("/api/book")
        .send({ id })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/PUT BOOK", async () => {
    it("1 - Atualizar livro sem token", done => {
      let livro = {
        title: "livro 2" + Date(),
        description: "Sobre o livro 2" + Date(),
        picture:
          "https://firebasestorage.googleapis.com/v0/b/magno-test-rovema.appspot.com/o/imagens%2FUfjWtKG0hTSv2nZ68wI9cUI0CQr1%2F9i10b6jg?alt=media&token=727f4af3-f4de-405e-b4f6-1feb38fc289f",
        status: false
      };
      chai
        .request(HOST)
        .put("/api/book?id=" + id)
        .send(livro)
        .end((err, res) => {
          expect(res).to.have.status(405);
          done();
        });
    });

    it("2 - Atualizar livro com token invalido", done => {
      let livro = {
        title: "livro 2" + Date(),
        description: "Sobre o livro 2" + Date(),
        picture:
          "https://firebasestorage.googleapis.com/v0/b/magno-test-rovema.appspot.com/o/imagens%2FUfjWtKG0hTSv2nZ68wI9cUI0CQr1%2F9i10b6jg?alt=media&token=727f4af3-f4de-405e-b4f6-1feb38fc289f",
        status: false
      };
      chai
        .request(HOST)
        .put("/api/book?id=" + id)
        .set("Authorization", "Bearer " + "TokenInvalido")
        .send(livro)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it("3 - Atualizar livro com token valido", done => {
      let livro = {
        title: "livro 4" + Date(),
        description: "Sobre o livro 4" + Date(),
        picture:
          "https://firebasestorage.googleapis.com/v0/b/magno-test-rovema.appspot.com/o/imagens%2FUfjWtKG0hTSv2nZ68wI9cUI0CQr1%2F9i10b6jg?alt=media&token=727f4af3-f4de-405e-b4f6-1feb38fc289f",
        status: false
      };
      chai
        .request(HOST)
        .put("/api/book?id=" + id)
        .send(livro)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/GET HTML Angular", async () => {
    it("1 - GET index.html", done => {
      chai
        .request("http://0.0.0.0")
        .get("/index.html")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
 
    it("2 - GET /", done => {
      chai
        .request("http://0.0.0.0")
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
