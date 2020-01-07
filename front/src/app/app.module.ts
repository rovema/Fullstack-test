import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PoModule } from "@portinari/portinari-ui";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./page/login/login.component";
import { MainComponent } from "./page/main/main.component";
import { MaterialAllStyle } from "./material.modules";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SingupComponent } from './page/singup/singup.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, MainComponent, SingupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PoModule,
    RouterModule.forRoot([]),
    MaterialAllStyle,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
