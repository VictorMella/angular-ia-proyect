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
import { Message } from '../../../interfaces/message.interface';
import { OpenIaService } from '../../../services/openia.service';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    TextMessageFile,
    TextMessageBoxSelect,
  ],
  templateUrl: './orthography-page.html',
  styleUrl: './orthography-page.css',
})
export default class OrthographyPage {
  public messages = signal<Message[]>([{ text: 'Hola Mundo', isGpt: false }]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);

  handleMessage(text: string) {
    console.log('OrthographyPage received message:', text);
  }
  handleMessageWithFile(text: TextMessageEvent) {
    console.log('OrthographyPage received message:', text);
  }

  handleMessageWithSelect(text: any) {
    console.log('OrthographyPage received message:', text);
  }
}
