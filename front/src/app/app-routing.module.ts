import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./page/login/login.component";
import { SingupComponent } from "./page/singup/singup.component";
import { NotFoundComponent } from "./page/not-found/not-found.component";
import { BooksComponent } from "./page/books/books.component";

const routes: Routes = [
  { path: "auth", component: SingupComponent },
  { path: "login", component: LoginComponent },
  { path: "books", component: BooksComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
