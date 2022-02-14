import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  fullName!: string;
  address!: string;
  creditCard!: string;
  total = this.cartService.getTotal();
  listProducts : Product[] = this.cartService.getItems();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.fullName = '';
  }

  ngOnInit(): void {}

  updateCart(id: number, quantity: string): void {
    this.cartService.updateItem(id, Number(quantity));
    this.total = this.cartService.getTotal();
  }

  removeItem(id: number) {
    this.cartService.removeToCart(id);
    this.total = this.cartService.getTotal();
  }

  onSubmit():void {
    this.cartService.clearCart();
    this.router.navigate(['/cart/confirmation'], { state: { fullName: this.fullName, total: this.total }});
  }
}
