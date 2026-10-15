import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, MapPin, Store, User, Phone } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, defaultPlan }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    phone: '',
    city: 'Bengaluru',
    tableCount: '10-25 tables',
    preferredSlot: 'Today 4:00 PM',
    plan: defaultPlan || 'Growth Plan (₹2,499/mo)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0E1012] text-white px-6 py-5 flex items-center justify-between border-b border-[#262A30]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#D9531E]/20 text-[#D9531E] border border-[#D9531E]/30 mb-1">
              Live Product Walkthrough
            </div>
            <h3 className="text-lg font-bold">Book a Live 15-Minute Demo</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Demo Scheduled!</h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              We've confirmed your slot for <span className="font-semibold text-slate-900">{formData.preferredSlot}</span>. A MenuPilot specialist will share the Google Meet link and live sample QR code to <span className="font-semibold text-slate-900">{formData.phone || '+91 98765 43210'}</span> on WhatsApp.
            </p>
            <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-slate-200 text-left text-xs text-slate-700 space-y-1.5">
              <p><strong>Restaurant:</strong> {formData.restaurantName || 'Your Restaurant'}</p>
              <p><strong>Tables:</strong> {formData.tableCount}</p>
              <p><strong>City:</strong> {formData.city}</p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-xl bg-[#D9531E] hover:bg-[#C24513] text-white font-semibold text-xs transition"
              >
                Done & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Restaurant / Cafe Name</label>
              <div className="relative">
                <Store className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rasoi Ghar / Chai Point"
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E] text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Owner / Manager Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E] text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">WhatsApp Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E] text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">City</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E] text-slate-900 bg-white"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Number of Tables</label>
                <select
                  value={formData.tableCount}
                  onChange={(e) => setFormData({ ...formData, tableCount: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E] text-slate-900 bg-white"
                >
                  <option value="1-10 tables">1 - 10 tables (Starter)</option>
                  <option value="10-25 tables">10 - 25 tables (Growth)</option>
                  <option value="25+ tables">25+ tables (Multi-outlet / Enterprise)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <select
                    value={formData.preferredSlot}
                    onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E] text-slate-900 bg-white"
                  >
                    <option value="Today 4:00 PM">Today · 4:00 PM</option>
                    <option value="Today 6:00 PM">Today · 6:00 PM</option>
                    <option value="Tomorrow 11:30 AM">Tomorrow · 11:30 AM</option>
                    <option value="Tomorrow 3:00 PM">Tomorrow · 3:00 PM</option>
                    <option value="Tomorrow 5:00 PM">Tomorrow · 5:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interested Plan</label>
                <input
                  type="text"
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E] text-slate-900 bg-slate-50"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#D9531E] hover:bg-[#C24513] text-white font-bold text-sm transition shadow-md shadow-[#D9531E]/25"
              >
                Confirm Live Demo Request
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2">
                No credit card required. Free onboarding & table QR setup assistance included.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
