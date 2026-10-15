import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenCustomerApp: () => void;
  onOpenReceipt: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenCustomerApp,
  onOpenReceipt
}) => {
  const steps = [
    {
      step: 1,
      title: 'Scan the QR',
      description: "Each table has its own code, so every order knows where it's from.",
      isDark: false,
      action: onOpenCustomerApp
    },
    {
      step: 2,
      title: 'Browse the menu',
      description: "Your live menu loads instantly, with photos and what's available today.",
      isDark: false,
      action: onOpenCustomerApp
    },
    {
      step: 3,
      title: 'Add to cart',
      description: 'Guests pick items, add customizations and submit.',
      isDark: false,
      action: onOpenCustomerApp
    },
    {
      step: 4,
      title: 'Pay securely',
      description: 'UPI or card checkout in the browser, verified with a WhatsApp OTP.',
      isDark: false,
      action: onOpenCustomerApp
    },
    {
      step: 5,
      title: 'Get the receipt',
      description: 'Order confirmation and PDF receipt arrive on WhatsApp.',
      isDark: true,
      action: onOpenReceipt
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#fbfbf9] border-b border-[#E8E6E1]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D9531E]">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            From table to receipt in under a minute.
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Your guests never download an app. They scan, tap and pay — right in the phone's browser.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((st) => (
            <div
              key={st.step}
              onClick={st.action}
              className={`p-5 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] ${
                st.isDark
                  ? 'bg-[#111315] text-white border-slate-800 shadow-md hover:border-[#D9531E]'
                  : 'bg-white text-slate-900 border-[#E8E6E1] hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      st.isDark ? 'bg-[#D9531E] text-white' : 'bg-slate-900 text-white'
                    }`}
                  >
                    {st.step}
                  </span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${st.isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <h4 className={`font-bold text-sm mb-1.5 ${st.isDark ? 'text-white' : 'text-slate-900'}`}>
                  {st.title}
                </h4>
                <p className={`text-xs leading-relaxed ${st.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {st.description}
                </p>
              </div>
              <div className="pt-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {st.isDark ? 'Click to preview receipt' : 'Click to test flow'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
