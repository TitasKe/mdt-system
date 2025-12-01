import React, { useState } from 'react';
import { Sparkles, Save, Eraser, Loader2 } from 'lucide-react';
import { generatePoliceReport } from '../services/geminiService';
import { MOCK_OFFICER } from '../services/mockData';

const IncidentReport: React.FC = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Traffic Stop');
  const [notes, setNotes] = useState('');
  const [narrative, setNarrative] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAI = async () => {
    if (!notes.trim()) return;
    setIsGenerating(true);
    const generatedText = await generatePoliceReport(notes, type, MOCK_OFFICER.name);
    setNarrative(generatedText);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Report submitted to records division.');
    setTitle('');
    setNotes('');
    setNarrative('');
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h2 className="text-2xl font-light text-white">New Incident Report</h2>
        <span className="text-xs font-mono text-zinc-500">REF: #{Math.floor(Math.random() * 10000)}</span>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
           <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Primary Information</label>
               <input
                 type="text"
                 value={title}
                 onChange={e => setTitle(e.target.value)}
                 className="w-full bg-surface border border-border rounded-lg p-3 text-white focus:border-zinc-500 focus:outline-none transition-colors placeholder-zinc-600"
                 placeholder="Incident Title (e.g. 211 - Fleeca Bank)"
                 required
               />
             </div>
             
             <div>
               <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Classification</label>
               <select 
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg p-3 text-white focus:border-zinc-500 focus:outline-none appearance-none"
               >
                  <option>Traffic Stop</option>
                  <option>Felony Stop</option>
                  <option>Arrest</option>
                  <option>Warrant Service</option>
                  <option>Investigation</option>
               </select>
             </div>
           </div>

           <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Field Notes</label>
                <span className="text-[10px] text-zinc-600">RAW DATA INPUT</span>
              </div>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full h-64 bg-surface border border-border rounded-lg p-4 text-zinc-300 focus:border-zinc-500 focus:outline-none resize-none font-mono text-sm leading-relaxed"
                placeholder="> Stopped vehicle at 22:00&#10;> Driver fled on foot&#10;> Suspect apprehended&#10;> Found 10g of illegal substance"
              />
              <div className="mt-4 flex gap-3">
                 <button
                   type="button"
                   onClick={handleGenerateAI}
                   disabled={isGenerating || !notes}
                   className="flex-1 bg-white text-black hover:bg-zinc-200 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isGenerating ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4 text-indigo-600" />}
                   {isGenerating ? 'Processing...' : 'Generate Narrative'}
                 </button>
                 <button type="button" onClick={() => setNotes('')} className="px-4 border border-border rounded-lg hover:bg-zinc-800 text-zinc-400">
                    <Eraser className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>

        <div className="flex flex-col h-full">
           <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Official Narrative</label>
             <span className="text-[10px] text-zinc-600">READ ONLY PREVIEW</span>
           </div>
           <div className="flex-1 bg-zinc-900/50 border border-border rounded-lg p-6 relative group overflow-hidden">
             {narrative ? (
               <textarea 
                  value={narrative}
                  onChange={e => setNarrative(e.target.value)}
                  className="w-full h-full bg-transparent border-none focus:ring-0 text-zinc-300 text-sm leading-relaxed font-serif resize-none"
               />
             ) : (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 pointer-events-none">
                 <FileTextIcon className="w-12 h-12 mb-3 opacity-20" />
                 <p className="text-sm">Waiting for generation...</p>
               </div>
             )}
           </div>
           
           <button 
             type="submit" 
             disabled={!narrative}
             className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-bold tracking-wide uppercase text-sm transition-colors disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500"
           >
             Submit Final Report
           </button>
        </div>
      </form>
    </div>
  );
};

// Helper icon for empty state
const FileTextIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);

export default IncidentReport;