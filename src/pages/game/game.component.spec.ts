import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { InputComponent } from "src/shared/components/input/input.component";
import { MOVEMENT_TYPE } from "src/shared/enums/movement-type.enum";

import { GameComponent } from "./game.component";

describe("GameComponent", () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, InputComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.score = {
      winPoints: 1,
      lostPoints: 2,
    };
    localStorage.clear();
    localStorage.setItem(
      "sara",
      JSON.stringify({
        winPoints: 1,
        lostPoints: 2,
      })
    );
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("Should save score", function () {
    component.name = "sara";
    component.score = {
      winPoints: 1,
      lostPoints: 2,
    };
    const setItemSpy = spyOn(localStorage, "setItem");
    component.saveScore();
    expect(setItemSpy).toHaveBeenCalled();
  });

  it("Should get score saved", function () {
    component.name = "sara";

    component.getScoreSaved();
    expect(component.score).toEqual({
      winPoints: 1,
      lostPoints: 2,
    });
  });

  it("Should nav to home if user not exists", function () {
    component.name = "j";
    const navigateSpy = spyOn(component.router, "navigate");
    component.checkIfUserExists();
    expect(navigateSpy).toHaveBeenCalledWith(["/"]);
  });

  describe("upgradeScore", function () {
    it("Should bot win with paper - scissors", function () {
      component.upgradeScore(MOVEMENT_TYPE.PAPER, MOVEMENT_TYPE.SCISSORS);
      expect(component.score).toEqual({
        winPoints: 1,
        lostPoints: 3,
      });
    });
    it("Should bot win with rock - papper", function () {
      component.upgradeScore(MOVEMENT_TYPE.ROCK, MOVEMENT_TYPE.PAPER);
      expect(component.score).toEqual({
        winPoints: 1,
        lostPoints: 3,
      });
    });
    it("Should bot win with scissors - rock", function () {
      component.upgradeScore(MOVEMENT_TYPE.SCISSORS, MOVEMENT_TYPE.ROCK);
      expect(component.score).toEqual({
        winPoints: 1,
        lostPoints: 3,
      });
    });
    it("Should win with rock - scissors", function () {
      component.upgradeScore(MOVEMENT_TYPE.ROCK, MOVEMENT_TYPE.SCISSORS);
      expect(component.score).toEqual({
        winPoints: 2,
        lostPoints: 2,
      });
    });
    it("Should win with scissors - papper", function () {
      component.upgradeScore(MOVEMENT_TYPE.SCISSORS, MOVEMENT_TYPE.PAPER);
      expect(component.score).toEqual({
        winPoints: 2,
        lostPoints: 2,
      });
    });
    it("Should win with papper - rock", function () {
      component.upgradeScore(MOVEMENT_TYPE.PAPER, MOVEMENT_TYPE.ROCK);
      expect(component.score).toEqual({
        winPoints: 2,
        lostPoints: 2,
      });
    });
  });
});
