import React from "react";
import { Clock, AlertTriangle, CreditCard, TrendingUp } from "lucide-react";

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: Clock,
      title: "Slow service",
      description:
        "Guests wait for staff to take their order, especially at peak hours.",
    },
    {
      icon: AlertTriangle,
      title: "Manual errors",
      description:
        "Handwritten or verbal orders lead to mistakes and missed upsells.",
    },
    {
      icon: CreditCard,
      title: "Fragmented payments",
      description:
        "Cash, cards and UPI handled differently across staff and shifts.",
    },
    {
      icon: TrendingUp,
      title: "No digital trail",
      description:
        "No receipts, no order history, no data to understand your guests.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#f4f2ed] border-b border-[#E8E6E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label & Title */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D9531E]">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Every rush hour, friction quietly costs you tables and revenue.
          </h2>
        </div>

        {/* Problem Cards 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E8E6E1] shadow-xs hover:shadow-md transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#D9531E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {prob.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
