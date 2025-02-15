import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  constructor(private prod: ProductsService) {}
  
  get products(): Product[] {
    return this.prod.products.filter((product) => this.prod.selectedCategory[product.category]);
  }

  public save(): void {
    this.prod.save();
  }
}
