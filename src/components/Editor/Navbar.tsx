import React from 'react';
import { Download, Share2, Crown, Play } from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';
import confetti from 'canvas-confetti';

export const Navbar = () => {
  const { elements, setView } = useEditorStore();

  const handleExport = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#10B981', '#F59E0B']
    });
    alert('Design exportado com sucesso! (Simulação)');
  };

  return (
    <nav className="h-14 bg-white border-b border-black/5 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">Canvastão</span>
        </button>
        <div className="h-6 w-[1px] bg-black/10 mx-2 hidden sm:block" />
        <div className="hidden md:flex items-center gap-1 text-sm text-gray-500 font-medium">
          <button className="px-2 py-1 hover:bg-gray-100 rounded">Arquivo</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded">Redimensionar</button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Tudo Grátis</span>
        </button>
        
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Play className="w-5 h-5" />
        </button>

        <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Share2 className="w-4 h-4" />
          <span>Compartilhar</span>
        </button>

        <button 
          onClick={handleExport}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Baixar"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};
