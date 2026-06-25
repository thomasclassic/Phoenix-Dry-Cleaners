
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import Services from './components/Services';
import Pricing from './components/Pricing';
import BookingForm from './components/BookingForm';
import AboutView from './components/AboutView';
import Footer from './components/Footer';

export type PageView = 
  | 'home' 
  | 'services' 
  | 'pricing' 
  | 'about' 
  | 'book' 
  | 'success' 
  | 'privacy' 
  | 'terms'
  | 'service-dry-cleaning'
  | 'service-home-cleaning'
  | 'service-relocation'
  | 'service-deliveries';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>('home');
  const DOMAIN = "https://phoenixdrycleaners.vercel.app";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // SEO Data Configuration
    const seoData: Record<PageView, { title: string; description: string; image: string }> = {
      home: {
        title: "Phoenix Dry Cleaners | World-Class Garment & Home Care",
        description: "Premium laundry, dry cleaning, and home services. Phoenix Global offers white-glove treatment for your wardrobe and assets.",
        image: "/hero-glow.svg"
      },
      services: {
        title: "Signature Services | Phoenix Dry Cleaners Portfolio",
        description: "Explore our portfolio of elite services: Executive dry cleaning, deep home sanitation, advanced fumigation, and global logistics.",
        image: "/home-clean-1.svg"
      },
      pricing: {
        title: "Global Pricing | Transparent Premium Rates",
        description: "View our transparent USD pricing for international laundry and home care services. Premium care at accessible rates.",
        image: "/cleaning-machine.svg"
      },
      about: {
        title: "Our Legacy | The Philosophy of Phoenix Perfection",
        description: "Discover the history and philosophy of Phoenix Dry Cleaners. Learn about our commitment to artisan restoration and global standards.",
        image: "/home-clean-1.svg"
      },
      book: {
        title: "Book Service | Secure Your Elite Session",
        description: "Schedule your professional cleaning or logistics session today. Experience the Phoenix standard of excellence worldwide.",
        image: "/home-clean-3.svg"
      },
      success: {
        title: "Payment Success | Phoenix Dry Cleaners",
        description: "Thank you for your order. Your premium service payment is confirmed.",
        image: "/logo.svg"
      },
      privacy: {
        title: "Privacy Policy | Phoenix Global Data Protection",
        description: "Our commitment to protecting your personal data and ensuring a secure service experience for all global clients.",
        image: "/logo.svg"
      },
      terms: {
        title: "Terms of Service | Phoenix Dry Cleaners Protocol",
        description: "Review our service terms, liability protocols, and client engagement standards for a seamless premium experience.",
        image: "/logo.svg"
      },
      'service-dry-cleaning': {
        title: "Premium Dry Cleaning | Artisan Garment Restoration",
        description: "Hand-finished care for designer wear, silk, and suits. Experience the finest fabric treatment in the world.",
        image: "/cleaning-machine.svg"
      },
      'service-home-cleaning': {
        title: "Elite Home Cleaning | Surgical Sanitation Standards",
        description: "Hospital-grade deep cleaning for luxury estates. We restore every surface to its original, immaculate state.",
        image: "/home-clean-2.svg"
      },
      'service-relocation': {
        title: "Global Relocation | White-Glove Moving Services",
        description: "Professional packing and international logistics. We move your life with surgical precision and full insurance.",
        image: "/delivery-van.svg"
      },
      'service-deliveries': {
        title: "Secure Deliveries | Phoenix Global Logistics",
        description: "Same-day urgent parcel delivery for high-value items. Tracked, insured, and handled by elite professionals.",
        image: "/delivery-van.svg"
      }
    };

    const currentSeo = seoData[activePage];
    
    // Update Title
    document.title = currentSeo.title;
    
    // Update Primary Meta Tags
    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      const el = document.querySelector(`meta[${attr}="${name}"]`);
      if (el) el.setAttribute('content', content);
    };

    updateMeta('description', currentSeo.description);
    updateMeta('og:title', currentSeo.title, 'property');
    updateMeta('og:description', currentSeo.description, 'property');
    updateMeta('og:image', `${DOMAIN}${currentSeo.image}`, 'property');
    updateMeta('og:url', `${DOMAIN}/${activePage === 'home' ? '' : activePage}`, 'property');
    updateMeta('twitter:title', currentSeo.title, 'property');
    updateMeta('twitter:description', currentSeo.description, 'property');
    updateMeta('twitter:image', `${DOMAIN}${currentSeo.image}`, 'property');
    
    // Update Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${DOMAIN}/${activePage === 'home' ? '' : activePage}`);

  }, [activePage]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      setActivePage('success');
    }
  }, []);

  const renderServiceDetail = (title: string, desc: string, img: string, bulletPoints: string[]) => (
    <div className="bg-white">
      <header className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src={img} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" alt={title} />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter uppercase">{title}</h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-100 font-light">The Phoenix Standard in {title}</p>
        </div>
      </header>
      <div className="py-24 max-w-4xl mx-auto px-6">
        <div className="prose prose-lg max-w-none text-slate-600">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Service Overview</h2>
          <p className="mb-8 leading-relaxed text-xl">{desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            {bulletPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="w-6 h-6 bg-phoenix-accent rounded-full shrink-0 flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="font-bold text-slate-700">{pt}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center mt-20">
            <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Ready for Excellence?</h3>
            <p className="text-blue-100 mb-10 text-lg">Schedule your session now and experience the rebirth of your belongings.</p>
            <button onClick={() => setActivePage('book')} className="bg-phoenix-accent hover:bg-orange-600 px-12 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95">Book {title}</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInfoPage = (title: string, content: React.ReactNode) => (
    <div className="bg-slate-50 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-slate-100">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter uppercase">{title}</h1>
        <div className="prose prose-slate max-w-none">
          {content}
        </div>
        <div className="mt-20 pt-10 border-t border-slate-100 text-center">
          <button onClick={() => setActivePage('book')} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-phoenix-accent transition-all shadow-xl">Contact Concierge</button>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomeView onBookNow={() => setActivePage('book')} onSeeServices={() => setActivePage('services')} />;
      case 'services':
        return (
          <div className="bg-white">
            <header className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
              <img src="/home-clean-1.svg" className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" alt="Services" />
              <div className="relative z-10 text-center text-white px-6">
                <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter uppercase">Portfolio</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-blue-100 font-light">Precision care for your most valued assets.</p>
              </div>
            </header>
            <div className="py-24 max-w-7xl mx-auto px-6">
              <Services onServiceClick={(id) => setActivePage(`service-${id}` as PageView)} />
            </div>
          </div>
        );
      case 'pricing': return <Pricing />;
      case 'success':
        return renderInfoPage("Payment Complete", (
          <div className="space-y-6 text-slate-600">
            <p className="text-lg">Thank you for your payment. Your elite service request has been received and will be processed shortly.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button onClick={() => setActivePage('home')} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-phoenix-accent transition-all shadow-xl">Return Home</button>
              <button onClick={() => setActivePage('book')} className="bg-phoenix-accent text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl">Book Another Service</button>
            </div>
          </div>
        ));
      case 'about': return <AboutView onContact={() => setActivePage('book')} />;
      case 'book':
        return (
          <div className="bg-slate-50 min-h-screen">
            <header className="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden">
              <img src="/home-clean-3.svg" className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" alt="Booking" />
              <div className="relative z-10 text-center text-white px-6">
                <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter uppercase">Booking</h1>
                <p className="text-sm md:text-lg text-blue-100 uppercase tracking-[0.3em] font-bold">The Phoenix Standard</p>
              </div>
            </header>
            <div className="py-24 max-w-4xl mx-auto px-6"><BookingForm /></div>
          </div>
        );
      case 'privacy':
        return renderInfoPage("Privacy Policy", (
          <div className="space-y-6 text-slate-600">
            <p className="font-bold text-slate-900">Effective Date: January 1, 2024</p>
            <p>At Phoenix Dry Cleaners Global ("Phoenix", "we", "us"), your privacy is paramount. This policy outlines how we handle your personal data across our international operations.</p>
            <h3 className="text-xl font-bold text-slate-900">1. Data Collection</h3>
            <p>We collect information necessary to provide elite garment and home care, including contact details, addresses, and service preferences.</p>
            <h3 className="text-xl font-bold text-slate-900">2. Security Standards</h3>
            <p>We utilize surgical precision in our digital security, employing advanced encryption and secure protocols to protect sensitive client data from unauthorized access.</p>
            <h3 className="text-xl font-bold text-slate-900">3. Third-Party Sharing</h3>
            <p>We do not sell or trade your personal data. Sharing only occurs with vetted logistics partners strictly for service fulfillment.</p>
          </div>
        ));
      case 'terms':
        return renderInfoPage("Terms of Service", (
          <div className="space-y-6 text-slate-600">
            <p className="font-bold text-slate-900">Service Engagement Agreement</p>
            <p>By engaging Phoenix Global services, you agree to our artisan standards and operational protocols.</p>
            <h3 className="text-xl font-bold text-slate-900">1. Liability for High-Value Items</h3>
            <p>While we apply surgical precision to all restoration, we recommend specific disclosure for items valued over $5,000 to ensure specialized insurance coverage.</p>
            <h3 className="text-xl font-bold text-slate-900">2. Turnaround & Delivery</h3>
            <p>Turnaround times are estimates. While we strive for absolute punctuality, the preservation of quality always remains our primary priority.</p>
            <h3 className="text-xl font-bold text-slate-900">3. Global Operations</h3>
            <p>Services are governed by international commerce laws and local regulations in the region of service fulfillment.</p>
          </div>
        ));
      case 'service-dry-cleaning':
        return renderServiceDetail(
          "Dry Cleaning",
          "Our dry cleaning service is an artisan restoration process. We go beyond standard cleaning to provide forensic-level attention to every fiber, ensuring designer garments retain their original shape, texture, and brilliance.",
          "/cleaning-machine.svg",
          ["Swiss Eco-Solvents", "Hand-Finished Pressing", "Designer Brand Mastery", "Forensic Stain Removal", "Silk & Cashmere Detailing"]
        );
      case 'service-home-cleaning':
        return renderServiceDetail(
          "Home Cleaning",
          "Elite sanitation for distinguished residences. We employ hospital-grade disinfection protocols and industrial-strength extraction for a home that doesn't just look clean—it is surgically sterile and refreshed.",
          "/home-clean-2.svg",
          ["Hospital-Grade Disinfection", "HEPA-Filtration Vacuuming", "Artisan Rug Care", "Upholstery Steam Restoration", "Post-Construction Detail"]
        );
      case 'service-relocation':
        return renderServiceDetail(
          "Relocation",
          "A white-glove moving experience designed for the global citizen. From inventory management to specialized crating of high-value art, we handle every detail with surgical logistics precision.",
          "/delivery-van.svg",
          ["Inventory Digital Tracking", "Artisan Packing & Crating", "Global Logistics Network", "Full Value Insurance", "Unpacking & Setup Concierge"]
        );
      case 'service-deliveries':
        return renderServiceDetail(
          "Deliveries",
          "Urgent, secure, and professional. Our logistics wing handles same-day deliveries of high-value parcels with a chain-of-custody guarantee and real-time elite tracking.",
          "/delivery-van.svg",
          ["Same-Day Global Express", "Chain-of-Custody Security", "Real-Time GPS Tracking", "Professional Handlers", "Insured Transport"]
        );
      default:
        return <HomeView onBookNow={() => setActivePage('book')} onSeeServices={() => setActivePage('services')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={setActivePage} />
    </div>
  );
};

export default App;
