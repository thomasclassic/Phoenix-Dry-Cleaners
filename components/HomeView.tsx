
import Hero from './Hero';
import Services from './Services';

interface HomeViewProps {
  onBookNow: () => void;
  onSeeServices: () => void;
}

const HomeView = ({ onBookNow, onSeeServices }: HomeViewProps) => {
  return (
    <div className="bg-white">
      <Hero onBookNow={onBookNow} />
      
      <section id="services" className="py-24 md:py-32">
        <Services />
        <div className="text-center mt-20">
          <button 
            onClick={onSeeServices}
            className="inline-flex items-center gap-4 text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:text-phoenix-accent transition-all group"
          >
            Explore Full Portfolio
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-phoenix-accent group-hover:bg-phoenix-accent group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>
      </section>

      {/* Optimized Feature Section */}
      <section className="py-24 md:py-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-phoenix-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-phoenix-accent font-black uppercase tracking-[0.3em] text-[10px] mb-8 block">Excellence Guaranteed</span>
              <h2 className="text-5xl md:text-8xl font-black mb-12 leading-[0.95] tracking-tighter">
                Phoenix <br/>
                <span className="text-phoenix-accent">Advantage</span>
              </h2>
              <div className="space-y-12">
                {[
                  { title: "Artisan Precision", text: "Proprietary cleaning protocols for high-value fabrics and luxury interiors." },
                  { title: "Logistics Mastery", text: "Global relocation and delivery handled with white-glove surgical care." },
                  { title: "24/7 Presence", text: "Operational excellence across all time zones for our global clientele." }
                ].map((item, i) => (
                  <div key={i} className="group flex gap-8">
                    <div className="shrink-0 w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-phoenix-accent font-black text-2xl border border-white/10 group-hover:bg-phoenix-accent group-hover:text-white transition-all">
                      {i+1}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-3 tracking-tight">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed font-medium text-lg">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full"></div>
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 group aspect-square lg:aspect-auto lg:h-[700px]">
                <img 
                  src="/cleaning-machine.svg" 
                  alt="Quality Control" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/10"></div>
              </div>
              {/* Floating stats badge */}
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[3rem] shadow-2xl text-slate-900 hidden md:block border border-slate-100">
                <p className="text-5xl font-black text-phoenix-accent mb-2 tracking-tighter">15+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Service Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
