import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  public selectedCategory: Record<string, boolean> = {};
  public categories: Array<string> = ["owoce", "warzywa", "nabiał", "mięso", "pieczywo", "słodycze", "napoje"];
  public products: Product[] = [];
  
  constructor() {
    this.load();
   }

  public addProduct(name: string, category: string): void {
    let product: Product = this.products.filter((pr) => pr.name == name)[0];
    if(product){
      product.selected = true;
      product.category = category;
    } else {
      product = {name: name, category: category, selected: true};
      this.products.push(product);
    }
    this.save();
  }

  public removeProduct(name: string): void {
    this.products = this.products.filter((pr) => pr.name != name);
    this.save();
  }

  public save(): void {
    localStorage.setItem('sem3_przep_products', JSON.stringify(this.products));
  }

  public load(): void {
    if(!localStorage){
      return;
    }
    
    const saved = localStorage.getItem('sem3_przep_products');
    if(saved){
      this.products = JSON.parse(saved);
    }
  }

}
