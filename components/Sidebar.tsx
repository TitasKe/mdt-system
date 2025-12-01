import React from 'react';
import { LayoutGrid, Users, Car, FileText, ShieldAlert, LogOut, Settings, Command } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'people', label: 'Citizens', icon: Users },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'incidents', label: 'Reports', icon: FileText },
    { id: 'warrants', label: 'Warrants', icon: ShieldAlert },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-surface border-r border-border flex flex-col h-full transition-all duration-300">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center">
            <Command className="w-5 h-5" />
          </div>
          <span className="font-semibold text-white tracking-wide hidden lg:block">MDT OS</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
              <span className={`font-medium text-sm hidden lg:block ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                {item.label}
              </span>
              {isActive && <div className="ml-auto w-1 h-1 bg-white rounded-full hidden lg:block"></div>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <button className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm hidden lg:block">Settings</span>
        </button>
        <div className="w-full flex items-center gap-3 px-3 py-3 mt-2 rounded-lg bg-zinc-900 border border-border lg:border-transparent lg:bg-transparent">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
            JS
          </div>
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-medium text-white truncate">John Spartan</p>
            <p className="text-xs text-zinc-500 truncate">Sergeant • #492</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;