import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PersonLookup from './components/PersonLookup';
import VehicleLookup from './components/VehicleLookup';
import IncidentReport from './components/IncidentReport';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'people':
        return <PersonLookup />;
      case 'vehicles':
        return <VehicleLookup />;
      case 'incidents':
        return <IncidentReport />;
      case 'warrants':
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 animate-fade-in">
            <div className="w-16 h-16 border-2 border-zinc-800 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-xl font-medium text-zinc-300 mb-1">Warrant System</h2>
            <p className="text-sm">Module under maintenance</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-zinc-200 overflow-hidden font-sans antialiased">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 overflow-hidden flex flex-col relative bg-background">
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </div>

        {!process.env.API_KEY && (
           <div className="absolute bottom-6 right-6 bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-2 rounded-full text-xs shadow-2xl z-50 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
             API Key Missing
           </div>
        )}
      </main>
    </div>
  );
};

export default App;