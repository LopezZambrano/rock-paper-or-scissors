import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { InputComponent } from "src/shared/components/input/input.component";

import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, InputComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("join", function () {
    it("Should save user if not exists", function () {
      const setItemSpy = spyOn(localStorage, "setItem");
      component.nameControl = new FormControl("sara");
      spyOn(component.router, "navigate");
      component.join();
      expect(setItemSpy).toHaveBeenCalled();
    });

    it("Should navigate to game page", function () {
      component.nameControl = new FormControl("sara");
      const navigateSpy = spyOn(component.router, "navigate");
      component.join();
      expect(navigateSpy).toHaveBeenCalledWith(["game", "sara"]);
    });
  });

  describe("userExists", function () {
    it("Should return true if user exists", function () {
      localStorage.setItem(
        "sara",
        JSON.stringify({
          winPoints: "1",
          lostPoints: "2",
        })
      );
      expect(component.userExists("sara")).toBe(true);
    });
    it("Should return false if user not exists", function () {
      expect(component.userExists("sara")).toBe(false);
    });
  });
});
