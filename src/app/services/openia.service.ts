import { Injectable } from '@angular/core';
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
  textToAudioUseCase,
  translateTextUseCase,
} from '../core/use-cases';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenIaService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStreamDiscusser(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translateTextUseCase({ prompt, lang }: { prompt: string; lang: string }) {
    return from(translateTextUseCase(prompt, lang));
  }
  textToAudio({ prompt, voice }: { prompt: string; voice: string }) {
    return from(textToAudioUseCase(prompt, voice));
  }
  audioToText(file: File, prompt?: string) {
    return from(audioToTextUseCase(file, prompt));
  }

  imageGeneration(prompt: string, originalImage?: string, maskImage?: string) {
    return from(imageGenerationUseCase(prompt, originalImage, maskImage));
  }
}
