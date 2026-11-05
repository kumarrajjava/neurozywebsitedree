import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Globe, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Palette, 
  ShoppingBag, 
  Building2, 
  Plus, 
  Trash2,
  ExternalLink,
  User as UserIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BusinessData, ViewportMode, ProductItem } from '../../types';
import { WebsiteViewRenderer } from '../../templates/WebsiteViewRenderer';
import { TEMPLATES } from '../../templates/templateData';
import logoSrc from '../../assets/branding/neurozy-logo.png';

interface LiveEditorProps {
  businessData: BusinessData;
  onUpdateBusiness: (updated: BusinessData) => void;
  onBackToDashboard: () => void;
  onViewPublishedSite: () => void;
  onNavigateProfile: () => void;
}

export const LiveEditor: React.FC<LiveEditorProps> = ({
  businessData,
  onUpdateBusiness,
  onBackToDashboard,
  onViewPublishedSite,
  onNavigateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'products'>('content');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccessMessage, setPublishSuccessMessage] = useState(false);

  // New product form state
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(199);
  const [newProductCategory, setNewProductCategory] = useState('Specialty');

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccessMessage(true);
      onUpdateBusiness({
        ...businessData,
        isPublished: true,
        publishedUrl: `https://${businessData.subdomain}.neurozy.site`
      });
      triggerCelebration();
      setTimeout(() => setPublishSuccessMessage(false), 4000);
    }, 1000);
  };

  const handleAddProduct = () => {
    if (!newProductName.trim()) return;
    const newProduct: ProductItem = {
      id: `p_${Date.now()}`,
      name: newProductName.trim(),
      description: 'Handcrafted fresh offering with premium ingredients and guaranteed taste.',
      price: Number(newProductPrice) || 99,
      category: newProductCategory.trim() || 'Menu Item',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      isAvailable: true,
    };
    onUpdateBusiness({
      ...businessData,
      products: [...businessData.products, newProduct]
    });
    setNewProductName('');
  };

  const handleRemoveProduct = (productId: string) => {
    onUpdateBusiness({
      ...businessData,
      products: businessData.products.filter(p => p.id !== productId)
    });
  };

  const handleToggleProductStock = (productId: string) => {
    onUpdateBusiness({
      ...businessData,
      products: businessData.products.map(p => 
        p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
      )
    });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between z-20 shadow-sm flex-shrink-0">
        
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="Neurozy Logo" className="h-7 w-auto object-contain mix-blend-multiply hidden lg:inline-block mr-1" />

          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition flex items-center gap-1.5 text-xs font-bold"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <button
            onClick={onNavigateProfile}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition flex items-center gap-1.5 text-xs font-bold"
            title="Go to Profile"
          >
            <UserIcon className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm md:text-base leading-tight">
                {businessData.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Live Editor
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              {businessData.subdomain}.neurozy.site
            </p>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              viewportMode === 'desktop' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              viewportMode === 'mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (375px)</span>
          </button>
        </div>

        {/* Right: Publish & Preview Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onViewPublishedSite}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Open Live Website</span>
          </button>

          <button
            disabled={isPublishing}
            onClick={handlePublish}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Changes'}</span>
          </button>
        </div>
      </header>

      {/* Published Toast Alert */}
      {publishSuccessMessage && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center shadow-md animate-in slide-in-from-top flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          <span>Website successfully published! Accessible at https://{businessData.subdomain}.neurozy.site</span>
        </div>
      )}

      {/* Editor Main Canvas */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Settings Panel */}
        <div className="w-full sm:w-80 md:w-96 bg-white border-r border-slate-200 flex flex-col z-10 shadow-sm flex-shrink-0">
          
          {/* Tabs */}
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition ${
                activeTab === 'content' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Details</span>
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition ${
                activeTab === 'theme' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Style</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition ${
                activeTab === 'products' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Catalog ({businessData.products.length})</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">

            {/* TAB 1: CONTENT DETAILS */}
            {activeTab === 'content' && (
              <div className="space-y-3.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={businessData.name}
                    onChange={(e) => onUpdateBusiness({ ...businessData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={businessData.tagline}
                    onChange={(e) => onUpdateBusiness({ ...businessData, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description (About Section)</label>
                  <textarea
                    rows={3}
                    value={businessData.description}
                    onChange={(e) => onUpdateBusiness({ ...businessData, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone</label>
                    <input
                      type="text"
                      value={businessData.phone}
                      onChange={(e) => onUpdateBusiness({ ...businessData, phone: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">WhatsApp Orders</label>
                    <input
                      type="text"
                      value={businessData.whatsappNumber}
                      onChange={(e) => onUpdateBusiness({ ...businessData, whatsappNumber: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Address / Landmark</label>
                  <input
                    type="text"
                    value={businessData.address}
                    onChange={(e) => onUpdateBusiness({ ...businessData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Operating Hours (Weekdays)</label>
                  <input
                    type="text"
                    value={businessData.operatingHours.monday}
                    onChange={(e) => onUpdateBusiness({
                      ...businessData,
                      operatingHours: { ...businessData.operatingHours, monday: e.target.value }
                    })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: APPEARANCE & THEME */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-2">Primary Brand Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { color: '#4F46E5', name: 'Indigo' },
                      { color: '#7C3AED', name: 'Violet' },
                      { color: '#E11D48', name: 'Rose' },
                      { color: '#DB2777', name: 'Pink' },
                      { color: '#D97706', name: 'Amber' },
                      { color: '#059669', name: 'Emerald' },
                      { color: '#0284C7', name: 'Sky' },
                      { color: '#0F172A', name: 'Dark' }
                    ].map((swatch) => (
                      <button
                        key={swatch.color}
                        onClick={() => onUpdateBusiness({ ...businessData, primaryColor: swatch.color })}
                        className={`h-10 rounded-xl flex items-center justify-center border-2 transition ${
                          businessData.primaryColor === swatch.color ? 'border-slate-900 shadow-md ring-2 ring-indigo-400' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: swatch.color }}
                      >
                        {businessData.primaryColor === swatch.color && (
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="font-bold text-slate-700 block mb-2">Switch Industry Template</label>
                  <div className="space-y-2">
                    {TEMPLATES.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => onUpdateBusiness({
                          ...businessData,
                          templateId: tmpl.id,
                          category: tmpl.category,
                          primaryColor: tmpl.defaultPrimaryColor
                        })}
                        className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center gap-2.5 ${
                          businessData.templateId === tmpl.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <img src={tmpl.previewImage} alt={tmpl.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-900 truncate">{tmpl.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold">{tmpl.category}</p>
                        </div>
                        {businessData.templateId === tmpl.id && (
                          <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS CATALOG */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                
                {/* Add Product Inline Box */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="font-bold text-slate-800 block">Add New Item / Service</span>
                  <input
                    type="text"
                    placeholder="Product or Dish name"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 outline-none text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-200 outline-none text-xs font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-200 outline-none text-xs"
                    />
                  </div>
                  <button
                    onClick={handleAddProduct}
                    className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-1.5 text-xs shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Website Catalog</span>
                  </button>
                </div>

                {/* Existing Products List */}
                <div className="space-y-2">
                  {businessData.products.map((item) => (
                    <div 
                      key={item.id}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">{item.name}</p>
                          <p className="text-[11px] font-extrabold text-indigo-600">₹{item.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => handleToggleProductStock(item.id)}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            item.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {item.isAvailable ? 'In Stock' : 'Out'}
                        </button>
                        <button
                          onClick={() => handleRemoveProduct(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                          title="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Right Live Preview Canvas */}
        <div className="flex-1 overflow-y-auto bg-slate-200/70 p-4 md:p-8 flex justify-center items-start">
          {viewportMode === 'mobile' ? (
            /* Simulated Mobile Phone Frame (375px) */
            <div className="w-[375px] bg-black rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-900/50 my-auto">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-32 h-4 bg-black rounded-b-xl mx-auto mb-2 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
              </div>
              <div className="bg-white rounded-[32px] overflow-hidden max-h-[750px] overflow-y-auto shadow-inner">
                <WebsiteViewRenderer data={businessData} isMobilePreview={true} />
              </div>
              {/* Phone Home Bar */}
              <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2.5"></div>
            </div>
          ) : (
            /* Simulated Desktop Browser Frame */
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden">
              {/* Desktop Browser Header Bar */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 max-w-md mx-auto bg-white border border-slate-200 rounded-lg py-1 px-3 text-center text-xs text-slate-600 font-mono flex items-center justify-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>https://{businessData.subdomain}.neurozy.site</span>
                </div>
              </div>

              {/* Rendered Live Website */}
              <div className="max-h-[80vh] overflow-y-auto">
                <WebsiteViewRenderer data={businessData} isMobilePreview={false} />
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
