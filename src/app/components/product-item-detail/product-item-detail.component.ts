import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() product: Product;
  message: string;
  itemQuantity!: number;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.message = '';
    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      url: '',
      quantity: 0,
    }
   }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.params;
    const productId = Number(routeParams['id']);
    
    this.productService.getProducts().subscribe(res => {
      const product = res.find((product: Product) => product.id === productId);
      this.product = product || {};
      const cartItem = this.cartService.getItem(this.product.id);
      if (cartItem) {
        this.itemQuantity = cartItem.quantity || 0;
      }
    });
  }

  addToCart(product: Product, quantity: string): void {
    product.quantity = Number(quantity);
    this.cartService.addToCart(product);
    this.message = `${product.name} has been added to your cart!`;
    setTimeout(() => this.message = '', 5000);
  }
}
