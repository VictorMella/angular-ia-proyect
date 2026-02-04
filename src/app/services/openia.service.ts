import { Injectable } from '@angular/core';
import { orthographyUseCase } from '../core/use-cases';
import { from } from 'rxjs';
import { prosConsUseCase } from '../core/use-cases/pros-cons/pros-cons.use-case';

@Injectable({ providedIn: 'root' })
export class OpenIaService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  checkProsCons(prompt: string) {
    return from(prosConsUseCase(prompt));
  }
}
