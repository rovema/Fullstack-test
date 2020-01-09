import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "src/app/services/api.service";
import { Book } from "src/app/model/Book";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit, AfterContentInit {
  books: Book[] = [];
  formBooks: FormGroup;
  constructor(public title: Title, public api: ApiService) {}

  ngOnInit() {
    this.title.setTitle("Seus Livros - Magno Carvalho");
    this.formBooks = new FormGroup({ title: new FormControl("") });
  }

  ngAfterContentInit(): void {
    this.api.user.subscribe(user => {
      if (user) {
        this.getBooks();
      }
    });
  }

  getBooks() {
    this.api.getBooksUser().subscribe(b => {
      this.books = b;
    });
  }

  get;
}
