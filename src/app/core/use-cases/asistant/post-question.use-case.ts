import { environment } from '../../../../environments/environment';
import { QuestionResponse } from '../../../interfaces';

export const postQuestionUseCase = async (threadId: string, question: string) => {
  try {
    const resp = await fetch(`${environment.asistantApi}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, question }),
    });

    if (!resp.ok) {
      throw new Error('Error en la solicitud a la API de envío de pregunta');
    }

    const replies = (await resp.json()) as QuestionResponse[];

    return replies;
  } catch (error) {
    console.error('Error in postQuestionUseCase:', error);
    throw new Error('Error en la solicitud a la API de envío de pregunta');
  }
};
