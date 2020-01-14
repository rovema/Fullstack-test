let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
const admin = require("firebase-admin");
const rp = require("request-promise");
let token = null;
const serviceAccount = require("../firebase.json");

chai.use(chaiHttp);

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
        .request("http://localhost:3000")
        .post("/api/book")
        .send(livro)
        .end((err, res) => {
          res.should.have.status(405);
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
        .request("http://localhost:3000")
        .post("/api/book")
        .set("Authorization", "Bearer " + "invalido token")
        .send(livro)
        .end((err, res) => {
          res.should.have.status(401);
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
        .request("http://localhost:3000")
        .post("/api/book")
        .set("Authorization", "Bearer " + token)
        .send(livro)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("/GET BOOKS", async () => {
    it("1 - Buscar livros sem token", done => {
      chai
        .request("http://localhost:3000")
        .get("/api/books")
        .end((err, res) => {
          res.should.have.status(405);
          done();
        });
    });
    it("2 - Buscar livros com token invalido", done => {
      chai
        .request("http://localhost:3000")
        .get("/api/books")
        .set("Authorization", "Token invalido")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("3 - Buscar livros com token valido", done => {
      chai
        .request("http://localhost:3000")
        .get("/api/books")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
