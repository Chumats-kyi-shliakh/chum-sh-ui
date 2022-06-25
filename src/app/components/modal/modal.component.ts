import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent {
  @Input() public text!: string;
  @Input() public showPrimary = false;
  @Input() public showSecondary = false;
  @Input() public primaryText!: string;
  @Input() public secondaryText!: string;

  @Output() public onPrimary: EventEmitter<void> = new EventEmitter();
  @Output() public onSecondary: EventEmitter<void> = new EventEmitter();
}
