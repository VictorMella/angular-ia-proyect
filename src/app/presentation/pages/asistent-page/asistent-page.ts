import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMessage } from '../../../interfaces';
import { OpenIaService } from '../../../services/openia.service';
import { ChatMessage } from '../../components/chatBubble/chat-message/chat-message';
import { MyMessage } from '../../components/chatBubble/my-message/my-message';
import { TextMessageBox } from '../../components/textBoxes/text-message-box/text-message-box';
import { TypingLoader } from '../../components/typing-loader/typing-loader';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-asistent-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './asistent-page.html',
})
export default class AsistentPage implements OnInit {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);

  public openIaService = inject(OpenIaService);
  public threarId = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.openIaService.createThread().subscribe({
      next: (threadId) => {
        this.threarId.set(threadId);
      },
      error: (error) => {
        console.error('Error creating thread:', error);
      },
    });
  }

  handleMessage(question: string) {
    console.log('Mensaje enviado:', question);

    this.isLoading.set(true);
    this.messages.update((messages) => [...messages, { text: question, isGpt: false }]);
    this.openIaService
      .postQuestion(this.threarId()!, question)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((replies) => {
        for (const reply of replies) {
          for (const message of reply.content) {
            this.messages.update((messages) => [
              ...messages,
              {
                text: message,
                isGpt: reply.role === 'assistant',
              },
            ]);
          }
        }
      });
  }
}
