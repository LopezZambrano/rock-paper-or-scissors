import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameComponent } from "src/pages/game/game.component";
import { HomeComponent } from "src/pages/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game/:name", component: GameComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
