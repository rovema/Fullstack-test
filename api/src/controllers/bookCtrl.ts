import { Book, IBook } from "../model/book";

class BookCtrl {
  public static getAllBooks(req, res, next) {
    let uid = res.locals.uid;
    return Book.find({ uid }, (err: any, data: any) => {
      if (err) {
        next(err);
      } else res.json(data);
    });
  }
  public static getAllBooksWithParams(req, res, next) {
    let param = req.query;
    let title = param ? new RegExp(param.title, "i") : {};
    let status;
    let uid = res.locals.uid;
    let search;

    if (param.notRead && param.read) {
      search = { uid, title };
    } else if (param.notRead) {
      status = false;
      search = { uid, title, status };
    } else if (param.read) {
      status = true;
      search = { uid, title, status };
    }
    return Book.find(search, (err: any, data: any) => {
      if (err) {
        next(err);
      } else res.json(data);
    });
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
}
export default BookCtrl;
