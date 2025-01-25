import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

  get categoryList(): Array<string> {
    return this.product.categories;
  }
  
  get selectedCategory(): Record<string, boolean> {
    return this.product.selectedCategory;
  }

  set selectedCategory(value: Record<string, boolean>) {
    this.product.selectedCategory = value;
  }

  private lastStan: boolean = false;

  public reversFilters(): void {
    this.product.categories.forEach((category) => {
      this.selectedCategory[category] = !this.lastStan;
    });
    this.lastStan = !this.lastStan;
  }

  constructor(private product: ProductsService){
    this.product.categories.forEach((category) => {
      this.selectedCategory[category] = false;
    });
  }
}
