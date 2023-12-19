import { Component, OnInit } from '@angular/core';
import { Product } from './../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [new Product('Po1', 'hat'), new Product('Po2', 'shoe')];
  constructor() {}
  changeStarRating(message: string) {
    console.log(`Messge: ${message}`);
  }
  ngOnInit() {}
}
