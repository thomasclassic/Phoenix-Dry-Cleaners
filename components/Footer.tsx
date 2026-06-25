
import { PageView } from '../App';

interface FooterProps {
  onNavigate?: (page: PageView) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const navigate = (id: PageView) => {
    onNavigate?.(id);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-slate-950 text-white pt-32 pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          {/* Brand Identity */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-phoenix-accent rounded-xl flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">PHOENIX</span>
            </div>
            <p className="text-slate-400 mb-10 leading-relaxed font-medium text-lg">
              Redefining the standards of luxury care. Worldwide excellence in garment restoration and elite home logistics.
            </p>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'LI'].map(social => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-phoenix-accent hover:text-white transition-all text-slate-500 font-black text-xs"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Navigation</h4>
            <ul className="space-y-5 text-slate-400 font-bold text-sm">
              <li><button onClick={() => navigate('home')} className="hover:text-phoenix-accent transition-colors">Experience Home</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-phoenix-accent transition-colors">Service Portfolio</button></li>
              <li><button onClick={() => navigate('pricing')} className="hover:text-phoenix-accent transition-colors">Global Rates</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-phoenix-accent transition-colors">About Us</button></li>
            </ul>
          </div>

          {/* Solutions - Updated with direct detail links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Solutions</h4>
            <ul className="space-y-5 text-slate-400 font-bold text-sm text-left">
              <li><button onClick={() => navigate('service-dry-cleaning')} className="hover:text-phoenix-accent transition-colors">Dry Cleaning Detail</button></li>
              <li><button onClick={() => navigate('service-home-cleaning')} className="hover:text-phoenix-accent transition-colors">Home Cleaning Detail</button></li>
              <li><button onClick={() => navigate('service-relocation')} className="hover:text-phoenix-accent transition-colors">Relocation Detail</button></li>
              <li><button onClick={() => navigate('service-deliveries')} className="hover:text-phoenix-accent transition-colors">Deliveries Detail</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Concierge</h4>
            <ul className="space-y-8 text-slate-400">
              <li className="flex items-start gap-5 group">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-phoenix-accent transition-all shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-phoenix-accent group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Direct Email</p>
                  <a href="mailto:Stevenalexander.cohen@mail.com" className="font-bold hover:text-white transition-colors break-all text-xs">Stevenalexander.cohen@mail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-phoenix-accent shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Availability</p>
                  <p className="font-bold text-xs uppercase tracking-tighter">Worldwide 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
          <p>&copy; {new Date().getFullYear()} Phoenix Global. Pure Perfection.</p>
          <div className="flex gap-10">
            <button onClick={() => navigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('terms')} className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
