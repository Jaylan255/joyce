import React, { useState } from 'react';
import { 
  Search, 
  Target, 
  Check, 
  Users, 
  Star, 
  Home, 
  Zap, 
  MessageSquare, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  BadgeCheck,
  RefreshCw,
  X
} from 'lucide-react';

// --- Mock Data ---
type Tipster = { id: string; name: string; accuracy: number; verified: boolean; wins: number; losses: number; price: number; recentForm: ('W' | 'L')[]; };

const MOCK_TIPSTERS: Tipster[] = [
  { id: '1', name: 'Rockstar', accuracy: 70.58, verified: true, wins: 145, losses: 60, price: 10000, recentForm: ['W', 'W', 'L', 'W', 'W'] },
  { id: '2', name: 'De-boss', accuracy: 80.54, verified: true, wins: 180, losses: 43, price: 15000, recentForm: ['W', 'W', 'W', 'L', 'W'] },
  { id: '3', name: 'Profit Nation', accuracy: 70.90, verified: true, wins: 210, losses: 86, price: 5000, recentForm: ['L', 'W', 'W', 'L', 'W'] },
  { id: '4', name: 'Kiboko ya Kanji', accuracy: 60.00, verified: true, wins: 90, losses: 60, price: 3000, recentForm: ['W', 'L', 'L', 'W', 'L'] },
  { id: '5', name: 'Thd_Mkamaria', accuracy: 80.21, verified: true, wins: 165, losses: 40, price: 20000, recentForm: ['W', 'W', 'W', 'W', 'L'] },
  { id: '6', name: 'RHINO', accuracy: 50.00, verified: true, wins: 55, losses: 55, price: 2000, recentForm: ['L', 'L', 'W', 'L', 'W'] },
];

export default function App() {
  // Set default tab to 'top-tipsters' so you can see the new page immediately.
  // You can click 'Home' in the bottom nav to go back to the homepage.
  const [currentTab, setCurrentTab] = useState<'home' | 'betslips' | 'subscription' | 'account' | 'all-tipsters' | 'top-tipsters' | 'tipster-profile'>('top-tipsters');
  const [selectedTipster, setSelectedTipster] = useState<Tipster | null>(null);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  const toggleSubscription = (tipsterId: string) => {
    setSubscriptions(prev => 
      prev.includes(tipsterId) 
        ? prev.filter(id => id !== tipsterId)
        : [...prev, tipsterId]
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-20 font-sans selection:bg-[#FF6600] selection:text-white">
      
      {currentTab === 'home' && (
        <>
          {/* --- Header --- */}
          <header className="px-4 py-4 sticky top-0 bg-[#0A0A0A] z-20">
            <h1 className="text-2xl font-black tracking-tight">
              BET <span className="text-[#FF6600]">TZ</span>
            </h1>
          </header>

          <main className="px-4 space-y-6 max-w-3xl mx-auto">
            
            {/* --- Hero Banner --- */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-r from-orange-600 to-orange-400 group cursor-pointer">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-md">
                  Jiunge na WhatsApp Channel
                </h2>
                <p className="text-white/90 font-medium mt-1">@BET TZ</p>
              </div>
              
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
              
              <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm z-20 hover:bg-black/60 transition-colors">
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm z-20 hover:bg-black/60 transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
              </div>
            </div>

            {/* --- Search Bar --- */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search tipster..." 
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6600] transition-colors"
              />
            </div>

            {/* --- Tipsters Section --- */}
            <div className="flex gap-4">
              
              {/* Vertical Tabs */}
              <div className="flex flex-col gap-6 pt-2 w-12 shrink-0">
                <button className="flex flex-col items-center gap-1.5 text-[#FF6600] group">
                  <div className="w-10 h-10 rounded-full border border-[#FF6600] flex items-center justify-center group-hover:bg-[#FF6600]/10 transition-colors">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">Top</span>
                </button>
                
                <button className="flex flex-col items-center gap-1.5 text-gray-500 group hover:text-gray-300 transition-colors">
                  <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-gray-500 transition-colors">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">Follow</span>
                </button>
              </div>

              {/* Tipsters Grid */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MOCK_TIPSTERS.map((tipster) => (
                  <div key={tipster.id} className="bg-[#0D241B] rounded-2xl p-4 flex flex-col items-center text-center border border-transparent hover:border-[#FF6600]/30 transition-colors">
                    <div className="flex items-center justify-center gap-1 mb-2 w-full">
                      <span className="font-bold text-sm truncate">{tipster.name}</span>
                      {tipster.verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" stroke="white" />
                      )}
                    </div>
                    
                    <div className="mt-2 mb-1">
                      <span className="text-2xl font-black tracking-tight">{tipster.accuracy}%</span>
                    </div>
                    <span className="text-[10px] text-gray-400 mb-4">Accuracy</span>
                    
                    <button 
                      onClick={() => {
                        if (subscriptions.includes(tipster.id)) {
                          setSelectedTipster(tipster);
                          setCurrentTab('tipster-profile');
                        } else {
                          toggleSubscription(tipster.id);
                        }
                      }}
                      className={`w-full text-sm font-bold py-2 rounded-xl transition-colors mt-auto ${
                        subscriptions.includes(tipster.id) 
                          ? 'bg-[#1A1A1A] text-[#FF6600] border border-[#FF6600]/30' 
                          : 'bg-[#FF6600] hover:bg-[#e65c00] text-white'
                      }`}
                    >
                      {subscriptions.includes(tipster.id) ? 'View Profile' : 'Subscribe'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Action Lists --- */}
            <div className="space-y-3 pt-4">
              <button onClick={() => setCurrentTab('all-tipsters')} className="w-full bg-[#141414] border border-gray-800 hover:border-gray-700 rounded-2xl p-4 flex items-center justify-between transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-white">View All Tipsters</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Browse all available tipsters</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </button>

              <button onClick={() => setCurrentTab('top-tipsters')} className="w-full bg-[#141414] border border-[#FF6600]/20 hover:border-[#FF6600]/40 rounded-2xl p-4 flex items-center justify-between transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center text-[#FF6600]">
                    <Star className="w-6 h-6" fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-white">Top Ranking Tipster's</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Best tipsters - last 10 days</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#FF6600] transition-colors" />
              </button>
            </div>

          </main>
        </>
      )}

      {currentTab === 'betslips' && (
        <>
          {/* --- Betslips Header --- */}
          <header className="px-4 py-4 sticky top-0 bg-[#0A0A0A] z-20 flex justify-between items-center">
            <h1 className="text-2xl font-black tracking-tight">Betslips</h1>
            <button onClick={() => window.location.reload()} className="w-10 h-10 rounded-full border border-[#FF6600]/30 flex items-center justify-center text-[#FF6600] hover:bg-[#FF6600]/10 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </header>

          <main className="px-4 max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-140px)]">
            {/* Tabs */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 bg-[#FF6600] text-white py-3.5 rounded-full text-[11px] font-bold tracking-wider">
                BET OF THE DAY
              </button>
              <button className="flex-1 bg-transparent border border-gray-800 text-white py-3.5 rounded-full text-[11px] font-bold tracking-wider hover:bg-gray-900 transition-colors">
                EXTRABET OF THE DAY
              </button>
            </div>
            
            <h2 className="text-[#FF6600] text-sm font-medium">Premium Tipsters</h2>
            
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center flex-1 pb-20 mt-20">
              <div className="w-24 h-24 rounded-full border border-[#FF6600]/20 flex items-center justify-center mb-6 bg-[#FF6600]/[0.02]">
                <Zap className="w-10 h-10 text-[#FF6600]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Bet of the Day yet</h3>
              <p className="text-sm text-gray-500 text-center max-w-[250px]">
                Bet of the Day betslips will appear here when posted
              </p>
            </div>
          </main>
        </>
      )}

      {currentTab === 'subscription' && (
        <>
          {/* --- Subscriptions Header --- */}
          <header className="px-4 py-4 sticky top-0 bg-[#0A0A0A] z-20 flex justify-between items-center">
            <h1 className="text-2xl font-black tracking-tight">Subscriptions</h1>
            <button onClick={() => window.location.reload()} className="w-10 h-10 rounded-full border border-[#FF6600]/30 flex items-center justify-center text-[#FF6600] hover:bg-[#FF6600]/10 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </header>

          <main className="px-4 max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-140px)]">
            
            {/* Subscribed Tipsters List */}
            {subscriptions.length > 0 ? (
              <div className="flex flex-col gap-4 pb-4 pt-2">
                {subscriptions.map(id => {
                  const tipster = MOCK_TIPSTERS.find(t => t.id === id);
                  if (!tipster) return null;
                  return (
                    <div key={tipster.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 flex flex-col gap-4">
                      {/* Header */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full border-2 border-[#FF6600] p-0.5">
                            <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center">
                              <User className="w-6 h-6 text-gray-500" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-white text-lg">{tipster.name}</span>
                              {tipster.verified && <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" stroke="white" />}
                            </div>
                            <span className="text-xs text-[#FF6600] font-medium">Tsh {tipster.price.toLocaleString()}/month</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => { setSelectedTipster(tipster); setCurrentTab('tipster-profile'); }} 
                          className="bg-[#1A1A1A] text-white border border-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors"
                        >
                          View Profile
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="flex justify-between bg-[#0A0A0A] rounded-xl p-3">
                        <div className="flex flex-col items-center">
                          <span className="text-green-500 font-bold">{tipster.wins}</span>
                          <span className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Wins</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-red-500 font-bold">{tipster.losses}</span>
                          <span className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Losses</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[#FF6600] font-bold">{tipster.accuracy}%</span>
                          <span className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Accuracy</span>
                        </div>
                      </div>

                      {/* Recent Form */}
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase font-medium mb-2 block">Recent Form (Last 5)</span>
                        <div className="flex gap-2">
                          {tipster.recentForm.map((result, i) => (
                            <div 
                              key={i} 
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                result === 'W' 
                                  ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                                  : 'bg-red-500/20 text-red-500 border border-red-500/30'
                              }`}
                            >
                              {result === 'W' ? <Check className="w-4 h-4" strokeWidth={3} /> : <X className="w-4 h-4" strokeWidth={3} />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 pb-20 mt-10">
                <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#FF6600]" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  You haven't subscribed to any tipster yet.
                </p>
              </div>
            )}
          </main>
        </>
      )}

      {currentTab === 'account' && (
        <>
          <main className="px-4 max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-70px)] pt-12">
            
            {/* --- Profile Header --- */}
            <div className="flex flex-col items-center justify-center mb-10">
              <div className="w-24 h-24 rounded-full bg-[#FF6600] flex items-center justify-center mb-4 border-4 border-[#1A1A1A] shadow-[0_0_20px_rgba(255,102,0,0.2)]">
                {/* Placeholder for the 'B' logo with arrow */}
                <div className="relative flex items-center justify-center w-full h-full">
                  <span className="text-white text-5xl font-black italic tracking-tighter pr-1">B</span>
                  <svg className="absolute top-4 right-4 w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">jaylan</h2>
            </div>

            {/* --- Account Menu --- */}
            <div className="w-full">
              <h3 className="text-gray-400 text-sm font-medium mb-3 px-2">Account</h3>
              
              <div className="bg-[#111111] rounded-2xl border border-gray-800/50 overflow-hidden">
                
                {/* Menu Items */}
                <button className="w-full flex items-center justify-between p-4 border-b border-gray-800/50 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-center gap-4">
                    <Zap className="w-5 h-5 text-[#FF6600]" strokeWidth={2} />
                    <span className="font-bold text-white text-[15px]">My Betslips</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-b border-gray-800/50 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-[#FF6600]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    <span className="font-bold text-white text-[15px]">Payment history</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-b border-gray-800/50 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-[#FF6600]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="font-bold text-white text-[15px]">Email Support</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-b border-gray-800/50 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-center gap-4">
                    {/* WhatsApp Icon */}
                    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span className="font-bold text-white text-[15px]">WhatsApp Support</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-b border-gray-800/50 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    <span className="font-bold text-white text-[15px]">Delete Account</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-b border-gray-800/50 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-[#FF6600]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span className="font-bold text-white text-[15px]">Share App</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-b border-gray-800/50 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-center gap-4">
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    <span className="font-bold text-white text-[15px]">Rate App 🌟</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span className="font-bold text-white text-[15px]">Logout</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </button>

              </div>
            </div>
          </main>
        </>
      )}

      {currentTab === 'all-tipsters' && (
        <>
          {/* --- All Tipsters Header --- */}
          <header className="px-4 py-4 sticky top-0 bg-[#0A0A0A] z-20 flex items-center gap-3">
            <button onClick={() => setCurrentTab('home')} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-900 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black tracking-tight">All Tipsters Ranking</h1>
          </header>

          <main className="px-4 max-w-3xl mx-auto flex flex-col pb-6">
            <div className="flex flex-col gap-3 mt-2">
              {[...MOCK_TIPSTERS].sort((a, b) => b.accuracy - a.accuracy).map((tipster, index) => (
                <div key={tipster.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Rank Number */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                      index === 1 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30' :
                      index === 2 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/30' :
                      'bg-[#1A1A1A] text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Tipster Info */}
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-white">{tipster.name}</span>
                        {tipster.verified && (
                          <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" stroke="white" />
                        )}
                      </div>
                      <div className="text-sm text-[#FF6600] font-bold mt-0.5">
                        {tipster.accuracy}% <span className="text-gray-500 font-normal text-xs">Accuracy</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subscribe Button */}
                  <button 
                    onClick={() => {
                      if (subscriptions.includes(tipster.id)) {
                        setSelectedTipster(tipster);
                        setCurrentTab('tipster-profile');
                      } else {
                        toggleSubscription(tipster.id);
                      }
                    }}
                    className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors ${
                      subscriptions.includes(tipster.id)
                        ? 'bg-[#1A1A1A] text-[#FF6600] border border-[#FF6600]/30'
                        : 'bg-[#FF6600] hover:bg-[#e65c00] text-white'
                    }`}
                  >
                    {subscriptions.includes(tipster.id) ? 'View Profile' : 'Subscribe'}
                  </button>
                </div>
              ))}
            </div>
          </main>
        </>
      )}

      {currentTab === 'top-tipsters' && (
        <>
          {/* --- Top Tipsters Header --- */}
          <header className="px-4 py-4 sticky top-0 bg-[#0A0A0A] z-20 flex items-center gap-3">
            <button onClick={() => setCurrentTab('home')} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-900 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black tracking-tight">Top Ranking Tipsters</h1>
          </header>

          <main className="px-4 max-w-3xl mx-auto flex flex-col pb-6">
            <div className="flex flex-col gap-4 mt-2">
              {[...MOCK_TIPSTERS].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3).map((tipster, index) => (
                <div key={tipster.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Rank Number */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                        index === 1 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30' :
                        'bg-amber-700/20 text-amber-600 border border-amber-700/30'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {/* Tipster Info */}
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-white text-lg">{tipster.name}</span>
                          {tipster.verified && (
                            <BadgeCheck className="w-5 h-5 text-blue-500 shrink-0" fill="currentColor" stroke="white" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm font-medium">
                          <span className="text-green-500">Win: {tipster.wins}</span>
                          <span className="text-red-500">Loss: {tipster.losses}</span>
                          <span className="text-[#FF6600]">Win Rate: {tipster.accuracy}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chevron to profile */}
                    <button 
                      onClick={() => {
                        setSelectedTipster(tipster);
                        setCurrentTab('tipster-profile');
                      }} 
                      className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                  
                  {/* Subscribe Button */}
                  <button 
                    onClick={() => {
                      if (subscriptions.includes(tipster.id)) {
                        setSelectedTipster(tipster);
                        setCurrentTab('tipster-profile');
                      } else {
                        toggleSubscription(tipster.id);
                      }
                    }}
                    className={`w-full font-bold py-3 rounded-xl transition-colors ${
                      subscriptions.includes(tipster.id)
                        ? 'bg-[#1A1A1A] text-[#FF6600] border border-[#FF6600]/30'
                        : 'bg-[#FF6600] hover:bg-[#e65c00] text-white'
                    }`}
                  >
                    {subscriptions.includes(tipster.id) ? 'View Profile' : 'Subscribe'}
                  </button>
                </div>
              ))}
            </div>
          </main>
        </>
      )}

      {currentTab === 'tipster-profile' && selectedTipster && (
        <>
          {/* --- Tipster Profile Header --- */}
          <header className="px-4 py-4 sticky top-0 bg-[#0A0A0A] z-20 flex items-center gap-3">
            <button onClick={() => setCurrentTab('top-tipsters')} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-900 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black tracking-tight">Tipster Profile</h1>
          </header>

          <main className="px-4 max-w-3xl mx-auto flex flex-col pb-6 items-center pt-8">
            <div className="w-28 h-28 rounded-full border-4 border-[#FF6600] p-1 mb-4 shadow-[0_0_20px_rgba(255,102,0,0.2)]">
              <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center">
                <User className="w-12 h-12 text-gray-500" />
              </div>
            </div>
            
            <div className="flex items-center gap-1 mb-6">
              <h2 className="text-3xl font-black">{selectedTipster.name}</h2>
              {selectedTipster.verified && <BadgeCheck className="w-6 h-6 text-blue-500" fill="currentColor" stroke="white" />}
            </div>

            <div className="flex gap-4 w-full mb-8">
              <div className="flex-1 bg-[#141414] border border-gray-800 rounded-2xl p-4 flex flex-col items-center">
                <div className="text-2xl font-black text-green-500">{selectedTipster.wins}</div>
                <div className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">Wins</div>
              </div>
              <div className="flex-1 bg-[#141414] border border-gray-800 rounded-2xl p-4 flex flex-col items-center">
                <div className="text-2xl font-black text-red-500">{selectedTipster.losses}</div>
                <div className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">Losses</div>
              </div>
              <div className="flex-1 bg-[#141414] border border-[#FF6600]/30 rounded-2xl p-4 flex flex-col items-center">
                <div className="text-2xl font-black text-[#FF6600]">{selectedTipster.accuracy}%</div>
                <div className="text-xs text-[#FF6600]/70 font-medium mt-1 uppercase tracking-wider">Win Rate</div>
              </div>
            </div>

            <button 
              onClick={() => toggleSubscription(selectedTipster.id)}
              className={`w-full text-lg font-bold py-4 rounded-2xl transition-colors shadow-lg ${
                subscriptions.includes(selectedTipster.id)
                  ? 'bg-[#1A1A1A] text-[#FF6600] border border-[#FF6600]/30 shadow-none'
                  : 'bg-[#FF6600] hover:bg-[#e65c00] text-white shadow-[#FF6600]/20'
              }`}
            >
              {subscriptions.includes(selectedTipster.id) ? 'Unsubscribe' : `Subscribe to ${selectedTipster.name}`}
            </button>
          </main>
        </>
      )}

      {/* --- Bottom Navigation --- */}
      <nav className="fixed bottom-0 w-full bg-[#0A0A0A] border-t border-gray-900 pb-safe pt-2 px-6 z-30">
        <div className="max-w-md mx-auto flex justify-between items-center h-14">
          <button 
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center gap-1 ${currentTab === 'home' ? 'text-[#FF6600]' : 'text-gray-500 hover:text-gray-300'} transition-colors`}
          >
            <Home className="w-6 h-6" fill={currentTab === 'home' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('betslips')}
            className={`flex flex-col items-center gap-1 ${currentTab === 'betslips' ? 'text-[#FF6600]' : 'text-gray-500 hover:text-gray-300'} transition-colors`}
          >
            <Zap className="w-6 h-6" fill={currentTab === 'betslips' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-medium">Betslips</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('subscription')}
            className={`flex flex-col items-center gap-1 ${currentTab === 'subscription' ? 'text-[#FF6600]' : 'text-gray-500 hover:text-gray-300'} transition-colors`}
          >
            <MessageSquare className="w-6 h-6" fill={currentTab === 'subscription' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-medium">Subscription</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('account')}
            className={`flex flex-col items-center gap-1 ${currentTab === 'account' ? 'text-[#FF6600]' : 'text-gray-500 hover:text-gray-300'} transition-colors`}
          >
            <User className="w-6 h-6" fill={currentTab === 'account' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-medium">Account</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
