import { CanvasElement } from '../store/useEditorStore';

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  backgroundColor: string;
  elements: CanvasElement[];
}

export const TEMPLATES: Template[] = [
  {
    id: 'instagram-post-1',
    name: 'Post para Instagram',
    thumbnail: 'https://picsum.photos/seed/insta1/400/400',
    backgroundColor: '#FF6B6B',
    elements: [
      {
        id: 't1-1',
        type: 'text',
        x: 50,
        y: 100,
        width: 300,
        height: 100,
        text: 'OFERTA DO DIA',
        fontSize: 48,
        rotation: 0,
        fill: '#ffffff',
      },
      {
        id: 't1-2',
        type: 'rect',
        x: 50,
        y: 220,
        width: 300,
        height: 5,
        fill: '#ffffff',
        rotation: 0,
      },
      {
        id: 't1-3',
        type: 'text',
        x: 50,
        y: 250,
        width: 300,
        height: 50,
        text: '50% DE DESCONTO EM TUDO',
        fontSize: 20,
        rotation: 0,
        fill: '#ffffff',
      }
    ]
  },
  {
    id: 'business-card-1',
    name: 'Cartão de Visita',
    thumbnail: 'https://picsum.photos/seed/biz1/400/225',
    backgroundColor: '#1A1A1A',
    elements: [
      {
        id: 't2-1',
        type: 'rect',
        x: 0,
        y: 0,
        width: 100,
        height: 600,
        fill: '#4F46E5',
        rotation: 0,
      },
      {
        id: 't2-2',
        type: 'text',
        x: 130,
        y: 150,
        width: 400,
        height: 60,
        text: 'SEU NOME AQUI',
        fontSize: 32,
        rotation: 0,
        fill: '#ffffff',
      },
      {
        id: 't2-3',
        type: 'text',
        x: 130,
        y: 200,
        width: 400,
        height: 30,
        text: 'Designer Criativo',
        fontSize: 18,
        rotation: 0,
        fill: '#4F46E5',
      }
    ]
  },
  {
    id: 'quote-1',
    name: 'Frase Motivacional',
    thumbnail: 'https://picsum.photos/seed/quote1/400/400',
    backgroundColor: '#F3F4F6',
    elements: [
      {
        id: 't3-1',
        type: 'circle',
        x: 200,
        y: 200,
        width: 300,
        height: 300,
        fill: '#E5E7EB',
        rotation: 0,
      },
      {
        id: 't3-2',
        type: 'text',
        x: 100,
        y: 150,
        width: 200,
        height: 100,
        text: '"A criatividade é a inteligência se divertindo"',
        fontSize: 24,
        rotation: 0,
        fill: '#1F2937',
      }
    ]
  }
];
