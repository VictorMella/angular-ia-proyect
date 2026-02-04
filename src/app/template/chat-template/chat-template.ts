import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { TextMessageEvent, TextMessageFile } from '../../presentation/components/textBoxes/text-message-file/text-message-file';
import { OpenIaService } from '../../services/openia.service';
import { ChatMessage } from '../../presentation/components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../presentation/components/chatBubble/my-message/my-message';
import { TextMessageBoxSelect } from '../../presentation/components/textBoxes/text-message-box-select/text-message-box-select';
import { TextMessageBox } from '../../presentation/components/textBoxes/text-message-box/text-message-box';
import { TypingLoader } from '../../presentation/components/typing-loader/typing-loader';
import { IMessage } from '../../interfaces/message.interface';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-template',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,

  ],
  templateUrl: './chat-template.html'
})
export class ChatTemplate {
  public messages = signal<IMessage[]>([{ text: 'Hola Mundo', isGpt: false }]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);

  handleMessage(text: string) {
    console.log('OrthographyPage received message:', text);
  }
}
