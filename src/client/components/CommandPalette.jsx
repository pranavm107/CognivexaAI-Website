import React, { useState, useEffect } from 'react';
import { 
  Search, Command, Layout, 
  Box, MessageSquare, FileText, 
  CreditCard, Settings, ChevronRight,
  ArrowRight, Zap, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../admin/utils/utils';

const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const ACTIONS = [
    { id: 'dash', label: 'Go to Dashboard', icon: Layout, shortcut: 'G D', path: '/client/dashboard' },
    { id: 'proj', label: 'View All Projects', icon: Box, shortcut: 'G P', path: '/client/projects' },
    { id: 'msg', label: 'Open Messages', icon: MessageSquare, shortcut: 'G M', path: '/client/messages' },
    { id: 'files', label: 'Access Global Files', icon: FileText, shortcut: 'G F', path: '/client/files' },
    { id: 'billing', label: 'View Invoices', icon: CreditCard, shortcut: 'G B', path: '/client/invoices' },
    { id: 'settings', label: 'Organization Settings', icon: Settings, shortcut: 'G S', path: '/client/settings' },
  ];

  const filteredActions = ACTIONS.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Toggle logic would be in parent
      }
      if (isOpen) {
        if (e.key === 'ArrowDown') setSelectedIndex(s => (s + 1) % filteredActions.length);
        if (e.key === 'ArrowUp') setSelectedIndex(s => (s - 1 + filteredActions.length) % filteredActions.length);
        if (e.key === 'Enter') handleAction(filteredActions[selectedIndex]);
        if (e.key === 'Escape') onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex]);

  const handleAction = (action) => {
    if (action.path) {
      navigate(action.path);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[15%] -translate-x-1/2 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl z-[201] overflow-hidden border border-slate-100"
          >
            <div className="flex items-center px-8 py-6 border-b border-slate-50">
              <Search className="w-5 h-5 text-indigo-600 mr-4" />
              <input 
                autoFocus
                placeholder="Search directives, spaces, and operations..."
                className="flex-1 bg-transparent border-none focus:outline-none text-lg font-black text-slate-900 placeholder:text-slate-300"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] font-black text-slate-400">ESC</span>
              </div>
            </div>

            <div className="p-4 max-h-[400px] overflow-y-auto">
              <div className="px-4 py-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Operations</span>
              </div>
              <div className="space-y-1">
                {filteredActions.map((action, i) => (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-left",
                      selectedIndex === i ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        selectedIndex === i ? "bg-white/20" : "bg-slate-50"
                      )}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-black tracking-tight">{action.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {selectedIndex === i && <ArrowRight className="w-4 h-4" />}
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg",
                        selectedIndex === i ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"
                      )}>
                        {action.shortcut}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-white border border-slate-200 rounded-md shadow-sm"><Zap className="w-3 h-3 text-amber-500" /></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-white border border-slate-200 rounded-md shadow-sm"><Sparkles className="w-3 h-3 text-indigo-500" /></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Command</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <Command className="w-4 h-4 text-slate-300" />
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Cognivexa OS</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
