import React from 'react';
import { Smartphone, LayoutDashboard, Globe } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'vendor' | 'customer';
  onSelectView: (view: 'landing' | 'vendor' | 'customer') => void;
  onOpenDemo: () => void;
  onOpenVendorLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  onOpenDemo,
  onOpenVendorLogin
}) => {
  return (
    <>
      {/* Interactive Screen Switcher Bar for Reviewers */}
      <div className="bg-[#16191D] text-slate-300 text-xs px-4 py-2 border-b border-[#262A30] flex flex-wrap items-center justify-between gap-2 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D9531E]"></span>
          <span className="font-semibold text-white">MenuPilot Interactive App & Screens</span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="hidden sm:inline text-slate-400">Click to switch views:</span>
        </div>
        <div className="flex items-center gap-1.5 p-0.5 bg-black/40 rounded-lg border border-white/10">
          <button
            onClick={() => onSelectView('landing')}
            className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
              currentView === 'landing' ? 'bg-[#D9531E] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>
          <button
            onClick={() => onSelectView('customer')}
            className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
              currentView === 'customer' ? 'bg-[#D9531E] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Customer QR Ordering</span>
          </button>
          <button
            onClick={() => onSelectView('vendor')}
            className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
              currentView === 'vendor' ? 'bg-[#D9531E] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Vendor Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Brand Logo */}
          <button 
            onClick={() => onSelectView('landing')}
            className="flex items-center gap-2.5 text-white hover:opacity-95 transition text-left shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#D9531E] flex items-center justify-center font-bold text-white shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-black whitespace-nowrap">MenuPilot</span>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-500">
            <a className="hover:text-black transition whitespace-nowrap shrink-0" href="#how-it-works">How it works</a>
            <a className="hover:text-black transition whitespace-nowrap shrink-0" href="#features">Features</a>
            <a className="hover:text-black transition whitespace-nowrap shrink-0" href="#payments">Payments</a>
            <a className="hover:text-black transition whitespace-nowrap shrink-0" href="#pricing">Pricing</a>
            <a className="hover:text-black transition whitespace-nowrap shrink-0" href="#faq">FAQ</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-5 shrink-0">
            <button 
              onClick={onOpenVendorLogin}
              className="text-sm font-medium text-slate-500 hover:text-[#C24513] transition whitespace-nowrap shrink-0 cursor-pointer hover:underline"
            >
              Vendor login
            </button>
            <button 
              onClick={onOpenDemo}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#C24513] rounded-full transition shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a demo
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
