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
          console.log(this.email, this.uid);
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

  public doRegister(email, pass) {
    this.loadingBar.start();
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(res => {
          this.toastr.success("Usario Criado com Sucesso", "Sucesso!!!");
          this.rota.navigate(["books"]);
          resolve(res);
        })
        .catch(erro => {
          this.toastr.error(erro, "Falha ao criar usario");
          reject(erro);
        })
        .finally(() => this.loadingBar.complete());
    });
  }
  public doLogout() {
    this.loadingBar.start();
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.toastr.success("Voce saiu da aplicação", "Sucesso!!!");
          this.token = null;
          this.uid = null;
          this.email = null;
          localStorage.removeItem("token");
          this.rota.navigate(["login"]);
          resolve();
        })
        .catch(erro => {
          this.toastr.error(erro, "Falha na conexão");
          reject(erro);
        })
        .finally(() => this.loadingBar.complete());
    });
  }
  public doLoginEmailPass(email, pass) {
    this.loadingBar.start();
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(res => {
          this.toastr.success("Usario logado com Sucesso", "Sucesso!!!");
          this.rota.navigate(["books"]);
          resolve(res);
        })
        .catch(erro => {
          this.toastr.error(erro, "Verifique suas credenciais!!!");
          reject(erro);
        })
        .finally(() => this.loadingBar.complete());
    });
  }
}
