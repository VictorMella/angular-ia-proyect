import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-message',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './chat-message.html',
})
export class ChatMessage {
  text = input.required<string>();
  audioUrl = input<string>();
  imageInfo = input<{ url: string; alt: string }>();
}
