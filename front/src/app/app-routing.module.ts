import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./page/login/login.component";
import { MainComponent } from "./page/main/main.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "auth", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
