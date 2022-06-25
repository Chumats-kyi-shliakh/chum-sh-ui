import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.less']
})
export class CustomButtonComponent {
  @Input() public buttonLabel!: string;
  @Input() public isArrow = false;
  @Input() public isFullWidth = false;
  @Input() public isDisabled = false;

  @Output() public onButtonClick: EventEmitter<void> = new EventEmitter();
}
