import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  MoreHorizontal, Plus, Clock, 
  MessageSquare, Paperclip, 
  ChevronRight, Layout, List,
  Filter, Search, User as UserIcon
} from 'lucide-react';
import { clientApi } from '../services/api';
import { cn } from '../../admin/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

const KANBAN_COLUMNS = [
  { id: 'todo', title: 'Backlog', color: 'bg-slate-100 text-slate-600' },
  { id: 'in_progress', title: 'Active Engine', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'review', title: 'Quality Assurance', color: 'bg-amber-50 text-amber-600' },
  { id: 'completed', title: 'Deployed', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'blocked', title: 'Operational Blocker', color: 'bg-rose-50 text-rose-600' },
];

const KanbanBoard = ({ projectId }) => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('kanban');

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ['project-tasks', projectId],
    queryFn: () => clientApi.getTasks(projectId),
    enabled: !!projectId
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }) => clientApi.updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['project-tasks', projectId]);
    }
  });

  const tasks = tasksData?.results || [];

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    updateTaskMutation.mutate({ taskId, data: { status } });
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  if (isLoading) return <div className="p-6 md:p-undefined text-center font-black animate-pulse">Syncing Task Engine...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('kanban')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === 'kanban' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Layout className="w-3.5 h-3.5" /> Pipeline View
          </button>
          <button 
            onClick={() => setActiveTab('list')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === 'list' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <List className="w-3.5 h-3.5" /> Schema List
          </button>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input placeholder="Search directives..." className="bg-white border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-100" />
           </div>
           <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100">
             <Plus className="w-4 h-4" /> New Directive
           </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-10 min-h-[700px] snap-x">
        {KANBAN_COLUMNS.map((column) => (
          <div 
            key={column.id}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column.id)}
            className="flex-shrink-0 w-[320px] bg-slate-50/50 rounded-[2.5rem] border border-slate-100/50 flex flex-col p-4 snap-start"
          >
            <div className="flex items-center justify-between px-4 py-6">
              <div className="flex items-center gap-3">
                <span className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", column.color)}>
                  {column.title}
                </span>
                <span className="text-xs font-black text-slate-300">
                  {tasks.filter(t => t.status === column.id).length}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-900 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {tasks
                  .filter((t) => t.status === column.id)
                  .map((task, i) => (
                    <motion.div
                      key={task._id}
                      layoutId={task._id}
                      draggable
                      onDragStart={(e) => onDragStart(e, task._id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest",
                          task.priority === 'urgent' ? 'bg-rose-50 text-rose-600' :
                          task.priority === 'high' ? 'bg-amber-50 text-amber-600' :
                          'bg-slate-50 text-slate-500'
                        )}>
                          {task.priority}
                        </span>
                        <div className="flex -space-x-2">
                           {task.assignees?.map((a, idx) => (
                             <img key={idx} src={a.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${a.firstName}`} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100" alt="assignee" />
                           ))}
                        </div>
                      </div>

                      <h4 className="text-sm font-black text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                      <p className="text-xs font-medium text-slate-400 line-clamp-2 mb-6">{task.description}</p>

                      <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                        <div className="flex items-center gap-4 text-slate-300">
                           <div className="flex items-center gap-1.5">
                             <MessageSquare className="w-3.5 h-3.5" />
                             <span className="text-[10px] font-black">{task.comments?.length || 0}</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                             <Paperclip className="w-3.5 h-3.5" />
                             <span className="text-[10px] font-black">{task.attachments?.length || 0}</span>
                           </div>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                             <Clock className="w-3.5 h-3.5" />
                             <span className="text-[10px] font-black">{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
              
              <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:border-indigo-100 hover:text-indigo-400 transition-all flex items-center justify-center gap-2">
                <Plus className="w-3.5 h-3.5" /> Add Directive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
