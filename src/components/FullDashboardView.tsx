import React, { useState } from 'react';
import {
  MenuItem,
  Order,
  RESTAURANT_INFO,
  DAILY_ANALYTICS
} from '../data/mockData';
import {
  LayoutDashboard,
  UtensilsCrossed,
  QrCode,
  CreditCard,
  BarChart3,
  Users,
  Bell,
  Search,
  Plus,
  Printer,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  ExternalLink,
  ChefHat,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

interface FullDashboardViewProps {
  orders: Order[];
  menuItems: MenuItem[];
  onToggleAvailability: (itemId: string) => void;
  onAdvanceOrderStatus: (orderId: string) => void;
  onSelectOrder: (order: Order) => void;
  onOpenCustomerApp: () => void;
  onBackToLanding: () => void;
}

export const FullDashboardView: React.FC<FullDashboardViewProps> = ({
  orders,
  menuItems,
  onToggleAvailability,
  onAdvanceOrderStatus,
  onSelectOrder,
  onOpenCustomerApp,
  onBackToLanding
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'live-orders' | 'menu' | 'tables' | 'payments' | 'analytics' | 'staff'
  >('overview');
  const [selectedTableQr, setSelectedTableQr] = useState<number | null>(4);
  const [searchTerm, setSearchTerm] = useState('');

  // Derived stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.amount : 0), 6240);
  const totalOrders = 38 + orders.length - 5;
  const avgOrder = Math.round(totalRevenue / (totalOrders || 1));
  const newOrders = orders.filter((o) => o.status === 'New');
  const preparingOrders = orders.filter((o) => o.status === 'Preparing');
  const readyOrders = orders.filter((o) => o.status === 'Ready');
  const servedOrders = orders.filter((o) => o.status === 'Served');

  return (
    <div className="min-h-screen bg-[#F4F2ED] text-slate-900 flex flex-col font-sans">
      {/* Top System Bar */}
      <div className="bg-[#16191D] text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#D9531E] flex items-center justify-center font-bold text-white shadow-xs">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">{RESTAURANT_INFO.name}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                Dine-in Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Indiranagar, Bengaluru • POS Terminal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCustomerApp}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Table QR Menu</span>
          </button>
          <button
            onClick={onBackToLanding}
            className="px-3 py-1.5 bg-[#D9531E] hover:bg-[#C24513] text-white rounded-lg text-xs font-medium transition"
          >
            Return to Website
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-[#1A1D21] text-slate-400 p-4 border-r border-slate-800 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">
              Navigation
            </div>
            <nav className="space-y-1 text-xs font-medium">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'live-orders', label: 'Live orders', icon: ChefHat, badge: newOrders.length },
                { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
                { id: 'tables', label: 'Tables & QR', icon: QrCode },
                { id: 'payments', label: 'Payments', icon: CreditCard },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'staff', label: 'Staff', icon: Users }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition ${
                      isActive
                        ? 'bg-[#D9531E] text-white font-semibold shadow-xs'
                        : 'hover:text-white hover:bg-white/5 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="w-4 h-4 rounded-full bg-white text-[#D9531E] font-bold text-[10px] flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Direct Gateway</p>
            <p>Razorpay India Active</p>
            <p className="text-[10px] text-emerald-400">Zero commission active</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Top Greeting */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Good evening, Ramesh
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live operational overview for {RESTAURANT_INFO.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
                    Tables: 7 of 12 Seated
                  </span>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">Today's revenue</span>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    ↑ +14.2% from yesterday
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">Orders completed</span>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">{totalOrders}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Direct via table QR</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">Average order value</span>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">₹{avgOrder}</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">₹34 higher than verbal orders</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">Active dine-in tables</span>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">7 / 12</p>
                  <p className="text-[11px] text-slate-500 mt-1">Avg turnaround: 36 mins</p>
                </div>
              </div>

              {/* Recent Orders & Top Items */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                      Recent Orders
                    </h3>
                    <span className="text-xs text-slate-400">Click any order to view tax receipt</span>
                  </div>

                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-100 pb-2">
                          <th className="font-semibold pb-2">Order</th>
                          <th className="font-semibold pb-2">Table</th>
                          <th className="font-semibold pb-2">Amount</th>
                          <th className="font-semibold pb-2">Payment</th>
                          <th className="font-semibold pb-2">Time</th>
                          <th className="font-semibold pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map((ord) => (
                          <tr
                            key={ord.id}
                            onClick={() => onSelectOrder(ord)}
                            className="hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <td className="py-3 font-bold text-slate-900">{ord.orderNumber}</td>
                            <td className="text-slate-600 font-semibold">{ord.table}</td>
                            <td className="text-slate-900 font-semibold tabular-nums">₹{ord.amount}</td>
                            <td className="text-slate-600">{ord.paymentMethod} • {ord.paymentStatus}</td>
                            <td className="text-slate-400">{ord.time}</td>
                            <td>
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
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

                <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4">
                    Top items today
                  </h3>
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Paneer Tikka</span>
                        <span className="font-bold text-slate-900">14 orders</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#D9531E] h-full rounded-full w-[85%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Butter Naan</span>
                        <span className="font-bold text-slate-900">11 orders</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#D9531E] h-full rounded-full w-[65%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Masala Chai</span>
                        <span className="font-bold text-slate-900">9 orders</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#D9531E] h-full rounded-full w-[50%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Gulab Jamun</span>
                        <span className="font-bold text-slate-900">6 orders</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#D9531E] h-full rounded-full w-[35%]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                    <p className="font-semibold text-slate-800">Upsell Recommendation</p>
                    <p className="mt-0.5">Guests adding Paneer Tikka ordered Butter Naan 78% of the time.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE KITCHEN PIPELINE */}
          {activeTab === 'live-orders' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Live Kitchen Pipeline (KOT)</h2>
                  <p className="text-xs text-slate-500">Orders appear here in real time as guests pay at the table.</p>
                </div>
                <button
                  onClick={onOpenCustomerApp}
                  className="px-4 py-2 bg-[#D9531E] hover:bg-[#C24513] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition self-start"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simulate Table Order</span>
                </button>
              </div>

              {/* 4 Pipeline Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* 1: New */}
                <div className="bg-slate-100/80 p-3 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-800 pb-2 border-b border-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span> New Orders
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-[11px]">
                      {newOrders.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {newOrders.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 py-6">No new incoming orders</p>
                    ) : (
                      newOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-[#D9531E] transition space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-slate-900 text-xs">{ord.orderNumber} • Table {ord.table}</p>
                              <p className="text-[10px] text-slate-400">{ord.time}</p>
                            </div>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                              Paid UPI
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-700 divide-y divide-slate-100">
                            {ord.items.map((it, i) => (
                              <div key={i} className="py-1 flex justify-between font-medium">
                                <span>{it.quantity}x {it.name}</span>
                                <span className="text-slate-400">₹{it.price * it.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => onAdvanceOrderStatus(ord.id)}
                            className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                          >
                            <span>Accept & Cook</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 2: Preparing */}
                <div className="bg-slate-100/80 p-3 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-800 pb-2 border-b border-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span> Preparing
                    </span>
                    <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[11px]">
                      {preparingOrders.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {preparingOrders.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 py-6">Kitchen is clear</p>
                    ) : (
                      preparingOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-slate-900 text-xs">{ord.orderNumber} • Table {ord.table}</p>
                              <p className="text-[10px] text-amber-600 font-medium">On Tandoor / Burner</p>
                            </div>
                            <button
                              onClick={() => onSelectOrder(ord)}
                              className="text-[10px] text-slate-400 hover:text-slate-800"
                            >
                              Receipt ↗
                            </button>
                          </div>
                          <div className="text-[11px] text-slate-700 divide-y divide-slate-100">
                            {ord.items.map((it, i) => (
                              <div key={i} className="py-1 flex justify-between font-medium">
                                <span>{it.quantity}x {it.name}</span>
                                <span className="text-slate-400">₹{it.price * it.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => onAdvanceOrderStatus(ord.id)}
                            className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                          >
                            <span>Mark Ready to Serve</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 3: Ready */}
                <div className="bg-slate-100/80 p-3 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-800 pb-2 border-b border-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> Ready to Serve
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[11px]">
                      {readyOrders.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {readyOrders.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 py-6">No plates waiting on counter</p>
                    ) : (
                      readyOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-slate-900 text-xs">{ord.orderNumber} • Table {ord.table}</p>
                              <p className="text-[10px] text-blue-600 font-medium">Plated & Ready</p>
                            </div>
                            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded">
                              Pass to Waiter
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-700 divide-y divide-slate-100">
                            {ord.items.map((it, i) => (
                              <div key={i} className="py-1 flex justify-between font-medium">
                                <span>{it.quantity}x {it.name}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => onAdvanceOrderStatus(ord.id)}
                            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                          >
                            <span>Delivered to Table ✓</span>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 4: Served */}
                <div className="bg-slate-100/80 p-3 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-800 pb-2 border-b border-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-500"></span> Served & Closed
                    </span>
                    <span className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                      {servedOrders.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {servedOrders.slice(0, 3).map((ord) => (
                      <div
                        key={ord.id}
                        onClick={() => onSelectOrder(ord)}
                        className="p-3 bg-white/70 hover:bg-white rounded-xl border border-slate-200 shadow-2xs cursor-pointer transition text-xs"
                      >
                        <div className="flex justify-between font-semibold text-slate-700">
                          <span>{ord.orderNumber} • Table {ord.table}</span>
                          <span className="text-emerald-700">₹{ord.amount}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Receipt sent on WhatsApp</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MENU MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Live Menu Management</h2>
                  <p className="text-xs text-slate-500">Toggle availability instantly when dishes sell out during rush hour.</p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search menu dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <th className="p-3.5 font-semibold">Dish Name</th>
                        <th className="p-3.5 font-semibold">Category</th>
                        <th className="p-3.5 font-semibold">Price</th>
                        <th className="p-3.5 font-semibold">Portion</th>
                        <th className="p-3.5 font-semibold">Diet</th>
                        <th className="p-3.5 font-semibold text-right">Availability Toggle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {menuItems
                        .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/70 transition">
                            <td className="p-3.5">
                              <span className="font-bold text-slate-900 block">{item.name}</span>
                              <span className="text-[11px] text-slate-400">{item.description}</span>
                            </td>
                            <td className="p-3.5 font-medium text-slate-600">{item.category}</td>
                            <td className="p-3.5 font-bold text-slate-900 tabular-nums">₹{item.price}</td>
                            <td className="p-3.5 text-slate-500">{item.unit}</td>
                            <td className="p-3.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Veg
                              </span>
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => onToggleAvailability(item.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5 ${
                                  item.available
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                }`}
                              >
                                {item.available ? 'In Stock (Live)' : 'Sold Out (Hidden)'}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TABLES & QR CODE GENERATOR */}
          {activeTab === 'tables' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Tables &amp; QR Standees</h2>
                  <p className="text-xs text-slate-500">Each table has a dedicated QR code linking directly to its digital bill.</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print All Standees</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 12 Tables Grid */}
                <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((t) => {
                    const isSelected = selectedTableQr === t;
                    const isOccupied = [2, 4, 6, 7, 9].includes(t);
                    return (
                      <div
                        key={t}
                        onClick={() => setSelectedTableQr(t)}
                        className={`p-4 bg-white rounded-2xl border text-center cursor-pointer transition hover:scale-[1.02] ${
                          isSelected ? 'border-[#D9531E] ring-2 ring-[#D9531E]/20' : 'border-slate-200'
                        }`}
                      >
                        <div className="w-12 h-12 mx-auto rounded-xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center mb-2">
                          T{t}
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs">Table {t}</h4>
                        <span
                          className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded ${
                            isOccupied ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {isOccupied ? 'Guests Seated' : 'Available'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Printable Standee Preview Card */}
                <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9531E]">
                    Table Standee Preview
                  </span>
                  <div className="p-6 bg-[#0E1012] text-white rounded-2xl space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#D9531E] flex items-center justify-center font-bold text-white text-xs">
                        M
                      </div>
                      <span className="font-bold text-sm tracking-tight">{RESTAURANT_INFO.name}</span>
                    </div>

                    <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl flex flex-col items-center justify-center">
                      {/* Stylized QR Code Graphic */}
                      <div className="w-full h-full bg-slate-900 rounded p-1 flex items-center justify-center relative">
                        <div className="grid grid-cols-4 gap-1 w-full h-full p-2 bg-white rounded">
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-transparent"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-transparent"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-transparent"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-transparent"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-black rounded-xs"></div>
                          <div className="bg-transparent"></div>
                          <div className="bg-black rounded-xs"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-[#D9531E] text-white font-bold text-[10px] px-1.5 py-0.5 rounded">
                            T{selectedTableQr}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-extrabold text-base">SCAN TO ORDER &amp; PAY</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Table #{selectedTableQr} • No app required</p>
                    </div>

                    <p className="text-[10px] text-slate-500">
                      Receipt lands automatically on your WhatsApp
                    </p>
                  </div>

                  <button
                    onClick={() => alert(`Table ${selectedTableQr} QR code downloaded!`)}
                    className="w-full py-2.5 bg-[#D9531E] hover:bg-[#C24513] text-white rounded-xl text-xs font-bold transition"
                  >
                    Download Standee Graphic (Table {selectedTableQr})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Direct-to-Bank Payments</h2>
                <p className="text-xs text-slate-500">Zero commission. Money flows directly from guests to your merchant account.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Gateway Provider</span>
                  <p className="text-lg font-bold text-slate-900">Razorpay India</p>
                  <p className="text-xs text-emerald-600 font-medium">● Connected &amp; Verified</p>
                  <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    Merchant ID: MID_RASOI_48291
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Settlement Bank</span>
                  <p className="text-lg font-bold text-slate-900">HDFC Bank Indiranagar</p>
                  <p className="text-xs text-slate-600 font-medium">A/C: •••••••• 4920</p>
                  <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    Cycle: Daily T+1 direct credit
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase">MenuPilot Monthly Cut</span>
                  <p className="text-lg font-bold text-emerald-600">0% Commission</p>
                  <p className="text-xs text-slate-600 font-medium">Flat ₹2,499/mo Growth Plan</p>
                  <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    You saved ₹42,100 vs aggregators
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Restaurant Analytics &amp; Trends</h2>
                <p className="text-xs text-slate-500">Understand your rush hours, best dishes, and guest turnover.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">7-Day Revenue Trend (₹41,860 Total)</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    +18.4% WoW Growth
                  </span>
                </div>

                <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-slate-200">
                  {DAILY_ANALYTICS.map((item) => (
                    <div key={item.day} className="w-full flex flex-col items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-700">₹{item.revenue}</span>
                      <div
                        style={{ height: `${(item.revenue / 10000) * 120}px` }}
                        className="w-full bg-[#D9531E] rounded-t-md hover:opacity-90 transition"
                      ></div>
                      <span className="text-xs font-semibold text-slate-600">{item.day}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-slate-500">Peak Dine-In Hours</p>
                    <p className="text-base font-bold text-slate-900 mt-0.5">8:30 PM - 10:15 PM</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-slate-500">Average Table Turn Time</p>
                    <p className="text-base font-bold text-slate-900 mt-0.5">34 Minutes</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-slate-500">WhatsApp Receipt Open Rate</p>
                    <p className="text-base font-bold text-emerald-600 mt-0.5">99.2%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: STAFF */}
          {activeTab === 'staff' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Staff Roles &amp; Permissions</h2>
                <p className="text-xs text-slate-500">Manage permissions for kitchen staff, cashiers and managers.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Ramesh Kumar</p>
                      <p className="text-slate-500">Owner &amp; Super Admin</p>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-semibold">
                      Full Access
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Chef Sunil</p>
                      <p className="text-slate-500">Kitchen Display / KOT</p>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-[10px] font-semibold">
                      Kitchen Only
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Pooja Sharma</p>
                      <p className="text-slate-500">Floor Manager</p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-[10px] font-semibold">
                      Tables &amp; Orders
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
