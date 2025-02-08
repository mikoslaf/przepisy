import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  public name: string = "";
  public category: string = "";

  constructor(public products: ProductsService) {}

  public firstCharToUpper(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  public addProduct(): void {
    console.log("Adding product: " + this.name + "| category: " + this.category);
    if(this.name != "" && this.category != ""){
      this.products.addProduct(this.name, this.category);
    }
  }
}
