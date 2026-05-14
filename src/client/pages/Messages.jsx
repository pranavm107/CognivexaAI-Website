import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  MessageSquare, Send, Paperclip, 
  Search, User, Check, CheckCheck,
  MoreVertical, Smile, Image as ImageIcon,
  Clock, Hash, Plus, ChevronLeft
} from 'lucide-react';
import { clientApi } from '../services/api';
import { useClientAuthStore } from '../store/authStore';
import { cn } from '../../admin/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

const Messages = () => {
  const { user } = useClientAuthStore();
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);

  // Fetch projects list
  const { data: projectsData } = useQuery({
    queryKey: ['client-projects'],
    queryFn: clientApi.getProjects
  });

  // Fetch messages for selected project
  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', selectedProject?._id],
    queryFn: () => clientApi.getMessages(selectedProject?._id),
    enabled: !!selectedProject?._id,
  });

  // Socket Integration
  useEffect(() => {
    socketRef.current = io(window.location.origin.replace('5173', '7000'), {
      withCredentials: true,
    });

    socketRef.current.on('connect', () => {
      if (selectedProject?._id) {
        socketRef.current.emit('join_project', selectedProject._id);
      }
    });

    socketRef.current.on('new_message', (message) => {
      queryClient.setQueryData(['messages', selectedProject?._id], (old) => {
        if (!old) return { results: [message] };
        return { ...old, results: [...old.results, message] };
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [selectedProject?._id, queryClient]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messagesData]);

  const sendMessageMutation = useMutation({
    mutationFn: clientApi.sendMessage,
    onMutate: async (newMessage) => {
      // Optimistic update
      await queryClient.cancelQueries(['messages', selectedProject?._id]);
      const previousMessages = queryClient.getQueryData(['messages', selectedProject?._id]);
      
      queryClient.setQueryData(['messages', selectedProject?._id], (old) => ({
        ...old,
        results: [...(old?.results || []), { 
          _id: Date.now().toString(),
          content: newMessage.content,
          sender: user,
          createdAt: new Date().toISOString(),
          isOptimistic: true 
        }]
      }));

      return { previousMessages };
    },
    onError: (err, newMessage, context) => {
      queryClient.setQueryData(['messages', selectedProject?._id], context.previousMessages);
    },
    onSuccess: () => {
      setMessageText('');
      queryClient.invalidateQueries(['messages', selectedProject?._id]);
    }
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedProject) return;
    sendMessageMutation.mutate({
      projectId: selectedProject._id,
      content: messageText
    });
  };

  const projects = projectsData?.results || [];
  const messages = messagesData?.results || [];

  return (
    <div className="h-[calc(100vh-180px)] flex bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
      {/* Conversations Sidebar */}
      <div className={cn(
        "w-full md:w-80 border-r border-slate-100 flex flex-col bg-slate-50/50 transition-all",
        selectedProject ? "hidden md:flex" : "flex"
      )}>
        <div className="p-8 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Messages</h3>
            <button className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
               <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter channels..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-100 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Project Channels</p>
          {projects.map((project) => (
            <button
              key={project._id}
              onClick={() => setSelectedProject(project)}
              className={cn(
                "w-full p-4 rounded-2xl transition-all flex items-center gap-4 text-left relative group",
                selectedProject?._id === project._id 
                  ? "bg-white shadow-xl shadow-indigo-100/50 border border-indigo-100" 
                  : "hover:bg-white border border-transparent"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                selectedProject?._id === project._id ? "bg-indigo-600 text-white" : "bg-white text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
              )}>
                <Hash className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-black text-slate-900 truncate">{project.title}</h4>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter shrink-0">Active</span>
                </div>
                <p className="text-xs font-medium text-slate-500 truncate mt-0.5">Direct team access channel</p>
              </div>
              {selectedProject?._id === project._id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-white transition-all",
        !selectedProject ? "hidden md:flex" : "flex"
      )}>
        {selectedProject ? (
          <>
            {/* Chat Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedProject(null)} className="md:hidden p-2 -ml-2 text-slate-400">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 relative">
                  <MessageSquare className="w-6 h-6" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 leading-none">{selectedProject.title}</h4>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Team Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors bg-slate-50 rounded-xl">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors bg-slate-50 rounded-xl">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Display */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 scroll-smooth">
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mx-auto mb-4">
                   <Hash className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">End of the channel</h3>
                <p className="text-xs font-medium text-slate-400 mt-1 max-w-xs mx-auto">This is the beginning of your conversation with the Cognivexa team for {selectedProject.title}.</p>
              </div>
              
              {messages.map((msg, i) => {
                const isOwn = msg.sender?._id === user?._id;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg._id} 
                    className={cn("flex items-end gap-4 max-w-[85%]", isOwn ? "ml-auto flex-row-reverse" : "mr-auto")}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-50">
                       {msg.sender?.avatar ? <img src={msg.sender.avatar} alt="A" className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-slate-400" />}
                    </div>
                    <div className={cn("space-y-1.5", isOwn ? "items-end text-right" : "items-start text-left")}>
                       <div className="flex items-center gap-2 px-1">
                          <span className="text-[10px] font-black text-slate-900">{isOwn ? 'You' : msg.sender?.firstName}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                       </div>
                       <div className={cn(
                         "p-4 md:p-5 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm transition-all",
                         isOwn 
                          ? "bg-indigo-600 text-white rounded-br-none shadow-indigo-100 hover:bg-indigo-700" 
                          : "bg-white text-slate-900 rounded-bl-none border border-slate-100 hover:border-indigo-100",
                         msg.isOptimistic && "opacity-70 scale-95"
                       )}>
                         {msg.content}
                       </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="p-6 md:p-10 border-t border-slate-50">
               <form onSubmit={handleSendMessage} className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-2 flex items-center gap-2 group focus-within:border-indigo-100 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-indigo-100/30 transition-all">
                 <button type="button" className="p-4 text-slate-400 hover:text-indigo-600 transition-all hover:bg-white rounded-2xl">
                   <Paperclip className="w-5 h-5" />
                 </button>
                 <input 
                   type="text" 
                   value={messageText}
                   onChange={(e) => setMessageText(e.target.value)}
                   placeholder={`Message #${selectedProject.title.toLowerCase().replace(/\s/g, '-')}`}
                   className="flex-1 bg-transparent px-2 py-4 text-sm font-bold focus:outline-none placeholder:text-slate-300 text-slate-900"
                 />
                 <div className="flex items-center gap-1 pr-2">
                   <button type="button" className="p-4 text-slate-400 hover:text-indigo-600 transition-all hover:bg-white rounded-2xl hidden lg:block">
                     <Smile className="w-5 h-5" />
                   </button>
                   <button 
                     type="submit"
                     disabled={!messageText.trim() || sendMessageMutation.isPending}
                     className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:bg-slate-200 disabled:shadow-none hover:scale-105 active:scale-95"
                   >
                     {sendMessageMutation.isPending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                   </button>
                 </div>
               </form>
               <div className="mt-3 px-6 flex items-center justify-between">
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                   <Clock className="w-3 h-3" /> Average response time: <span className="text-indigo-600 font-black">15 mins</span>
                 </p>
                 <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest hidden md:block">ENTER to send, SHIFT+ENTER for new line</p>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-slate-50/20">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-50 flex items-center justify-center text-indigo-600 mb-10 relative"
            >
              <MessageSquare className="w-12 h-12" />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                 <Plus className="w-6 h-6" />
              </div>
            </motion.div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Central Communication</h3>
            <p className="text-slate-400 font-medium max-w-sm leading-relaxed text-lg mb-10">
              Select a project workspace from the left to start collaborating with your dedicated team in realtime.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">Realtime Sync</div>
              <div className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">Direct Access</div>
              <div className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">Encrypted</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
