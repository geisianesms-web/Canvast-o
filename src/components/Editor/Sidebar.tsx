import React, { useState } from 'react';
import { Layout, Square, Type, Sparkles, Image as ImageIcon, Search, Plus, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { useEditorStore } from '../../store/useEditorStore';
import { generateImage, generateTextSuggestion } from '../../lib/gemini';
import { TEMPLATES } from '../../lib/templates';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HexColorPicker } from 'react-colorful';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: 'templates' | 'elements' | 'text' | 'ai';
  setActiveTab: (tab: 'templates' | 'elements' | 'text' | 'ai') => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { addElement, loadTemplate, backgroundColor, setBackgroundColor } = useEditorStore();
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const tabs = [
    { id: 'templates', icon: Layout, label: 'Templates' },
    { id: 'elements', icon: Square, label: 'Elementos' },
    { id: 'text', icon: Type, label: 'Texto' },
    { id: 'ai', icon: Sparkles, label: 'IA Mágica' },
  ];

  const handleAddText = async (type: 'heading' | 'subheading' | 'body') => {
    const fontSize = type === 'heading' ? 48 : type === 'subheading' ? 24 : 16;
    addElement({
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      x: 50,
      y: 50,
      width: 300,
      height: 50,
      text: type === 'heading' ? 'Adicionar Título' : type === 'subheading' ? 'Adicionar Subtítulo' : 'Adicionar texto',
      fontSize,
      rotation: 0,
      fill: '#000000',
    });
  };

  const handleAddShape = (type: 'rect' | 'circle') => {
    addElement({
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 100,
      y: 100,
      width: 150,
      height: 150,
      fill: '#6366F1',
      rotation: 0,
    });
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const imageUrl = await generateImage(aiPrompt);
      addElement({
        id: Math.random().toString(36).substr(2, 9),
        type: 'image',
        x: 50,
        y: 50,
        width: 300,
        height: 300,
        src: imageUrl,
        rotation: 0,
      });
      setAiPrompt('');
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar imagem com IA');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Tab Icons */}
      <div className="w-[72px] bg-white border-r border-black/5 flex flex-col items-center py-4 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex flex-col items-center gap-1 w-full py-2 transition-colors relative",
              activeTab === tab.id ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <tab.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-8 bg-indigo-600 rounded-r-full"
              />
            )}
          </button>
        ))}
        
        <div className="mt-auto pb-4">
           <button 
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex flex-col items-center gap-1 w-full py-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Palette className="w-6 h-6" />
            <span className="text-[10px] font-medium">Fundo</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-72 bg-white border-r border-black/5 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg capitalize">{activeTab}</h3>
        </div>
        
        {showColorPicker && (
          <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-black/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase">Cor do Fundo</span>
              <button onClick={() => setShowColorPicker(false)} className="text-[10px] text-indigo-600 font-bold">Fechar</button>
            </div>
            <HexColorPicker color={backgroundColor} onChange={setBackgroundColor} className="!w-full !h-32" />
          </div>
        )}

        {activeTab === 'elements' && (
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleAddShape('rect')}
              className="aspect-square bg-gray-50 border border-black/5 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-indigo-600/30 hover:bg-indigo-50 transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-gray-600">Quadrado</span>
            </button>
            <button 
              onClick={() => handleAddShape('circle')}
              className="aspect-square bg-gray-50 border border-black/5 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-indigo-600/30 hover:bg-indigo-50 transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-600 rounded-full group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-gray-600">Círculo</span>
            </button>
          </div>
        )}

        {activeTab === 'text' && (
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleAddText('heading')}
              className="w-full py-4 px-4 bg-gray-50 border border-black/5 rounded-xl text-left hover:border-indigo-600/30 hover:bg-indigo-50 transition-all"
            >
              <span className="text-2xl font-bold block">Adicionar Título</span>
            </button>
            <button 
              onClick={() => handleAddText('subheading')}
              className="w-full py-3 px-4 bg-gray-50 border border-black/5 rounded-xl text-left hover:border-indigo-600/30 hover:bg-indigo-50 transition-all"
            >
              <span className="text-lg font-semibold block">Adicionar Subtítulo</span>
            </button>
            <button 
              onClick={() => handleAddText('body')}
              className="w-full py-2 px-4 bg-gray-50 border border-black/5 rounded-xl text-left hover:border-indigo-600/30 hover:bg-indigo-50 transition-all"
            >
              <span className="text-sm block">Adicionar um pouco de texto</span>
            </button>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-700 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">Gerador de Imagem IA</span>
              </div>
              <p className="text-xs text-indigo-600/80 mb-3">
                Descreva o que você quer ver e a IA do Canvastão criará para você gratuitamente.
              </p>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ex: Um gato astronauta no espaço estilo neon..."
                className="w-full h-24 p-3 text-sm bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
              />
              <button
                onClick={handleAiGenerate}
                disabled={isGenerating || !aiPrompt}
                className="w-full mt-3 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Gerando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Gerar Imagem</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 gap-4">
            {TEMPLATES.map((template) => (
              <div 
                key={template.id}
                onClick={() => loadTemplate(template.elements, template.backgroundColor)}
                className="aspect-[4/3] bg-gray-100 rounded-xl border border-black/5 overflow-hidden relative group cursor-pointer"
              >
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center p-4">
                  <span className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    Usar Template
                  </span>
                  <span className="text-[10px] text-white font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {template.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
