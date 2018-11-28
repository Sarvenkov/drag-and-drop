import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ProductItem} from "../product-item.interface";
import {GoodsService} from "../goods.service";

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {
  goods: ProductItem[];
  cart: ProductItem[] = [];
  selectItem: ProductItem;
  zone: string;
  total: number = 0;

  constructor(private goodsService: GoodsService) { }

  ngOnInit() {
    this.getProductItems();
  }

  getProductItems(): void {
    this.goodsService.getProductItems()
      .subscribe(goods => this.goods = goods);
  }

  onSelect(item: ProductItem, zone: string): void {
    this.zone = zone;
    this.selectItem = item;
  }

  totalCost(): number {
    this.total = 0;
    this.cart.forEach((item) => {
      this.total += item.selected * item.price;
    });
    return this.total;
  }

  quantityChange(param): void {
    if (param === "increment") {
      this.goods.forEach((item, i, arr) => {
        if (item.id === this.selectItem.id && item.balance === 1) {
          arr.splice(i, 1);
        }
        if (item.id === this.selectItem.id) {
          item.balance--;
        }
      })
    }
    if (param === "decrement") {
      this.goods.forEach((item)=> {
        if (item.id === this.selectItem.id && this.selectItem.balance === item.balance + 1) return;
        if (item.id === this.selectItem.id) {
          if (item.balance === item.BALANCE - 1) return;
          item.balance++;
        }
      });
      if (!this.goods.some((item) => item.id === this.selectItem.id)) {
        let restItem : ProductItem = {
          id: this.selectItem.id,
          name: this.selectItem.name,
          description: this.selectItem.description,
          price: this.selectItem.price,
          balance: 1,
          BALANCE: this.selectItem.BALANCE,
          selected: 1,
          imageUrl: this.selectItem.imageUrl
        };
        this.goods.push(restItem);
      }
    }
    this.totalCost();
  }

  closeCard(): void {
    if (this.goods.some((item) => item.id === this.selectItem.id)) {
      this.goods.forEach((item) => {
        if (item.id === this.selectItem.id) {
          item.balance += this.selectItem.selected;
        }
      });
    } else {
      this.selectItem.balance = this.selectItem.selected;
      this.goods.push(this.selectItem);
    }
    this.cart = this.cart.filter((item) => {
      return item.id !== this.selectItem.id;
    });
    this.totalCost();
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      if (this.zone === "zoneGoods") {
        this.copyItem();
      }
      if (this.zone === "zoneCart") {
        this.selectItem.balance = this.selectItem.selected;
        this.collapseSameItems(this.goods);
      }
      this.totalCost();
    }
  }

  copyItem(): void {
    let restItem : ProductItem = {
      id: this.selectItem.id,
      name: this.selectItem.name,
      description: this.selectItem.description,
      price: this.selectItem.price,
      balance: this.selectItem.balance,
      BALANCE: this.selectItem.BALANCE,
      selected: this.selectItem.selected,
      imageUrl: this.selectItem.imageUrl
    };
    this.goods.push(restItem);
    this.goods[this.goods.length - 1].balance -= this.selectItem.selected;
    this.selectItem.balance = this.selectItem.BALANCE;
    this.goods[this.goods.length - 1].selected = 1;
    if (this.goods[this.goods.length - 1].balance === 0) this.goods.pop();

    this.collapseSameItems(this.cart);
  }

  collapseSameItems(from): void {
    let accum: string = "";
    from === this.goods ? accum = "balance" : accum = "selected";
    from.sort((a, b) => a.id - b.id);
    from.forEach((item, i, arr) => {
      if (i === arr.length - 1) return;
      if(arr[i].id === arr[i+1].id) {
        arr[i][accum] += arr[i+1][accum];
        from.splice(i+1, 1);
      }
    })
  }
}
