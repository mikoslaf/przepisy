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
   // console.log(new AIService().AI())
   this.addProduct("jabłko", "owoce");
    this.addProduct("banan", "owoce");
    this.addProduct("pomidor", "warzywa");
    this.addProduct("ogórek", "warzywa");
    this.addProduct("mleko", "nabiał");
    this.addProduct("ser", "nabiał");
    this.addProduct("kurczak", "mięso");
    this.addProduct("wieprzowina", "mięso");
    this.addProduct("chleb", "pieczywo");
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
    //sessionStorage.setItem('sem3_przep_products', JSON.stringify(this.products));
  }

  public load(): void {
    try {
      this.products = JSON.parse(sessionStorage.getItem('sem3_przep_products') || '[]');    
    } catch (error) {
      this.products = [];
    }
  }
}
