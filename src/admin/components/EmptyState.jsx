import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, ArrowRight } from 'lucide-react';
import { cn } from '../utils/utils';

const EmptyState = ({ 
  title = "No data found", 
  description = "Get started by creating your first entry.",
  icon: Icon = Search,
  actionLabel,
  onAction,
  className
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center p-12 bg-white rounded-[3rem] border border-dashed border-slate-200 text-center",
        className
      )}
    >
      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
        <Icon className="w-10 h-10" />
      </div>
      
      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{title}</h3>
      <p className="text-slate-500 font-medium max-w-[300px] leading-relaxed mb-10">
        {description}
      </p>

      {actionLabel && (
        <button 
          onClick={onAction}
          className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:scale-105 active:scale-95 transition-all"
        >
          {actionLabel}
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
        </button>
      )}
      
      <div className="mt-12 flex items-center gap-6">
        <div className="flex -space-x-3">
          {[1,2,3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white" />
          ))}
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Trusted by 500+ Enterprises
        </p>
      </div>
    </motion.div>
  );
};

export default EmptyState;
