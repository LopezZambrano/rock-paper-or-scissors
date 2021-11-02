import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IPoints } from "src/shared/models/points.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(public router: Router) {}

  nameControl: FormControl = new FormControl("", Validators.required);

  ngOnInit(): void {}
  join() {
    if (!this.userExists(this.nameControl.value)) {
      const initPoints: IPoints = {
        winPoints: 0,
        lostPoints: 0,
      };
      localStorage.setItem(this.nameControl.value, JSON.stringify(initPoints));
    }
    this.router.navigate(["game", this.nameControl.value]);
  }

  userExists(name: string): boolean {
    return localStorage.getItem(name) !== null;
  }
}
