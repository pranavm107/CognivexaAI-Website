import React, { useState } from 'react';
import { 
  Building2, Palette, Users, 
  Rocket, CheckCircle2, ArrowRight,
  ChevronRight, Sparkles, Layout,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../utils/utils';

const OnboardingWizard = () => {
  const [step, setStep] = useState(1);
  const steps = [
    { id: 1, title: 'Organization', icon: Building2 },
    { id: 2, title: 'Branding', icon: Palette },
    { id: 3, title: 'Team', icon: Users },
    { id: 4, title: 'Finalize', icon: Rocket },
  ];

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tell us about your organization</h2>
               <p className="text-slate-500 font-medium">This will help us personalize your enterprise experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company Name</label>
                  <input type="text" placeholder="e.g. Acme Corp" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry</label>
                  <select className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none">
                     <option>FinTech</option>
                     <option>AI / Machine Learning</option>
                     <option>E-commerce</option>
                     <option>Healthcare</option>
                  </select>
               </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your Brand Identity</h2>
               <p className="text-slate-500 font-medium">Customize the look and feel of your enterprise workspace.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Color</label>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-100 border-4 border-white cursor-pointer" />
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 shadow-xl shadow-slate-100 border-4 border-white cursor-pointer" />
                        <div className="w-12 h-12 rounded-2xl bg-rose-500 shadow-xl shadow-rose-100 border-4 border-white cursor-pointer" />
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 shadow-xl shadow-emerald-100 border-4 border-white cursor-pointer" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workspace Theme</label>
                     <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-2xl border-2 border-indigo-600 bg-white text-left space-y-2 shadow-xl shadow-indigo-50">
                           <Layout className="w-5 h-5 text-indigo-600" />
                           <p className="text-[10px] font-black uppercase tracking-widest">Light Mode</p>
                        </button>
                        <button className="p-4 rounded-2xl border-2 border-slate-100 bg-slate-900 text-left space-y-2">
                           <ShieldCheck className="w-5 h-5 text-slate-500" />
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dark Mode</p>
                        </button>
                     </div>
                  </div>
               </div>
               <div className="bg-slate-50 rounded-[3rem] p-8 border border-slate-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full -translate-y-12 translate-x-12" />
                  <div className="space-y-4 text-center">
                     <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl mx-auto flex items-center justify-center text-indigo-600">
                        <Building2 className="w-8 h-8" />
                     </div>
                     <h4 className="text-sm font-black text-slate-900 tracking-tight">Acme Corp</h4>
                     <div className="w-32 h-2 bg-indigo-600 rounded-full mx-auto opacity-20" />
                  </div>
               </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight">Invite your Core Team</h2>
               <p className="text-slate-500 font-medium">Add key administrators and managers to start collaborating.</p>
            </div>
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                     <input type="email" placeholder="colleague@company.com" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" />
                  </div>
                  <div className="md:col-span-1 space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                     <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none">
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Finance</option>
                        <option>Operations</option>
                     </select>
                  </div>
                  <div className="md:col-span-1 flex items-end">
                     <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100">
                        Add to List
                     </button>
                  </div>
               </div>

               <div className="bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Invitations (2)</h4>
                     <span className="text-[10px] font-black text-indigo-600">Starter Plan: 3/5 Seats</span>
                  </div>
                  <div className="space-y-4">
                     {[
                       { email: 'sarah.engineer@acme.com', dept: 'Engineering', role: 'Admin' },
                       { email: 'mike.product@acme.com', dept: 'Product', role: 'Manager' }
                     ].map((invite, i) => (
                       <div key={i} className="bg-white p-4 rounded-xl flex items-center justify-between border border-slate-100 shadow-sm">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
                                {invite.email[0].toUpperCase()}
                             </div>
                             <div>
                                <p className="text-xs font-black text-slate-900">{invite.email}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{invite.dept} • {invite.role}</p>
                             </div>
                          </div>
                          <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-colors">Remove</button>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
             <div className="w-24 h-24 bg-emerald-50 rounded-full mx-auto flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-12 h-12" />
             </div>
             <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">You're all set!</h2>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">We're initializing your enterprise workspace, sample projects, and automation rules.</p>
             </div>
             <div className="pt-6">
                <button className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-sm font-black shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center gap-3 mx-auto">
                   Enter Command Center <ArrowRight className="w-5 h-5" />
                </button>
             </div>
          </div>
        );
      default:
        return <div>Step {step}</div>;
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col max-w-5xl mx-auto py-12">
      <>
        <div className="flex items-center justify-between mb-16">
           {steps.map((s, i) => (
             <React.Fragment key={s.id}>
               <div className="flex flex-col items-center gap-3 group relative">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                    step >= s.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "bg-white text-slate-300 border border-slate-100"
                  )}>
                     <s.icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest absolute -bottom-8 whitespace-nowrap",
                    step >= s.id ? "text-slate-900" : "text-slate-300"
                  )}>{s.title}</span>
               </div>
               {i < steps.length - 1 && (
                 <div className={cn(
                   "flex-1 h-0.5 mx-4 transition-all duration-700",
                   step > s.id ? "bg-indigo-600" : "bg-slate-100"
                 )} />
               )}
             </React.Fragment>
           ))}
        </div>

        <div className="flex-1 bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8">
              <Sparkles className="w-8 h-8 text-indigo-100" />
           </div>
           
           <div className="max-w-3xl mx-auto h-full flex flex-col">
              <div className="flex-1">
                 {renderStep()}
              </div>
              
              {step < 4 && (
                <div className="mt-20 pt-10 border-t border-slate-50 flex items-center justify-between">
                   <button 
                     onClick={() => setStep(Math.max(1, step - 1))}
                     disabled={step === 1}
                     className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 disabled:opacity-0 transition-all"
                   >
                      Back
                   </button>
                   <button 
                     onClick={() => setStep(step + 1)}
                     className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] text-sm font-black shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all flex items-center gap-2"
                   >
                      Continue <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              )}
           </div>
        </div>
      </>
    </div>
  );
};

export default OnboardingWizard;
