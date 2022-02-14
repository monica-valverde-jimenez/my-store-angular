export class Product {
    id: number;
    name: string;
    description: string;
    url: string;
    price: number;
    quantity?: number;

    constructor() {
      this.id = 1;
      this.name = '';
      this.description = '';
      this.url = '';
      this.price = 0;
      this.quantity = 0;
    }
  }