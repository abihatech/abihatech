import React from 'react';

interface CallToActionBannerProps {
  onOpenDemo: () => void;
  onOpenWhatsApp: () => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  onOpenDemo,
  onOpenWhatsApp
}) => {
  return (
    <section className="py-16 bg-[#F9F8F5]" id="book-demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#D9531E] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to digitise your restaurant?
            </h2>
            <p className="text-sm sm:text-base text-orange-100">
              Faster orders. Cleaner payments. A dashboard that shows exactly what you're earning.
            </p>
          </div>

          {/* Banner Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenDemo}
              className="px-6 py-3.5 bg-black hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm rounded-full text-center transition shadow-md cursor-pointer whitespace-nowrap"
            >
              Book a live demo
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs sm:text-sm rounded-full text-center transition shadow-md cursor-pointer whitespace-nowrap"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
