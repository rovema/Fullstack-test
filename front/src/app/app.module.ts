import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./page/login/login.component";
import { MaterialAllStyle } from "./material.modules";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SingupComponent } from "./page/singup/singup.component";
import { NotFoundComponent } from "./page/not-found/not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxCaptchaModule } from "ngx-captcha";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ApiService } from "./services/api.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { BooksComponent } from "./page/books/books.component";
import { ToastrModule } from "ngx-toastr";
import { NewBookComponent } from './page/new-book/new-book.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { EditBookComponent } from './page/edit-book/edit-book.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    NotFoundComponent,
    BooksComponent,
    NewBookComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    MaterialAllStyle,
    FlexLayoutModule,
    NgxCaptchaModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    ToastrModule.forRoot(),
    ImageCropperModule
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
