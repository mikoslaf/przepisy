import { Injectable } from '@angular/core';
import { HfInference } from '@huggingface/inference';
import { MessageType } from './message-type';
import { generateStory } from './gemini';

@Injectable({
  providedIn: 'root',
})
export class AIService {
  client = new HfInference('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');
  public skladniki: Array<string> = [];
  public przepis: string = '';
  public rodzaj: Array<string> = ["sniadanie", "obiad", "kolacja"];
  public rodzajWybrany: number = 1;
  private opisAI: MessageType = {
    recipe: {
      system: `jesteś generatorem przepisów. wynik podaj w korakch wykonania, dodaj liste składników.
            bierz pod uwagę dostępne składniki
            opdowiadaj tylko w forimie json {skladniki: [string], kroki: [string], uwagi:[string]}
            nie dodawaj dodatkowych opisów
            nie dodawaj dodatkowych informacji`,
      user: `Przepis ${this.przepis} składniki ${this.skladniki.join(", ")}`,
    },
    list: {
      system: "",
      user: "",
    },
  };

  public async AI(system: string = this.opisAI.recipe.system, user: string = this.opisAI.recipe.user, model: string = "gemini"): Promise<string> {

    if(model == "gemini"){
      let response = await generateStory("AIzaSyCXc1CY9k-lj2WrpMFC7VFEa11QAl4u1-g", system + user);
      console.log(response);
      return response;
    }

    let out = '';

    const systemPrzepis = 'jesteś generatorem przepisów. wynik podaj w korakch wykonania, dodaj liste składników.'
            + 'bierz pod uwagę dostępne składniki'
            + 'opdowiadaj tylko w forimie json {skladniki: [string], kroki: [string], uwagi:[string]}'
            + 'nie dodawaj dodatkowych opisów'
            + 'nie dodawaj dodatkowych informacji';
    const userPrzepis = "Przepis pierogi ruskie, składniki maką, ziemniką, ser";

    const stream = this.client.chatCompletionStream({
      model: 'Qwen/Qwen2.5-72B-Instruct',
      messages: [
        {
          role: 'system',
          content: systemPrzepis
        },
        { role: 'user', content: userPrzepis },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 0.7,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent;
      }
    }

    console.log(out.replaceAll("`","").replace("json",""));
    
    return out.replaceAll("`","").replace("json","");
  }

  constructor() {
  }
}
