import { environment } from '../../../../environments/environment';
import type { ITranslateResponse } from '../../../interfaces';

export const translateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) {
      throw new Error('Error en la solicitud a la API de traducción');
    }

    const { message } = (await resp.json()) as ITranslateResponse;

    return {
      ok: true,
      message,
    };
  } catch (error) {
    console.error('Error in translateTextUseCase:', error);
    return {
      ok: false,
      message: 'No se pudo realizar la traducción.',
    } as ITranslateResponse;
  }
};
