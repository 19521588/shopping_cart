import { Component, OnInit } from '@angular/core';
import products from '../assets/data/shoes.json';
import { Product } from 'src/model/productModel';
import { CartItem } from 'src/model/cartItemModel';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue',
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shopping_cart';
  total = 0;
  public productList: Product[] = products;
  public cart: CartItem[] = [];
  public temp: CartItem = {};

  animationState?: boolean;

  ngOnInit() {
    if (JSON.parse(this.getData('cartItems')!)) {
      this.cart = JSON.parse(this.getData('cartItems')!);
    }
    this.totalValue();
  }

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
    return this.cart.findIndex((x) => x.id === id) >= 0 ? false : true;
  }

  totalValue() {
    this.total = this.cart.reduce((a, b) => a + b.price! * b.amount!, 0);
    this.saveData('cartItems', this.cart);
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
      this.isAnimate();
      this.cart.splice(index, 1);
    }
    console.log(this.cart);
    this.totalValue();
  }

  remove(id: any) {
    this.isAnimate();
    var index = this.cart.findIndex((x) => x.id === id);

    this.cart.splice(index, 1);

    this.totalValue();

  }

  isAnimate() {
    console.log('animating!');
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 4);
  }

  public saveData(key: string, value: CartItem[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
}
