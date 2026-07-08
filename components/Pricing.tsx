import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

type PricingCategory = 'laundry' | 'household' | 'specialized';

type Product = {
  id: string;
  name: string;
  price: string;
  unit: string;
  detail: string;
  description: string;
  features: string[];
  priceId: string;
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<PricingCategory>('laundry');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const laundryItems: Product[] = [
    {
      id: 'wash-dry-fold',
      name: 'Wash, Dry & Fold',
      price: '15.00',
      unit: 'per kg',
      detail: 'Premium eco-detergent included',
      description: 'Gentle, express wash and dry service with luxury scent and folded presentation.',
      features: ['Eco-friendly detergents', 'Express same-day service', 'Delicate handling'],
      priceId: 'price_1WashDryFold',
    },
    {
      id: 'executive-suit',
      name: 'Executive Suit (2-Piece)',
      price: '56.00',
      unit: 'per set',
      detail: 'Hand-finished, luxury hanger',
      description: 'Professional dry cleaning and finishing for two-piece executive suits.',
      features: ['Fine fabric care', 'Hand-brushed finish', 'Premium hanger presentation'],
      priceId: 'price_1ExecutiveSuit',
    },
    {
      id: 'wedding-gown',
      name: 'Evening / Wedding Gown',
      price: '427.00',
      unit: 'starting from',
      detail: 'Intricate detail preservation',
      description: 'Specialist care for gowns, evening wear and delicate bridal garments.',
      features: ['Bead and lace protection', 'Steam-press and preservation', 'Premium packaging'],
      priceId: 'price_1WeddingGown',
    },
    {
      id: 'silk-blouse',
      name: 'Silk Blouse / Shirt',
      price: '28.00',
      unit: 'per item',
      detail: 'Delicate fiber protection',
      description: 'Expert cleaning for delicate silk blouses and fine shirts.',
      features: ['Silk-safe solvents', 'Fine detail inspection', 'Soft-press finish'],
      priceId: 'price_1SilkBlouse',
    },
    {
      id: 'designer-handbag',
      name: 'Designer Handbag',
      price: '208.00',
      unit: 'per item',
      detail: 'Leather conditioning & restoration',
      description: 'Luxury leather and designer handbag cleaning with condition restoration.',
      features: ['Leather treatment', 'Stain removal', 'Odor neutralization'],
      priceId: 'price_1DesignerHandbag',
    },
    {
      id: 'leather-jacket',
      name: 'Leather Jacket',
      price: '127.00',
      unit: 'per item',
      detail: 'Deep cleaning & buffing',
      description: 'Specialized leather cleaning and buffing service for jackets and outerwear.',
      features: ['Leather-safe polish', 'Conditioning treatment', 'Soft lining care'],
      priceId: 'price_1LeatherJacket',
    },
  ];

  const householdItems: Product[] = [
    {
      id: 'king-size-duvet',
      name: 'King Size Duvet',
      price: '74.00',
      unit: 'per item',
      detail: 'Antibacterial treatment',
      description: 'Premium duvet cleaning with bacteria and allergen removal, delivered fresh.',
      features: ['Sanitizing wash', 'Odor elimination', 'Luxury soft finish'],
      priceId: 'price_1KingDuvet',
    },
    {
      id: 'area-rug',
      name: 'Area Rug / Carpet',
      price: '35.00',
      unit: 'per sq meter',
      detail: 'Industrial deep extraction',
      description: 'Deep-clean and restore area rugs and carpets with professional extraction.',
      features: ['Stain lifting', 'Fiber restoration', 'Fast drying'],
      priceId: 'price_1AreaRug',
    },
    {
      id: 'curtain-drapes',
      name: 'Curtain / Drapes',
      price: '22.00',
      unit: 'per panel',
      detail: 'Steam pressing on-site option',
      description: 'Expert curtain and drape cleaning with optional on-site steam pressing.',
      features: ['Steam press available', 'Dust removal', 'Color-safe cleaning'],
      priceId: 'price_1CurtainDrapes',
    },
    {
      id: 'bed-linen-set',
      name: 'Bed Linen Set',
      price: '65.00',
      unit: 'per set',
      detail: 'Crisp hotel-grade finish',
      description: 'Luxury bed linen cleaning with a crisp finish for sheets, pillowcases and duvet covers.',
      features: ['Hotel-style press', 'Fragrance finish', 'Sanitized clean'],
      priceId: 'price_1BedLinen',
    },
  ];

  const specializedItems: Product[] = [
    {
      id: 'home-fumigation',
      name: 'Full Home Fumigation',
      price: '554.00',
      unit: 'starting from',
      detail: '3-Bedroom premium package',
      description: 'Complete home fumigation with premium service for three-bedroom residences.',
      features: ['Pest-free guarantee', 'Eco-safe treatment', 'Full inspection'],
      priceId: 'price_1HomeFumigation',
    },
    {
      id: 'local-moving',
      name: 'Local Moving Service',
      price: '1,269.00',
      unit: 'starting from',
      detail: 'Full packing & insurance',
      description: 'White-glove local moving with packing, protection and insured transit.',
      features: ['Full packing service', 'Insurance included', 'Door-to-door shipping'],
      priceId: 'price_1LocalMoving',
    },
    {
      id: 'deep-home-cleaning',
      name: 'Deep Home Cleaning',
      price: '346.00',
      unit: 'per session',
      detail: '8-hour intensive session',
      description: 'Intensive home cleaning for kitchens, bathrooms and living areas.',
      features: ['Deep sanitation', 'Detailed attention', 'Premium products'],
      priceId: 'price_1DeepHomeCleaning',
    },
    {
      id: 'parcel-delivery',
      name: 'Global Parcel Delivery',
      price: '288.00',
      unit: 'up to 5kg',
      detail: 'Phoenix Express tracking',
      description: 'Express parcel service with tracking and secure global delivery.',
      features: ['Doorstep pickup', 'Real-time tracking', 'Fast customs clearance'],
      priceId: 'price_1ParcelDelivery',
    },
  ];

  const productsByCategory = {
    laundry: laundryItems,
    household: householdItems,
    specialized: specializedItems,
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCheckoutError(null);
  };

  const handleCheckout = async () => {
    setCheckoutError(null);
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const priceId = selectedProduct?.priceId;

    if (!publishableKey || !priceId) {
      setCheckoutError(selectedProduct ? 'Stripe publishable key is not configured.' : 'Please select a product to checkout.');
      return;
    }

    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Unable to load Stripe');

      const candidateUrls = import.meta.env.DEV
        ? ['/api/create-checkout-session', '/create-checkout-session']
        : [`${window.location.origin}/api/create-checkout-session`];

      let response: Response | null = null;
      let text = '';

      for (const url of candidateUrls) {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ priceId }),
        });

        text = await response.text();
        if (response.ok || response.status !== 404) {
          break;
        }
      }

      if (!response) {
        throw new Error('Checkout endpoint could not be reached.');
      }

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`API returned non-JSON response: ${text.slice(0, 240)}`);
      }

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

  const renderItems = (items: Product[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {items.map((item) => (
        <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer" onClick={() => handleProductSelect(item)}>
          <div className="flex justify-between items-start gap-6">
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
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-black">Click to view details</span>
            <button type="button" className="py-3 px-5 rounded-full bg-blue-900 text-white text-sm font-black uppercase tracking-[0.2em] shadow-lg hover:bg-blue-800 transition" onClick={(event) => { event.stopPropagation(); handleProductSelect(item); }}>
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );

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
              onClick={() => {
                setActiveTab(tab.id as PricingCategory);
                setSelectedProduct(null);
              }}
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

        {selectedProduct && (
          <div className="mb-16 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="bg-slate-950 p-12 lg:p-16 text-white flex flex-col justify-between">
                <div>
                  <span className="uppercase tracking-[0.3em] text-sm text-phoenix-accent font-black">Selected Service</span>
                  <h2 className="mt-6 text-4xl font-black leading-tight">{selectedProduct.name}</h2>
                  <p className="mt-4 text-slate-300 text-sm leading-7">{selectedProduct.detail}</p>
                </div>
                <div className="mt-10">
                  <div className="text-5xl font-black text-white">
                    <span className="text-xl font-bold text-slate-400 mr-2">$</span>{selectedProduct.price}
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-500 mt-2">{selectedProduct.unit}</div>
                </div>
              </div>
              <div className="p-12 lg:p-16 lg:col-span-2">
                <div className="flex items-center justify-between gap-4 mb-10">
                  <h3 className="text-3xl font-black text-slate-900">Product Overview</h3>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="text-sm uppercase tracking-[0.3em] font-black text-blue-900 hover:text-blue-700"
                  >
                    Back to catalogue
                  </button>
                </div>
                <p className="text-slate-600 leading-relaxed mb-8">{selectedProduct.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {selectedProduct.features.map((feature, idx) => (
                    <div key={idx} className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                      <p className="font-black text-slate-900">{feature}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-3 bg-phoenix-accent hover:bg-orange-600 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-2xl transition-all disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? 'Redirecting…' : `Checkout ${selectedProduct.name}`}
                </button>
                {checkoutError && <p className="mt-6 text-sm text-red-500 font-semibold">{checkoutError}</p>}
              </div>
            </div>
          </div>
        )}

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
          {isLoading ? 'Redirecting…' : selectedProduct ? `Checkout ${selectedProduct.name}` : 'Select a product to checkout'}
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
