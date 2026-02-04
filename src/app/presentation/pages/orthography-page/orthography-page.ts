import { Component, inject, signal } from '@angular/core';
import { ChatMessage } from '../../components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../components/chatBubble/my-message/my-message';
import { TypingLoader } from '../../components/typing-loader/typing-loader';
import { TextMessageBox } from '../../components/textBoxes/text-message-box/text-message-box';
import {
  TextMessageEvent,
  TextMessageFile,
} from '../../components/textBoxes/text-message-file/text-message-file';
import { TextMessageBoxSelect } from '../../components/textBoxes/text-message-box-select/text-message-box-select';
import { OpenIaService } from '../../../services/openia.service';
import { Message } from '../../../interfaces';
import { finalize } from 'rxjs';
import { GptMessageOrthography } from '../../components/chatBubble/gpt-message-orthography/gpt-message-orthography';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    GptMessageOrthography,
  ],
  templateUrl: './orthography-page.html',
})
export default class OrthographyPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);

  handleMessage(text: string) {
    this.isLoading.set(true);
    this.messages.update((messages) => [...messages, { text, isGpt: false }]);
    this.openIaService
      .checkOrthography(text)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((resp) => {
        this.messages.update((messages) => [
          ...messages,
          {
            text: resp.message,
            isGpt: true,
            info: resp,
          },
        ]);
        console.log({ resp });
      });
  }
}
