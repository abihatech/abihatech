import React, { useState } from 'react';
import { Check, FileText } from 'lucide-react';

interface PaymentsAndReceiptsSectionProps {
  onOpenReceipt: (orderNumber: string) => void;
}

export const PaymentsAndReceiptsSection: React.FC<PaymentsAndReceiptsSectionProps> = ({
  onOpenReceipt
}) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(185000);
  const gatewayRate = 0.02; // 2%
  const menupilotPlan = 2499; // Growth plan
  
  const gatewayFee = Math.round(monthlyRevenue * gatewayRate);
  const netEarnings = monthlyRevenue - gatewayFee - menupilotPlan;
  const netPercentage = ((netEarnings / monthlyRevenue) * 100).toFixed(1);

  return (
    <section className="py-20 lg:py-28 bg-[#0E1012] text-white border-b border-[#262A30]" id="payments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D9531E]">
            Payments &amp; Receipts
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
            Money goes straight to you. <br />
            Receipts go straight to your guest.
          </h2>
        </div>

        {/* Two Large Distinct Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Direct-to-Vendor Payments Card */}
          <div className="bg-[#16191D] rounded-3xl p-8 border border-[#262A30] flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Direct-to-vendor payments</h3>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Connect your own Razorpay or Cashfree account</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Every payment settles directly into your bank account</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>No pooled account, no per-order commission from MenuPilot</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Live payment status for every order on your dashboard</span>
                </li>
              </ul>
            </div>

            {/* Earnings Breakdown Sub-card with Interactive Revenue Slider */}
            <div className="bg-[#1C2025] rounded-2xl p-6 border border-[#2E333B]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 text-xs">
                <span className="font-bold text-white">Sample month — Rasoi Ghar</span>
                <span className="text-slate-400 text-[10px]">Interactive Calculator</span>
              </div>

              {/* Slider for experimenting with monthly revenue */}
              <div className="pt-3 pb-1">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Monthly Dine-in Turnover</span>
                  <span className="text-white font-mono font-bold">₹{monthlyRevenue.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="5000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full accent-[#D9531E] bg-slate-700 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2 py-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Gross revenue</span>
                  <span className="font-medium text-white tabular-nums">
                    ₹{monthlyRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Gateway fee (~2%)</span>
                  <span className="tabular-nums">- ₹{gatewayFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>MenuPilot Growth plan</span>
                  <span className="tabular-nums">- ₹{menupilotPlan.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex justify-between items-baseline">
                <span className="text-xs font-bold text-white">You keep</span>
                <span className="text-xl font-extrabold text-emerald-400 tabular-nums">
                  ₹{netEarnings.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                About {netPercentage}% of every rupee your guests pay. Actual gateway fees depend on your provider.
              </p>
            </div>
          </div>

          {/* WhatsApp Receipts Card */}
          <div className="bg-[#16191D] rounded-3xl p-8 border border-[#262A30] flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">WhatsApp-first receipts</h3>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>OTP verification at checkout over WhatsApp</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Instant order confirmation in the guest's chat</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>PDF receipt delivered automatically after payment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Full order history for every table</span>
                </li>
              </ul>
            </div>

            {/* Realistic WhatsApp Chat Preview */}
            <div className="bg-[#EFEAE2] rounded-2xl p-5 text-slate-900 border border-slate-300/40">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#075E54] text-white flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Rasoi Ghar via MenuPilot</p>
                    <p className="text-[9px] text-[#25D366] font-semibold">Official Business Account</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">10:42 PM</span>
              </div>

              {/* Chat Bubbles */}
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="bg-white p-2.5 rounded-lg max-w-[85%] shadow-xs">
                  Your MenuPilot code is <strong className="text-slate-900">48-21-07</strong>. Valid for 5 minutes.
                </div>
                <div className="bg-white p-2.5 rounded-lg max-w-[85%] shadow-xs">
                  <p className="font-bold text-slate-900">Order #1042 confirmed for Table 4:</p>
                  <p className="text-slate-600">Paneer Tikka ×1, Butter Naan ×2. We're on it.</p>
                </div>
                <div className="bg-[#DCF8C6] p-2.5 rounded-lg max-w-[90%] shadow-xs">
                  <p className="font-medium text-slate-800">Payment of ₹420 received via UPI. Thank you!</p>
                  <div 
                    onClick={() => onOpenReceipt('#1042')}
                    className="mt-1.5 flex items-center gap-2 bg-white/80 hover:bg-white cursor-pointer p-1.5 rounded text-[10px] font-mono border border-emerald-300/60 transition group"
                  >
                    <span className="text-red-600 font-bold">PDF</span>
                    <span className="group-hover:underline">receipt-1042.pdf</span>
                    <span className="ml-auto text-[9px] text-emerald-800 font-bold">CLICK TO OPEN</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-[#DCF8C6] px-2.5 py-1 rounded-lg text-[10px] text-slate-800">
                    Thanks! The tikka was great.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
