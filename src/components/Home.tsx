import React from 'react';
import { Search, Layout, Image as ImageIcon, Video, FileText, Share2, Plus, Sparkles, ChevronRight } from 'lucide-react';
import { useEditorStore } from '../store/useEditorStore';
import { TEMPLATES } from '../lib/templates';
import { motion } from 'motion/react';

export const Home = () => {
  const { setView, loadTemplate, clearCanvas } = useEditorStore();

  const categories = [
    { icon: Layout, label: 'Apresentação', color: 'bg-orange-500' },
    { icon: Share2, label: 'Redes sociais', color: 'bg-pink-500' },
    { icon: Video, label: 'Vídeo', color: 'bg-purple-500' },
    { icon: FileText, label: 'Impressão', color: 'bg-blue-500' },
    { icon: FileText, label: 'Doc', color: 'bg-cyan-500' },
    { icon: Sparkles, label: 'Canva IA', color: 'bg-emerald-500' },
  ];

  return (
    <div className="flex-1 bg-[#0F0F12] text-white overflow-y-auto">
      {/* Hero Section */}
      <div className="relative h-[400px] flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-transparent pointer-events-none" />
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Bora fazer bonito?
        </motion.h1>

        <div className="w-full max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Busque entre milhões de modelos"
            className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            onClick={() => {
              clearCanvas();
              setView('editor');
            }}
            className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Criar do zero</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors">
            <Layout className="w-4 h-4" />
            <span>Modelos</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <button 
              key={i}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Explorar modelos</h2>
          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
            <span>Ver tudo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEMPLATES.map((template) => (
            <motion.div 
              key={template.id}
              whileHover={{ y: -8 }}
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden cursor-pointer group"
              onClick={() => loadTemplate(template.elements, template.backgroundColor)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm">Editar</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-200">{template.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Template Grátis</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
