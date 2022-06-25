import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-order',
  templateUrl: './active-order.component.html',
  styleUrls: ['./active-order.component.less']
})
export class ActiveOrderComponent {
  @Input() public activeOrder!: any;
}
