import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMessage } from '../../../interfaces';
import { OpenIaService } from '../../../services/openia.service';
import { ChatMessage } from '../../components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../components/chatBubble/my-message/my-message';
import { TextMessageBox } from '../../components/textBoxes/text-message-box/text-message-box';
import { TypingLoader } from '../../components/typing-loader/typing-loader';
import {
  TextMessageBoxEvent,
  TextMessageBoxSelect,
} from '../../components/textBoxes/text-message-box-select/text-message-box-select';
import { finalize } from 'rxjs';
interface Option {
  id: string;
  text: string;
}
@Component({
  selector: 'app-translate-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    TextMessageBoxSelect,
  ],
  templateUrl: './translate-page.html',
})
export default class TranslatePage {
  public messages = signal<IMessage[]>([{ text: 'Hola Mundo', isGpt: false }]);
  public isLoading = signal<boolean>(false);
  public languages = signal<Option[]>([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  public openIaService = inject(OpenIaService);

  handleMessage({ prompt, selectedOption }: TextMessageBoxEvent) {
    this.isLoading.set(true);
    this.messages.update((messages) => [...messages, { text: prompt, isGpt: false }]);
    this.openIaService
      .translateTextUseCase({ prompt, lang: selectedOption })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((resp) => {
        this.messages.update((messages) => [
          ...messages,
          {
            text: resp.message,
            isGpt: true,
          },
        ]);
      });
  }
}
