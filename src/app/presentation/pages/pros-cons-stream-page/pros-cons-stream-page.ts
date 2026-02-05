import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMessage } from '../../../interfaces';
import { OpenIaService } from '../../../services/openia.service';
import { ChatMessage } from '../../components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../components/chatBubble/my-message/my-message';
import { TextMessageBox } from '../../components/textBoxes/text-message-box/text-message-box';
import { TypingLoader } from '../../components/typing-loader/typing-loader';

@Component({
  selector: 'app-pros-cons-stream-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './pros-cons-stream-page.html',
})
export default class ProsConsStreamPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);
  public abortSignal = new AbortController();

  async handleMessage(text: string) {
    this.abortSignal.abort();
    this.abortSignal = new AbortController();
    this.messages.update((message) => [
      ...message,
      {
        isGpt: false,
        text: text,
      },
      {
        isGpt: true,
        text: '...',
      },
    ]);
    this.isLoading.set(true);
    const stream = this.openIaService.prosConsStreamDiscusser(text, this.abortSignal.signal);

    this.isLoading.set(false);
    for await (const message of stream) {
      this.handleStreamResponse(message!);
    }
  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();
    this.messages.set([...messages, { text: message, isGpt: true }]);
  }
}
