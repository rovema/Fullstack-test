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
@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor() {}
}
