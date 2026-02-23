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
    GtpMessageEditableImage
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
    }
  ]);
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
    if (!this.originalImage()) return;
    this.isLoading.set(true);
    this.openIaService
      .imageVariation(this.originalImage()!)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((resp) => {
        if (!resp) return;
        this.messages.update((messages) => [
          ...messages,
          {
            text: resp?.alt || 'No se pudo generar la variación de la imagen.',
            isGpt: true,
            imageInfo: resp,
          },
        ]);
      });
  }

  handleSelectedImage(newImage: string, url: string) {
    this.originalImage.set(newImage);
  }
}
