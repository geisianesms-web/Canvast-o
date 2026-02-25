import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { HexColorPicker } from 'react-colorful';
import { Trash2, Type, Move, Layers, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const PropertiesPanel = () => {
  const { elements, selectedId, updateElement, removeElement } = useEditorStore();
  const selectedElement = elements.find((el) => el.id === selectedId);

  if (!selectedElement) {
    return (
      <div className="w-64 bg-white border-l border-black/5 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Layers className="w-6 h-6 text-gray-300" />
        </div>
        <p className="text-sm text-gray-400 font-medium">
          Selecione um elemento para editar suas propriedades
        </p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-l border-black/5 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Propriedades</h3>
        <button 
          onClick={() => removeElement(selectedElement.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Common Properties */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            Posição e Tamanho
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400">X</span>
              <input 
                type="number" 
                value={Math.round(selectedElement.x)} 
                onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
                className="w-full p-2 bg-gray-50 border border-black/5 rounded-lg text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400">Y</span>
              <input 
                type="number" 
                value={Math.round(selectedElement.y)} 
                onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
                className="w-full p-2 bg-gray-50 border border-black/5 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Specific Properties */}
        {selectedElement.type === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                Conteúdo
              </label>
              <textarea 
                value={selectedElement.text}
                onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                className="w-full p-2 bg-gray-50 border border-black/5 rounded-lg text-xs h-20 resize-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                Tamanho da Fonte
              </label>
              <input 
                type="range" 
                min="8" 
                max="200"
                value={selectedElement.fontSize}
                onChange={(e) => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        )}

        {(selectedElement.type === 'rect' || selectedElement.type === 'circle' || selectedElement.type === 'text') && (
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
              Cor
            </label>
            <div className="p-2 bg-gray-50 border border-black/5 rounded-xl">
              <HexColorPicker 
                color={selectedElement.fill} 
                onChange={(color) => updateElement(selectedElement.id, { fill: color })}
                className="!w-full !h-32"
              />
              <div className="mt-3 flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-black/10" 
                  style={{ backgroundColor: selectedElement.fill }}
                />
                <input 
                  type="text" 
                  value={selectedElement.fill}
                  onChange={(e) => updateElement(selectedElement.id, { fill: e.target.value })}
                  className="flex-1 p-1.5 bg-white border border-black/5 rounded text-[10px] font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {selectedElement.type === 'image' && (
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-[10px] text-indigo-600 font-medium">
              Esta imagem foi gerada com IA. Você pode redimensioná-la e movê-la livremente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
