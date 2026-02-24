import { environment } from '../../../../environments/environment';

export const createThreadUseCase = async () => {
  try {
    const resp = await fetch(`${environment.asistantApi}/create-thread`, {
      method: 'POST',
    });

    if (!resp.ok) {
      throw new Error('Error en la solicitud a la API de creación de hilo');
    }

    const { id } = (await resp.json()) as { id: string };

    return id;
  } catch (error) {
    console.error('Error in createThreadUseCase:', error);
    throw new Error('Error en la solicitud a la API de creación de hilo');
  }
};
