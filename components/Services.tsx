
import type { ReactNode } from 'react';
import { ServiceCategory } from '../types';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  image: string;
  icon: ReactNode;
}

interface ServicesProps {
  onServiceClick?: (id: string) => void;
}

const Services = ({ onServiceClick }: ServicesProps) => {
  const services: ServiceItem[] = [
    {
      id: 'dry-cleaning',
      title: 'Dry Cleaning',
      description: 'Hand-finished executive garment care using specialized Swiss solvents and high-capacity industrial technology.',
      category: ServiceCategory.LAUNDRY,
      image: "/cleaning-machine.svg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      id: 'home-cleaning',
      title: 'Deep Home Cleaning',
      description: 'Beyond dusting. We provide hospital-grade disinfection and thorough extraction for carpets, upholstery, and living spaces.',
      category: ServiceCategory.CLEANING,
      image: "/home-clean-2.svg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'relocation',
      title: 'Relocation Services',
      description: 'Global white-glove moving. We handle inventory management, specialized packing, and international logistics with our fleet.',
      category: ServiceCategory.LOGISTICS,
      image: "/delivery-van.svg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      id: 'deliveries',
      title: 'Same-Day Delivery',
      description: 'Urgent courier solutions for high-value items. Insured, tracked, and delivered with professional Phoenix handlers.',
      category: ServiceCategory.LOGISTICS,
      image: "/delivery-van.svg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
        <div className="max-w-2xl">
          <h4 className="text-phoenix-accent font-black tracking-widest uppercase text-sm mb-4">World-Class Excellence</h4>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Signature Services</h2>
          <p className="text-slate-500 text-xl leading-relaxed">
            Every service we offer is defined by meticulous attention to detail and a commitment to restoring your environment to its peak condition.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {services.map((service, index) => (
          <div 
            key={index} 
            onClick={() => onServiceClick?.(service.id)}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100 cursor-pointer"
          >
            <div className="h-72 overflow-hidden relative">
              <img src={service.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={service.title} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg">
                <div className="text-phoenix-accent">
                  {service.icon}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="p-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-phoenix-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium text-lg">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest group-hover:gap-4 transition-all">
                View Full Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-phoenix-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
