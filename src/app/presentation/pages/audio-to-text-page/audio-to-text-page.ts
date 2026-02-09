import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AudioToTextResponse, IMessage } from '../../../interfaces';
import { OpenIaService } from '../../../services/openia.service';
import { ChatMessage } from '../../components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../components/chatBubble/my-message/my-message';
import { TypingLoader } from '../../components/typing-loader/typing-loader';
import {
  TextMessageEvent,
  TextMessageFile,
} from '../../components/textBoxes/text-message-file/text-message-file';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageFile,
  ],
  templateUrl: './audio-to-text-page.html',
})
export default class AudioToTextPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    const text = prompt ?? file.name ?? 'Traduce el audio a texto';
    this.messages.update((messages) => [...messages, { text, isGpt: false }]);
    this.isLoading.set(true);
    this.openIaService.audioToText(file, text).subscribe((resp) => this.handleResponse(resp));
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!resp) return;
    const audioResp = resp as AudioToTextResponse;
    const text = `## Transcripción de Audio
    __Duración:__ ${Math.round(audioResp.duration)} segundos.
    ## El texto es:
    ${audioResp.text}`;
    this.messages.update((messages) => [...messages, { text, isGpt: true }]);

    for (const segment of resp.segments) {
      const segmentText = `__De ${ Math.round(segment.start) } a ${Math.round(segment.end)} segundos:__ ${segment.text}`;
      this.messages.update((messages) => [...messages, { text: segmentText, isGpt: true }]);
    }
  }
}
