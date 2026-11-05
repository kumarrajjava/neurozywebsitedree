import React, { useState } from 'react';
import { 
  Laptop, 
  Smartphone, 
  Tablet, 
  Palette, 
  Type, 
  Eye, 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Store, 
  Phone, 
  Clock, 
  MapPin, 
  Layers, 
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Sliders,
  Search,
  Globe,
  Share2,
  Tag,
  CheckCircle2,
  X,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  FileCode,
  Code,
  Copy,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { WebsiteData, ProductItem, BusinessCategory, SeoConfig } from '../types';
import { LiveWebsiteRenderer } from './LiveWebsiteRenderer';
import { LogoRenderer } from './LogoRenderer';
import { PRESET_LOGOS, generateMonogramSvg, getDefaultLogoForCategory } from '../data/presetLogos';

interface WebsiteEditorProps {
  website: WebsiteData;
  onSave: (updatedWebsite: WebsiteData) => void;
  onPublish: () => void;
  onBackToDashboard: () => void;
}

export const WebsiteEditor: React.FC<WebsiteEditorProps> = ({
  website,
  onSave,
  onPublish,
  onBackToDashboard,
}) => {
  const [data, setData] = useState<WebsiteData>(() => {
    // Ensure SEO config has baseline defaults
    if (!website.seo) {
      return {
        ...website,
        seo: {
          metaTitle: `${website.business.name} | Best ${website.business.categoryLabel || 'Store'} in ${website.business.city}`,
          metaDescription: `${website.business.description || website.business.tagline}. Located in ${website.business.address}, ${website.business.city}. Order on WhatsApp or call ${website.business.phone}.`,
          keywords: [
            website.business.name,
            `${website.business.categoryLabel || 'Store'} in ${website.business.city}`,
            `${website.business.city} local store`,
            'order on whatsapp',
            website.business.address
          ],
          ogImage: website.business.heroImageUrl,
          canonicalUrl: `https://${website.subdomain}.neurozy.site`,
          robotsIndex: true,
          structuredDataType: 'LocalBusiness'
        }
      };
    }
    return website;
  });

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'content' | 'logo' | 'products' | 'theme' | 'sections' | 'seo'>('content');
  const [saveToast, setSaveToast] = useState(false);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [serpView, setSerpView] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedStructuredData, setCopiedStructuredData] = useState(false);

  // Logo Editor State
  const [logoMode, setLogoMode] = useState<'svg' | 'presets' | 'monogram' | 'image'>('svg');
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [customInitials, setCustomInitials] = useState('');
  const [customBgColor, setCustomBgColor] = useState(data.theme.primaryColor || '#4f46e5');
  const [customTextColor, setCustomTextColor] = useState('#ffffff');

  // New product form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(199);
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductImage, setNewProductImage] = useState(
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
  );
  const [newProductBadge, setNewProductBadge] = useState('New');

  const updateBusiness = (fields: Partial<typeof data.business>) => {
    const updated = {
      ...data,
      business: { ...data.business, ...fields },
      updatedAt: new Date().toISOString()
    };
    setData(updated);
    onSave(updated);
  };

  const updateTheme = (fields: Partial<typeof data.theme>) => {
    const updated = {
      ...data,
      theme: { ...data.theme, ...fields },
      updatedAt: new Date().toISOString()
    };
    setData(updated);
    onSave(updated);
  };

  const toggleSection = (sectionName: keyof typeof data.sections) => {
    const updated = {
      ...data,
      sections: {
        ...data.sections,
        [sectionName]: !data.sections[sectionName]
      },
      updatedAt: new Date().toISOString()
    };
    setData(updated);
    onSave(updated);
  };

  const currentSeo: SeoConfig = data.seo || {
    metaTitle: `${data.business.name} | Best ${data.business.categoryLabel || 'Store'} in ${data.business.city}`,
    metaDescription: `${data.business.description || data.business.tagline}. Located in ${data.business.address}, ${data.business.city}. Order directly on WhatsApp or call ${data.business.phone}.`,
    keywords: [
      data.business.name,
      `${data.business.categoryLabel || 'Store'} in ${data.business.city}`,
      `${data.business.city} store`,
      'order on whatsapp',
      data.business.address
    ],
    ogImage: data.business.heroImageUrl,
    canonicalUrl: `https://${data.subdomain}.neurozy.site`,
    robotsIndex: true,
    structuredDataType: 'LocalBusiness'
  };

  const updateSeo = (fields: Partial<SeoConfig>) => {
    const updatedSeo: SeoConfig = {
      ...currentSeo,
      ...fields
    };
    const updated = {
      ...data,
      seo: updatedSeo,
      updatedAt: new Date().toISOString()
    };
    setData(updated);
    onSave(updated);
  };

  const handleAddKeyword = (kw: string) => {
    const cleanKw = kw.trim();
    if (!cleanKw || currentSeo.keywords.includes(cleanKw)) return;
    updateSeo({
      keywords: [...currentSeo.keywords, cleanKw]
    });
    setNewKeywordInput('');
  };

  const handleRemoveKeyword = (indexToRemove: number) => {
    updateSeo({
      keywords: currentSeo.keywords.filter((_, idx) => idx !== indexToRemove)
    });
  };

  const handleAutoGenerateTitle = () => {
    const generated = `${data.business.name} | Top ${data.business.categoryLabel} in ${data.business.city} (${data.business.address.split(',')[0]})`;
    updateSeo({ metaTitle: generated.slice(0, 60) });
  };

  const handleAutoGenerateDesc = () => {
    const generated = `Order from ${data.business.name} in ${data.business.city}. Offering premium ${data.business.categoryLabel.toLowerCase()} with fast WhatsApp delivery & pickup. Call ${data.business.phone}.`;
    updateSeo({ metaDescription: generated.slice(0, 160) });
  };

  // Industry suggested keywords
  const getIndustrySuggestedKeywords = () => {
    const city = data.business.city;
    switch (data.business.category) {
      case 'bakery':
        return [
          `Bakery in ${city}`,
          `Best cakes ${city}`,
          'Custom birthday cakes',
          'Eggless cake delivery',
          'Fresh pastries near me',
          'Sourdough bread'
        ];
      case 'cafe':
        return [
          `Best cafe in ${city}`,
          `Coffee shop ${city}`,
          'Single-origin Arabica',
          'Cozy cafe with Wi-Fi',
          'Artisan coffee & pizza',
          'Breakfast cafe'
        ];
      case 'clothing':
        return [
          `Designer boutique in ${city}`,
          'Chikankari sarees',
          'Bridal suits & lehengas',
          'Ethnic wear store',
          'Custom tailoring'
        ];
      case 'salon':
        return [
          `Best salon in ${city}`,
          'Bridal makeup studio',
          'Hair spa & keratin',
          'Hydra facial treatment',
          'Unisex beauty salon'
        ];
      case 'coaching':
        return [
          `Coaching classes in ${city}`,
          'IIT JEE preparation',
          'NEET coaching',
          'CBSE tuition classes',
          'Top coaching faculty'
        ];
      case 'services':
        return [
          `AC repair in ${city}`,
          'Doorstep home services',
          'RO water filter service',
          'Electrician near me',
          'Same day appliance repair'
        ];
      default:
        return [
          `Best store in ${city}`,
          'Local business online',
          'WhatsApp delivery',
          'Shop near me',
          'Affordable prices'
        ];
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: ProductItem = {
      id: 'prod_' + Date.now(),
      name: newProductName.trim(),
      category: newProductCategory.trim() || 'General',
      price: Number(newProductPrice) || 99,
      description: newProductDesc.trim() || 'Freshly prepared upon your order.',
      imageUrl: newProductImage.trim(),
      isAvailable: true,
      badge: newProductBadge || undefined
    };

    const updated = {
      ...data,
      products: [newProd, ...data.products],
      updatedAt: new Date().toISOString()
    };
    setData(updated);
    onSave(updated);
    setShowAddProduct(false);
    setNewProductName('');
    setNewProductDesc('');
  };

  const handleDeleteProduct = (id: string) => {
    const updated = {
      ...data,
      products: data.products.filter((p) => p.id !== id),
      updatedAt: new Date().toISOString()
    };
    setData(updated);
    onSave(updated);
  };

  const handleManualSave = () => {
    onSave(data);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const currentLogoSvg = data.business.logoSvg || getDefaultLogoForCategory(data.business.category);

  const handleCopySvgCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentLogoSvg);
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        updateBusiness({
          logoUrl: result,
          logoType: 'image'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPresetLogo = (svg: string, bg?: string) => {
    updateBusiness({
      logoSvg: svg,
      logoType: 'svg',
      logoBgColor: bg || 'transparent'
    });
  };

  const handleApplyMonogram = () => {
    const generated = generateMonogramSvg(
      customInitials || data.business.name,
      customBgColor,
      customTextColor
    );
    updateBusiness({
      logoSvg: generated,
      logoType: 'svg',
      logoBgColor: 'transparent'
    });
  };

  const colorPresets = [
    { name: 'Warm Rose Bakery', primary: '#ec4899', accent: '#f43f5e' },
    { name: 'Coffee Amber', primary: '#d97706', accent: '#b45309' },
    { name: 'Royal Violet', primary: '#7c3aed', accent: '#6d28d9' },
    { name: 'Emerald Spa', primary: '#059669', accent: '#047857' },
    { name: 'Target Blue', primary: '#2563eb', accent: '#1d4ed8' },
    { name: 'Sky Electric', primary: '#0284c7', accent: '#0369a1' },
    { name: 'Classic Dark', primary: '#0f172a', accent: '#334155' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      {/* Top Editor Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-4 sticky top-16 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span>{data.business.name}</span>
              <span className="text-[10px] text-slate-400 font-normal">({data.subdomain}.neurozy.site)</span>
            </h1>
          </div>
        </div>

        {/* Viewport switch controls */}
        <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded flex items-center gap-1 transition-all ${
              viewport === 'desktop' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Desktop View (1440px)"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] font-medium">Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded flex items-center gap-1 transition-all ${
              viewport === 'tablet' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] font-medium">Tablet</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded flex items-center gap-1 transition-all ${
              viewport === 'mobile' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] font-medium">Mobile</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {saveToast && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
          <button
            onClick={handleManualSave}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={onPublish}
            className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Publish Website</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Controls + Right Live Preview */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Property Inspector Panel (420px max) */}
        <div className="w-full lg:w-[420px] bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-112px)] overflow-y-auto">
          {/* Sub tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3 py-3 text-center transition-colors border-b-2 whitespace-nowrap shrink-0 ${
                activeTab === 'content'
                  ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Business Info
            </button>
            <button
              onClick={() => setActiveTab('logo')}
              className={`px-3 py-3 text-center transition-colors border-b-2 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'logo'
                  ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-indigo-600" />
              <span>Logo in Code</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-3 text-center transition-colors border-b-2 whitespace-nowrap shrink-0 ${
                activeTab === 'products'
                  ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Products ({data.products.length})
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-3 text-center transition-colors border-b-2 whitespace-nowrap shrink-0 ${
                activeTab === 'theme'
                  ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Colors & Fonts
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-3 py-3 text-center transition-colors border-b-2 whitespace-nowrap shrink-0 ${
                activeTab === 'sections'
                  ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-3 py-3 text-center transition-colors border-b-2 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'seo'
                  ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-indigo-600" />
              <span>SEO Settings</span>
            </button>
          </div>

          <div className="p-5 space-y-5 flex-1">
            {/* TAB 1: CONTENT */}
            {activeTab === 'content' && (
              <div className="space-y-4 text-xs">
                {/* Quick Brand Logo Snippet */}
                <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <LogoRenderer
                      business={data.business}
                      fallbackBg={data.theme.primaryColor}
                      sizeClass="w-9 h-9"
                    />
                    <div>
                      <span className="font-bold text-indigo-950 block text-xs">Brand Logo in Code</span>
                      <span className="text-[10px] text-slate-500">
                        {data.business.logoType === 'image' ? 'Image File' : 'Pure SVG Vector Code'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('logo')}
                    className="px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 text-indigo-700 text-[11px] font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Edit in Code →
                  </button>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={data.business.name}
                    onChange={(e) => updateBusiness({ name: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tagline / Main Headline</label>
                  <input
                    type="text"
                    value={data.business.tagline}
                    onChange={(e) => updateBusiness({ tagline: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Store Description (Short Summary)</label>
                  <textarea
                    rows={3}
                    value={data.business.description}
                    onChange={(e) => updateBusiness({ description: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">About Story (Full Narrative)</label>
                  <textarea
                    rows={4}
                    value={data.business.aboutStory}
                    onChange={(e) => updateBusiness({ aboutStory: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">WhatsApp Phone</label>
                    <input
                      type="text"
                      value={data.business.whatsapp}
                      onChange={(e) => updateBusiness({ whatsapp: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg font-mono text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Calling Phone</label>
                    <input
                      type="text"
                      value={data.business.phone}
                      onChange={(e) => updateBusiness({ phone: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg font-mono text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Address & Neighborhood</label>
                  <input
                    type="text"
                    value={data.business.address}
                    onChange={(e) => updateBusiness({ address: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">City</label>
                    <input
                      type="text"
                      value={data.business.city}
                      onChange={(e) => updateBusiness({ city: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Opening Hours</label>
                    <input
                      type="text"
                      value={data.business.openingHours}
                      onChange={(e) => updateBusiness({ openingHours: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={data.business.heroImageUrl}
                    onChange={(e) => updateBusiness({ heroImageUrl: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800 text-[11px] font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB: LOGO IN CODE */}
            {activeTab === 'logo' && (
              <div className="space-y-5 text-xs">
                {/* 1. Live Logo Multi-Scale Preview */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs flex items-center gap-1.5 text-indigo-300">
                      <Code className="w-4 h-4 text-indigo-400" />
                      <span>Live Logo in Code Preview</span>
                    </span>
                    <button
                      onClick={handleCopySvgCode}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                      title="Copy SVG code to clipboard"
                    >
                      {copiedSvg ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSvg ? 'Copied SVG!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  {/* Multi-scale preview bar */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-around gap-2">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto flex items-center justify-center p-1 bg-white/5 rounded-xl border border-white/10">
                        <LogoRenderer
                          business={data.business}
                          fallbackBg={data.theme.primaryColor}
                          sizeClass="w-14 h-14"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">Header (56px)</span>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto flex items-center justify-center p-1 bg-white/5 rounded-xl border border-white/10">
                        <LogoRenderer
                          business={data.business}
                          fallbackBg={data.theme.primaryColor}
                          sizeClass="w-10 h-10"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">Navbar (40px)</span>
                    </div>

                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto flex items-center justify-center p-0.5 bg-white/5 rounded-lg border border-white/10">
                        <LogoRenderer
                          business={data.business}
                          fallbackBg={data.theme.primaryColor}
                          sizeClass="w-6 h-6"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">Icon (24px)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>
                      Active Format:{' '}
                      <strong className="text-white capitalize">
                        {data.business.logoType === 'image' ? 'Image File / URL' : 'Pure Vector SVG Code'}
                      </strong>
                    </span>
                    <span className="text-indigo-400 font-mono">100% Vector Scalable</span>
                  </div>
                </div>

                {/* 2. Format Mode Selector */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Choose Logo Configuration Mode:</label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl font-semibold text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        setLogoMode('svg');
                        updateBusiness({ logoType: 'svg' });
                      }}
                      className={`p-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        logoMode === 'svg'
                          ? 'bg-white text-indigo-700 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Edit SVG Code</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLogoMode('presets');
                        updateBusiness({ logoType: 'svg' });
                      }}
                      className={`p-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        logoMode === 'presets'
                          ? 'bg-white text-indigo-700 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Coded Presets</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLogoMode('monogram');
                        updateBusiness({ logoType: 'svg' });
                      }}
                      className={`p-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        logoMode === 'monogram'
                          ? 'bg-white text-indigo-700 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Type className="w-3.5 h-3.5" />
                      <span>Code Monogram</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLogoMode('image');
                        updateBusiness({ logoType: 'image' });
                      }}
                      className={`p-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        logoMode === 'image'
                          ? 'bg-white text-indigo-700 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Upload / URL</span>
                    </button>
                  </div>
                </div>

                {/* MODE 1: DIRECT SVG CODE EDITOR */}
                {logoMode === 'svg' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-slate-800 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Raw SVG Code Editor:</span>
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          updateBusiness({
                            logoSvg: getDefaultLogoForCategory(data.business.category),
                            logoType: 'svg'
                          })
                        }
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        Reset to Category SVG
                      </button>
                    </div>

                    <div className="relative">
                      <textarea
                        rows={8}
                        value={data.business.logoSvg || currentLogoSvg}
                        onChange={(e) =>
                          updateBusiness({
                            logoSvg: e.target.value,
                            logoType: 'svg'
                          })
                        }
                        placeholder="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>...</svg>"
                        className="w-full p-3 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                        spellCheck={false}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span>Live SVG rendered across website navigation & footer.</span>
                      <span className="font-mono text-indigo-700 font-semibold">Valid XML</span>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-600 block">Quick Insert Preset SVG:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {PRESET_LOGOS.slice(0, 6).map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelectPresetLogo(preset.svgCode, preset.recommendedBg)}
                            className="p-2 border border-slate-200 hover:border-indigo-400 rounded-lg text-left bg-white hover:bg-indigo-50/50 transition-colors cursor-pointer"
                          >
                            <span className="font-bold text-[10px] text-slate-800 block truncate">{preset.name}</span>
                            <span className="text-[9px] text-slate-400 uppercase">{preset.category}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 2: HANDCRAFTED PRESETS GALLERY */}
                {logoMode === 'presets' && (
                  <div className="space-y-3">
                    <span className="font-bold text-slate-800 block text-xs">
                      Select a Curated Vector SVG in Code:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {PRESET_LOGOS.map((preset) => {
                        const isCurrent = data.business.logoSvg === preset.svgCode;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelectPresetLogo(preset.svgCode, preset.recommendedBg)}
                            className={`p-3 rounded-xl border text-left flex flex-col items-center justify-between transition-all cursor-pointer ${
                              isCurrent
                                ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div
                              className="w-14 h-14 p-1.5 rounded-xl flex items-center justify-center my-1"
                              style={{ backgroundColor: preset.recommendedBg }}
                              dangerouslySetInnerHTML={{ __html: preset.svgCode }}
                            />
                            <div className="w-full text-center mt-2">
                              <span className="font-bold text-slate-900 text-xs block truncate">{preset.name}</span>
                              <span className="text-[10px] text-slate-500 uppercase font-mono">{preset.category}</span>
                            </div>
                            {isCurrent && (
                              <span className="mt-1 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold">
                                Selected
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* MODE 3: MONOGRAM GENERATOR IN CODE */}
                {logoMode === 'monogram' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3.5">
                    <span className="font-bold text-slate-900 block text-xs">
                      Monogram Vector SVG Code Generator
                    </span>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Initials / Letters (1–3 chars):</label>
                      <input
                        type="text"
                        maxLength={3}
                        value={customInitials}
                        placeholder={data.business.name.slice(0, 2).toUpperCase()}
                        onChange={(e) => setCustomInitials(e.target.value.toUpperCase())}
                        className="w-full p-2.5 border border-slate-200 rounded-xl font-black text-center text-lg tracking-wider bg-white focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Background Color:</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customBgColor}
                            onChange={(e) => setCustomBgColor(e.target.value)}
                            className="w-9 h-9 p-0.5 rounded-lg border border-slate-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customBgColor}
                            onChange={(e) => setCustomBgColor(e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Text Color:</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customTextColor}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            className="w-9 h-9 p-0.5 rounded-lg border border-slate-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customTextColor}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleApplyMonogram}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate & Apply Monogram SVG</span>
                    </button>
                  </div>
                )}

                {/* MODE 4: IMAGE URL OR UPLOAD */}
                {logoMode === 'image' && (
                  <div className="space-y-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Direct Image URL (PNG/SVG/WebP):</label>
                      <input
                        type="url"
                        value={data.business.logoUrl || ''}
                        onChange={(e) =>
                          updateBusiness({
                            logoUrl: e.target.value,
                            logoType: 'image'
                          })
                        }
                        placeholder="https://example.com/logo.png"
                        className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                      />
                    </div>

                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50 hover:bg-slate-100/70 transition-colors">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                      <span className="font-bold text-slate-800 text-xs block">Upload Image from Computer</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Supports PNG, JPG, SVG, WebP</p>
                      <label className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg cursor-pointer hover:bg-indigo-700 shadow-xs">
                        <span>Select File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PRODUCTS */}
            {activeTab === 'products' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Catalogue Items ({data.products.length})</span>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-xs active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                {showAddProduct && (
                  <form onSubmit={handleAddProduct} className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-3">
                    <span className="font-bold text-indigo-950 block">Add New Product / Service</span>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Product Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Belgian Chocolate Pastry"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-md bg-white text-xs"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Category</label>
                        <input
                          type="text"
                          placeholder="Cakes / Food / Care"
                          value={newProductCategory}
                          onChange={(e) => setNewProductCategory(e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-md bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Price (₹ INR)</label>
                        <input
                          type="number"
                          value={newProductPrice}
                          onChange={(e) => setNewProductPrice(Number(e.target.value))}
                          className="w-full p-2 border border-slate-200 rounded-md bg-white text-xs font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Image URL</label>
                      <input
                        type="text"
                        value={newProductImage}
                        onChange={(e) => setNewProductImage(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-md bg-white text-[10px] font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Description</label>
                      <input
                        type="text"
                        placeholder="Fresh ingredients, made to order..."
                        value={newProductDesc}
                        onChange={(e) => setNewProductDesc(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-md bg-white text-xs"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddProduct(false)}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2">
                  {data.products.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">₹{item.price} · {item.category}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: THEME */}
            {activeTab === 'theme' && (
              <div className="space-y-5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-2">Preset Color Schemes</label>
                  <div className="grid grid-cols-1 gap-2">
                    {colorPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => updateTheme({ primaryColor: preset.primary, accentColor: preset.accent })}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          data.theme.primaryColor === preset.primary
                            ? 'border-indigo-600 bg-indigo-50/20 font-bold'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <span className="text-slate-800">{preset.name}</span>
                        </div>
                        {data.theme.primaryColor === preset.primary && (
                          <Check className="w-4 h-4 text-indigo-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Custom Brand Hex Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={data.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-10 h-10 rounded border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="p-2 border border-slate-200 rounded-lg font-mono text-xs text-slate-800 uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Font Family</label>
                  <select
                    value={data.theme.font}
                    onChange={(e) => updateTheme({ font: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-xs text-slate-800"
                  >
                    <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans (Modern SaaS)</option>
                    <option value="Outfit, sans-serif">Outfit (Clean Geometric)</option>
                    <option value="DM Sans, sans-serif">DM Sans (Friendly & Legible)</option>
                    <option value="Manrope, sans-serif">Manrope (Contemporary Urban)</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 4: SECTIONS */}
            {activeTab === 'sections' && (
              <div className="space-y-3 text-xs">
                <span className="font-bold text-slate-800 block">Manage Visible Page Sections:</span>
                <p className="text-slate-500 text-[11px]">Toggle sections on or off to match your shop's needs.</p>

                {(Object.keys(data.sections) as (keyof typeof data.sections)[]).map((sec) => (
                  <label
                    key={sec}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 capitalize">
                      {sec === 'whatsappButton' ? 'Floating WhatsApp Order Button' : `${sec} Section`}
                    </span>
                    <input
                      type="checkbox"
                      checked={data.sections[sec]}
                      onChange={() => toggleSection(sec)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                  </label>
                ))}
              </div>
            )}

            {/* TAB 5: SEO SETTINGS */}
            {activeTab === 'seo' && (
              <div className="space-y-6 text-xs">
                {/* Intro Banner */}
                <div className="p-3.5 bg-gradient-to-r from-indigo-50/80 to-sky-50/80 border border-indigo-100 rounded-2xl flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Search Engine Optimization (SEO)</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Optimize how your website ranks on Google, Bing, and WhatsApp links. Higher search ranking brings free local customers directly to your shop.
                    </p>
                  </div>
                </div>

                {/* Google Search Result (SERP) Live Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Google Search Preview</span>
                    </span>

                    <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-lg text-[10px] font-semibold">
                      <button
                        onClick={() => setSerpView('desktop')}
                        className={`px-2 py-0.5 rounded transition-all ${
                          serpView === 'desktop' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                        }`}
                      >
                        Desktop
                      </button>
                      <button
                        onClick={() => setSerpView('mobile')}
                        className={`px-2 py-0.5 rounded transition-all ${
                          serpView === 'mobile' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                        }`}
                      >
                        Mobile
                      </button>
                    </div>
                  </div>

                  {/* Simulated Google Card */}
                  <div className={`p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5 transition-all ${
                    serpView === 'mobile' ? 'max-w-[320px] mx-auto border-dashed' : ''
                  }`}>
                    {/* Google URL breadcrumb */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        {data.business.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <span className="font-semibold text-slate-900 block leading-tight truncate">{data.business.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono truncate">
                          https://{data.subdomain}.neurozy.site › {data.business.city.toLowerCase()}
                        </span>
                      </div>
                    </div>

                    {/* Clickable blue link */}
                    <div className="pt-0.5">
                      <h3 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                        {currentSeo.metaTitle || `${data.business.name} | Best ${data.business.categoryLabel} in ${data.business.city}`}
                      </h3>
                    </div>

                    {/* Snippet text */}
                    <p className="text-[11px] text-[#4d5156] leading-relaxed line-clamp-2">
                      {currentSeo.metaDescription || `${data.business.description} Order fresh products on WhatsApp or call store.`}
                    </p>

                    {/* Badges for Character Quality */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded ${
                          currentSeo.metaTitle.length >= 30 && currentSeo.metaTitle.length <= 60
                            ? 'bg-emerald-50 text-emerald-700 font-bold'
                            : 'bg-amber-50 text-amber-700 font-medium'
                        }`}>
                          Title: {currentSeo.metaTitle.length}/60 chars
                        </span>
                        <span className={`px-1.5 py-0.5 rounded ${
                          currentSeo.metaDescription.length >= 120 && currentSeo.metaDescription.length <= 160
                            ? 'bg-emerald-50 text-emerald-700 font-bold'
                            : 'bg-amber-50 text-amber-700 font-medium'
                        }`}>
                          Desc: {currentSeo.metaDescription.length}/160 chars
                        </span>
                      </div>
                      <span className="text-emerald-600 font-bold flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3 h-3" /> SEO Optimized
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1. Meta Title Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Page Meta Title <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoGenerateTitle}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Auto-Generate with AI</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={currentSeo.metaTitle}
                    onChange={(e) => updateSeo({ metaTitle: e.target.value })}
                    maxLength={70}
                    placeholder="e.g. Sweet Bites Bakery | Best Custom Birthday Cakes in Hazratganj, Lucknow"
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Target: 30–60 characters for optimal Google search rendering</span>
                    <span className="font-mono">{currentSeo.metaTitle.length}/60</span>
                  </div>
                </div>

                {/* 2. Meta Description Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Page Meta Description <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoGenerateDesc}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Auto-Generate with AI</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={currentSeo.metaDescription}
                    onChange={(e) => updateSeo({ metaDescription: e.target.value })}
                    maxLength={180}
                    placeholder="Summarize your shop's specialties, neighborhood, and call-to-action..."
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Target: 120–160 characters (shown in Google search result snippet)</span>
                    <span className="font-mono">{currentSeo.metaDescription.length}/160</span>
                  </div>
                </div>

                {/* 3. Target Keywords Section */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 block">
                    Target Search Keywords & Tags
                  </label>

                  {/* Active keywords chips */}
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    {currentSeo.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-2xs group"
                      >
                        <Tag className="w-3 h-3 text-indigo-500" />
                        <span>{kw}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(idx)}
                          className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5"
                          title="Remove keyword"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {currentSeo.keywords.length === 0 && (
                      <span className="text-slate-400 text-[11px] italic p-1">No keywords added yet.</span>
                    )}
                  </div>

                  {/* Add keyword input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add keyword (e.g. eggless cakes lucknow)..."
                      value={newKeywordInput}
                      onChange={(e) => setNewKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddKeyword(newKeywordInput);
                        }
                      }}
                      className="flex-1 p-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddKeyword(newKeywordInput)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors active:scale-95"
                    >
                      + Add
                    </button>
                  </div>

                  {/* Suggested Keywords based on industry & city */}
                  <div className="pt-1 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      Suggested Local Keywords for {data.business.categoryLabel}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {getIndustrySuggestedKeywords().map((suggested, idx) => {
                        const isAdded = currentSeo.keywords.includes(suggested);
                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={isAdded}
                            onClick={() => handleAddKeyword(suggested)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1 ${
                              isAdded
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default'
                                : 'bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 active:scale-95'
                            }`}
                          >
                            <span>{isAdded ? '✓ Added' : `+ ${suggested}`}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. Social Share Card (OpenGraph / WhatsApp) */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Social Share Card (WhatsApp / Facebook)</span>
                    </span>
                  </div>

                  {/* Simulated WhatsApp preview link card */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="rounded-xl overflow-hidden aspect-[16/9] bg-slate-200 relative">
                      <img
                        src={currentSeo.ogImage || data.business.heroImageUrl}
                        alt={currentSeo.metaTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono">
                        og:image
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {currentSeo.metaTitle || data.business.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {currentSeo.metaDescription}
                      </p>
                      <span className="text-[10px] font-mono text-emerald-600 font-semibold block mt-1">
                        {data.subdomain}.neurozy.site
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Social Share Image URL (OpenGraph Thumbnail):
                    </label>
                    <input
                      type="text"
                      value={currentSeo.ogImage || data.business.heroImageUrl}
                      onChange={(e) => updateSeo({ ogImage: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-lg text-[10px] font-mono text-slate-700"
                    />
                  </div>
                </div>

                {/* 5. Crawling & Schema.org Structured Data */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-800 block">
                    Search Engine Crawling & Rich Snippets
                  </span>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Allow Search Engine Indexing</span>
                      <span className="text-[10px] text-slate-500">
                        {currentSeo.robotsIndex ? 'robots: index, follow (Enabled)' : 'robots: noindex, nofollow (Hidden from Google)'}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={currentSeo.robotsIndex}
                      onChange={(e) => updateSeo({ robotsIndex: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                  </label>

                  {/* Schema.org LocalBusiness Rich Snippet Box */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="font-bold text-[11px] text-slate-800">
                          Schema.org JSON-LD Structured Data
                        </span>
                      </div>
                      <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                        LocalBusiness
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Embeds structured store opening hours, phone number, physical address, and review stars so Google displays rich knowledge cards for your local store.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        const schema = {
                          '@context': 'https://schema.org',
                          '@type': 'LocalBusiness',
                          name: data.business.name,
                          image: currentSeo.ogImage || data.business.heroImageUrl,
                          telephone: data.business.phone,
                          address: {
                            '@type': 'PostalAddress',
                            streetAddress: data.business.address,
                            addressLocality: data.business.city,
                            addressRegion: data.business.state,
                            postalCode: data.business.pincode,
                            addressCountry: 'IN'
                          },
                          openingHours: data.business.openingHours,
                          url: `https://${data.subdomain}.neurozy.site`
                        };
                        navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
                        setCopiedStructuredData(true);
                        setTimeout(() => setCopiedStructuredData(false), 2000);
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      {copiedStructuredData ? (
                        <span className="text-emerald-600 font-bold">✓ Copied Schema JSON-LD to clipboard</span>
                      ) : (
                        <span>Copy Schema.org JSON-LD</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Live Preview Canvas */}
        <div className="flex-1 bg-slate-200/80 p-4 lg:p-8 flex items-center justify-center overflow-y-auto">
          <div
            className={`transition-all duration-300 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-300/60 ${
              viewport === 'desktop'
                ? 'w-full max-w-[1200px] min-h-[780px]'
                : viewport === 'tablet'
                ? 'w-[768px] min-h-[780px]'
                : 'w-[375px] min-h-[720px] rounded-[36px] border-[6px] border-slate-800'
            }`}
          >
            {/* Viewport Header Bar */}
            <div className="bg-slate-900 text-slate-300 px-4 py-2 flex items-center justify-between text-[11px] font-mono border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-400">https://{data.subdomain}.neurozy.site</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">● Live Sync</span>
            </div>

            {/* Render Live Site inside frame */}
            <div className="max-h-[740px] overflow-y-auto">
              <LiveWebsiteRenderer website={data} isStandalone={false} onUpdateWebsite={setData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
