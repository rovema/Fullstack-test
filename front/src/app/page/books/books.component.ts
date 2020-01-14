import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "src/app/services/api.service";
import { Book } from "src/app/model/Book";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit, AfterContentInit {
  books: Book[] = [];
  formBooks: FormGroup;

  constructor(
    public title: Title,
    public api: ApiService,
    public router: Router
  ) {}

  ngOnInit() {
    this.title.setTitle("Seus Livros");
    this.formBooks = new FormGroup({
      title: new FormControl(""),
      notRead: new FormControl(true),
      read: new FormControl(true)
    });
  }

  ngAfterContentInit(): void {
    this.api.user.subscribe(user => {
      if (user) {
        user.getIdToken(true).then(r => {
          this.getBooks();
        });
      }
    });
  }

  getBooks() {
    this.api.getBooksUser().subscribe(b => {
      this.books = b;
      this.title.setTitle(
        "Seus Livros - Total de " +
          this.books.length +
          " cadastros por:  " +
          this.api.email
      );
    });
  }

  getBooksWithParam() {
    this.api.getBooksUserWithFilter(this.formBooks.value).subscribe(b => {
      this.books = b;
    });
  }

  deleteBook(id) {
    this.api.deleteBook(id).subscribe(res => {
      this.getBooks();
    });
  }

  editBook(obj) {
    this.router.navigate(["/edit-book", obj._id]);
  }

  resetForm() {
    this.formBooks.reset({ title: "", notRead: true, read: true });
    this.getBooks();
  }

  onlySelectNotRead() {
    if (
      !this.formBooks.get("notRead").value &&
      !this.formBooks.get("read").value
    ) {
      this.formBooks.get("read").setValue(true);
    }
  }
  onlySelectRead() {
    if (
      !this.formBooks.get("notRead").value &&
      !this.formBooks.get("read").value
    ) {
      this.formBooks.get("notRead").setValue(true);
    }
  }
}
