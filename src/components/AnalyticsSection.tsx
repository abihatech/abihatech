import React, { useState } from 'react';
import { DAILY_ANALYTICS, DailyMetric } from '../data/mockData';

export const AnalyticsSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DailyMetric>(DAILY_ANALYTICS[5]); // Sat as default

  const heightMap: { [key: string]: string } = {
    Mon: 'h-24',
    Tue: 'h-20',
    Wed: 'h-28',
    Thu: 'h-22',
    Fri: 'h-36',
    Sat: 'h-44',
    Sun: 'h-40'
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-[#E8E6E1]" id="analytics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Analytics Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9531E]">
              Analytics
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Know exactly how you're doing, every day.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Daily and monthly revenue, your best-selling dishes and order trends — so you can plan stock, staff and specials with real numbers.
            </p>
            <ul className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Revenue by day, week and month</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Top items and slow movers</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Peak hours and table turnover</span>
              </li>
            </ul>
          </div>

          {/* Analytics Visual Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#111315] p-6 sm:p-8 rounded-3xl border border-slate-800 text-white shadow-xl">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Revenue · last 7 days
                  </p>
                  <p className="text-3xl font-extrabold text-white mt-1 tabular-nums">₹41,860</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold bg-slate-800 px-3 py-1 rounded-full text-slate-300 block mb-1">
                    Sample data
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">
                    +18.4% vs last week
                  </span>
                </div>
              </div>

              {/* Active Day Detail Pill */}
              <div className="mb-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D9531E]"></span>
                  <span className="font-bold text-white">{selectedDay.day} ({selectedDay.date})</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <span>Revenue: <strong className="text-white">₹{selectedDay.revenue.toLocaleString('en-IN')}</strong></span>
                  <span>Orders: <strong className="text-white">{selectedDay.orders}</strong></span>
                  <span>Avg: <strong className="text-white">₹{selectedDay.avgOrder}</strong></span>
                </div>
              </div>

              {/* Stylized Bar Chart */}
              <div className="h-48 flex items-end justify-between gap-3 pt-4 border-t border-slate-800">
                {DAILY_ANALYTICS.map((item) => {
                  const isSelected = selectedDay.day === item.day;
                  const isWeekend = item.day === 'Sat' || item.day === 'Sun';
                  const heightClass = heightMap[item.day] || 'h-24';

                  return (
                    <div
                      key={item.day}
                      onClick={() => setSelectedDay(item)}
                      className="w-full flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div
                        className={`w-full transition-all rounded-t-md ${heightClass} ${
                          isSelected
                            ? 'bg-[#D9531E] ring-2 ring-white/30'
                            : isWeekend
                            ? 'bg-[#D9531E]/80 group-hover:bg-[#D9531E]'
                            : 'bg-[#1C2024] group-hover:bg-[#D9531E]/60'
                        }`}
                      ></div>
                      <span
                        className={`text-[10px] transition-colors ${
                          isSelected || isWeekend ? 'font-bold text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
