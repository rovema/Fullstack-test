import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { environment } from "src/environments/environment";
import { InvisibleReCaptchaComponent } from "ngx-captcha";

@Component({
  selector: "app-singup",
  templateUrl: "./singup.component.html",
  styleUrls: ["./singup.component.css"]
})
export class SingupComponent implements OnInit {
  public isLinear = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public siteKey: string = environment.captcha;
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsReady = false;
  public badge = "inline";
  public type = "image";
  public theme = "light";
  public recaptcha: any = null;
  @ViewChild("captchaElem", { static: false })
  captchaElem: InvisibleReCaptchaComponent;
  constructor(private formB: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl("", [Validators.email, Validators.required])
    });
    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]),
      recaptchaFRM: new FormControl(null, [Validators.required])
    });
  }

  createUser() {
    console.log(this.secondFormGroup.value, this.firstFormGroup.value);
  }

  execute(): void {
    this.captchaElem.execute();
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.cdr.detectChanges();
  }
  handleError() {
    this.captchaSuccess = false;
  }
  handleExpire() {
    this.captchaSuccess = false;
  }
  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.cdr.detectChanges();
  }

  handleReady(): void {
    this.captchaIsReady = true;
    this.cdr.detectChanges();
  }
}
