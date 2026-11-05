import React from 'react';
import { BusinessData } from '../types';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag,
  Star,
  Award
} from 'lucide-react';

interface WebsiteViewRendererProps {
  data: BusinessData;
  isMobilePreview?: boolean;
}

export const WebsiteViewRenderer: React.FC<WebsiteViewRendererProps> = ({ 
  data, 
  isMobilePreview = false 
}) => {
  const primaryColor = data.primaryColor || '#4F46E5';

  const createWhatsAppLink = (messageText: string) => {
    const cleanPhone = (data.whatsappNumber || data.phone || '9876543210').replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(messageText)}`;
  };

  return (
    <div className={`w-full bg-white text-slate-800 font-sans transition-all duration-300 ${isMobilePreview ? 'text-sm' : 'text-base'}`}>
      
      {/* 1. Top Announcement Bar */}
      <div 
        className="py-2 px-4 text-center text-xs font-semibold text-white flex items-center justify-center gap-2"
        style={{ backgroundColor: primaryColor }}
      >
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Welcome to {data.name}! Instant Orders & Bookings via WhatsApp</span>
        <a 
          href={createWhatsAppLink(`Hi ${data.name}, I want to make an inquiry!`)}
          target="_blank" 
          rel="noreferrer"
          className="underline font-bold hover:text-white/80 ml-1 inline-flex items-center gap-0.5"
        >
          Chat Now &rarr;
        </a>
      </div>

      {/* 2. Navigation Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md"
            style={{ backgroundColor: primaryColor }}
          >
            {data.name.charAt(0) || 'N'}
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base md:text-lg leading-tight tracking-tight">
              {data.name}
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              {data.category.toUpperCase()} • {data.city || 'Lucknow'}
            </p>
          </div>
        </div>

        {/* Quick Contact buttons in Header */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${data.phone || '9876543210'}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>{data.phone}</span>
          </a>
          <a
            href={createWhatsAppLink(`Hi ${data.name}, I would like to place an order.`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-xs font-bold shadow hover:opacity-95 transition"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-10 md:py-16 px-4 md:px-8 border-b border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-semibold text-emerald-700">Open Today</span>
              <span className="text-slate-400">•</span>
              <span>{data.operatingHours?.monday || '9:00 AM - 10:00 PM'}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {data.tagline || 'Crafted with Passion & Excellence'}
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              {data.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={createWhatsAppLink(`Hi ${data.name}, I want to order/inquire!`)}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-lg transition transform active:scale-95 flex items-center gap-2"
                style={{ backgroundColor: primaryColor }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now / Book Now</span>
              </a>

              <a
                href={`tel:${data.phone}`}
                className="px-4 py-3 rounded-xl bg-white border border-slate-300 font-semibold text-slate-700 text-sm hover:bg-slate-50 transition flex items-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Business</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex items-center justify-center md:justify-start gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Quality Assured
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-500" /> Verified Merchant
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9 Rating
              </span>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="w-full md:w-5/12">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
              <img
                src={data.products?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'}
                alt={data.name}
                className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <div className="text-white">
                  <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur text-[10px] uppercase font-bold tracking-wider">
                    Featured
                  </span>
                  <h3 className="font-bold text-sm md:text-base leading-snug drop-shadow-sm mt-1">
                    {data.products?.[0]?.name || 'Specialties & Favorites'}
                  </h3>
                  <p className="text-xs text-white/90">
                    Order fresh directly on WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Products / Services Catalog Section */}
      <section className="py-10 md:py-14 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <span 
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100"
            style={{ color: primaryColor }}
          >
            Our Menu & Offerings
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Popular Items & Services
          </h3>
          <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto">
            Browse our handpicked specialties. Click any item to order or inquire immediately on WhatsApp.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.products?.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    {item.category}
                  </span>
                  {item.isAvailable && (
                    <span className="absolute bottom-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span> In Stock
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">Price</span>
                  <div className="font-extrabold text-slate-900 text-base">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <a
                  href={createWhatsAppLink(`Hi ${data.name}! I would like to order: "${item.name}" (₹${item.price}). Is it available?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Order</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Business Hours & Location Info */}
      <section className="bg-slate-50 py-10 px-4 md:px-8 border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Operating Hours Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Operating Hours</h4>
                <p className="text-xs text-slate-500">Visit us or order during business hours</p>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="font-semibold text-slate-600">Monday – Friday</span>
                <span className="font-bold text-slate-800">{data.operatingHours?.monday || '9:00 AM – 10:00 PM'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="font-semibold text-slate-600">Saturday</span>
                <span className="font-bold text-slate-800">{data.operatingHours?.saturday || '9:00 AM – 10:30 PM'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-600">Sunday</span>
                <span className="font-bold text-slate-800">{data.operatingHours?.sunday || '10:00 AM – 9:30 PM'}</span>
              </div>
            </div>
          </div>

          {/* Location & Directions Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Shop Location</h4>
                  <p className="text-xs text-slate-500">Find us in {data.city || 'Lucknow'}</p>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">{data.name}</p>
                <p>{data.address || `${data.city || 'Lucknow'}, Uttar Pradesh`}</p>
                <p className="font-medium text-slate-600">Phone: +91 {data.phone}</p>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href={data.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(data.name + ' ' + data.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Get Directions (Maps)</span>
              </a>
              <a
                href={`tel:${data.phone}`}
                className="py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 md:px-8 text-center text-xs space-y-3">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
          <span>{data.name}</span>
          <span>•</span>
          <span className="text-slate-400 text-xs font-normal">{data.city}, India</span>
        </div>
        <p className="max-w-md mx-auto text-slate-400">
          {data.tagline}
        </p>
        <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-2">
          <span>Powered by</span>
          <span className="font-extrabold text-indigo-400 flex items-center gap-1">
            ⚡ Neurozy Voice-to-Website
          </span>
        </div>
      </footer>

      {/* 7. Floating WhatsApp Contact Button (Always Visible) */}
      <a
        href={createWhatsAppLink(`Hi ${data.name}, I found your website online and want to inquire.`)}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pr-1">
          Chat with Us
        </span>
      </a>

    </div>
  );
};
