import React from 'react';
import { X, Download, Printer, CheckCircle2, Share2, Receipt } from 'lucide-react';
import { Order, RESTAURANT_INFO } from '../data/mockData';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstRate = 0.05;
  const gstAmount = Math.round(subtotal * gstRate);
  const totalAmount = subtotal + gstAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simulated instant receipt download
    const blob = new Blob(
      [
        `RECEIPT: ${RESTAURANT_INFO.name}\nOrder: ${order.orderNumber}\nTable: ${order.table}\nDate: ${order.time}\nTotal: Rs. ${order.amount}\nStatus: ${order.paymentStatus} via ${order.paymentMethod}\nGSTIN: ${RESTAURANT_INFO.gstin}`
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${order.orderNumber.replace('#', '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* WhatsApp Verified Top Banner */}
        <div className="bg-[#075E54] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white">
              RG
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm leading-none">{RESTAURANT_INFO.name}</span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[9px] font-bold">✓</span>
              </div>
              <span className="text-[10px] text-emerald-200">WhatsApp Verified Business Receipt</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
            aria-label="Close receipt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Receipt Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 text-xs">
          {/* Header & GSTIN */}
          <div className="text-center pb-4 border-b border-dashed border-slate-300">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{RESTAURANT_INFO.name}</h3>
            <p className="text-slate-500 text-[11px] max-w-xs mx-auto mt-0.5">{RESTAURANT_INFO.address}</p>
            <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 mt-2">
              <span>GSTIN: {RESTAURANT_INFO.gstin}</span>
              <span>•</span>
              <span>FSSAI: {RESTAURANT_INFO.fssai}</span>
            </div>
          </div>

          {/* Order Meta */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Order Details</span>
              <span className="font-bold text-slate-900">{order.orderNumber} • Table {order.table}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Payment</span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                {order.paymentMethod} • {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-200">
              <span>Item & Qty</span>
              <span className="text-right">Amount</span>
            </div>
            <div className="divide-y divide-slate-100 py-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <span className="text-slate-500 text-[11px] block">
                      ₹{item.price} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="pt-2 border-t border-dashed border-slate-300 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="tabular-nums">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>CGST (2.5%)</span>
              <span className="tabular-nums">₹{Math.round(gstAmount / 2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>SGST (2.5%)</span>
              <span className="tabular-nums">₹{Math.round(gstAmount / 2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
              <span>Total Paid</span>
              <span className="text-[#D9531E] text-base tabular-nums">₹{order.amount}</span>
            </div>
          </div>

          {/* Reference Stamp */}
          <div className="bg-emerald-50/70 border border-emerald-200/60 p-2.5 rounded-lg text-[10px] text-emerald-800 flex items-center gap-2">
            <Receipt className="w-4 h-4 shrink-0 text-emerald-600" />
            <div>
              <p className="font-semibold">Settled directly to Rasoi Ghar Bank Account</p>
              <p className="text-emerald-700/80">Ref: UPI/48291042/MENUPILOT • Instant auto-settlement</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs rounded-xl transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText?.(`https://menupilot.com/receipt/${order.orderNumber.replace('#', '')}`);
              alert('Receipt link copied to clipboard!');
            }}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/30 hover:bg-[#25D366]/20 font-semibold text-xs rounded-xl transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
