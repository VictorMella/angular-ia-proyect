import { environment } from '../../../../environments/environment';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!resp.ok) {
      throw new Error('Error en la solicitud a la API de conversión de texto a audio');
    }

    const audioFile = await resp.blob();

    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl,
    };
  } catch (error) {
    console.error('Error in textToAudioUseCase:', error);
    return {
      ok: false,
      audioUrl: '',
      message: 'No se pudo realizar la conversión de texto a audio.',
    };
  }
};
