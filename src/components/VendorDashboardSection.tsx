import React, { useState } from 'react';
import { MenuItem, Order, RESTAURANT_INFO } from '../data/mockData';
import { Check, ArrowRight, Printer, AlertCircle } from 'lucide-react';

interface VendorDashboardSectionProps {
  orders: Order[];
  menuItems: MenuItem[];
  onToggleAvailability: (itemId: string) => void;
  onAdvanceOrderStatus: (orderId: string) => void;
  onSelectOrder: (order: Order) => void;
  onOpenFullDashboard: () => void;
}

export const VendorDashboardSection: React.FC<VendorDashboardSectionProps> = ({
  orders,
  menuItems,
  onToggleAvailability,
  onAdvanceOrderStatus,
  onSelectOrder,
  onOpenFullDashboard
}) => {
  const [activeNav, setActiveNav] = useState('Overview');

  const navItems = [
    'Overview',
    'Live orders',
    'Menu',
    'Tables & QR',
    'Payments',
    'Analytics',
    'Staff'
  ];

  // Derived metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.amount : 0), 6240);
  const totalOrdersCount = 38 + orders.filter(o => o.id.startsWith('ord-') && !o.id.includes('104')).length;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);

  // Kanban groupings
  const newOrders = orders.filter((o) => o.status === 'New');
  const preparingOrders = orders.filter((o) => o.status === 'Preparing');
  const readyOrders = orders.filter((o) => o.status === 'Ready');

  return (
    <section className="py-20 lg:py-28 bg-[#F4F2ED] border-b border-[#E8E6E1]" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9531E]">
              Your Vendor Dashboard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Your whole restaurant, at a glance.
            </h2>
          </div>
          <div className="flex items-center gap-3 mt-3 md:mt-0">
            <p className="text-sm text-slate-600 max-w-sm">
              Revenue, live orders and table activity on one screen — from the counter, the kitchen or your phone.
            </p>
            <button
              onClick={onOpenFullDashboard}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium shrink-0 transition"
            >
              <span>Expand Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard UI Frame Component */}
        <div className="bg-white rounded-2xl border border-[#DEDBD2] overflow-hidden dashboard-preview-shadow mb-8">
          {/* Browser Bar */}
          <div className="bg-[#16191D] px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="bg-slate-800/80 text-slate-300 text-[11px] px-4 py-1 rounded-full font-mono mx-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              menupilot.com/dashboard/{activeNav.toLowerCase().replace(/\s+/g, '-')}
            </div>
            <button
              onClick={onOpenFullDashboard}
              className="text-[11px] text-slate-400 hover:text-white transition hidden sm:inline"
            >
              Full Screen ↗
            </button>
          </div>

          {/* Dashboard Layout Interior */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Dashboard Sidebar */}
            <div className="lg:col-span-2 bg-[#1A1D21] p-4 text-slate-400 text-xs border-r border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-white text-sm">{RESTAURANT_INFO.name}</span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                  Online
                </span>
              </div>
              <nav className="space-y-1 font-medium">
                {navItems.map((nav) => (
                  <button
                    key={nav}
                    onClick={() => setActiveNav(nav)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                      activeNav === nav
                        ? 'bg-[#D9531E] text-white font-semibold shadow-xs'
                        : 'hover:text-white hover:bg-white/5 text-slate-400'
                    }`}
                  >
                    <span>{nav}</span>
                    {nav === 'Live orders' && newOrders.length > 0 && (
                      <span className="w-4 h-4 rounded-full bg-white text-[#D9531E] text-[10px] font-bold flex items-center justify-center">
                        {newOrders.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500">
                <p className="text-slate-400 font-semibold">Indiranagar Outlet</p>
                <p>12 Tables Active</p>
              </div>
            </div>

            {/* Dashboard Content Area */}
            <div className="lg:col-span-10 p-6 bg-slate-50/50">
              {/* Tab: Overview (Default view as requested) */}
              {activeNav === 'Overview' && (
                <>
                  {/* Greeting & Quick Stats Header */}
                  <div className="flex items-center justify-between pb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Good evening</h3>
                      <p className="text-xs text-slate-500">Live operational data for today</p>
                    </div>
                    <span className="text-[11px] font-semibold bg-slate-200/80 px-2.5 py-1 rounded text-slate-700">
                      Sample data
                    </span>
                  </div>

                  {/* 4 Metric Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[11px] text-slate-500 font-medium">Today's revenue</span>
                      <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
                        ₹{totalRevenue.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[11px] text-slate-500 font-medium">Orders</span>
                      <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">{totalOrdersCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[11px] text-slate-500 font-medium">Avg. order</span>
                      <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">₹{avgOrderValue}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[11px] text-slate-500 font-medium">Tables active</span>
                      <p className="text-xl font-bold text-slate-900 mt-1">7 / 12</p>
                    </div>
                  </div>

                  {/* Recent Orders & Top Items */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Orders Table */}
                    <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Recent orders
                        </h4>
                        <span className="text-[11px] text-slate-400">Click row for receipt</span>
                      </div>
                      <div className="overflow-x-auto text-xs">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-100 pb-2">
                              <th className="font-medium pb-2">Order</th>
                              <th className="font-medium pb-2">Table</th>
                              <th className="font-medium pb-2">Amount</th>
                              <th className="font-medium pb-2">Payment</th>
                              <th className="font-medium pb-2">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {orders.slice(0, 5).map((ord) => (
                              <tr
                                key={ord.id}
                                onClick={() => onSelectOrder(ord)}
                                className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                              >
                                <td className="py-2.5 font-semibold text-slate-800">{ord.orderNumber}</td>
                                <td className="text-slate-600">{ord.table}</td>
                                <td className="text-slate-800 font-medium tabular-nums">₹{ord.amount}</td>
                                <td className="text-slate-600">{ord.paymentMethod} · {ord.paymentStatus}</td>
                                <td>
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                      ord.status === 'Preparing'
                                        ? 'bg-amber-100 text-amber-800'
                                        : ord.status === 'Ready'
                                        ? 'bg-blue-100 text-blue-800'
                                        : ord.status === 'New'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-slate-100 text-slate-700'
                                    }`}
                                  >
                                    {ord.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Top Items Visual List */}
                    <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                        Top items today
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="flex justify-between font-medium mb-1">
                            <span>Paneer Tikka</span>
                            <span className="font-bold">14</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#D9531E] h-full rounded-full w-[85%]"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between font-medium mb-1">
                            <span>Butter Naan</span>
                            <span className="font-bold">11</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#D9531E] h-full rounded-full w-[65%]"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between font-medium mb-1">
                            <span>Masala Chai</span>
                            <span className="font-bold">9</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#D9531E] h-full rounded-full w-[50%]"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between font-medium mb-1">
                            <span>Gulab Jamun</span>
                            <span className="font-bold">6</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#D9531E] h-full rounded-full w-[35%]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Other Tabs for Rich Interactivity */}
              {activeNav === 'Live orders' && (
                <div>
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Live Kitchen Pipeline</h3>
                      <p className="text-xs text-slate-500">Click any card to advance its cooking stage</p>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      ● Auto-refreshing via Supabase
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* New Column */}
                    <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-bold text-xs text-slate-700 pb-2 border-b border-slate-200">
                        <span>New Orders</span>
                        <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[11px]">
                          {newOrders.length}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {newOrders.map((ord) => (
                          <div
                            key={ord.id}
                            onClick={() => onAdvanceOrderStatus(ord.id)}
                            className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-[#D9531E] cursor-pointer transition"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-900 text-xs">{ord.orderNumber} • Table {ord.table}</span>
                              <span className="text-[10px] text-slate-400">{ord.time}</span>
                            </div>
                            <div className="text-[11px] text-slate-600 space-y-0.5 mb-2">
                              {ord.items.map((it, i) => (
                                <p key={i}>{it.quantity}x {it.name}</p>
                              ))}
                            </div>
                            <button className="w-full text-center py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded font-semibold text-[10px] transition">
                              Start Preparing →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Preparing Column */}
                    <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-bold text-xs text-slate-700 pb-2 border-b border-slate-200">
                        <span>Preparing</span>
                        <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[11px]">
                          {preparingOrders.length}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {preparingOrders.map((ord) => (
                          <div
                            key={ord.id}
                            onClick={() => onAdvanceOrderStatus(ord.id)}
                            className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-blue-500 cursor-pointer transition"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-900 text-xs">{ord.orderNumber} • Table {ord.table}</span>
                              <span className="text-[10px] text-blue-600 font-medium">Cooking</span>
                            </div>
                            <div className="text-[11px] text-slate-600 space-y-0.5 mb-2">
                              {ord.items.map((it, i) => (
                                <p key={i}>{it.quantity}x {it.name}</p>
                              ))}
                            </div>
                            <button className="w-full text-center py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded font-semibold text-[10px] transition">
                              Mark Ready to Serve →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ready Column */}
                    <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-bold text-xs text-slate-700 pb-2 border-b border-slate-200">
                        <span>Ready to Serve</span>
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[11px]">
                          {readyOrders.length}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {readyOrders.map((ord) => (
                          <div
                            key={ord.id}
                            onClick={() => onAdvanceOrderStatus(ord.id)}
                            className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-emerald-500 cursor-pointer transition"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-900 text-xs">{ord.orderNumber} • Table {ord.table}</span>
                              <span className="text-[10px] text-emerald-600 font-semibold">Ready</span>
                            </div>
                            <div className="text-[11px] text-slate-600 space-y-0.5 mb-2">
                              {ord.items.map((it, i) => (
                                <p key={i}>{it.quantity}x {it.name}</p>
                              ))}
                            </div>
                            <button className="w-full text-center py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px] transition">
                              Mark as Delivered ✓
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu & Tables & other tabs preview */}
              {(activeNav === 'Menu' || activeNav === 'Tables & QR' || activeNav === 'Payments' || activeNav === 'Analytics' || activeNav === 'Staff') && (
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{activeNav} Management</h4>
                      <p className="text-xs text-slate-500">Configure your outlet parameters and live status</p>
                    </div>
                    <button
                      onClick={onOpenFullDashboard}
                      className="px-3 py-1.5 bg-[#D9531E] text-white text-xs font-semibold rounded-lg hover:bg-[#C24513] transition"
                    >
                      Open Full Studio
                    </button>
                  </div>
                  
                  {activeNav === 'Tables & QR' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((t) => (
                        <div key={t} className="p-3 rounded-lg border border-slate-200 text-center hover:border-[#D9531E] transition">
                          <div className="w-10 h-10 mx-auto bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-xs mb-1">
                            T{t}
                          </div>
                          <span className="text-[11px] font-semibold text-slate-800 block">Table {t}</span>
                          <span className="text-[9px] text-emerald-600 font-semibold">QR Active</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeNav === 'Menu' && (
                    <div className="space-y-2">
                      {menuItems.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                          <div>
                            <span className="font-semibold text-xs text-slate-900">{item.name}</span>
                            <span className="text-slate-500 text-[11px] ml-2">₹{item.price}</span>
                          </div>
                          <button
                            onClick={() => onToggleAvailability(item.id)}
                            className={`px-3 py-1 rounded text-[10px] font-semibold transition ${
                              item.available
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {item.available ? 'In Stock (Live)' : 'Sold Out'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeNav === 'Payments' && (
                    <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-2">
                      <p className="font-bold text-emerald-900">Connected Gateway: Razorpay India</p>
                      <p className="text-emerald-800">Settlement Account: HDFC Bank ••••• 4920 (Rasoi Ghar Pvt Ltd)</p>
                      <p className="text-slate-600">Total settled this week: ₹41,860 • T+1 Payout SLA Active</p>
                    </div>
                  )}

                  {activeNav === 'Analytics' && (
                    <div className="text-center py-6 text-xs text-slate-500">
                      View full 7-day breakdown and dish turnover in the dedicated analytics section below.
                    </div>
                  )}

                  {activeNav === 'Staff' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span>Ramesh (Owner)</span>
                        <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded">All Permissions</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span>Sunil (Kitchen Chef)</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded">KOT & Order Pipeline</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Two Support Cards Below Main Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Menu & Table QR codes */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E6E1] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Menu and table QR codes in minutes
              </h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Add categories, items, photos and add-ons. Switch an item off when it sells out. Generate and print a unique QR for every table.
              </p>
            </div>

            {/* Realistic UI snippet with working toggles */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pb-2 border-b border-slate-200 mb-3">
                <span>Starters</span>
                <span className="text-slate-400">Availability</span>
              </div>
              <div className="space-y-2.5 text-xs">
                {menuItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className={item.available ? 'text-slate-800' : 'text-slate-400'}>
                      {item.name} {!item.available && <em className="text-[10px] text-amber-600 font-semibold">(Sold out)</em>}
                    </span>
                    <button
                      onClick={() => onToggleAvailability(item.id)}
                      className={`w-7 h-4 rounded-full flex items-center transition-colors px-0.5 cursor-pointer ${
                        item.available ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                      }`}
                      title="Click to toggle availability"
                    >
                      <span className="w-3 h-3 bg-white rounded-full shadow-xs"></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2: Every order, kitchen to table live */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E6E1] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Every order, kitchen to table, live
              </h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                New orders appear in the kitchen the moment they're paid. Move them along the pipeline and print KOTs — no misheard tickets.
              </p>
            </div>

            {/* Realistic Kanban snippet */}
            <div className="grid grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-[10px] text-slate-500 pb-1.5 border-b border-slate-100">
                  <span>New</span>{' '}
                  <span className="bg-amber-100 text-amber-800 px-1 rounded tabular-nums">
                    {newOrders.length || 2}
                  </span>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div 
                    onClick={() => newOrders[0] && onAdvanceOrderStatus(newOrders[0].id)}
                    className="p-1.5 bg-slate-50 hover:bg-amber-50 cursor-pointer rounded border border-slate-100 transition"
                    title="Click to advance to Preparing"
                  >
                    <p className="font-bold text-[11px] text-slate-800">#1043 • T6</p>
                    <p className="text-[10px] text-slate-500 truncate">1x Veg Biryani, 2x Lassi</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-[10px] text-slate-500 pb-1.5 border-b border-slate-100">
                  <span>Preparing</span>{' '}
                  <span className="bg-blue-100 text-blue-800 px-1 rounded tabular-nums">
                    {preparingOrders.length || 1}
                  </span>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div 
                    onClick={() => preparingOrders[0] && onAdvanceOrderStatus(preparingOrders[0].id)}
                    className="p-1.5 bg-slate-50 hover:bg-blue-50 cursor-pointer rounded border border-slate-100 transition"
                    title="Click to advance to Ready"
                  >
                    <p className="font-bold text-[11px] text-slate-800">#1042 • T4</p>
                    <p className="text-[10px] text-slate-500 truncate">1x Paneer Tikka, 2x Butter Naan</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-[10px] text-slate-500 pb-1.5 border-b border-slate-100">
                  <span>Ready</span>{' '}
                  <span className="bg-emerald-100 text-emerald-800 px-1 rounded tabular-nums">
                    {readyOrders.length || 1}
                  </span>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div 
                    onClick={() => readyOrders[0] && onAdvanceOrderStatus(readyOrders[0].id)}
                    className="p-1.5 bg-slate-50 hover:bg-emerald-50 cursor-pointer rounded border border-slate-100 transition"
                    title="Click to mark Delivered"
                  >
                    <p className="font-bold text-[11px] text-slate-800">#1041 • T9</p>
                    <p className="text-[10px] text-slate-500 truncate">2x Dal Makhani, 1x Jeera Rice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
