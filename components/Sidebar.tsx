
import React from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  Truck, 
  AlertCircle, 
  CheckCircle2, 
  Trophy, 
  Ticket, 
  Store, 
  LifeBuoy, 
  Settings, 
  CreditCard, 
  Code2, 
  Sparkles,
  LogOut,
  Wallet,
  ShieldCheck,
  Contact,
  Brain,
  ChevronLeft,
  ChevronRight,
  Package,
  ClipboardList,
  FileStack
} from 'lucide-react';
import { MenuItemData, MenuGroup } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuGroups: MenuGroup[] = [
  {
    title: "Overview",
    items: [
      { name: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: "Logistics",
    items: [
      { name: 'New Entry', icon: Package },
      { name: 'Bulk Entry', icon: FileStack },
      { name: 'Quick Booking', icon: Zap },
      { name: 'AI Booking', icon: Brain, badge: 'AI' },
      { name: 'Pickup Request', icon: Truck },
      { name: 'Fraud Check', icon: ShieldCheck, badge: 'Pro' },
      { name: 'No Entry Parcel', icon: AlertCircle },
      { name: 'Cancel Approval', icon: CheckCircle2 },
    ]
  },
  {
    title: "Deliveries",
    items: [
      { name: 'Parcel List', icon: ClipboardList },
    ]
  },
  {
    title: "Finance",
    items: [
      { name: 'Payments', icon: Wallet },
    ]
  },
  {
    title: "Growth & Rewards",
    items: [
      { name: 'Reward Dashboard', icon: Trophy },
      { name: 'Cupon', icon: Ticket },
      { name: 'Reward store', icon: Store },
    ]
  },
  {
    title: "Help & Assistance",
    items: [
      { name: 'Support', icon: LifeBuoy },
      { name: 'KAM details', icon: Contact },
    ]
  },
  {
    title: "Tools",
    items: [
      { name: 'Pricing Plan', icon: CreditCard },
      { name: 'Developer API', icon: Code2 },
      { name: 'Settings', icon: Settings },
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  return (
    <aside 
      className={`bg-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 lg:relative border-r border-slate-200 shadow-sm ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Section */}
      <div className="h-20 flex items-center px-6 mb-2 shrink-0 border-b border-slate-50 relative group">
        <div className="flex items-center gap-3 cursor-pointer overflow-hidden" onClick={() => setIsOpen(!isOpen)}>
          <div className="w-9 h-9 bg-[#1a3762] rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-900/10">
            <Truck size={20} strokeWidth={2.5} />
          </div>
          {isOpen && (
            <span className="font-bold text-lg tracking-tight text-[#1a3762] lowercase transition-opacity duration-300">
              7ton<span className="text-[#ff751f]"> express</span>
            </span>
          )}
        </div>
        
        {/* Toggle Button for Desktop */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 lg:flex hidden z-50"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-6 space-y-7 scrollbar-hide">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            {isOpen && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mb-3">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <MenuItem 
                  key={item.name} 
                  item={item} 
                  isOpen={isOpen} 
                  isActive={activeTab === item.name}
                  onClick={() => setActiveTab(item.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Menu */}
      <div className="p-3 mt-auto bg-slate-50/80 border-t border-slate-100 space-y-1">
        <MenuItem 
          item={{ name: 'What is new?', icon: Sparkles, badge: '!' }} 
          isOpen={isOpen} 
          isActive={activeTab === 'What is new?'}
          onClick={() => setActiveTab('What is new?')}
          specialStyle
        />
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all ${!isOpen && 'justify-center'}`}>
          <LogOut size={18} />
          {isOpen && <span className="text-[13px] font-medium tracking-wide">Log Out</span>}
        </button>
      </div>
    </aside>
  );
};

const MenuItem: React.FC<{ 
  item: MenuItemData; 
  isOpen: boolean; 
  isActive: boolean; 
  onClick: () => void; 
  specialStyle?: boolean 
}> = ({ item, isOpen, isActive, onClick, specialStyle = false }) => {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
        ${isActive 
          ? (specialStyle ? 'bg-[#ff751f] text-white shadow-lg shadow-orange-500/20' : 'text-[#1a3762] bg-[#1a3762]/5 font-bold') 
          : 'text-slate-500 hover:text-[#1a3762] hover:bg-slate-100'}
        ${!isOpen && 'justify-center'}
      `}
    >
      {isActive && !specialStyle && (
        <div className="absolute left-0 w-1 h-4 bg-[#ff751f] rounded-r-full shadow-[0_0_8px_rgba(255,117,31,0.5)]" />
      )}

      <div className={`${isActive ? (specialStyle ? 'text-white' : 'text-[#ff751f]') : 'text-slate-400 group-hover:text-[#1a3762]'} transition-colors shrink-0`}>
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      
      {isOpen && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
          <span className={`text-[13px] whitespace-nowrap tracking-wide`}>
            {item.name}
          </span>
          
          {item.badge && (
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-black tracking-tighter ${
              isActive ? 'bg-white text-[#ff751f]' : 'bg-orange-100 text-[#ff751f]'
            }`}>
              {item.badge}
            </span>
          )}
        </div>
      )}

      {!isOpen && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#1a3762] text-white text-[11px] font-bold rounded-md opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none z-[100] whitespace-nowrap border border-white/10">
          {item.name}
        </div>
      )}
    </button>
  );
};
