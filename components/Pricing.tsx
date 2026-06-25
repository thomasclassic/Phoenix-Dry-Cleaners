import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

type PricingCategory = 'laundry' | 'household' | 'specialized';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<PricingCategory>('laundry');
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Converted from KES to USD (approx rate 1:130) based on the previously requested premium scale
  const laundryItems = [
    { name: 'Wash, Dry & Fold', price: '15.00', unit: 'per kg', detail: 'Premium eco-detergent included' },
    { name: 'Executive Suit (2-Piece)', price: '56.00', unit: 'per set', detail: 'Hand-finished, luxury hanger' },
    { name: 'Evening / Wedding Gown', price: '427.00', unit: 'starting from', detail: 'Intricate detail preservation' },
    { name: 'Silk Blouse / Shirt', price: '28.00', unit: 'per item', detail: 'Delicate fiber protection' },
    { name: 'Designer Handbag', price: '208.00', unit: 'per item', detail: 'Leather conditioning & restoration' },
    { name: 'Leather Jacket', price: '127.00', unit: 'per item', detail: 'Deep cleaning & buffing' },
  ];

  const householdItems = [
    { name: 'King Size Duvet', price: '74.00', unit: 'per item', detail: 'Antibacterial treatment' },
    { name: 'Area Rug / Carpet', price: '35.00', unit: 'per sq meter', detail: 'Industrial deep extraction' },
    { name: 'Curtain / Drapes', price: '22.00', unit: 'per panel', detail: 'Steam pressing on-site option' },
    { name: 'Bed Linen Set', price: '65.00', unit: 'per set', detail: 'Crisp hotel-grade finish' },
  ];

  const specializedItems = [
    { name: 'Full Home Fumigation', price: '554.00', unit: 'starting from', detail: '3-Bedroom premium package' },
    { name: 'Local Moving Service', price: '1,269.00', unit: 'starting from', detail: 'Full packing & insurance' },
    { name: 'Deep Home Cleaning', price: '346.00', unit: 'per session', detail: '8-hour intensive session' },
    { name: 'Global Parcel Delivery', price: '288.00', unit: 'up to 5kg', detail: 'Phoenix Express tracking' },
  ];

  const renderItems = (items: typeof laundryItems) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex justify-between items-center group cursor-default">
          <div className="flex-grow">
            <h4 className="text-xl font-black text-slate-900 group-hover:text-phoenix-accent transition-colors">{item.name}</h4>
            <p className="text-slate-500 text-sm font-medium mt-1">{item.detail}</p>
          </div>
          <div className="text-right shrink-0 ml-6">
            <div className="text-3xl font-black text-blue-900">
              <span className="text-xs font-bold text-slate-400 mr-1">$</span>
              {item.price}
            </div>
            <div className="text-[10px] uppercase tracking-widest font-black text-slate-400 mt-1">{item.unit}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const handleCheckout = async () => {
    setCheckoutError(null);
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const priceId = import.meta.env.VITE_STRIPE_PRICE_ID;

    if (!publishableKey || !priceId) {
      setCheckoutError('Stripe keys are not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY and VITE_STRIPE_PRICE_ID.');
      return;
    }

    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Unable to load Stripe');

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Checkout session creation failed');
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Stripe session did not return a redirect URL.');
      }
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/hero-glow.svg" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          alt="Luxury laundry"
        />
        <div className="relative z-10 text-center text-white px-4">
          <span className="text-phoenix-accent font-black uppercase tracking-[0.3em] text-xs mb-4 block">International Standards</span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">Global <span className="text-phoenix-accent">Rates.</span></h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-100 font-light">Transparent premium pricing in USD. Divided and optimized for our worldwide clientele.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {[
            { id: 'laundry', label: 'Garment Care', icon: '👔' },
            { id: 'household', label: 'Home Textiles', icon: '🏠' },
            { id: 'specialized', label: 'Logistics', icon: '🚛' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PricingCategory)}
              className={`px-10 py-5 rounded-full font-black text-lg transition-all flex items-center gap-4 shadow-sm border ${
                activeTab === tab.id 
                  ? 'bg-blue-900 text-white shadow-2xl border-blue-900 scale-110' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-100 hover:border-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-24">
          {activeTab === 'laundry' && renderItems(laundryItems)}
          {activeTab === 'household' && renderItems(householdItems)}
          {activeTab === 'specialized' && renderItems(specializedItems)}
        </div>

        <div className="bg-slate-900 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <img 
             src="/cleaning-machine.svg" 
             className="absolute inset-0 w-full h-full object-cover opacity-20 brightness-0"
             alt="Background pattern"
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight uppercase">The Phoenix <span className="text-phoenix-accent">Elite</span> Guarantee</h3>
              <p className="text-blue-100 text-xl mb-10 leading-relaxed font-light">
                Our rates reflect the mastery of our craftsmen and our global logistics reach. Every service is managed with surgical precision for the most discerning clients. 
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl border border-white/20 text-sm font-black uppercase tracking-widest">
                  Master Technicians
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl border border-white/20 text-sm font-black uppercase tracking-widest">
                  Global Insurance
                </div>
              </div>
            </div>
            <div className="bg-white p-12 rounded-[3rem] text-slate-900 shadow-2xl">
              <h4 className="text-2xl font-black mb-6 uppercase">Service Upgrades</h4>
              <ul className="space-y-6">
                {[
                  { label: "Express 24H Turnaround", cost: "+50%" },
                  { label: "VIP Concierge Handling", cost: "+25%" },
                  { label: "Extended Storage (30 days)", cost: "FREE" },
                  { label: "Minor Repairs & Alterations", cost: "INCLUDED" }
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className="font-bold text-slate-600">{item.label}</span>
                    <span className="font-black text-phoenix-accent">{item.cost}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-[3rem] p-14 max-w-4xl mx-auto shadow-2xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-6">Book Your Elite Service</h2>
        <p className="text-slate-600 mb-8">Click checkout to start a secure Stripe payment session for your selected premium service.</p>
        {checkoutError && <p className="mb-6 text-sm text-red-500 font-semibold">{checkoutError}</p>}
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-3 bg-phoenix-accent hover:bg-orange-600 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-2xl transition-all disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Redirecting…' : 'Checkout'}
        </button>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-600">
        <p className="text-lg font-medium">
          We appreciate you so much! If you have any enquiries, please email{' '}
          <a href="mailto:stevenalexander.cohen@mail.com" className="text-phoenix-accent font-black">stevenalexander.cohen@mail.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Pricing;
