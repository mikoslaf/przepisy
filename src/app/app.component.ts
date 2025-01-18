import { Component } from '@angular/core';
import { AIService } from './ai.service';
import { AddProductComponent } from "./add-product/add-product.component";
import { FiltersComponent } from "./filters/filters.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { RecipesComponent } from "./recipes/recipes.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddProductComponent, FiltersComponent, ProductListComponent, RecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'przepisy';

  constructor() {}
}
