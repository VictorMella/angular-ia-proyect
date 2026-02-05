import { environment } from '../../../../environments/environment';
import type { IProsConsResponse } from '../../../interfaces';

export const prosConsUseCase = async (prompt: string): Promise<IProsConsResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) {
      throw new Error('Error en la solicitud a la API de pros y contras');
    }

    const data = (await resp.json()) as IProsConsResponse;

    return {
      ok: true,
      ...data,
    } as IProsConsResponse;
  } catch (error) {
    console.error('Error in prosConsUseCase:', error);
    return {
      ok: false,
      role: '',
      content: '',
    } as IProsConsResponse;
  }
};
