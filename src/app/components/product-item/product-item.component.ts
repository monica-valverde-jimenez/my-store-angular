import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  message!: string;
  itemQuantity!: number;
  constructor(
    private cartService: CartService
  ) {
    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      url: '',
    };
  }

  ngOnInit(): void {
    const cartItem = this.cartService.getItem(this.product.id);
    if (cartItem) {
      this.itemQuantity = cartItem.quantity || 0;
    }
  }

  addToCart(product: Product, quantity: string): void {
    product.quantity = Number(quantity);
    this.cartService.addToCart(product);
    this.message = `Added to your cart!`;
    setTimeout(() => this.message = '', 5000);
  }
}
