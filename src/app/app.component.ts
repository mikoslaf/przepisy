import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AIService } from './ai.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'przepisy';

  constructor(aiService: AIService) {
    aiService.AI("", "");
  }
}
