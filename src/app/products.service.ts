import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public categories: Array<string> = ["owoce", "warzywa", "nabiał", "mięso", "pieczywo", "słodycze", "napoje"];
  constructor() { }
}
