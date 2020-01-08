import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PoModule } from "@portinari/portinari-ui";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./page/login/login.component";
import { MaterialAllStyle } from "./material.modules";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SingupComponent } from "./page/singup/singup.component";
import { NotFoundComponent } from "./page/not-found/not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxCaptchaModule } from "ngx-captcha";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    MaterialAllStyle,
    FlexLayoutModule,
    NgxCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
