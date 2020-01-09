import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/model/Book';

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  constructor(public title: Title, public api: ApiService) {
    if(api.)
  }

  ngOnInit() {
    this.title.setTitle("Seus Livros - Magno Carvalho");
  }

  getBooks(){
    this.api.getBooksUser();
  }
}
