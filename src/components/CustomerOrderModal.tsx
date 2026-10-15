import React, { useState } from 'react';
import { X, ShoppingBag, CheckCircle, ArrowRight, ShieldCheck, RefreshCw, Smartphone } from 'lucide-react';
import { MenuItem, Order, RESTAURANT_INFO } from '../data/mockData';

interface CustomerOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onOrderPlaced: (newOrder: Order) => void;
  onViewReceipt: (order: Order) => void;
}

export const CustomerOrderModal: React.FC<CustomerOrderModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onOrderPlaced,
  onViewReceipt
}) => {
  const [selectedTable, setSelectedTable] = useState('T4');
  const [activeCategory, setActiveCategory] = useState<'Starters' | 'Breads' | 'Mains' | 'Drinks' | 'Desserts'>('Starters');
  const [cart, setCart] = useState<{ [itemId: string]: number }>({
    'item-1': 1, // Paneer Tikka
    'item-4': 2  // Butter Naan
  });
  const [checkoutStep, setCheckoutStep] = useState<'menu' | 'cart' | 'otp' | 'success'>('menu');
  const [phone, setPhone] = useState('9820154321');
  const [otp, setOtp] = useState(['4', '8', '2', '1', '0', '7']);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const categories: ('Starters' | 'Breads' | 'Mains' | 'Drinks' | 'Desserts')[] = [
    'Starters',
    'Breads',
    'Mains',
    'Drinks',
    'Desserts'
  ];

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      return item ? { ...item, quantity: qty } : null;
    })
    .filter(Boolean) as (MenuItem & { quantity: number })[];

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handlePay = () => {
    const newOrderNumber = `#${Math.floor(1044 + Math.random() * 50)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      table: selectedTable,
      amount: total,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      status: 'New',
      time: 'Just now',
      guestPhone: `+91 ${phone}`,
      items: cartItems.map((ci) => ({
        itemId: ci.id,
        name: ci.name,
        price: ci.price,
        quantity: ci.quantity
      }))
    };

    onOrderPlaced(newOrder);
    setPlacedOrder(newOrder);
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[380px] bg-[#16191D] rounded-[42px] p-3 ring-1 ring-white/20 phone-shadow text-slate-800 relative flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
          aria-label="Close interactive phone"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Screen Bezel Interior */}
        <div className="bg-white rounded-[34px] overflow-hidden flex flex-col flex-1 h-full shadow-inner relative">
          {/* Top Status Bar */}
          <div className="bg-[#F8F9FA] px-5 pt-3.5 pb-2.5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-700">Table {selectedTable.replace('T', '')} • {RESTAURANT_INFO.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="text-[10px] bg-slate-200 font-semibold text-slate-800 px-1.5 py-0.5 rounded border-none focus:ring-0 cursor-pointer"
                title="Change Table"
              >
                {Array.from({ length: 12 }, (_, i) => `T${i + 1}`).map((t) => (
                  <option key={t} value={t}>Table {t.replace('T', '')}</option>
                ))}
              </select>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live
              </span>
            </div>
          </div>

          {/* SCREEN CONTENT BY STEP */}
          {checkoutStep === 'menu' && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Category Navigation Bar */}
              <div className="px-5 pt-3 pb-2 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-sm">Today's menu</h3>
                <div className="flex gap-2 mt-2 pb-1 overflow-x-auto text-[11px] font-semibold text-slate-500 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                        activeCategory === cat ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3.5 divide-y divide-slate-100">
                {menuItems
                  .filter((item) => item.category === activeCategory)
                  .map((item) => {
                    const qty = cart[item.id] || 0;
                    return (
                      <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between">
                        <div className="pr-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 border border-emerald-600 flex items-center justify-center p-0.5 shrink-0">
                              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                            </span>
                            <p className="font-bold text-slate-800 text-[13px] leading-snug">
                              {item.name}
                              {!item.available && (
                                <span className="ml-1.5 text-[10px] text-amber-600 font-semibold italic">(Sold out)</span>
                              )}
                            </p>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-0.5">
                            ₹{item.price}/{item.unit}
                          </p>
                          <p className="text-slate-400 text-[10px] line-clamp-1 mt-0.5">{item.description}</p>
                        </div>

                        {item.available ? (
                          qty > 0 ? (
                            <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200 shrink-0">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2 py-1 font-bold text-slate-600 hover:text-slate-900"
                              >
                                -
                              </button>
                              <span className="px-1.5 font-bold text-slate-900 text-[11px] min-w-[16px] text-center">
                                {qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2 py-1 font-bold text-[#D9531E] hover:text-[#C24513]"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-1.5 text-[11px] font-bold text-[#D9531E] bg-[#D9531E]/10 hover:bg-[#D9531E]/20 rounded-lg border border-[#D9531E]/20 uppercase shrink-0 transition"
                            >
                              ADD
                            </button>
                          )
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold uppercase px-2 py-1 bg-slate-100 rounded">
                            Unavailable
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Bottom Cart Action Bar */}
              <div className="p-3 bg-slate-50 border-t border-slate-100">
                {cartItemCount > 0 ? (
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full bg-[#D9531E] hover:bg-[#C24513] text-white py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-between shadow-md transition"
                  >
                    <span className="bg-[#C24513] px-2 py-0.5 rounded text-[11px] font-semibold">
                      {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
                    </span>
                    <span className="font-bold">View Cart & Pay ₹{total}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="text-center py-1 text-slate-400 text-xs">
                    Tap + ADD on any dish to start ordering
                  </div>
                )}
              </div>
            </div>
          )}

          {checkoutStep === 'cart' && (
            <div className="flex flex-col flex-1 overflow-hidden p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <button
                  onClick={() => setCheckoutStep('menu')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  ← Back to menu
                </button>
                <h4 className="font-bold text-sm text-slate-900">Your Cart</h4>
                <div className="w-10"></div>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">{item.name}</p>
                      <p className="text-[11px] text-slate-500">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center bg-white rounded-md border border-slate-200">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-0.5 font-bold text-slate-600 hover:text-slate-900"
                      >
                        -
                      </button>
                      <span className="px-1.5 font-semibold text-slate-900 text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-0.5 font-bold text-[#D9531E]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>To Pay</span>
                    <span className="text-[#D9531E] font-extrabold text-sm">₹{total}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl flex items-center gap-2 text-emerald-800 text-[11px]">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Receipt will be automatically sent to your WhatsApp</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCheckoutStep('otp')}
                  className="w-full bg-[#D9531E] hover:bg-[#C24513] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <span>Proceed to WhatsApp Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {checkoutStep === 'otp' && (
            <div className="flex flex-col flex-1 p-5 justify-between">
              <div>
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 mb-3 block"
                >
                  ← Back to cart
                </button>
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#075E54] flex items-center justify-center mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">WhatsApp Verification</h4>
                <p className="text-xs text-slate-500 mt-1">
                  We'll send your instant PDF receipt and order tracking directly to your WhatsApp.
                </p>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                    <div className="flex rounded-xl border border-slate-300 overflow-hidden text-xs">
                      <span className="bg-slate-100 px-3 py-2 text-slate-600 font-semibold border-r border-slate-200">+91</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-3 py-2 text-slate-900 font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-700">6-Digit Code (Sent to WhatsApp)</label>
                      <span className="text-[10px] text-emerald-600 font-medium">OTP: 48-21-07</span>
                    </div>
                    <div className="flex gap-1.5 justify-between">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value;
                            setOtp((prev) => {
                              const next = [...prev];
                              next[idx] = val;
                              return next;
                            });
                          }}
                          className="w-10 h-10 text-center font-bold text-slate-900 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#D9531E] focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <button
                  onClick={handlePay}
                  className="w-full bg-[#D9531E] hover:bg-[#C24513] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
                >
                  <span>Pay ₹{total} via UPI / Card</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                  Direct settlement into {RESTAURANT_INFO.name}'s verified bank account
                </p>
              </div>
            </div>
          )}

          {checkoutStep === 'success' && placedOrder && (
            <div className="flex flex-col flex-1 p-5 justify-between text-center">
              <div className="pt-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">Order Placed & Paid!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Sent to Rasoi Ghar kitchen for <span className="font-bold text-slate-900">Table {placedOrder.table.replace('T', '')}</span>
                </p>

                {/* Overlaid WhatsApp notification card */}
                <div className="mt-4 bg-[#EFEAE2] p-3 rounded-xl border border-slate-200 text-left text-xs space-y-2 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#075E54] font-bold text-[11px]">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[8px]">✓</span>
                    <span>WhatsApp • Rasoi Ghar</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg text-[11px] shadow-xs">
                    <p className="font-bold text-slate-800">Payment of ₹{placedOrder.amount} confirmed</p>
                    <p className="text-slate-600 text-[10px]">Your kitchen token {placedOrder.orderNumber} is in preparation.</p>
                    <div 
                      onClick={() => onViewReceipt(placedOrder)}
                      className="mt-2 flex items-center gap-2 bg-slate-50 hover:bg-slate-100 cursor-pointer p-1.5 rounded border border-slate-200 text-[10px] font-medium text-slate-700 transition"
                    >
                      <span className="text-red-500 font-bold">PDF</span>
                      <span className="underline">receipt-{placedOrder.orderNumber.replace('#', '')}.pdf</span>
                      <span className="ml-auto text-emerald-700 font-semibold">View</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <button
                  onClick={() => onViewReceipt(placedOrder)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Open Full Tax Invoice / Receipt</span>
                </button>
                <button
                  onClick={() => {
                    setCheckoutStep('menu');
                    setCart({});
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-xl font-semibold text-xs transition"
                >
                  Order More Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
