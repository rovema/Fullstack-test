import { Book, IBook } from "../model/book";

class BookCtrl {
  public static getAllBooks(req, res, next) {
    return Book.find((err: any, data: any) => {
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
