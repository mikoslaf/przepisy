import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  constructor(public products: ProductsService) {}

  public firstCharToUpper(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
