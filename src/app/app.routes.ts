import { Routes } from '@angular/router';
import { DashboardLayout } from './presentation/layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: 'orthography',
        loadComponent: () => import('./presentation/pages/orthography-page/orthography-page'),
        data: {
          icon: 'fa-solid fa-spell-check',
          title: 'Ortografía',
          description: 'Corregir ortografía',
        },
      },
      {
        path: 'pros-cons',
        loadComponent: () =>
          import('./presentation/pages/pros-cons-stream-page/pros-cons-stream-page'),
        data: {
          icon: 'fa-solid fa-code-compare',
          title: 'Pros & Cons',
          description: 'Comparar pros y contras',
        },
      },
      {
        path: 'pros-cons-stream',
        loadComponent: () =>
          import('./presentation/pages/pros-cons-stream-page/pros-cons-stream-page'),
        data: {
          icon: 'fa-solid fa-water',
          title: 'Como stream',
          description: 'Con stream de mensajes',
        },
      },
      {
        path: 'translate',
        loadComponent: () => import('./presentation/pages/translate-page/translate-page'),
        data: {
          icon: 'fa-solid fa-language',
          title: 'Traducir',
          description: 'Textos a otros idiomas',
        },
      },
      {
        path: 'text-to-audio',
        loadComponent: () => import('./presentation/pages/text-to-audio-page/text-to-audio-page'),
        data: {
          icon: 'fa-solid fa-podcast',
          title: 'Texto a audio',
          description: 'Convertir texto a audio',
        },
      },
      {
        path: 'audio-to-text',
        loadComponent: () => import('./presentation/pages/audio-to-text-page/audio-to-text-page'),
        data: {
          icon: 'fa-solid fa-comment-dots',
          title: 'Audio a texto',
          description: 'Convertir audio a texto',
        },
      },
      {
        path: 'image-generation',
        loadComponent: () =>
          import('./presentation/pages/image-generation-page/image-generation-page'),
        data: {
          icon: 'fa-solid fa-image',
          title: 'Imágenes',
          description: 'Generar imágenes',
        },
      },
      {
        path: 'image-tunning',
        loadComponent: () => import('./presentation/pages/image-tunning-page/image-tunning-page'),
        data: {
          icon: 'fa-solid fa-wand-magic',
          title: 'Editar imagen',
          description: 'Generación continua',
        },
      },

      {
        path: 'assistant',
        loadComponent: () => import('./presentation/pages/asistent-page/asistent-page'),
        data: {
          icon: 'fa-solid fa-user',
          title: 'Asistente',
          description: 'Información del asistente',
        },
      },
      {
        path: '**',
        redirectTo: 'orthography',
        pathMatch: 'full',
      },
    ],
  },
];
