import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductItem} from "../product-item.interface";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() item: ProductItem;
  @Input() inCart: boolean;
  @Output() closeCard: EventEmitter<any> = new EventEmitter();
  @Output() quantityChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  decrement(){
    this.item.selected === 1 ? this.item.selected = 1 : this.item.selected--;
  }

  increment(){
    if (this.item.selected === this.item.balance) return;
    if (this.item.selected === this.item.BALANCE) return;
    this.item.selected++;
  }

  decrementOrIncrementInCart(param: string) {
    param === "decrement" ? this.decrement() : this.increment();
    this.quantityChange.emit(param);
  }

  close() {
    this.closeCard.emit();
  }
}
