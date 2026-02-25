import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Editor/Navbar';
import { Sidebar } from './components/Editor/Sidebar';
import { Workspace } from './components/Editor/Workspace';
import { PropertiesPanel } from './components/Editor/PropertiesPanel';
import { Home } from './components/Home';
import { useEditorStore } from './store/useEditorStore';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'templates' | 'elements' | 'text' | 'ai'>('elements');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { view, addElement } = useEditorStore();

  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (view === 'home') {
    return <Home />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5] overflow-hidden font-sans">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden absolute left-4 bottom-4 z-[60] w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute md:relative z-50 h-full"
            >
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <main className="flex-1 relative bg-[#E5E5E5] flex items-center justify-center overflow-auto p-4 md:p-8">
          <Workspace />
        </main>

        <div className="hidden lg:block">
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
}
