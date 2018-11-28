import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {ProductItem} from "./product-item.interface";
import {of} from "rxjs/internal/observable/of";
import {PRODUCT_ITEMS} from "./mock-items";

@Injectable({
  providedIn: 'root',
})
export class GoodsService {

  constructor() { }

  getProductItems(): Observable<ProductItem[]> {
    return of(PRODUCT_ITEMS);
  }

}
