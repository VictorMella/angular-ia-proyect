import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsStreamUseCase, prosConsUseCase, translateTextUseCase } from '../core/use-cases';
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

  translateTextUseCase({prompt, lang}: {prompt: string, lang: string}) {
    return from(translateTextUseCase(prompt, lang));
  }
}
