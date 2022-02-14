import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-confirmation',
  templateUrl: './cart-confirmation.component.html',
  styleUrls: ['./cart-confirmation.component.css']
})
export class CartConfirmationComponent implements OnInit {
  fullName: string;
  total: number;
  isRouting: boolean;

  constructor(
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {fullName: string, total: number};
    this.fullName = state?.fullName;
    this.total = state?.total;
    this.isRouting = typeof state !== 'undefined';
  }

  ngOnInit(): void {}

}
