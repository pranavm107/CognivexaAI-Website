import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Zap, 
  Box,
  Users, 
  MessageSquare, 
  CreditCard,
  BarChart3, 
  Shield,
  FileText,
  Package, 
  Briefcase, 
  Bell,
  Settings, 
  X,
  Command as CommandIcon,
  Plus,
  ArrowRight,
  ShieldAlert,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useUIStore from '../store/uiStore';
import { cn } from '../utils/utils';

const commands = [
  // Navigation
  { id: 'ops', name: 'Ops Cockpit', icon: Zap, category: 'Intelligence', path: '/admin/ops' },
  { id: 'clients', name: 'Manage Clients', icon: Users, category: 'Operations', path: '/admin/clients' },
  { id: 'projects', name: 'Project Monitor', icon: Box, category: 'Operations', path: '/admin/projects' },
  { id: 'finance', name: 'Financial Center', icon: CreditCard, category: 'Finance', path: '/admin/finance' },
  { id: 'security', name: 'Security Command', icon: Shield, category: 'Security', path: '/admin/security' },
  { id: 'reports', name: 'Intelligence Reports', icon: FileText, category: 'Intelligence', path: '/admin/reports' },
  
  // Quick Actions
  { id: 'impersonate', name: 'Impersonate Client', icon: ShieldAlert, category: 'Admin Tools', action: () => console.log('Impersonation trigger') },
  { id: 'gen-report', name: 'Generate Revenue PDF', icon: Download, category: 'Admin Tools', action: () => console.log('Report generation') },
  { id: 'new-service', name: 'Add New Service', icon: Plus, category: 'Content', path: '/admin/services' },
];

const CommandMenu = () => {
  const { isCommandMenuOpen, setCommandMenuOpen } = useUIStore();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isCommandMenuOpen) {
      inputRef.current?.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isCommandMenuOpen]);

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (cmd) => {
    if (cmd.path) navigate(cmd.path);
    if (cmd.action) cmd.action();
    setCommandMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(filteredCommands[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isCommandMenuOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-[640px] bg-white rounded-2xl shadow-2xl z-[101] border border-slate-200 overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-lg"
              />
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-400">
                <CommandIcon className="w-2.5 h-2.5" />
                K
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                <div className="space-y-1">
                  {filteredCommands.map((cmd, idx) => (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-150 group",
                        selectedIndex === idx ? "bg-indigo-600 text-white" : "hover:bg-slate-50 text-slate-600"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <cmd.icon className={cn(
                          "w-4 h-4",
                          selectedIndex === idx ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                        )} />
                        <span className="font-medium text-sm">{cmd.name}</span>
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                        selectedIndex === idx ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                      )}>
                        {cmd.category}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-sm">No results found for "{search}"</p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-md">↵</span>
                  Select
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-md">↑↓</span>
                  Navigate
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-md">ESC</span>
                  Close
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Cognivexa AI v1.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
