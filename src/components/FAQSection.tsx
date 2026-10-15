import React, { useState } from 'react';
import { FAQ_DATA } from '../data/mockData';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First open by default

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-[#E8E6E1]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Questions, answered.
          </h2>
        </div>

        {/* FAQ List with Interactive Accordion */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left font-semibold text-sm text-slate-800 flex items-center justify-between focus:outline-none cursor-pointer"
                >
                  <span>{item.q}</span>
                  <span className="text-slate-400 font-bold ml-4 text-base select-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
