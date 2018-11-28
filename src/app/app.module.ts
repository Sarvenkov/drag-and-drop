import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { GoodsComponent } from './goods/goods.component';
import { ProductItemComponent } from './product-item/product-item.component';


@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
