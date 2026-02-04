import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OpenIaService } from '../../../services/openia.service';
import { ChatMessage } from '../../components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../components/chatBubble/my-message/my-message';
import { TextMessageBox } from '../../components/textBoxes/text-message-box/text-message-box';
import { TypingLoader } from '../../components/typing-loader/typing-loader';
import { IMessage } from '../../../interfaces';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-pros-cons-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './pros-cons-page.html',
})
export default class ProsConsPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);

  handleMessage(text: string) {
    this.isLoading.set(true);
    this.messages.update((messages) => [...messages, { text, isGpt: false }]);
    this.openIaService
      .checkProsCons(text)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((resp) => {
        this.messages.update((messages) => [
          ...messages,
          {
            text: resp.content,
            isGpt: true,
          },
        ]);
        console.log({ resp });
      });
  }
}
