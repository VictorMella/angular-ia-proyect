import { environment } from '../../../../environments/environment';
import type { OrthographyResponse } from '../../../interfaces';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) {
      throw new Error('Error en la solicitud a la API de corrección ortográfica');
    }

    const data = (await resp.json()) as OrthographyResponse;

    return {
      of: true,
      ...data,
    };
  } catch (error) {
    console.error('Error in orthographyUseCase:', error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la corrección ortográfica.',
    } as OrthographyResponse;
  }
};
