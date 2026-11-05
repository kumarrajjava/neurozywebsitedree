import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Star, 
  Search, 
  ShoppingBag, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { WebsiteData, ProductItem } from '../types';
import { LogoRenderer } from './LogoRenderer';

interface LiveWebsiteRendererProps {
  website: WebsiteData;
  isStandalone?: boolean;
  onUpdateWebsite?: (updated: WebsiteData) => void;
}

export const LiveWebsiteRenderer: React.FC<LiveWebsiteRendererProps> = ({
  website,
  isStandalone = false,
  onUpdateWebsite,
}) => {
  const { business, products, reviews, theme, sections } = website;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Derive unique categories from products
  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // WhatsApp order URL generator
  const getWhatsAppOrderUrl = (productName?: string, price?: number) => {
    const cleanPhone = business.whatsapp.replace(/[^0-9]/g, '');
    let text = `Namaste ${business.name}! I am visiting your website.`;
    if (productName) {
      text = `Namaste ${business.name}! I want to order "${productName}" (₹${price}) from your website. Is it available for delivery / pickup?`;
    }
    return `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const getCallUrl = () => {
    const cleanPhone = business.phone.replace(/[^0-9+]/g, '');
    return `tel:${cleanPhone}`;
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: 'rev_' + Date.now(),
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: 'Just now'
    };

    if (onUpdateWebsite) {
      onUpdateWebsite({
        ...website,
        reviews: [newRev, ...reviews]
      });
    }
    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Update page title if viewed in standalone mode
  React.useEffect(() => {
    if (isStandalone && website.seo?.metaTitle) {
      const originalTitle = document.title;
      document.title = website.seo.metaTitle;
      return () => {
        document.title = originalTitle;
      };
    }
  }, [isStandalone, website.seo?.metaTitle]);

  const schemaStructuredData = {
    '@context': 'https://schema.org',
    '@type': website.seo?.structuredDataType || 'LocalBusiness',
    name: business.name,
    image: website.seo?.ogImage || business.heroImageUrl,
    telephone: business.phone,
    description: website.seo?.metaDescription || business.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.pincode,
      addressCountry: 'IN'
    },
    openingHours: business.openingHours,
    url: `https://${website.subdomain}.neurozy.site`
  };

  return (
    <div
      className="w-full min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-slate-200"
      style={{ fontFamily: theme.font || 'Plus Jakarta Sans, sans-serif' }}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaStructuredData) }}
      />

      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoRenderer
              business={business}
              fallbackBg={theme.primaryColor}
              sizeClass="w-10 h-10"
            />
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                {business.name}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {business.city} · {business.categoryLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={getCallUrl()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Call Us</span>
            </a>

            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white rounded-lg shadow-xs transition-transform active:scale-95"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      {sections.hero && (
        <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{business.address}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                  {business.tagline || `${business.name} — Premium Quality in ${business.city}`}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {business.description}
                </p>

                {/* Features strip */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {business.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-95"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat & Order on WhatsApp</span>
                  </a>

                  <a
                    href={getCallUrl()}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-slate-600" />
                    <span>{business.phone}</span>
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="md:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 aspect-[4/3] bg-slate-100">
                  <img
                    src={business.heroImageUrl}
                    alt={business.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{business.openingHours}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Open for Orders
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                      ★ 4.9 Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Products / Menu / Services Catalog */}
      {sections.products && (
        <section className="py-12 bg-white" id="catalog">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Our Offerings</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Explore Products & Services</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Tap WhatsApp button on any item to order instantly.</p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter Tabs */}
            {categories.length > 2 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold">
                          {product.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm font-extrabold text-sm text-slate-950 shadow-sm font-mono tabular-nums">
                        ₹{product.price}
                      </span>
                    </div>

                    <div className="p-4">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-0.5 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <a
                      href={getWhatsAppOrderUrl(product.name, product.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-white active:scale-95 shadow-xs"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No items match your search. Try adjusting the filter.
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. About Us Story */}
      {sections.about && (
        <section className="py-12 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Our Story</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">About {business.name}</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {business.aboutStory}
            </p>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="block text-xl font-black text-slate-900 font-mono">100%</span>
                <span className="text-[11px] text-slate-500">Quality Guaranteed</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="block text-xl font-black text-slate-900 font-mono">60 Min</span>
                <span className="text-[11px] text-slate-500">Fast Neighborhood Response</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="block text-xl font-black text-slate-900 font-mono">5k+</span>
                <span className="text-[11px] text-slate-500">Delighted Customers</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="block text-xl font-black text-slate-900 font-mono">4.9 ★</span>
                <span className="text-[11px] text-slate-500">Customer Rating</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Reviews & Testimonials */}
      {sections.reviews && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Community Trust</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Customer Reviews</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{rev.author}</span>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>

            {/* Leave a review box */}
            <form onSubmit={handleAddReview} className="max-w-xl mx-auto p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
              <span className="font-bold text-xs text-slate-800 block">Leave a quick review:</span>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="p-2 border border-slate-200 rounded-lg text-xs"
                  required
                />
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="p-2 border border-slate-200 rounded-lg text-xs"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>
              <textarea
                placeholder="Share your experience..."
                rows={2}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Submit Review</span>
              </button>
              {reviewSubmitted && (
                <p className="text-[11px] text-emerald-600 font-semibold text-center">Thank you! Your review has been added.</p>
              )}
            </form>
          </div>
        </section>
      )}

      {/* 6. Location, Hours & Map Section */}
      {(sections.hours || sections.map || sections.contact) && (
        <section className="py-12 bg-slate-50 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Visit Us</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Store Timings & Address</h2>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                    <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Store Address</strong>
                      <span>{business.address}, {business.city}, {business.state} — {business.pincode}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                    <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Opening Hours</strong>
                      <span>{business.openingHours}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                    <Phone className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Contact & Order Phone</strong>
                      <span>{business.phone} · WhatsApp: {business.whatsapp}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(business.googleMapsQuery || business.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-900 shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              {/* Visual Map Representation */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm aspect-[4/3] bg-slate-200 relative flex items-center justify-center text-center p-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-indigo-50/50" />
                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{business.name}</h4>
                  <p className="text-xs text-slate-600 max-w-xs">{business.address}, {business.city}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(business.googleMapsQuery || business.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-3 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-lg shadow-xs"
                  >
                    View Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Footer */}
      <footer className="py-8 bg-white border-t border-slate-100 text-center text-xs text-slate-500 space-y-2.5">
        <div className="flex items-center justify-center gap-2">
          <LogoRenderer
            business={business}
            fallbackBg={theme.primaryColor}
            sizeClass="w-7 h-7"
          />
          <span className="font-bold text-slate-900 text-sm">{business.name}</span>
        </div>
        <p className="font-semibold text-slate-700">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <p className="text-[11px] text-slate-400">
          Created with <strong className="text-indigo-600 font-semibold">Neurozy Voice-to-Website</strong> · Speak Your Business. Get Your Website.
        </p>
      </footer>

      {/* Floating 1-Click WhatsApp Quick Action Button */}
      {sections.whatsappButton && (
        <a
          href={getWhatsAppOrderUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-16 bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
            Order on WhatsApp
          </span>
        </a>
      )}
    </div>
  );
};
