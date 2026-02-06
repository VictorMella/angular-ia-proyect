import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMessage } from '../../../interfaces';
import { OpenIaService } from '../../../services/openia.service';
import { ChatMessage } from '../../components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../components/chatBubble/my-message/my-message';
import { TypingLoader } from '../../components/typing-loader/typing-loader';
import { TextMessageBoxEvent, TextMessageBoxSelect } from '../../components/textBoxes/text-message-box-select/text-message-box-select';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBoxSelect
  ],
  templateUrl: './text-to-audio-page.html',
})
export default class TextToAudioPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);

  public voices = [
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ];

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    const message = `${selectedOption} - ${prompt}`;
    this.messages.update((messages) => [...messages, { text: message, isGpt: false }]);
    this.isLoading.set(true);
    this.openIaService.textToAudio({ prompt, voice: selectedOption }).subscribe(({message, audioUrl}) => {
      console.log(message, audioUrl)
      this.messages.update((messages) => [
        ...messages,
        {
          text: message,
          isGpt: true,
          audioUrl
        },
      ]);
      this.isLoading.set(false);
    });
  }
}
