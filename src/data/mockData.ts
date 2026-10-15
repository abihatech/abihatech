export interface MenuItem {
  id: string;
  name: string;
  category: 'Starters' | 'Breads' | 'Mains' | 'Drinks' | 'Desserts';
  price: number;
  unit: string;
  isVeg: boolean;
  available: boolean;
  description: string;
}

export interface OrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  table: string;
  amount: number;
  paymentMethod: 'UPI' | 'Card' | 'Cash';
  paymentStatus: 'Paid' | 'Pending';
  status: 'New' | 'Preparing' | 'Ready' | 'Served';
  items: OrderItem[];
  time: string;
  guestPhone?: string;
}

export interface DailyMetric {
  day: string;
  date: string;
  revenue: number;
  orders: number;
  avgOrder: number;
}

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 290,
    unit: 'pc',
    isVeg: true,
    available: true,
    description: 'Charcoal grilled cottage cheese marinated in spiced yogurt and kasoori methi.'
  },
  {
    id: 'item-2',
    name: 'Hara Bhara Kebab',
    category: 'Starters',
    price: 240,
    unit: 'portion (6 pcs)',
    isVeg: true,
    available: true,
    description: 'Crispy spinach and green pea patties subtly flavored with aromatic spices.'
  },
  {
    id: 'item-3',
    name: 'Chilli Mushroom',
    category: 'Starters',
    price: 260,
    unit: 'portion',
    isVeg: true,
    available: false, // sold out as in mockup
    description: 'Wok tossed button mushrooms with crisp bell peppers, garlic and spring onions.'
  },
  {
    id: 'item-4',
    name: 'Butter Naan',
    category: 'Breads',
    price: 50,
    unit: 'pc',
    isVeg: true,
    available: true,
    description: 'Clay-oven baked refined flour bread brushed with fresh butter.'
  },
  {
    id: 'item-5',
    name: 'Garlic Roti',
    category: 'Breads',
    price: 45,
    unit: 'pc',
    isVeg: true,
    available: true,
    description: 'Whole wheat flatbread infused with roasted garlic flakes.'
  },
  {
    id: 'item-6',
    name: 'Dal Makhani',
    category: 'Mains',
    price: 310,
    unit: 'bowl',
    isVeg: true,
    available: true,
    description: 'Slow-cooked black lentils simmered overnight with tomatoes, butter and fresh cream.'
  },
  {
    id: 'item-7',
    name: 'Veg Dum Biryani',
    category: 'Mains',
    price: 340,
    unit: 'handi',
    isVeg: true,
    available: true,
    description: 'Fragrant basmati rice layered with garden vegetables and saffron-infused dum gravy.'
  },
  {
    id: 'item-8',
    name: 'Masala Chai',
    category: 'Drinks',
    price: 40,
    unit: 'cup',
    isVeg: true,
    available: true,
    description: 'Freshly brewed Assam tea spiced with crushed ginger, green cardamom and cloves.'
  },
  {
    id: 'item-9',
    name: 'Sweet Lassi',
    category: 'Drinks',
    price: 90,
    unit: 'glass',
    isVeg: true,
    available: true,
    description: 'Traditional Punjabi churned curd sweetened with rose water and crushed pistachios.'
  },
  {
    id: 'item-10',
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 80,
    unit: 'portion (2 pcs)',
    isVeg: true,
    available: true,
    description: 'Warm golden milk dumplings soaked in cardamom sugar syrup.'
  },
  {
    id: 'item-11',
    name: 'Kesar Rasmalai',
    category: 'Desserts',
    price: 110,
    unit: 'portion (2 pcs)',
    isVeg: true,
    available: true,
    description: 'Soft cottage cheese patties immersed in chilled saffron milk with almonds.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1043',
    orderNumber: '#1043',
    table: 'T6',
    amount: 520,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'New',
    time: '2 mins ago',
    items: [
      { itemId: 'item-7', name: 'Veg Dum Biryani', price: 340, quantity: 1 },
      { itemId: 'item-9', name: 'Sweet Lassi', price: 90, quantity: 2 }
    ],
    guestPhone: '+91 98765 43210'
  },
  {
    id: 'ord-1042',
    orderNumber: '#1042',
    table: 'T4',
    amount: 420,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Preparing',
    time: '6 mins ago',
    items: [
      { itemId: 'item-1', name: 'Paneer Tikka', price: 290, quantity: 1 },
      { itemId: 'item-4', name: 'Butter Naan', price: 50, quantity: 2 },
      { itemId: 'item-8', name: 'Masala Chai', price: 40, quantity: 1 }
    ],
    guestPhone: '+91 98201 54321'
  },
  {
    id: 'ord-1041',
    orderNumber: '#1041',
    table: 'T9',
    amount: 1285,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    status: 'Ready',
    time: '14 mins ago',
    items: [
      { itemId: 'item-6', name: 'Dal Makhani', price: 310, quantity: 2 },
      { itemId: 'item-4', name: 'Butter Naan', price: 50, quantity: 4 },
      { itemId: 'item-7', name: 'Veg Dum Biryani', price: 340, quantity: 1 },
      { itemId: 'item-10', name: 'Gulab Jamun', price: 80, quantity: 2 }
    ],
    guestPhone: '+91 99100 88234'
  },
  {
    id: 'ord-1040',
    orderNumber: '#1040',
    table: 'T2',
    amount: 590,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Served',
    time: '26 mins ago',
    items: [
      { itemId: 'item-1', name: 'Paneer Tikka', price: 290, quantity: 1 },
      { itemId: 'item-2', name: 'Hara Bhara Kebab', price: 240, quantity: 1 },
      { itemId: 'item-5', name: 'Garlic Roti', price: 45, quantity: 2 }
    ],
    guestPhone: '+91 97112 34567'
  },
  {
    id: 'ord-1039',
    orderNumber: '#1039',
    table: 'T7',
    amount: 910,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Served',
    time: '42 mins ago',
    items: [
      { itemId: 'item-6', name: 'Dal Makhani', price: 310, quantity: 1 },
      { itemId: 'item-7', name: 'Veg Dum Biryani', price: 340, quantity: 1 },
      { itemId: 'item-4', name: 'Butter Naan', price: 50, quantity: 3 },
      { itemId: 'item-10', name: 'Gulab Jamun', price: 80, quantity: 1 }
    ],
    guestPhone: '+91 94451 98765'
  }
];

export const DAILY_ANALYTICS: DailyMetric[] = [
  { day: 'Mon', date: 'Oct 8', revenue: 4200, orders: 26, avgOrder: 161 },
  { day: 'Tue', date: 'Oct 9', revenue: 3850, orders: 24, avgOrder: 160 },
  { day: 'Wed', date: 'Oct 10', revenue: 5120, orders: 31, avgOrder: 165 },
  { day: 'Thu', date: 'Oct 11', revenue: 4400, orders: 27, avgOrder: 163 },
  { day: 'Fri', date: 'Oct 12', revenue: 6980, orders: 42, avgOrder: 166 },
  { day: 'Sat', date: 'Oct 13', revenue: 9850, orders: 58, avgOrder: 170 },
  { day: 'Sun', date: 'Oct 14', revenue: 7460, orders: 45, avgOrder: 165 }
];

export const RESTAURANT_INFO = {
  name: 'Rasoi Ghar',
  tagline: 'Authentic Indian Cuisine & Tandoor',
  address: 'Shop 14, High Street Avenue, Indiranagar, Bengaluru, 560038',
  gstin: '29AABCR1234F1Z8',
  fssai: '11223334000891',
  phone: '+91 72597 18100',
  whatsapp: '+91 72597 18100',
  email: 'hello@menupilot.com',
  totalTables: 12
};

export const FAQ_DATA = [
  {
    q: 'Do my customers need to download an app?',
    a: "No app download is needed. Guests simply scan the QR code using their regular phone camera or Google Lens, and the entire menu and payment flow loads instantly inside their mobile browser."
  },
  {
    q: 'Where does the payment money go?',
    a: "Money goes directly into your restaurant's bank account via your connected payment gateway (like Razorpay or Cashfree). MenuPilot does not hold or pool your revenue."
  },
  {
    q: 'Does MenuPilot take a commission on orders?',
    a: "Zero commission! We only charge a fixed, transparent monthly subscription. You only pay standard gateway processing fees directly to Razorpay/Cashfree."
  },
  {
    q: 'How do customers get their receipt?',
    a: "Receipts are sent automatically via the official WhatsApp Business API immediately after a successful checkout. Guests receive a clean, branded PDF receipt right on their phones."
  },
  {
    q: 'Can I manage more than one branch?',
    a: "Yes, our Growth and Enterprise plans allow multi-outlet support, letting you switch between different restaurant locations with a single manager login."
  },
  {
    q: 'How long does setup take?',
    a: "Most restaurants are fully up and running within 20 to 30 minutes. You can import your menu items, set your prices, and print table QR codes immediately."
  }
];
