import React, { useState } from 'react';
import { Search, MapPin, Phone, Calendar, Ruler, Info } from 'lucide-react';
import { CIVILIANS } from '../services/mockData';
import { Civilian } from '../types';

const PersonLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Civilian | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    const found = CIVILIANS.find(p => 
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedPerson(found || null);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in">
      {/* Search Header */}
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
          <div className="relative flex items-center bg-surface rounded-xl border border-border shadow-xl">
            <Search className="ml-4 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search database by name..."
              className="w-full bg-transparent border-none py-4 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-0 text-lg"
            />
            <button 
              type="submit"
              className="mr-2 bg-zinc-100 text-black font-medium px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {selectedPerson ? (
        <div className="flex-1 mt-8">
          {/* Header Info */}
          <div className="flex items-start justify-between mb-8 border-b border-border pb-6">
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-zinc-800 rounded-xl overflow-hidden border border-border shadow-2xl relative group">
                <img 
                  src={selectedPerson.image} 
                  alt="Mugshot" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                />
                {selectedPerson.warrants.length > 0 && (
                   <div className="absolute inset-0 bg-red-900/40 backdrop-blur-[2px] flex items-center justify-center border-4 border-red-500">
                     <span className="text-white font-black uppercase transform -rotate-12 tracking-widest border-2 border-white px-2 py-1">Wanted</span>
                   </div>
                )}
              </div>
              <div>
                <h2 className="text-4xl font-light text-white tracking-tight">{selectedPerson.lastName}, {selectedPerson.firstName}</h2>
                <div className="flex items-center gap-4 mt-2 text-zinc-400">
                   <span className="bg-zinc-800 px-2 py-1 rounded text-xs font-mono text-zinc-300">ID: {selectedPerson.id}</span>
                   <span className="flex items-center gap-1 text-sm"><Calendar className="w-3 h-3"/> {selectedPerson.dob}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  {selectedPerson.licenses.map((lic, idx) => (
                    <div key={idx} className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      lic.status === 'Valid' 
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                        : 'border-red-500/20 bg-red-500/10 text-red-400'
                    }`}>
                      {lic.type}: {lic.status}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-1">
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Status</div>
              <div className={`text-xl font-medium ${selectedPerson.warrants.length > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {selectedPerson.warrants.length > 0 ? 'Warrant Active' : 'Clean Record'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vitals Column */}
            <div className="space-y-6">
               <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Vitals</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                       <span className="text-zinc-500 text-sm">Gender</span>
                       <span className="text-white">{selectedPerson.gender}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                       <span className="text-zinc-500 text-sm">Height</span>
                       <span className="text-white">{selectedPerson.height}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                       <span className="text-zinc-500 text-sm">Hair</span>
                       <span className="text-white">{selectedPerson.hairColor}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                       <span className="text-zinc-500 text-sm">Eyes</span>
                       <span className="text-white">{selectedPerson.eyeColor}</span>
                    </div>
                  </div>
               </div>

               <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Contact</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                       <MapPin className="w-5 h-5 text-zinc-600" />
                       <span className="text-zinc-300 text-sm">{selectedPerson.address}</span>
                    </div>
                    <div className="flex gap-3">
                       <Phone className="w-5 h-5 text-zinc-600" />
                       <span className="text-zinc-300 text-sm">{selectedPerson.phoneNumber}</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Records Column */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-surface border border-border rounded-xl overflow-hidden">
                  <div className="p-4 bg-zinc-900 border-b border-border">
                    <h3 className="font-medium text-white flex items-center gap-2">
                       Active Warrants <span className="text-zinc-500 text-sm font-normal">({selectedPerson.warrants.length})</span>
                    </h3>
                  </div>
                  {selectedPerson.warrants.length > 0 ? (
                    <div className="divide-y divide-border">
                      {selectedPerson.warrants.map(w => (
                        <div key={w.id} className="p-4 flex justify-between items-center hover:bg-zinc-900/50">
                          <div>
                            <div className="text-red-400 font-medium">{w.reason}</div>
                            <div className="text-xs text-zinc-500 mt-1">ISSUED: {w.issuedDate} • EXP: {w.expiryDate}</div>
                          </div>
                          <span className="text-xs font-bold border border-red-500/30 text-red-500 px-2 py-1 rounded">
                            {w.severity.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-zinc-500 text-sm">
                       No active warrants found for this subject.
                    </div>
                  )}
               </div>

               <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="font-medium text-white mb-4">Vehicles Registered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* Mock registered vehicles since not in mockData relations specifically for UI loop, using static for design */}
                     <div className="border border-border rounded-lg p-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                           <Info className="w-5 h-5 text-zinc-500" />
                        </div>
                        <div>
                           <div className="text-white text-sm font-medium">No Vehicles Found</div>
                           <div className="text-xs text-zinc-500">Subject has no active registrations</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
           <Search className="w-12 h-12 mb-4 opacity-20" />
           <p>Enter a name to retrieve dossier</p>
        </div>
      )}
    </div>
  );
};

export default PersonLookup;