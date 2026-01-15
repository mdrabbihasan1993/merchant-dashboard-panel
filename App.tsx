
import React, { useState } from 'react';
import { Menu, X, Bell, Search, Settings } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AIBooking } from './components/AIBooking';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'AI Booking':
        return <AIBooking />;
      default:
        return (
          <div className="h-full w-full flex flex-col items-center justify-center text-center p-6 bg-slate-50/30">
            <div className="w-20 h-20 bg-white shadow-xl shadow-slate-200/50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
              <Search size={36} strokeWidth={1.5} />
            </div>
            <h2 className="text-[#1a3762] text-xl font-black mb-2 tracking-tight uppercase tracking-widest">{activeTab}</h2>
            <p className="text-slate-400 font-medium italic select-none text-sm max-w-sm">
              7ton express মার্চেন্ট প্যানেল - {activeTab} মডিউলটি বর্তমানে ডেভেলপমেন্ট পর্যায়ে রয়েছে।
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#fcfcfc] font-sans overflow-hidden text-slate-800">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Layout */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative z-10">
        {/* Modern Glassmorphism Header */}
        <header className="h-20 border-b border-slate-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 bg-slate-50 text-[#1a3762] rounded-xl hover:bg-slate-100 lg:hidden shadow-sm transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#ff751f] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search parcels, tracking IDs..."
                className="pl-11 pr-5 py-2.5 bg-slate-50/50 rounded-[1.25rem] border border-slate-100 focus:border-[#ff751f]/30 focus:bg-white focus:ring-4 focus:ring-[#ff751f]/5 outline-none transition-all w-80 text-sm font-semibold text-slate-600 placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-400 hover:text-[#1a3762] hover:bg-slate-50 rounded-xl transition-all relative group">
              <Bell size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ff751f] border-2 border-white rounded-full"></span>
            </button>
            <button className="p-2.5 text-slate-400 hover:text-[#1a3762] hover:bg-slate-50 rounded-xl transition-all hidden sm:block">
              <Settings size={20} />
            </button>
            
            <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden md:block"></div>
            
            <div className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
              <div className="hidden text-right lg:block">
                <p className="text-[13px] font-black text-[#1a3762] leading-none mb-1">Md. Rahman</p>
                <div className="flex items-center justify-end gap-1.5">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none">Standard Merchant</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1a3762] to-[#254d85] flex items-center justify-center text-white font-black text-sm shadow-xl shadow-blue-900/20 border-2 border-white">
                MR
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Area */}
        <div className="flex-1 overflow-hidden bg-slate-50/20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
