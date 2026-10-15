import React from 'react';
import { Menu, QrCode, LayoutGrid, Users, BarChart3, Building2 } from 'lucide-react';

export const FeaturesGridSection: React.FC = () => {
  const features = [
    {
      icon: Menu,
      title: 'Menu builder',
      description: 'Categories, items, images, add-ons and a live availability toggle.'
    },
    {
      icon: QrCode,
      title: 'QR & table manager',
      description: 'Generate and print a unique QR code per table in seconds.'
    },
    {
      icon: LayoutGrid,
      title: 'Live order dashboard',
      description: 'The kitchen sees new orders instantly, with a built-in status pipeline.'
    },
    {
      icon: Users,
      title: 'Role-based staff access',
      description: 'Owner, manager and staff roles, each with the right permissions.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & insights',
      description: 'Daily revenue, top items and order trends at a glance.'
    },
    {
      icon: Building2,
      title: 'Multi-outlet support',
      description: 'One account, many branches, one login as you grow.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-[#E8E6E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D9531E]">
            Everything Included
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            No add-ons to chase down.
          </h2>
        </div>

        {/* 6-Item Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E8E6E1] shadow-2xs hover:shadow-md transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#D9531E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Technical Trust Subnote */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
          Built on Next.js and Supabase with row-level security, so every restaurant's menu, orders and payments stay isolated from every other vendor on the platform.
        </div>
      </div>
    </section>
  );
};
