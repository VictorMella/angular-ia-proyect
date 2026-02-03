import { Component, input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  imports: [],
  templateUrl: './my-message.html',
  styleUrl: './my-message.css',
})
export class MyMessage {
  text = input.required<string>();
}
