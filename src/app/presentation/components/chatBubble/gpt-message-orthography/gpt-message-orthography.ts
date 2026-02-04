import { Component, input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  imports: [],
  templateUrl: './gpt-message-orthography.html',
})
export class GptMessageOrthography {
  userScore = input.required<number>();
  text = input.required<string>();
  errors = input.required<string[]>();
}
