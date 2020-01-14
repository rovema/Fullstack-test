import { Book, IBook } from "../model/book";

class BookCtrl {
  public static getAllBooks(req, res, next) {
    let uid = res.locals.uid;
    return Book.find({ uid, isDeleted: false }, (err: any, data: any) => {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    }).sort({ title: 1 });
  }

  public static getById(req, res, next) {
    let param = req.query;
    let uid = res.locals.uid;

    return Book.findOne(
      { _id: param.id, uid, isDeleted: false },
      (err: any, data: any) => {
        if (err) {
          next(err);
        } else res.json(data);
      }
    ).sort({ title: 1 });
  }

  public static getAllBooksWithParams(req, res, next) {
    let param = req.query;
    let title = param ? new RegExp(param.title, "i") : "";
    let status;
    let uid = res.locals.uid;
    let search;

    if (param.notRead.toString() == param.read.toString()) {
      search = { uid, title, isDeleted: false };
    } else if (param.notRead == `true`) {
      status = false;
      search = { uid, title, status, isDeleted: false };
    } else if (param.read == `true`) {
      status = true;
      search = { uid, title, status, isDeleted: false };
    }
    return Book.find(search, (err: any, data: any) => {
      if (err) {
        next(err);
      } else res.json(data);
    }).sort({ title: 1 });
  }

  public static postBook(req, res, next) {
    let obj: IBook = req.body;
    obj.uid = res.locals.uid;
    return Book.create(obj, (err: any, data: any) => {
      if (err) {
        next(err);
      } else res.json(data);
    });
  }

  public static putBook(req, res, next) {
    let id = req.query.id.toString();
    let obj: IBook = req.body;
    obj.uid = res.locals.uid;

    return Book.findOneAndUpdate(
      { _id: id, uid: obj.uid },
      obj,
      {
        new: true
      },
      (err: any, data: any) => {
        if (err) {
          next(err);
        } else {
          res.json(data);
        }
      }
    );
  }

  public static deleteBook(req, res, next) {
    let obj = req.query;
    let uid = res.locals.uid;
    return Book.findOneAndUpdate(
      { uid, _id: obj.id },
      { isDeleted: true },
      {
        new: true
      },
      (err: any, data: any) => {
        if (err) {
          next(err);
        } else res.json(data);
      }
    );
  }
}
export default BookCtrl;
