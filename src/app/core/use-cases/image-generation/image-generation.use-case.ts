import { environment } from '../../../../environments/environment';

type GeneratedImage = Image | null;

interface Image {
  url: string;
  alt: string;
}

export const imageGenerationUseCase = async (
  prompt?: string,
  originalImage?: string,
  maskImage?: string,
): Promise<GeneratedImage> => {
  try {
    const response = await fetch(`${environment.backendApi}/image-generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, originalImage, maskImage }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const { url, revised_prompt: alt } = await response.json();
    return { url, alt }; // Suponiendo que la respuesta contiene la URL de la imagen generada
  } catch (error) {
    console.error('Error generating image:', error);
    return { url: '', alt: `Error generating image: ${error}` };
  }
};
