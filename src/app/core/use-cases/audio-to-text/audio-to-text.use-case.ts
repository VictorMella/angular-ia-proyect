import { environment } from '../../../../environments/environment';
import { AudioToTextResponse } from '../../../interfaces';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    if (prompt) {
      formData.append('prompt', prompt);
    }
    const resp = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',
      headers: {},
      body: formData,
    });

    if (!resp.ok) {
      throw new Error('Error en la solicitud a la API de conversión de audio a texto');
    }

    const data = (await resp.json()) as AudioToTextResponse;

    return data;
  } catch (error) {
    console.error('Error in audioToTextUseCase:', error);
    return null
  }
};
