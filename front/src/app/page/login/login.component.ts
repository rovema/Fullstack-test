import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formAuth: FormGroup;
  constructor() {}

  ngOnInit() {
    this.formAuth = new FormGroup({
      email: new FormControl("", Validators.email),
      pass: new FormControl("", [
        Validators.minLength(6),
        Validators.maxLength(16)
      ])
    });
  }
}
