
interface HeroProps {
  onBookNow: () => void;
}

const Hero = ({ onBookNow }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20000ms] scale-110 hover:scale-100 opacity-60"
        style={{ backgroundImage: `url('/hero-glow.svg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full pt-32 pb-20">
        <div className="max-w-4xl text-white">
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
            <span className="w-2 h-2 bg-phoenix-accent rounded-full animate-pulse"></span>
            The Gold Standard
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-10 leading-[0.85] tracking-tighter uppercase">
            Pure <br/>
            <span className="text-phoenix-accent">Excellence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-50/80 mb-14 leading-relaxed font-light max-w-2xl">
            Surgical precision in garment restoration, luxury home cleaning, and worldwide white-glove logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onBookNow}
              className="px-14 py-7 bg-phoenix-accent hover:bg-orange-600 text-white rounded-2xl font-black text-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-4"
            >
              Book Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
            <a 
              href="#services"
              className="px-14 py-7 bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-xl rounded-2xl font-bold text-xl transition-all text-center flex items-center justify-center"
            >
              Our Portfolio
            </a>
          </div>

          <div className="mt-24 flex flex-wrap items-center gap-12 md:gap-20 opacity-80">
            {[
              { val: "24/7", label: "GLOBAL CARE" },
              { val: "$1M+", label: "INSURED ASSETS" },
              { val: "100%", label: "RESTORED" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-4xl md:text-5xl font-black text-phoenix-accent tracking-tighter">{stat.val}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
