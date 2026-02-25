import { create } from 'zustand';

export type ElementType = 'text' | 'rect' | 'circle' | 'image' | 'icon';

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  src?: string;
  iconName?: string;
  rotation: number;
  opacity?: number;
}

interface EditorState {
  view: 'home' | 'editor';
  elements: CanvasElement[];
  selectedId: string | null;
  backgroundColor: string;
  setView: (view: 'home' | 'editor') => void;
  addElement: (element: CanvasElement) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  setSelectedId: (id: string | null) => void;
  setBackgroundColor: (color: string) => void;
  loadTemplate: (elements: CanvasElement[], bgColor?: string) => void;
  clearCanvas: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  view: 'home',
  elements: [],
  selectedId: null,
  backgroundColor: '#ffffff',
  setView: (view) => set({ view }),
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    })),
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),
  setSelectedId: (id) => set({ selectedId: id }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  loadTemplate: (elements, bgColor) => set({ 
    elements, 
    backgroundColor: bgColor || '#ffffff',
    view: 'editor',
    selectedId: null 
  }),
  clearCanvas: () => set({ elements: [], selectedId: null, backgroundColor: '#ffffff' }),
}));
