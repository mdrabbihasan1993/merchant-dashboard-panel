
import React, { useState, useEffect } from 'react';
import { 
  Package, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  CheckSquare, 
  RefreshCw, 
  RotateCcw, 
  XCircle, 
  Undo2, 
  Repeat,
  Truck,
  MapPin,
  Boxes,
  Container,
  Wallet,
  AlertCircle,
  ClipboardCheck,
  History,
  ShieldCheck,
  Trophy,
  Medal,
  Star,
  Sparkles,
  Loader2,
  X,
  CalendarDays,
  ChevronRight,
  Zap,
  PauseCircle,
  Building2
} from 'lucide-react';
import { getLogisticsInsights } from '../services/geminiService';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const [selectedPreset, setSelectedPreset] = useState('Last 7 Days');
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

  useEffect(() => {
    const now = new Date();
    setLastUpdateTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  const stats = [
    { title: 'Total Parcels', value: '12,840', icon: Package, color: 'text-[#1a3762]' },
    { title: 'Parcels Delivered', value: '11,420', icon: CheckCircle2, color: 'text-emerald-600' },
    { title: 'Total Revenue', value: '৳ 45,200', icon: DollarSign, color: 'text-[#1a3762]' },
    { title: 'Delivery Pending', value: '850', icon: Clock, color: 'text-[#ff751f]' },
    { title: 'Partial Delivered', value: '120', icon: CheckSquare, color: 'text-emerald-600' },
    { title: 'Exchange Delivered', value: '85', icon: RefreshCw, color: 'text-blue-600' },
    { title: 'Paid Return', value: '32', icon: RotateCcw, color: 'text-rose-600' },
    { title: 'Total Cancelled', value: '570', icon: XCircle, color: 'text-rose-600' },
    { title: 'Returned to Merchant', value: '540', icon: Undo2, color: 'text-slate-600' },
    { title: 'Reversed Parcels', value: '145', icon: Repeat, color: 'text-indigo-600' },
  ];

  const forwardStats = [
    { label: 'At sorting', value: '98', icon: Boxes, color: 'text-[#ff751f]', bgColor: 'bg-orange-50', borderColor: 'border-orange-100' },
    { label: 'In transit', value: '450', icon: Truck, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
    { label: 'Received at Hub', value: '320', icon: MapPin, color: 'text-slate-600', bgColor: 'bg-slate-50', borderColor: 'border-slate-100' },
    { label: 'Need your approval', value: '145', icon: Building2, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-100', clickable: true, targetTab: 'Cancel Approval' },
    { label: 'Assigned for delivery', value: '1,240', icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
    { label: 'Hold', value: '24', icon: PauseCircle, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-100' },
  ];

  const returnStats = [
    { label: 'Total Return Started', value: '640', icon: Undo2, color: 'text-[#1a3762]' },
    { label: 'Received at Hub', value: '150', icon: Container, color: 'text-slate-500' },
    { label: 'Return in transit', value: '210', icon: Truck, color: 'text-slate-500' },
    { label: 'Assigned for Return', value: '540', icon: CheckCircle2, color: 'text-emerald-500' },
  ];

  const paymentStats = [
    { title: 'COD Collected', value: '৳ 42,500', icon: Wallet, color: 'text-[#1a3762]' },
    { title: 'Paid Amount', value: '৳ 35,200', icon: CheckCircle2, color: 'text-emerald-600' },
    { title: 'Unpaid Amount', value: '৳ 4,300', icon: AlertCircle, color: 'text-[#ff751f]' },
    { title: 'Processing', value: '৳ 3,000', icon: Clock, color: 'text-amber-600' },
  ];

  const recentOrders = [
    { id: 'TRK-9921', customer: 'Rakib Hasan', status: 'Delivered', time: '10:30 AM' },
    { id: 'TRK-9922', customer: 'Tania Ahmed', status: 'Pending', time: '11:45 AM' },
    { id: 'TRK-9923', customer: 'Jasim Uddin', status: 'Cancelled', time: '01:20 PM' },
    { id: 'TRK-9924', customer: 'Anika Tabassum', status: 'Delivered', time: '02:15 PM' },
    { id: 'TRK-9925', customer: 'Karim Ullah', status: 'Pending', time: '03:00 PM' },
  ];

  const fetchAIInsights = async () => {
    setIsAiLoading(true);
    setShowAiPanel(true);
    const context = `Merchant Performance Data: Delivered: 11,420, Pending: 850, Returns: 540, Success: 91%, Credit: 70%. Recent surge in sorting delays (98 parcels at sorting).`;
    const insight = await getLogisticsInsights(context);
    setAiInsights(insight);
    setIsAiLoading(false);
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full scrollbar-hide">
      {/* Page Title & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1a3762] tracking-tight">Logistics Console</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 flex items-center gap-1.5">
              <Clock size={10} className="text-[#ff751f]" />
              Last updated: {lastUpdateTime}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="border border-[#1a3762] text-[#1a3762] px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-2 hover:bg-[#1a3762]/5 shadow-sm">
              <Wallet size={14} /> Balance
            </button>
            <button className="border border-[#ff751f] text-[#ff751f] px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-2 hover:bg-[#ff751f]/5 shadow-sm">
              <Zap size={14} /> Booking
            </button>
            <button className="bg-[#ff751f] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2 hover:bg-orange-600">
              <Package size={14} /> New Entry
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={fetchAIInsights} className="bg-[#1a3762] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-blue-900 transition-all flex items-center gap-2">
            <Sparkles size={16} className="text-orange-400" />
            AI Intelligence
          </button>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <CalendarDays size={14} className="text-[#ff751f]" />
            <select 
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
              className="bg-transparent border-none text-[11px] font-bold text-[#1a3762] outline-none cursor-pointer focus:ring-0 p-0"
            >
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      {showAiPanel && (
        <div className="bg-white border border-[#1a3762]/10 rounded-2xl shadow-xl p-6 relative animate-in fade-in slide-in-from-top-4 transition-all overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1a3762]" />
          <button onClick={() => setShowAiPanel(false)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-[#ff751f]" size={20} />
            <h3 className="font-bold text-[#1a3762]">AI Business Analysis</h3>
          </div>
          {isAiLoading ? (
            <div className="flex items-center gap-3 text-slate-500 text-sm">
              <Loader2 size={20} className="animate-spin text-[#ff751f]" />
              <span>Analyzing your logistics data...</span>
            </div>
          ) : (
            <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {aiInsights}
            </div>
          )}
        </div>
      )}

      {/* Main Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all group hover:border-[#ff751f]/30 hover:shadow-md">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={20} strokeWidth={2.5} />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 leading-tight">
              {stat.title}
            </p>
            <h3 className="text-xl font-bold text-[#1a3762]">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          
          {/* Forward Breakdown */}
          <section>
            <h3 className="text-sm font-bold text-[#1a3762] mb-5 flex items-center gap-2 uppercase tracking-widest">
              <div className="w-1.5 h-4 bg-[#1a3762] rounded-full" /> Forward breakdown
            </h3>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-56 bg-[#1a3762] rounded-[2rem] p-8 text-white shadow-xl flex flex-col justify-between shrink-0 relative overflow-hidden group">
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                  <Truck size={120} />
                </div>
                <div className="space-y-8 relative z-10">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-orange-400">
                      <ClipboardCheck size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Queue</span>
                    </div>
                    <h4 className="text-[11px] font-medium text-white/70 uppercase">Pickup Pending</h4>
                    <p className="text-3xl font-black tracking-tight">2,450</p>
                  </div>
                  <div className="h-px bg-white/10 w-full" />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <History size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Activity</span>
                    </div>
                    <h4 className="text-[11px] font-medium text-white/70 uppercase">Picked Yesterday</h4>
                    <p className="text-3xl font-black tracking-tight">1,895</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {forwardStats.map((f, i) => (
                  <div 
                    key={i} 
                    onClick={() => f.clickable && f.targetTab && setActiveTab(f.targetTab)}
                    className={`${f.bgColor} p-5 rounded-2xl border ${f.borderColor || 'border-slate-100'} shadow-sm flex flex-col items-start transition-all group ${f.clickable ? 'cursor-pointer hover:shadow-md hover:ring-2 hover:ring-red-200 active:scale-[0.98]' : 'hover:border-[#1a3762]/20'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 bg-white/80 shadow-sm ${f.color}`}>
                      <f.icon size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <p className={`text-[10px] font-bold uppercase tracking-wide ${f.color} opacity-70`}>
                        {f.label}
                      </p>
                      <h3 className={`text-2xl font-bold tracking-tight ${f.color === 'text-slate-600' ? 'text-[#1a3762]' : f.color}`}>
                        {f.value}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Return Breakdown */}
          <section>
            <h3 className="text-sm font-bold text-[#1a3762] mb-5 flex items-center gap-2 uppercase tracking-widest">
              <div className="w-1.5 h-4 bg-[#ff751f] rounded-full" /> Return breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {returnStats.map((r, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-50 shadow-sm group hover:border-orange-100 transition-colors">
                  <div className="flex items-center gap-2.5 mb-3">
                    <r.icon size={16} className={`${r.color} group-hover:rotate-12 transition-transform`}/>
                    <span className="text-[10px] font-bold text-slate-400 uppercase truncate tracking-tight">{r.label}</span>
                  </div>
                  <p className="text-xl font-bold text-[#1a3762]">{r.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Status Section */}
          <section>
            <h3 className="text-sm font-bold text-[#1a3762] mb-5 flex items-center gap-2 uppercase tracking-widest">
              <div className="w-1.5 h-4 bg-emerald-500 rounded-full" /> Payment Status
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {paymentStats.map((p, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors group">
                  <div className="flex items-center gap-2.5 mb-3">
                    <p.icon size={16} className={`${p.color} group-hover:scale-110 transition-transform`}/>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{p.title}</span>
                  </div>
                  <p className={`text-xl font-bold ${p.color}`}>{p.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Live Tracking Feed Section */}
          <section>
            <h3 className="text-sm font-bold text-[#1a3762] mb-5 flex items-center gap-2 uppercase tracking-widest">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full" /> Live Tracking Feed
            </h3>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-slate-50/50">
                    <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-5">Track ID</th>
                      <th className="px-8 py-5">Customer Name</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-slate-50">
                    {recentOrders.map((order, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <span className="font-bold text-[#1a3762] bg-blue-50 px-2 py-1 rounded-lg border border-blue-100/50 group-hover:bg-blue-100 transition-colors">{order.id}</span>
                        </td>
                        <td className="px-8 py-5 text-slate-600 font-semibold">{order.customer}</td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                            order.status === 'Delivered' 
                              ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' 
                              : 'text-orange-700 bg-orange-50 border border-orange-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-orange-500 animate-pulse'}`}></span>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right font-bold text-slate-400 tabular-nums">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50/30 border-t border-slate-50 text-center">
                <button className="text-[11px] font-bold text-[#1a3762] uppercase tracking-widest hover:text-[#ff751f] transition-colors flex items-center justify-center gap-2 mx-auto">
                  View full tracking list <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
          {/* Service Health */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-[#1a3762] mb-8 tracking-wide uppercase flex items-center justify-between">
              Service Health
              <ShieldCheck size={18} className="text-emerald-500" />
            </h3>
            <div className="space-y-8">
               <div>
                  <div className="flex justify-between text-[11px] mb-2 font-bold text-slate-500 uppercase tracking-widest">
                    <span>Delivery Success Rate</span>
                    <span className="text-emerald-600 font-black">91.4%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-1000" style={{width: '91.4%'}}></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-[11px] mb-2 font-bold text-slate-500 uppercase tracking-widest">
                    <span>Avg. Return rate</span>
                    <span className="text-[#ff751f] font-black">4.2%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff751f] rounded-full shadow-[0_0_8px_rgba(255,117,31,0.3)] transition-all duration-1000" style={{width: '4.2%'}}></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1a3762] tracking-wide uppercase">Merchant Rewards</h3>
              <div className="p-2.5 bg-orange-50 rounded-xl text-[#ff751f] shadow-inner">
                <Trophy size={20} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { name: 'Silver', icon: Medal, active: true },
                { name: 'Gold', icon: Medal, active: false },
                { name: 'Diamond', icon: Star, active: false },
                { name: 'Star', icon: Sparkles, active: false }
              ].map((tier, idx) => (
                <div key={idx} className={`flex flex-col items-center gap-2 p-2.5 rounded-2xl border transition-all ${tier.active ? 'bg-orange-50 border-orange-100 shadow-sm ring-2 ring-orange-100/50 scale-105' : 'bg-slate-50 border-transparent opacity-50 grayscale'}`}>
                  <tier.icon size={16} className={tier.active ? 'text-[#ff751f]' : 'text-slate-400'} />
                  <span className={`text-[8px] font-black uppercase tracking-tight ${tier.active ? 'text-[#ff751f]' : 'text-slate-500'}`}>{tier.name}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Tier</p>
                  <p className="text-base font-bold text-[#ff751f]">Silver Merchant</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Goal</p>
                  <p className="text-[11px] font-bold text-[#1a3762]">1,260 orders to Gold</p>
                </div>
              </div>
              <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                <div className="h-full bg-gradient-to-r from-orange-400 to-[#ff751f] rounded-full shadow-lg" style={{width: '48%'}}></div>
              </div>
              <div className="flex justify-between text-[10px] font-black text-slate-500 gap-2">
                <div className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <Package size={12} className="text-[#1a3762]" />
                  <span>TOTAL: 1,240</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-50 rounded-xl border border-orange-100 text-[#ff751f]">
                  <Medal size={12} />
                  <span>POINTS: 850</span>
                </div>
              </div>
            </div>
          </div>

          {/* Promo/Alert Card */}
          <div className="bg-[#1a3762] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                <AlertCircle size={20} className="text-orange-400" />
              </div>
            </div>
            <div className="relative z-10">
              <h4 className="text-white text-lg font-bold mb-3 tracking-tight">System Alert</h4>
              <p className="text-blue-100/70 text-xs mb-8 leading-relaxed font-medium">System detected 12 shipments stuck in sorting for over 48 hours. Immediate action required to maintain success rate.</p>
              <button className="w-full py-4 bg-[#ff751f] text-white text-[11px] font-black rounded-[1.25rem] active:scale-95 transition-all uppercase tracking-[2px] shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group">
                Investigate Now
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
