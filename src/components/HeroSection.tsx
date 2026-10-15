import React, { useState } from 'react';
import { ArrowRight, Check, Eye } from 'lucide-react';
import { MenuItem, Order } from '../data/mockData';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onOpenCustomerApp: () => void;
  onOpenReceipt: (orderNumber: string) => void;
  menuItems: MenuItem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDemo,
  onOpenCustomerApp,
  onOpenReceipt,
  menuItems
}) => {
  const [activeTab, setActiveTab] = useState<'Starters' | 'Breads' | 'Drinks' | 'Desserts'>('Starters');
  const [cartQuantities, setCartQuantities] = useState<{ [id: string]: number }>({
    'item-1': 1, // Paneer Tikka
    'item-4': 2  // Butter Naan
  });

  const handleUpdate = (id: string, delta: number) => {
    setCartQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const currentCategoryItems = menuItems.filter((i) => i.category === activeTab);
  
  // Calculate total items and price from all categories
  const totalItemsCount = Object.values(cartQuantities).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cartQuantities).reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <section className="bg-[#0E1012] text-white pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden border-b border-[#262A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9531E]"></span>
              QR table ordering for Indian restaurants
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              Scan. Order. Pay. <br />
              <span className="text-[#D9531E]">Get a receipt.</span>
            </h1>

            {/* Body Subheading */}
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              MenuPilot lets your guests order and pay from the table — no app, no waiting for a waiter. Orders go straight to your kitchen, money goes straight to your bank, and receipts land on WhatsApp.
            </p>

            {/* Buttons Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenDemo}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D9531E] hover:bg-[#C24513] rounded-full transition shadow-md shadow-[#D9531E]/20 cursor-pointer"
              >
                Book a live demo
              </button>
              <a
                href="#how-it-works"
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition inline-flex items-center gap-2"
              >
                <span>See how it works</span>
              </a>
              <button
                onClick={onOpenCustomerApp}
                className="px-5 py-3.5 text-sm sm:text-base font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-full transition inline-flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Try Table 4 Ordering</span>
              </button>
            </div>

            {/* Quick Value Props Checkmarks */}
            <div className="pt-4 flex flex-wrap gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                <span>No app download</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                <span>Payments settle to your bank</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                <span>Receipts on WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Hero Right Column: High-fidelity Mobile Ordering Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Glowing background backdrop */}
            <div className="absolute -inset-4 bg-[#D9531E]/15 rounded-full blur-3xl -z-10"></div>

            {/* Smartphone Frame */}
            <div className="w-[300px] sm:w-[330px] bg-[#16191D] rounded-[42px] p-3 ring-1 ring-white/15 phone-shadow relative transition-transform hover:scale-[1.01]">
              <div className="bg-white rounded-[34px] overflow-hidden text-slate-800 shadow-inner">
                {/* Phone Status Header */}
                <div className="bg-[#F8F9FA] px-5 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">Table 4 • Rasoi Ghar</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                    Live Menu
                  </span>
                </div>

                {/* Menu Header */}
                <div className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">Today's menu</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Instant QR</span>
                  </div>
                  <div className="flex gap-2 mt-2 pb-1 overflow-x-auto text-[11px] font-semibold text-slate-500 border-b border-slate-100 scrollbar-none">
                    {(['Starters', 'Breads', 'Drinks', 'Desserts'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-2.5 py-1 rounded-full transition-colors ${
                          activeTab === cat
                            ? 'bg-slate-900 text-white'
                            : 'hover:text-slate-800 text-slate-500'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Items List */}
                <div className="px-5 py-2 space-y-3 text-xs min-h-[220px]">
                  {currentCategoryItems.slice(0, 4).map((item) => {
                    const qty = cartQuantities[item.id] || 0;
                    return (
                      <div key={item.id} className="flex items-center justify-between pb-2.5 border-b border-slate-100 last:border-b-0">
                        <div className="pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 border border-emerald-600 flex items-center justify-center p-0.5 shrink-0">
                              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                            </span>
                            <p className="font-bold text-slate-800 text-[13px] leading-tight">{item.name}</p>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-0.5">
                            ₹{item.price}/{item.unit}
                          </p>
                        </div>

                        {!item.available ? (
                          <span className="text-[10px] text-amber-600 font-semibold italic bg-amber-50 px-2 py-0.5 rounded">
                            Sold out
                          </span>
                        ) : qty > 0 ? (
                          <div className="flex items-center bg-slate-100 rounded-md border border-slate-200 shrink-0">
                            <button
                              onClick={() => handleUpdate(item.id, -1)}
                              className="px-2 py-0.5 font-bold text-slate-600 hover:text-slate-900"
                            >
                              -
                            </button>
                            <span className="px-1.5 font-semibold text-slate-900 text-[11px]">{qty}</span>
                            <button
                              onClick={() => handleUpdate(item.id, 1)}
                              className="px-2 py-0.5 font-bold text-[#D9531E] hover:text-[#C24513]"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleUpdate(item.id, 1)}
                            className="px-2.5 py-1 text-[11px] font-bold text-[#D9531E] bg-[#D9531E]/10 hover:bg-[#D9531E]/20 rounded border border-[#D9531E]/20 uppercase shrink-0 transition"
                          >
                            ADD
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Cart Bar Button */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={onOpenCustomerApp}
                    className="w-full bg-[#D9531E] hover:bg-[#C24513] text-white py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-between shadow-sm transition cursor-pointer"
                  >
                    <span className="bg-[#C24513] px-2 py-0.5 rounded text-[11px]">
                      {totalItemsCount || 3} items
                    </span>
                    <span>View Cart & Pay ₹{totalPrice || 390}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Overlaid Receipt Notification Badge */}
              <div 
                onClick={() => onOpenReceipt('#1042')}
                className="absolute -bottom-6 -right-5 sm:-right-8 bg-white border border-slate-200 text-slate-800 rounded-2xl p-3 shadow-2xl w-60 z-20 hover:border-emerald-500 hover:shadow-emerald-500/10 transition cursor-pointer group"
                title="Click to view tax invoice & WhatsApp receipt"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[9px] font-bold">
                    ✓
                  </div>
                  <span className="text-[11px] font-bold text-[#075E54]">WhatsApp</span>
                  <span className="text-[9px] text-slate-400 ml-auto">Just now</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-900 group-hover:text-emerald-700 transition">
                  Payment received
                </p>
                <p className="text-[10px] text-slate-600">Order #1042 • Table 4. Receipt attached.</p>
                <div className="mt-2 flex items-center gap-2 bg-slate-50 group-hover:bg-emerald-50/50 p-1.5 rounded border border-slate-200 text-[10px] font-medium text-slate-700 transition">
                  <span className="text-red-500 font-bold">PDF</span>
                  <span className="underline decoration-slate-300">receipt-1042.pdf</span>
                  <span className="ml-auto text-[9px] text-emerald-600 font-bold">VIEW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
