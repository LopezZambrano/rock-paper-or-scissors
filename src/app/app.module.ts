import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HomeComponent } from "../pages/home/home.component";
import { InputComponent } from "src/shared/components/input/input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "src/shared/components/header/header.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, InputComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
