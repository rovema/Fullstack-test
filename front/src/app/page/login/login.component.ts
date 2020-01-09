import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formAuth: FormGroup;
  constructor(public api: ApiService, public toastr: ToastrService) {}

  ngOnInit() {
    this.formAuth = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      pass: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ])
    });
  }

  login() {
    if (this.formAuth.valid) {
      let email = this.formAuth.get("email").value;
      let pass = this.formAuth.get("pass").value;
      this.api.doLoginEmailPass(email, pass);
    } else {
      this.toastr.error("confira suas informaçoes ", "Login invalido!!");
    }
  }
}
