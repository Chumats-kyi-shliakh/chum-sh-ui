import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent {
  @Input() public product!: any;

  public itemsSelected!: number;
  public isOpened = false;

  public changeAmountOfItems(value: number): void {
    this.itemsSelected = value;
  }
}
