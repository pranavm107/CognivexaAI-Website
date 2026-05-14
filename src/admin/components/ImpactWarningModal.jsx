import React from 'react';
import { AlertTriangle, ArrowRight, Zap, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TRANSACTIONAL IMPACT WARNING MODAL
 * Surfacing downstream dependencies and risks before administrative execution.
 */
const ImpactWarningModal = ({ isOpen, onClose, onConfirm, actionName, impacts }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
        >
           {/* Danger Strip */}
           <div className="h-2 bg-amber-500" />

           <div className="p-12">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8">
                 <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">
                 Execute {actionName}?
              </h2>
              
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                 Our dependency engine has identified <strong>{impacts?.length || 0} downstream effects</strong> associated with this action. Review the execution impact before proceeding.
              </p>

              <div className="space-y-4 mb-10">
                 {impacts.map((impact, i) => (
                   <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <div className="mt-1">
                         <Zap className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900 uppercase tracking-tight mb-0.5">{impact.type}</p>
                         <p className="text-xs text-slate-500 font-medium">{impact.description}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={onConfirm}
                   className="flex-1 py-5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                 >
                    Confirm Execution <ArrowRight className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={onClose}
                   className="px-10 py-5 bg-white border border-slate-100 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:text-slate-900 hover:bg-slate-50 transition-all"
                 >
                    Cancel
                 </button>
              </div>
           </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImpactWarningModal;
