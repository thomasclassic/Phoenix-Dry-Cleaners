
interface AboutViewProps {
  onContact: () => void;
}

const AboutView = ({ onContact }: AboutViewProps) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center overflow-hidden">
        <img 
          src="/hero-glow.svg" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
          alt="About Us"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full text-white">
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter uppercase">
            Our <span className="text-phoenix-accent">Legacy.</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl leading-relaxed font-light">
            Founded with a vision to redefine the meaning of "clean", Phoenix Global has evolved into a worldwide leader in specialized care.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-phoenix-accent font-black uppercase tracking-[0.3em] text-[10px]">The Philosophy</span>
            <h2 className="text-5xl md:text-7xl font-black mt-6 mb-10 text-slate-900 tracking-tighter leading-none">The Phoenix <br/> Rebirth</h2>
            <p className="text-slate-500 text-xl leading-relaxed mb-8 font-medium">
              We believe every item and space deserves a fresh start. Our proprietary protocols are designed to restore the original essence of your belongings.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              Combining ancient garment wisdom with 21st-century chemical science, we deliver results that are visible, tangible, and absolute.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">15+</h4>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Years of Excellence</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Global</h4>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Network Coverage</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/home-clean-1.svg" 
              className="rounded-[4rem] shadow-2xl z-10 relative aspect-square object-cover"
              alt="Detailing"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-phoenix-accent/10 rounded-full -z-10 animate-pulse blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
           <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Universal Standards</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">Consistent world-class quality across every location, every time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "/home-clean-2.svg",
              "/delivery-van.svg",
              "/home-clean-3.svg"
            ].map((src, idx) => (
              <div key={idx} className="h-96 overflow-hidden rounded-[3rem] group shadow-xl">
                <img src={src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery item" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 text-center px-6">
        <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase">Ready for a renewal?</h2>
        <button 
          onClick={onContact}
          className="px-16 py-8 bg-slate-900 text-white rounded-3xl font-black text-2xl hover:bg-phoenix-accent transition-all shadow-2xl hover:scale-105"
        >
          Begin Your Experience
        </button>
      </section>
    </div>
  );
};

export default AboutView;
