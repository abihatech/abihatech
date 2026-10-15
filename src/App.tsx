import React, { useState } from 'react';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_ORDERS,
  MenuItem,
  Order
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { VendorDashboardSection } from './components/VendorDashboardSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { PaymentsAndReceiptsSection } from './components/PaymentsAndReceiptsSection';
import { FeaturesGridSection } from './components/FeaturesGridSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { MainFooter } from './components/MainFooter';
import { ReceiptModal } from './components/ReceiptModal';
import { DemoModal } from './components/DemoModal';
import { CustomerOrderModal } from './components/CustomerOrderModal';
import { FullDashboardView } from './components/FullDashboardView';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'vendor' | 'customer'>('landing');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoPlan, setDemoPlan] = useState<string>('Growth Plan (₹2,499/mo)');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);

  // Toggle dish availability in live menu
  const handleToggleAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
  };

  // Kitchen status pipeline advancement
  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const nextStatusMap: { [key: string]: 'Preparing' | 'Ready' | 'Served' } = {
          New: 'Preparing',
          Preparing: 'Ready',
          Ready: 'Served',
          Served: 'Served'
        };
        return {
          ...ord,
          status: nextStatusMap[ord.status] || ord.status
        };
      })
    );
  };

  // Placing an order from customer table simulation
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Open receipt by order number
  const handleOpenReceiptByNumber = (orderNumber: string) => {
    const matched = orders.find((o) => o.orderNumber === orderNumber) || orders[1] || orders[0];
    setReceiptOrder(matched);
  };

  const handleOpenDemoWithPlan = (planName?: string) => {
    if (planName) setDemoPlan(planName);
    setIsDemoOpen(true);
  };

  const handleOpenWhatsApp = () => {
    window.open('https://wa.me/917259718100?text=Hi%20MenuPilot%20team,%20I%20would%20like%20to%20digitise%20my%20restaurant%20tables.', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-slate-900 selection:bg-[#D9531E] selection:text-white font-sans">
      {/* Top Navigation & Screen Switcher */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenDemo={() => handleOpenDemoWithPlan()}
        onOpenVendorLogin={() => setCurrentView('vendor')}
      />

      {/* VIEW 1: FULL OPERATIONAL VENDOR DASHBOARD */}
      {currentView === 'vendor' ? (
        <FullDashboardView
          orders={orders}
          menuItems={menuItems}
          onToggleAvailability={handleToggleAvailability}
          onAdvanceOrderStatus={handleAdvanceOrderStatus}
          onSelectOrder={(ord) => setReceiptOrder(ord)}
          onOpenCustomerApp={() => setIsCustomerModalOpen(true)}
          onBackToLanding={() => setCurrentView('landing')}
        />
      ) : currentView === 'customer' ? (
        /* VIEW 2: DEDICATED CUSTOMER MOBILE SCREEN */
        <div className="py-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] bg-slate-900">
          <div className="text-center mb-6 text-white max-w-md">
            <span className="text-xs uppercase font-bold text-[#D9531E] tracking-wider">Live Customer Simulator</span>
            <h2 className="text-2xl font-bold mt-1">Scan Table QR Experience</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select items, pay with UPI, and watch the order appear in the Kitchen Kanban!
            </p>
          </div>
          <button
            onClick={() => setIsCustomerModalOpen(true)}
            className="px-6 py-3 bg-[#D9531E] hover:bg-[#C24513] text-white rounded-full font-bold text-sm shadow-xl transition"
          >
            Open Interactive Table Phone
          </button>
        </div>
      ) : (
        /* VIEW 3: PRISTINE LANDING PAGE MATCHING IMAGE 1.PNG EXACTLY */
        <main>
          {/* 1. Hero Section with Interactive Table Phone & Overlaid WhatsApp Receipt */}
          <HeroSection
            onOpenDemo={() => handleOpenDemoWithPlan()}
            onOpenCustomerApp={() => setIsCustomerModalOpen(true)}
            onOpenReceipt={handleOpenReceiptByNumber}
            menuItems={menuItems}
          />

          {/* 2. The Problem Section */}
          <ProblemSection />

          {/* 3. How It Works Section */}
          <HowItWorksSection
            onOpenCustomerApp={() => setIsCustomerModalOpen(true)}
            onOpenReceipt={() => handleOpenReceiptByNumber('#1042')}
          />

          {/* 4. Your Vendor Dashboard Section */}
          <VendorDashboardSection
            orders={orders}
            menuItems={menuItems}
            onToggleAvailability={handleToggleAvailability}
            onAdvanceOrderStatus={handleAdvanceOrderStatus}
            onSelectOrder={(ord) => setReceiptOrder(ord)}
            onOpenFullDashboard={() => setCurrentView('vendor')}
          />

          {/* 5. Analytics Section with 7-Day Chart */}
          <AnalyticsSection />

          {/* 6. Payments & WhatsApp Receipts */}
          <PaymentsAndReceiptsSection
            onOpenReceipt={handleOpenReceiptByNumber}
          />

          {/* 7. Everything Included Features Grid */}
          <FeaturesGridSection />

          {/* 8. Pricing Section */}
          <PricingSection
            onSelectPlan={(plan) => handleOpenDemoWithPlan(plan)}
          />

          {/* 9. FAQ Section with Expandable Accordion */}
          <FAQSection />

          {/* 10. Call to Action Banner */}
          <CallToActionBanner
            onOpenDemo={() => handleOpenDemoWithPlan()}
            onOpenWhatsApp={handleOpenWhatsApp}
          />

          {/* 11. Main Footer */}
          <MainFooter onOpenDemo={() => handleOpenDemoWithPlan()} />
        </main>
      )}

      {/* MODALS */}
      {/* WhatsApp / Tax Receipt Modal */}
      <ReceiptModal
        order={receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />

      {/* Live Demo Booking Modal */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        defaultPlan={demoPlan}
      />

      {/* Interactive Mobile Ordering Phone Modal */}
      <CustomerOrderModal
        isOpen={isCustomerModalOpen || currentView === 'customer'}
        onClose={() => {
          setIsCustomerModalOpen(false);
          if (currentView === 'customer') setCurrentView('landing');
        }}
        menuItems={menuItems}
        onOrderPlaced={handleOrderPlaced}
        onViewReceipt={(ord) => setReceiptOrder(ord)}
      />
    </div>
  );
}
