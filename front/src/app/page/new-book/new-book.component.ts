import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.css"]
})
export class NewBookComponent implements OnInit {
  constructor(public titulo: Title) {}

  ngOnInit() {
    this.titulo.setTitle("Cadastrar Novo Livro");
  }
}
