import { environment } from '../../../../environments/environment';

export async function* prosConsStreamUseCase(prompt: string, abortSignal?: AbortSignal) {
  try {
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal,
    });

    if (!resp.ok) {
      throw new Error('Error en la solicitud a la API de pros y contras con streaming');
    }

    if (!resp.body) {
      throw new Error('No se pudo obtener el cuerpo de la respuesta');
    }

    const render = resp.body.getReader();
    if (!render) {
      throw new Error('No se pudo obtener el reader del cuerpo de la respuesta');
    }

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { done, value } = await render.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }

    return text;
  } catch (error) {
    return null;
  }
}
