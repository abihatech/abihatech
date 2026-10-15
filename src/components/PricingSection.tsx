import React, { useState } from 'react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-20 lg:py-28 bg-[#F4F2ED] border-b border-[#E8E6E1]" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D9531E]">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            A plan for every restaurant.
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Simple monthly pricing. No commission on your orders.
          </p>

          {/* Optional Billing Cycle Selector */}
          <div className="inline-flex items-center gap-1.5 p-1 mt-6 bg-slate-200/80 rounded-xl text-xs font-semibold text-slate-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg transition ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg transition ${
                billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual (2 Months Free)
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E6E1] flex flex-col justify-between shadow-2xs hover:shadow-md transition">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Starter</h3>
              <p className="text-xs text-slate-500 mt-1">For a single café or small restaurant.</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingCycle === 'annual' ? '₹799' : '₹999'}
                </span>
                <span className="text-xs text-slate-500 font-medium">/month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li>• 1 outlet</li>
                <li>• Up to 10 tables</li>
                <li>• QR ordering &amp; payments</li>
                <li>• WhatsApp receipts</li>
              </ul>
            </div>
            <div className="mt-8">
              <button
                onClick={() => onSelectPlan('Starter Plan (₹999/mo)')}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Start with Starter
              </button>
            </div>
          </div>

          {/* Growth Plan (Highlighted) */}
          <div className="bg-[#0E1012] text-white rounded-3xl p-8 border border-slate-800 flex flex-col justify-between shadow-2xl relative hover:scale-[1.01] transition-transform">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D9531E] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Growth</h3>
              <p className="text-xs text-slate-400 mt-1">For busy restaurants and small chains.</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {billingCycle === 'annual' ? '₹1,999' : '₹2,499'}
                </span>
                <span className="text-xs text-slate-400 font-medium">/month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li>• Up to 3 outlets</li>
                <li>• Unlimited tables</li>
                <li>• Staff roles &amp; live dashboard</li>
                <li>• Analytics &amp; insights</li>
              </ul>
            </div>
            <div className="mt-8">
              <button
                onClick={() => onSelectPlan('Growth Plan (₹2,499/mo)')}
                className="w-full py-3 px-4 rounded-xl bg-[#D9531E] hover:bg-[#C24513] font-semibold text-xs text-white transition shadow-md shadow-[#D9531E]/30 cursor-pointer"
              >
                Choose Growth
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E6E1] flex flex-col justify-between shadow-2xs hover:shadow-md transition">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
              <p className="text-xs text-slate-500 mt-1">For food courts, chains and franchises.</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li>• Unlimited outlets</li>
                <li>• Branded subdomain</li>
                <li>• Priority support</li>
                <li>• Marketplace-mode payments</li>
              </ul>
            </div>
            <div className="mt-8">
              <button
                onClick={() => onSelectPlan('Enterprise Custom Plan')}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
