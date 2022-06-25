import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.less']
})
export class NumberControlComponent {
  @Input() set initialValue(value: number) {
    this.value = value || 0;
    this._initialValue = value || 0;
  };

  @Output() public onValueChange: EventEmitter<number> = new EventEmitter();

  public value!: number;
  public _initialValue!: number;

  public minus(): void {
    this.value--;
    this.onValueChange.emit(this.value);
  }

  public plus(): void {
    this.value++;
    this.onValueChange.emit(this.value);
  }
}
