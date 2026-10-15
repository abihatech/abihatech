import React from 'react';

interface MainFooterProps {
  onOpenDemo: () => void;
}

export const MainFooter: React.FC<MainFooterProps> = ({ onOpenDemo }) => {
  return (
    <footer className="bg-[#0E1012] text-slate-400 py-16 border-t border-[#262A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#262A30]">
          {/* Brand Description */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-7 h-7 rounded-lg bg-[#D9531E] flex items-center justify-center font-bold text-white shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">MenuPilot</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              QR ordering, payments and WhatsApp receipts for restaurants, cafés and food courts.
            </p>
          </div>

          {/* Links Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a className="hover:text-white transition" href="#how-it-works">How it works</a></li>
              <li><a className="hover:text-white transition" href="#features">Features</a></li>
              <li><a className="hover:text-white transition" href="#pricing">Pricing</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-xs">
              <li><a className="hover:text-white transition" href="mailto:hello@menupilot.com">hello@menupilot.com</a></li>
              <li><a className="hover:text-white transition" href="tel:+917259718100">+91 72597 18100</a></li>
              <li><a className="hover:text-white transition" href="#">menupilot.com</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a className="hover:text-white transition" href="#terms">Terms</a></li>
              <li><a className="hover:text-white transition" href="#privacy">Privacy</a></li>
              <li><a className="hover:text-white transition" href="#refund">Refund policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 text-center text-xs text-slate-500">
          © 2026 MenuPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
