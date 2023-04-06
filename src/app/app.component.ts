import { Component, OnInit } from '@angular/core';
import products from '../assets/data/shoes.json';
import { Product } from 'src/model/productModel';
import { CartItem } from 'src/model/cartItemModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.totalValue();
  }

  title = 'shopping_cart';
  total = 0;
  public productList: Product[] = products;
  public cart: CartItem[] = [];
  public temp: CartItem = {};

  initTemp(item: Product) {
    this.temp.id = item.id;
    this.temp.color = item.color;
    this.temp.image = item.image;
    this.temp.name = item.name;
    this.temp.price = item.price;
    this.temp.amount = 1;
  }

  addItem(item: Product) {
    if (this.cart.length > 0) {
      var index = this.cart.findIndex((x) => x.id === item.id);
      if (index >= 0) {
        this.cart[index].amount! += 1;
      } else {
        this.initTemp(item);
        this.cart.push(this.temp);
      }
    } else {
      this.initTemp(item);
      this.cart.push(this.temp);
    }

    this.totalValue();
    console.log(this.cart);
    this.temp = {};
  }

  isAdd(id: any) {
    return  this.cart.findIndex((x) => x.id === id)>=0? false : true;
  }

  totalValue() {
    this.total = this.cart.reduce((a, b) => a + b.price! * b.amount!, 0);
  }

  plus(id: any) {
    var index = this.cart.findIndex((x) => x.id === id);
    this.cart[index].amount! += 1;
    this.totalValue();
  }

  minus(id: any) {
    var index = this.cart.findIndex((x) => x.id === id);
    this.cart[index].amount! -= 1;
    if (this.cart[index].amount == 0) {
      this.cart.splice(index, 1);
    }
    console.log(this.cart);
    this.totalValue();
  }

  remove(id: any) {
    var index = this.cart.findIndex((x) => x.id === id);

    this.cart.splice(index, 1);

    this.totalValue();
  }
}
