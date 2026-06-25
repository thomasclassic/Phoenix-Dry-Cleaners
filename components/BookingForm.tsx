
import React, { useState } from 'react';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Dry Cleaning',
    location: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email or save to a database
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-10 rounded-3xl text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p>Your request has been received. Our team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Service Needed</label>
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
          >
            <option>Dry Cleaning</option>
            <option>Home Cleaning</option>
            <option>Fumigation</option>
            <option>Moving Company</option>
            <option>Global Deliveries</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Location / Address</label>
        <input 
          type="text" 
          name="location"
          required
          value={formData.location}
          onChange={handleChange}
          placeholder="New York, USA (or any city worldwide)"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes</label>
        <textarea 
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your requirements..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
      >
        Submit Request
      </button>
    </form>
  );
};

export default BookingForm;
