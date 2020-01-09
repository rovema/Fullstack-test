import { Injectable, OnInit, Injector } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import {
  HttpClient,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";

import { environment } from "src/environments/environment";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root"
})
export class ApiService {
  public user: Observable<firebase.User>;
  private token: string = null;
  public uid: string = null;
  public email: string = null;
  constructor(
    public loadingBar: LoadingBarService,
    public afAuth: AngularFireAuth,
    public rota: Router,
    private toastr: ToastrService
  ) {
    loadingBar.start();
    afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      try {
        if (user) {
          this.uid = user.uid;
          this.email = user.email;
          user
            .getIdToken(true)
            .then(res => {
              this.token = res;
              localStorage.setItem("token", res);
            })
            .catch(e => {
              this.token = null;
              localStorage.removeItem("token");
            });
        } else {
          this.token = null;
          this.uid = null;
          this.email = null;
          localStorage.removeItem("token");
        }
        loadingBar.complete();
      } catch (error) {
        loadingBar.complete();
        this.afAuth.auth.signOut();
      }
    });
  }

  doRegister(email, pass) {
    this.loadingBar.start();
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(res => {
          this.rota.navigate(["books"]);
        })
        .catch(erro => {})
        .finally(() => this.loadingBar.complete());
    });
  }
}
