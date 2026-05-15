import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FileText, Search, Filter, Download, 
  MoreHorizontal, Upload, Folder, 
  Image as ImageIcon, FileArchive, FileCode,
  Box, X, CheckCircle2, ChevronRight
} from 'lucide-react';
import { clientApi } from '../services/api';
import { cn } from '../../admin/utils/utils';
import PortalModal from '../components/PortalModal';
import { motion, AnimatePresence } from 'framer-motion';

const FileIcon = ({ type }) => {
  const t = type?.toLowerCase() || '';
  if (t.includes('pdf')) return <FileText className="w-8 h-8 text-rose-500" />;
  if (t.includes('png') || t.includes('jpg') || t.includes('image')) return <ImageIcon className="w-8 h-8 text-indigo-500" />;
  if (t.includes('zip') || t.includes('rar')) return <FileArchive className="w-8 h-8 text-amber-500" />;
  if (t.includes('js') || t.includes('html') || t.includes('code')) return <FileCode className="w-8 h-8 text-emerald-500" />;
  return <FileText className="w-8 h-8 text-slate-400" />;
};

const Files = () => {
  const queryClient = useQueryClient();
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: filesData, isLoading } = useQuery({
    queryKey: ['client-files', selectedProjectId],
    queryFn: () => clientApi.getFiles(selectedProjectId)
  });

  const { data: projectsData } = useQuery({
    queryKey: ['client-projects'],
    queryFn: clientApi.getProjects
  });

  const uploadMutation = useMutation({
    mutationFn: clientApi.uploadFile,
    onSuccess: () => {
      setIsUploadModalOpen(false);
      queryClient.invalidateQueries(['client-files']);
    }
  });

  const files = filesData?.results || [];
  const projects = projectsData?.results || [];

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Repository</h1>
          <p className="text-slate-500 font-medium text-lg">Central access point for all enterprise assets and project deliverables.</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2 group"
        >
          <Upload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Upload New Asset
        </button>
      </div>

      {/* Grid Controls */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all project files..."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-100 transition-all"
          />
        </div>
        <div className="flex gap-2">
           <div className="relative">
              <Folder className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <select 
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-8 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-indigo-600 appearance-none"
              >
                <option value="">All Projects</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.title}</option>
                ))}
              </select>
           </div>
           <button className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
             <Filter className="w-3.5 h-3.5" /> Type
           </button>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} className="h-64 bg-slate-50 animate-pulse rounded-[2.5rem]"></div>
          ))
        ) : filteredFiles.length > 0 ? (
          filteredFiles.map((file, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-8 rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all text-center flex flex-col items-center relative overflow-hidden"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                <FileIcon type={file.type} />
              </div>
              <h4 className="text-sm font-black text-slate-900 truncate w-full mb-1 px-2">{file.name}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{file.type?.toUpperCase() || 'DOCUMENT'}</p>
              
              <div className="mt-8 flex items-center justify-center gap-3 w-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <a 
                  href={file.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button 
                  className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-all"
                  title="Options"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-10 md:py-undefined text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-slate-200 mx-auto mb-8 shadow-sm">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Repository is empty</h3>
            <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto">No assets matched your current filters. Try adjusting your search or upload a new file.</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <PortalModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        title="Repository Upload"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          uploadMutation.mutate({
            projectId: formData.get('projectId'),
            name: formData.get('name'),
            url: 'https://example.com/asset.pdf', // Mocked upload URL
            type: 'PDF'
          });
        }} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Name</label>
            <input name="name" required placeholder="e.g. Q4 Growth Analysis" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Project Workspace</label>
            <div className="relative">
               <Box className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <select name="projectId" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600 appearance-none">
                  {projects.map(p => (
                    <option key={p._id} value={p._id}>{p.title}</option>
                  ))}
               </select>
            </div>
          </div>
          <div className="border-2 border-dashed border-slate-100 rounded-[2.5rem] p-16 text-center hover:border-indigo-200 transition-all cursor-pointer group bg-slate-50/50">
             <Upload className="w-12 h-12 text-slate-200 mx-auto mb-6 group-hover:text-indigo-400 group-hover:-translate-y-2 transition-all" />
             <p className="text-base font-black text-slate-900">Push to Cloud Storage</p>
             <p className="text-sm font-medium text-slate-400 mt-2">Maximum secure payload: 50MB</p>
          </div>
          <button 
            type="submit"
            disabled={uploadMutation.isPending}
            className="w-full py-5 bg-indigo-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
          >
            {uploadMutation.isPending ? 'Syncing...' : 'Initiate Secure Upload'} <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      </PortalModal>
    </div>
  );
};

export default Files;
