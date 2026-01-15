
import React, { useState } from 'react';
import { Brain, Sparkles, Send, Loader2, CheckCircle2, User, Phone, MapPin, Package, CreditCard, StickyNote, ArrowRight } from 'lucide-react';
import { parseBookingRequest } from '../services/geminiService';
import { BookingData } from '../types';

export const AIBooking: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState<BookingData | null>(null);
  const [success, setSuccess] = useState(false);

  const handleParse = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const data = await parseBookingRequest(inputText);
    setParsedData(data);
    setIsLoading(false);
  };

  const handleConfirm = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setParsedData(null);
      setInputText('');
    }, 3000);
  };

  if (success) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-[#1a3762]">Parcel Booked Successfully!</h2>
        <p className="text-slate-500">The courier will be notified for pickup within 2 hours.</p>
      </div>
    );
  }

  return (
    <div className="p-8 h-full overflow-y-auto scrollbar-hide">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
            <Brain size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a3762]">AI Parcel Booking</h1>
            <p className="text-slate-500 text-sm">Paste customer details or order text, our AI handles the rest.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Example: Customer is Rahim from Mirpur 10. Phone 01712345678. Delivering a t-shirt. COD 1200tk. House 12, Road 4."
                className="w-full h-64 p-5 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none shadow-sm text-sm"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleParse}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-[#1a3762] text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-900 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/10"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Sparkles size={18} />
                  )}
                  {isLoading ? 'Thinking...' : 'Extract Details'}
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
              <div className="text-blue-600 shrink-0">
                <StickyNote size={20} />
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>Tip:</strong> You can paste raw messages from Facebook Messenger, WhatsApp, or email. Gemini will automatically find the Name, Phone, and Address.
              </p>
            </div>
          </div>

          {/* Result Section */}
          <div className={`space-y-4 transition-all duration-500 ${parsedData ? 'opacity-100 translate-y-0' : 'opacity-40 pointer-events-none translate-y-4'}`}>
            <h3 className="text-lg font-bold text-[#1a3762] flex items-center gap-2">
              Review extracted data
              {parsedData && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Verified</span>}
            </h3>

            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DataField icon={User} label="Customer Name" value={parsedData?.customerName || '—'} />
                <DataField icon={Phone} label="Phone Number" value={parsedData?.phoneNumber || '—'} />
                <div className="sm:col-span-2">
                  <DataField icon={MapPin} label="Address" value={parsedData ? `${parsedData.address}, ${parsedData.district}` : '—'} />
                </div>
                <DataField icon={Package} label="Item Type" value={parsedData?.packageType || 'Regular Parcel'} />
                <DataField icon={CreditCard} label="COD Amount" value={parsedData ? `৳ ${parsedData.codAmount}` : '—'} />
              </div>

              {parsedData?.note && (
                <div className="pt-4 border-t border-slate-50">
                   <p className="text-xs font-bold text-slate-400 uppercase mb-2">Instructions</p>
                   <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">"{parsedData.note}"</p>
                </div>
              )}

              <button
                onClick={handleConfirm}
                disabled={!parsedData}
                className="w-full bg-[#ff751f] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 group"
              >
                Confirm & Create Booking
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataField: React.FC<{ icon: any, label: string, value: string }> = ({ icon: Icon, label, value }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
      <Icon size={12} /> {label}
    </p>
    <p className="text-sm font-semibold text-slate-700 truncate">{value}</p>
  </div>
);
