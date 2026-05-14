import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '../utils/utils';

/**
 * ENTERPRISE WORKFLOW FEEDBACK ENGINE
 * Provides real-time visibility into complex multi-step execution states.
 */
const WorkflowProgress = ({ isOpen, workflowName, state, steps, currentStepIndex }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-10 right-10 z-[400] w-96">
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 border border-slate-800 text-white overflow-hidden relative"
        >
           {/* Background Glow */}
           <div className={cn(
             "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 transition-colors duration-1000",
             state === 'completed' ? "bg-emerald-500" : state === 'failed' ? "bg-rose-500" : "bg-indigo-500"
           )} />

           <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    {state === 'executing' ? (
                      <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                    ) : state === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                       Workflow: {workflowName}
                    </span>
                 </div>
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    {state}
                 </span>
              </div>

              <h4 className="text-xl font-black mb-6 tracking-tight">
                 {state === 'executing' ? 'Processing Transaction...' : state === 'completed' ? 'Execution Successful' : 'Workflow Halted'}
              </h4>

              {/* Steps Progress */}
              <div className="space-y-4">
                 {steps.map((step, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className={cn(
                           "w-1.5 h-1.5 rounded-full transition-all duration-500",
                           i < currentStepIndex ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : 
                           i === currentStepIndex ? "bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" : 
                           "bg-slate-700"
                         )} />
                         <span className={cn(
                           "text-[11px] font-bold uppercase tracking-tight transition-colors",
                           i <= currentStepIndex ? "text-white" : "text-slate-500"
                         )}>
                            {step.label}
                         </span>
                      </div>
                      {i < currentStepIndex && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                   </div>
                 ))}
              </div>

              {state === 'failed' && (
                <button className="w-full mt-8 py-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500/20 transition-all">
                   Initiate Rollback
                </button>
              )}
           </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WorkflowProgress;
