import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { IMessage } from '../../../interfaces';
import { OpenIaService } from '../../../services/openia.service';
import { ChatMessage } from '../../components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../components/chatBubble/my-message/my-message';
import { TextMessageBox } from '../../components/textBoxes/text-message-box/text-message-box';
import { TypingLoader } from '../../components/typing-loader/typing-loader';

@Component({
  selector: 'app-image-tunning-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './image-tunning-page.html',
})
export default class ImageTunningPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);

  public originalImage = signal<string | undefined>(undefined);

  handleMessage(text: string) {
    this.isLoading.set(true);
    this.messages.update((messages) => [...messages, { text: text, isGpt: false }]);
    this.openIaService
      .imageGeneration(text)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((resp) => {
        if (!resp) return;
        this.messages.update((messages) => [
          ...messages,
          {
            text: resp?.alt || 'No se pudo generar la imagen.',
            isGpt: true,
            imageInfo: resp,
          },
        ]);
      });
  }

  generateVariation(){

  }
}
