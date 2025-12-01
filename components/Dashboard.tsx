import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { Clock, ArrowUpRight, Activity, FileText, Shield, Users } from 'lucide-react';
import { BOLOS, INCIDENTS, MOCK_OFFICER } from '../services/mockData';

const data = [
  { name: 'Mon', calls: 40, arrests: 24 },
  { name: 'Tue', calls: 30, arrests: 13 },
  { name: 'Wed', calls: 20, arrests: 58 },
  { name: 'Thu', calls: 27, arrests: 39 },
  { name: 'Fri', calls: 18, arrests: 48 },
  { name: 'Sat', calls: 23, arrests: 38 },
  { name: 'Sun', calls: 34, arrests: 43 },
];

const StatCard = ({ title, value, trend }: { title: string, value: string, trend?: string }) => (
  <div className="bg-surface border border-border p-5 rounded-xl hover:border-zinc-700 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <p className="text-zinc-500 text-sm font-medium">{title}</p>
      {trend && <span className="text-emerald-500 text-xs flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">{trend}</span>}
    </div>
    <p className="text-3xl font-semibold text-white tracking-tight">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 mt-1 text-sm">Overview of current shift activities.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-zinc-400 text-sm font-mono">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Units" value="12" trend="+2" />
        <StatCard title="Pending Reports" value="5" />
        <StatCard title="Active Warrants" value="142" trend="+5" />
        <StatCard title="Calls for Service" value="8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Weekly Activity</h2>
            <div className="flex gap-4 text-xs">
               <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zinc-100"></span> Calls</div>
               <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zinc-600"></span> Arrests</div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#52525b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  cursor={{fill: '#27272a'}}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', boxShadow: 'none' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Bar dataKey="calls" fill="#f4f4f5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="arrests" fill="#52525b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-white">BOLO Feed</h2>
            <span className="text-xs font-mono text-zinc-500">LIVE</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {BOLOS.map((bolo) => (
              <div key={bolo.id} className="group">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    bolo.priority === 'High' 
                      ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                      : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    {bolo.type}
                  </span>
                  <span className="text-zinc-600 text-xs font-mono">
                    {bolo.timestamp}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 leading-snug mt-2">{bolo.description}</p>
                <div className="h-px bg-zinc-800 w-full mt-4 group-last:hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
         <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-medium text-white">Recent Reports</h2>
            <button className="text-xs text-zinc-400 hover:text-white transition-colors">View All &rarr;</button>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-zinc-400">
             <thead className="bg-zinc-900/50 text-xs font-medium text-zinc-500 uppercase tracking-wider">
               <tr>
                 <th className="px-6 py-4 font-normal">Case ID</th>
                 <th className="px-6 py-4 font-normal">Type</th>
                 <th className="px-6 py-4 font-normal">Title</th>
                 <th className="px-6 py-4 font-normal">Date</th>
                 <th className="px-6 py-4 font-normal text-right">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-zinc-800">
               {INCIDENTS.map((inc) => (
                 <tr key={inc.id} className="hover:bg-zinc-800/30 transition-colors">
                   <td className="px-6 py-4 font-mono text-zinc-300">{inc.id}</td>
                   <td className="px-6 py-4">
                     <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-zinc-800 text-zinc-300">
                       {inc.type}
                     </span>
                   </td>
                   <td className="px-6 py-4 font-medium text-zinc-200">{inc.title}</td>
                   <td className="px-6 py-4 text-zinc-500">{inc.date}</td>
                   <td className="px-6 py-4 text-right">
                     <span className="text-emerald-500 text-xs uppercase font-bold tracking-wider">
                       Closed
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;