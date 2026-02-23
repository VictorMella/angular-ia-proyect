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
import { GtpMessageEditableImage } from '../../components/chatBubble/gtp-message-editable-image/gtp-message-editable-image';

@Component({
  selector: 'app-image-tunning-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    GtpMessageEditableImage,
  ],
  templateUrl: './image-tunning-page.html',
})
export default class ImageTunningPage {
  public messages = signal<IMessage[]>([
    {
      isGpt: true,
      imageInfo: {
        url: 'http://localhost:3000/gpt/image-generation/1771599592120.png',
        alt: 'Dummy image',
      },
      text: '¡Hola! Soy tu asistente de generación de imágenes. Puedes describirme la imagen que quieres crear, y yo me encargaré de generarla para ti. Por ejemplo, puedes decirme "Quiero una imagen de un gato montando una bicicleta en un parque soleado". ¡Estoy aquí para ayudarte a dar vida a tus ideas visuales!',
    },
  ]);

  public isLoading = signal(false);
  public openAiService = inject(OpenIaService);

  public originalImage = signal<string | undefined>(undefined);
  public maksImage = signal<string | undefined>(undefined);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { isGpt: false, text: prompt }]);

    this.openAiService
      .imageGeneration(prompt, this.originalImage(), this.maksImage())
      .subscribe((resp) => {
        this.isLoading.set(false);
        if (!resp) return;

        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.alt,
            imageInfo: resp,
          },
        ]);
      });
  }

  handleImageChange(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
    this.maksImage.set(newImage);
  }

  generateVariation() {
    if (!this.originalImage()) return;

    this.isLoading.set(true);

    this.openAiService.imageVariation(this.originalImage()!).subscribe((resp) => {
      this.isLoading.set(false);
      if (!resp) return;

      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.alt,
          imageInfo: resp,
        },
      ]);
    });
  }
}
