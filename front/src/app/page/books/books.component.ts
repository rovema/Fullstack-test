import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
  constructor(public title: Title) {}

  ngOnInit() {
    this.title.setTitle("Estante de Livros - Magno Carvalho");
  }
}
