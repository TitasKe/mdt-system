import React, { useState } from 'react';
import { Search, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import { VEHICLES, CIVILIANS } from '../services/mockData';
import { Vehicle, Status } from '../types';

const VehicleLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    const found = VEHICLES.find(v => v.plate.toLowerCase() === searchTerm.toLowerCase());
    setSelectedVehicle(found || null);
  };

  const getOwnerName = (id: string) => {
    const owner = CIVILIANS.find(c => c.id === id);
    return owner ? `${owner.firstName} ${owner.lastName}` : 'Unknown';
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in">
       {/* Search Header */}
       <div className="w-full max-w-xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ENTER PLATE (e.g. 24KRT001)"
            className="flex-1 bg-surface border border-border rounded-lg py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 text-center uppercase tracking-widest font-mono text-lg transition-colors"
          />
          <button type="submit" className="bg-white text-black px-6 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
            Search
          </button>
        </form>
      </div>

      {selectedVehicle ? (
        <div className="flex-1 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visual Column */}
          <div className="space-y-6">
            <div className="aspect-video w-full bg-zinc-900 rounded-xl overflow-hidden border border-border relative">
              <img src={selectedVehicle.image} alt="Vehicle" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-bold text-white tracking-tight">{selectedVehicle.make} {selectedVehicle.model}</h2>
                <p className="text-zinc-400 font-mono mt-1">{selectedVehicle.color.toUpperCase()} • {selectedVehicle.registrationDate.split('-')[0]}</p>
              </div>
              <div className={`absolute top-4 right-4 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                selectedVehicle.status === Status.STOLEN 
                ? 'bg-red-500 text-white' 
                : 'bg-emerald-500 text-black'
              }`}>
                {selectedVehicle.status === Status.STOLEN && <AlertTriangle className="w-3 h-3" />}
                {selectedVehicle.status}
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
               <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Registration & Insurance</h3>
               <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-zinc-400">License Plate</span>
                  <span className="font-mono text-xl text-white tracking-widest bg-zinc-900 px-2 rounded border border-zinc-800">{selectedVehicle.plate}</span>
               </div>
               <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-zinc-400">Insurance Status</span>
                  <span className={`font-medium ${selectedVehicle.insuranceStatus === 'Valid' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {selectedVehicle.insuranceStatus}
                  </span>
               </div>
               <div className="flex justify-between items-center py-3">
                  <span className="text-zinc-400">Registration Exp</span>
                  <span className="text-white">DEC 2024</span>
               </div>
            </div>
          </div>

          {/* Data Column */}
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Info className="w-24 h-24 text-white" />
               </div>
               <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Registered Owner</h3>
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 font-bold text-xl border border-zinc-700">
                    {getOwnerName(selectedVehicle.ownerId).charAt(0)}
                 </div>
                 <div>
                    <div className="text-2xl text-white font-light">{getOwnerName(selectedVehicle.ownerId)}</div>
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 mt-1">View Full Profile &rarr;</button>
                 </div>
               </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Vehicle History & Flags</h3>
              {selectedVehicle.status === Status.STOLEN ? (
                 <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg flex gap-4">
                   <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                   <div>
                     <h4 className="text-red-400 font-bold text-sm">ACTIVE STOLEN REPORT</h4>
                     <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                       Vehicle was reported stolen. Do not approach without backup. Confirm VIN before recovery.
                     </p>
                   </div>
                 </div>
              ) : (
                <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/10">
                   <ShieldCheck className="w-5 h-5" />
                   <span className="text-sm font-medium">No active flags or wants on this vehicle.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
          <div className="w-16 h-16 border-2 border-zinc-800 rounded-full flex items-center justify-center mb-4 opacity-50">
             <span className="text-xl font-mono">VIN</span>
          </div>
          <p className="text-sm tracking-widest uppercase">Awaiting Query</p>
        </div>
      )}
    </div>
  );
};

export default VehicleLookup;