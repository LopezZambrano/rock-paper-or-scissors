import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MOVEMENT_TYPE } from "src/shared/enums/movement-type.enum";
import { IMovement } from "src/shared/models/movement.interface";
import { IPoints } from "src/shared/models/points.interface";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  constructor(private activatedroute: ActivatedRoute, private router: Router) {}

  public score: IPoints;
  public name: string;
  public movementType = MOVEMENT_TYPE;
  public movePlayed: IMovement;

  ngOnInit(): void {
    this.name = this.activatedroute.snapshot.paramMap.get("name");
    this.checkIfUserExists();
    this.getScoreSaved();
  }

  onMove(movementType: MOVEMENT_TYPE) {
    this.movePlayed = {
      my: movementType,
    };
    setTimeout(() => {
      const botMovement = this.getRndMovement();
      this.movePlayed = {
        my: movementType,
        bot: botMovement,
      };
      this.upgradeScore(movementType, botMovement);
      this.saveScore();
    }, 1100);
  }

  private checkIfUserExists() {
    const userExists = localStorage.getItem(this.name);
    if (!userExists) {
      this.router.navigate(["/"]);
    }
  }

  private getScoreSaved() {
    this.score = JSON.parse(localStorage.getItem(this.name));
  }

  private getRndMovement() {
    const num = Math.floor(Math.random() * (2 - 0)) + 0;
    const movementTypes: MOVEMENT_TYPE[] = [
      MOVEMENT_TYPE.PAPER,
      MOVEMENT_TYPE.ROCK,
      MOVEMENT_TYPE.SCISSORS,
    ];
    return movementTypes[num];
  }

  private winPoint(
    meMovement: MOVEMENT_TYPE,
    botMovement: MOVEMENT_TYPE
  ): boolean {
    if (meMovement === botMovement) {
      return null;
    }
    return (
      (meMovement === MOVEMENT_TYPE.ROCK &&
        botMovement === MOVEMENT_TYPE.SCISSORS) ||
      (meMovement === MOVEMENT_TYPE.SCISSORS &&
        botMovement === MOVEMENT_TYPE.PAPER) ||
      (meMovement === MOVEMENT_TYPE.PAPER && botMovement === MOVEMENT_TYPE.ROCK)
    );
  }

  private upgradeScore(
    movementType: MOVEMENT_TYPE,
    botMovement: MOVEMENT_TYPE
  ) {
    const winPoint = this.winPoint(movementType, botMovement);
    if (winPoint === null) {
      return;
    }
    if (winPoint) {
      this.score.winPoints = this.score.winPoints + 1;
    } else {
      this.score.lostPoints = this.score.lostPoints + 1;
    }
  }

  private saveScore() {
    const userExists = localStorage.setItem(
      this.name,
      JSON.stringify(this.score)
    );
  }
}
