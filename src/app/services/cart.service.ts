import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList: Product[] = [];
  constructor() { }

  addToCart(product: Product):void {
    const index = this.getItemIndex(product.id);
    if (index === -1) {
      this.cartList.push(product);
    } else {
      this.cartList.splice(index, 1, product);
    }
  }

  removeToCart(id: number):void {
    const index = this.getItemIndex(id);
    this.cartList.splice(index, 1);
  }

  getItemIndex(id: number):number {
    return this.cartList.findIndex(item => item.id === id);
  }

  getItem(id: number):Product {
    const index = this.getItemIndex(id);
    return this.cartList[index];
  }

  updateItem(id: number, quantity: number):void {
    const index = this.getItemIndex(id);
    this.cartList[index].quantity = quantity;
  }

  getItems():Product[] {
    return this.cartList || [];
  }

  getTotal():string {
    if (this.cartList.length === 0) return "0.00";
    const total = this.cartList.map(item => (item?.quantity || 0) * item.price).reduce((sum, current) => sum + current);
    return total.toFixed(2);
  }

  clearCart():Product[] {
    this.cartList = [];
    return this.cartList;
  }
}
