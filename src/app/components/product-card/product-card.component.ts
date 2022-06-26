import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent {
  @Input() public product!: any;

  @Output() public onAddToCart: EventEmitter<any> = new EventEmitter();

  public itemsSelected!: number;
  public isOpened = false;

  public changeAmountOfItems(value: number): void {
    this.itemsSelected = value;
  }

  public addToCart(): void {
    this.onAddToCart.emit({
      count: this.itemsSelected,
      product: this.product
    });
  }
}
