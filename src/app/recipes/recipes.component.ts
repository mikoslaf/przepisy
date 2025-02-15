import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { AIService } from '../ai.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  constructor(private prod: ProductsService, private ai: AIService) {}

  public async askAI() {
    let prompt = `jesteś specjalistą od gastronomi, przygotuwjesz propozycje na podstawie zawartośći mojej lodówki,
    jak czegoś mi brakuje to zaproponuj listę zakupów
    zawartość lodówki: ${this.prod.products.filter((product) => product.selected).map((product) => product.name).join(", ")}
    
    odpowiedz w formie json {propozycje: [{nazwa_propozycji, [lista_zakupow], [lista_skladnikow], czas_przygotowania}]}
    
    nie dodwaja datkoowych informacji,
    nie dodawaj dodatkowych opisów,
    nie dodawaj dodatkowych pytań,
    nie dodawaj dodatkowych znaczników`;

    let odpowiedz = await this.ai.AI(prompt, "");
    console.log();
    
    return odpowiedz.replace(/(json|```)/g, '');
  }
}
