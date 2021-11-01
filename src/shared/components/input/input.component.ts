import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
@Component({
  selector: "app-base-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = "";
  value: string;
  isDisabled: boolean;
  onChange = (_: any) => {};
  onTouch = () => {};
  constructor() {}
  onInput(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }
  writeValue(value: any): void {
    this.value = value || "";
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
