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
import { AngularFireStorage } from "@angular/fire/storage";
import { Book } from "../model/Book";
@Injectable({
  providedIn: "root"
})
export class ApiService implements HttpInterceptor {
  public user: Observable<firebase.User>;
  public token: string = null;
  public uid: string = null;
  public email: string = null;
  private baseurl = environment.baseURL;
  private requests: HttpRequest<any>[] = [];
  public isLoading = new BehaviorSubject(false);
  constructor(
    private http: HttpClient,
    public loadingBar: LoadingBarService,
    public afAuth: AngularFireAuth,
    public rota: Router,
    private toastr: ToastrService,
    private storage: AngularFireStorage
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

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);

    this.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => {
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          this.loadingBar.complete();
          observer.complete();
        }
      );

      return () => {
        this.removeRequest(req);
        this.loadingBar.complete();
        subscription.unsubscribe();
      };
    });
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.isLoading.next(this.requests.length > 0);
  }

  private postData(rota, obj): Observable<any> {
    this.loadingBar.start();
    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http
            .post(this.baseurl + rota, obj, { headers: tokenOptions })
            .subscribe(
              res => {
                this.loadingBar.complete();
                observer.next(res);
                observer.complete();
              },
              err => {
                this.loadingBar.complete();
                observer.error(err);
                observer.complete();
              }
            );
        })
        .catch((error: any) => {
          this.loadingBar.complete();
          observer.error(error);
          observer.complete();
        });
    });
  }
  private getData(rota, param?): Observable<any> {
    this.loadingBar.start();
    let params = {};
    if (param) {
      params = param;
    }
    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http
            .get(this.baseurl + rota, { headers: tokenOptions, params })
            .subscribe(
              res => {
                this.loadingBar.complete();
                observer.next(res);
                observer.complete();
              },
              err => {
                this.loadingBar.complete();
                observer.error(err);
                observer.complete();
              }
            );
        })
        .catch((error: any) => {
          this.loadingBar.complete();
          observer.error(error);
          observer.complete();
        });
    });
  }

  private deleteData(rota, id): Observable<any> {
    this.loadingBar.start();
    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http
            .delete(this.baseurl + rota, {
              headers: tokenOptions,
              params: { id }
            })
            .subscribe(
              res => {
                this.loadingBar.complete();
                observer.next(res);
                observer.complete();
              },
              err => {
                this.loadingBar.complete();
                observer.error(err);
                observer.complete();
              }
            );
        })
        .catch((error: any) => {
          this.loadingBar.complete();
          observer.error(error);
          observer.complete();
        });
    });
  }

  private putData(rota, obj, param?): Observable<any> {
    this.loadingBar.start();
    let params = {};
    if (param) {
      params = { empresa: param };
    }

    return new Observable(observer => {
      this.getTokenHeader()
        .then(tokenOptions => {
          return this.http
            .put(this.baseurl + rota, obj, { headers: tokenOptions, params })
            .subscribe(res => {
              observer.next(res);
              observer.complete();
              this.loadingBar.complete();
            });
        })
        .catch((error: any) => {
          observer.error(error);
          observer.complete();
          this.loadingBar.complete();
        });
    });
  }

  private async getTokenHeader() {
    if (!this.token) {
      const tk = await localStorage.getItem("token");
      if (tk) {
        await firebase
          .auth()
          .currentUser.getIdToken()
          .then(token => {
            this.token = token;
            localStorage.setItem("token", token);
          })
          .catch(e => {
            console.error(e);
            this.doLogout();
          });
        const tokenHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`
        };
        return tokenHeader;
      }
    }
    if (this.token) {
      const tokenHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      };
      return tokenHeader;
    }
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
  public doUpload(base64) {
    let titulo = Math.random()
      .toString(36)
      .slice(-8);
    this.loadingBar.start();
    let path = `imagens/${this.uid}/${titulo}`;
    let fileRef = this.storage.ref(path.replace(/\s/g, ""));
    let taksUpload = fileRef.putString(base64, "data_url");

    return new Promise<any>((resolve, reject) => {
      taksUpload.task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          if (snapshot.state == "sucess") {
            this.loadingBar.complete();
          }
        },
        erro => {
          this.toastr.error("falha no upload da imagem");
          this.loadingBar.complete();
          reject(erro);
        },
        () => {
          taksUpload.task.snapshot.ref
            .getDownloadURL()
            .then(function(downloadURL) {
              resolve(downloadURL);
            });
        }
      );
    });
  }
  public doSaveBook(book): Observable<any> {
    return new Observable(observer => {
      this.postData("book", book).subscribe(
        res => {
          this.toastr.success(
            `Livro ${book.title}, foi salvo com sucesso.`,
            "Sucesso!!!"
          );
          observer.next(res);
        },
        err => {
          this.toastr.error("Falha ao cadastrar livro", "Error!!");
          console.error(err);
          observer.error(err);
          observer.unsubscribe();
        }
      );
    });
  }

  public getBooksUserId(id): Observable<Book> {
    return new Observable(observer => {
      this.getData("book", { id }).subscribe(
        res => {
          observer.next(res);
        },
        err => {
          this.toastr.error("Falha ao listar todos os livros", "Error!!");
          console.error(err);
          observer.error(err);
          observer.unsubscribe();
        }
      );
    });
  }

  public getBooksUser(): Observable<Book[]> {
    return new Observable(observer => {
      this.getData("books").subscribe(
        res => {
          observer.next(res);
        },
        err => {
          this.toastr.error("Falha ao listar todos os livros", "Error!!");
          console.error(err);
          observer.error(err);
          observer.unsubscribe();
        }
      );
    });
  }
  public getBooksUserWithFilter(filter): Observable<Book[]> {
    return new Observable(observer => {
      this.getData("searchbooks", filter).subscribe(
        res => {
          observer.next(res);
        },
        err => {
          this.toastr.error("Falha ao listar todos os livros", "Error!!");
          console.error(err);
          observer.error(err);
          observer.unsubscribe();
        }
      );
    });
  }

  public deleteBook(id): Observable<any> {
    return new Observable(observer => {
      this.deleteData("book", id).subscribe(
        res => {
          this.toastr.success("Livro removido com sucesso", "Sucesso!!!");
          observer.next(res);
        },
        err => {
          this.toastr.error("Falha ao deletar o livro selecionado", "Error!!");
          console.error(err);
          observer.error(err);
          observer.unsubscribe();
        }
      );
    });
  }
}
