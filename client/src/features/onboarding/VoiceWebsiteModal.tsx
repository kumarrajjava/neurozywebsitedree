import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Sparkles, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  Volume2, 
  ChevronLeft,
  CreditCard,
  Zap,
  Repeat
} from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { extractBusinessFromTranscript, SAMPLE_VOICE_PRESETS } from '../../services/businessExtractor';
import { BusinessData, TemplateCategory, User } from '../../types';
import { TEMPLATES } from '../../templates/templateData';
import { SubscriptionModal } from '../../components/modals/SubscriptionModal';

interface VoiceWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWebsiteGenerated: (data: BusinessData) => void;
  user?: User | null;
  onUpdateUserPlan?: (plan: 'FREE' | 'STARTER' | 'BUSINESS' | 'PRO') => void;
}

export const VoiceWebsiteModal: React.FC<VoiceWebsiteModalProps> = ({
  isOpen,
  onClose,
  onWebsiteGenerated,
  user,
  onUpdateUserPlan
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<'hi-IN' | 'en-IN' | 'en-US'>('hi-IN');
  const [extractedData, setExtractedData] = useState<BusinessData | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('sweet-bites-bakery');
  const [generationProgress, setGenerationProgress] = useState(0);

  // Subscription Modal state inside wizard
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionContextProduct, setSubscriptionContextProduct] = useState<string>('');

  const {
    isListening,
    transcript,
    setTranscript,
    audioVolume,
    startListening,
    stopListening,
    resetTranscript,
    error: speechError
  } = useSpeechRecognition();

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setGenerationProgress(0);
    }
  }, [isOpen]);

  // Handle parsing transcript into business data
  const handleProceedToReview = (rawText: string) => {
    if (!rawText.trim()) return;
    const structured = extractBusinessFromTranscript(rawText);
    setExtractedData(structured);
    setSelectedTemplateId(structured.templateId);
    setStep(2);
  };

  // Step 4 Generation Animation
  useEffect(() => {
    if (step === 4 && extractedData) {
      setGenerationProgress(15);
      const timer1 = setTimeout(() => setGenerationProgress(50), 600);
      const timer2 = setTimeout(() => setGenerationProgress(85), 1300);
      const timer3 = setTimeout(() => {
        setGenerationProgress(100);
        setTimeout(() => {
          onWebsiteGenerated({
            ...extractedData,
            templateId: selectedTemplateId
          });
        }, 500);
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [step, extractedData, selectedTemplateId, onWebsiteGenerated]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
          
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center gap-3">
              <img src="/neurozy-logo.png" alt="Neurozy Logo" className="h-10 w-auto object-contain mix-blend-multiply" />
              <div className="border-l-2 border-slate-200 pl-3">
                <h3 className="font-extrabold text-slate-900 text-sm leading-tight">
                  Voice-to-Website Builder
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Step {step} of 4: {
                    step === 1 ? 'Describe Your Business' :
                    step === 2 ? 'Review Extracted Details & Products' :
                    step === 3 ? 'Choose Template & Theme' : 'Generating Your Live Website'
                  }
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">

            {/* ================= STEP 1: VOICE / TEXT INPUT ================= */}
            {step === 1 && (
              <div className="space-y-6">
                
                {/* Language Pills & Mic Status */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Universal Voice Engine:</span>
                  </div>
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setSelectedLanguage('hi-IN')}
                      className={`px-3 py-1.5 rounded-lg transition ${selectedLanguage === 'hi-IN' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      🇮🇳 Hinglish / Hindi
                    </button>
                    <button
                      onClick={() => setSelectedLanguage('en-IN')}
                      className={`px-3 py-1.5 rounded-lg transition ${selectedLanguage === 'en-IN' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      English (India)
                    </button>
                  </div>
                </div>

                {/* Pulsing Microphone Button with Audio Wave */}
                <div className="text-center py-4 flex flex-col items-center">
                  <div className="relative">
                    {isListening && (
                      <div className="absolute -inset-4 rounded-full bg-indigo-500/20 animate-ping" />
                    )}
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition transform active:scale-95 ${
                        isListening 
                          ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/40' 
                          : 'bg-gradient-to-tr from-[#6366F1] via-[#7C3AED] to-[#9333EA] hover:scale-105 shadow-indigo-500/40'
                      }`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-8 h-8 animate-bounce" />
                          <span className="text-[10px] font-bold mt-1">Tap to Stop</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-8 h-8" />
                          <span className="text-[10px] font-bold mt-1">Tap & Speak</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Animated Waveform Bars reacting to real audio */}
                  {isListening ? (
                    <div className="mt-4 flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1.5 h-10">
                        {[14, 28, 18, 32, 24, 16, 30, 20, 26, 15, 25].map((baseHeight, i) => {
                          const dynamicHeight = Math.max(10, Math.round(baseHeight * (0.5 + (audioVolume / 100))));
                          return (
                            <span
                              key={i}
                              className="w-1.5 bg-gradient-to-t from-indigo-600 to-purple-500 rounded-full transition-all duration-100"
                              style={{
                                height: `${dynamicHeight}px`
                              }}
                            />
                          );
                        })}
                      </div>
                      <span className="text-xs font-bold text-indigo-700 animate-pulse bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                        🎙️ Sun rahe hain... Bolte rahiye! (Listening...)
                      </span>
                    </div>
                  ) : (
                    <div className="mt-3 text-center space-y-1">
                      <p className="text-xs font-semibold text-slate-700">
                        Tap the microphone and describe your shop or business naturally.
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Works on all browsers • Hindi, Hinglish, or English
                      </p>
                    </div>
                  )}

                  {speechError && (
                    <p className="mt-2 text-xs text-rose-600 font-semibold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                      {speechError}
                    </p>
                  )}
                </div>

                {/* Live Transcript / Editable Text Area */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Your Speech Transcript / Business Description:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTranscript('Meri Hazratganj Lucknow mein Sweet Bites naam se bakery hai. Hum chocolate cakes, pastries aur customized birthday cakes banate hain. WhatsApp order available hai 9876543210 par. Timing subah 9 se raat 10 baje tak.')}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200 transition"
                      >
                        🎙️ Auto-Fill Sample Voice
                      </button>
                      {transcript && (
                        <button
                          onClick={resetTranscript}
                          className="text-slate-400 hover:text-slate-600 flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Clear
                        </button>
                      )}
                    </div>
                  </div>
                  <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="e.g. Meri Hazratganj Lucknow mein Sweet Bites naam se bakery hai. Hum chocolate cakes, pastries aur cookies banate hain. WhatsApp order available hai 9876543210 par. Timing 9 AM to 10 PM..."
                    rows={4}
                    className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none shadow-inner"
                  />
                </div>

                {/* Quick Sample Presets */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-slate-500">Or Pick a Real Lucknow Business Preset:</span>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_VOICE_PRESETS.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => setTranscript(preset.transcript)}
                        className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition font-medium text-slate-700"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ================= STEP 2: REVIEW EXTRACTED DETAILS ================= */}
            {step === 2 && extractedData && (
              <div className="space-y-4">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    <strong>Success!</strong> Business information extracted automatically. Review and tweak if needed:
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Business / Shop Name</label>
                    <input
                      type="text"
                      value={extractedData.name}
                      onChange={(e) => setExtractedData({ ...extractedData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={extractedData.category}
                      onChange={(e) => setExtractedData({ ...extractedData, category: e.target.value as TemplateCategory })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none capitalize bg-white"
                    >
                      <option value="bakery">Bakery & Cafe</option>
                      <option value="clothing">Clothing & Boutique</option>
                      <option value="salon">Salon & Spa</option>
                      <option value="restaurant">Restaurant & Dine</option>
                      <option value="coaching">Coaching Centre</option>
                      <option value="service">Local Home Services</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={extractedData.tagline}
                      onChange={(e) => setExtractedData({ ...extractedData, tagline: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={extractedData.phone}
                      onChange={(e) => setExtractedData({ ...extractedData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">WhatsApp Number (Orders)</label>
                    <input
                      type="text"
                      value={extractedData.whatsappNumber}
                      onChange={(e) => setExtractedData({ ...extractedData, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">City / Area</label>
                    <input
                      type="text"
                      value={extractedData.address}
                      onChange={(e) => setExtractedData({ ...extractedData, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-medium focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Free Subdomain</label>
                    <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                      <input
                        type="text"
                        value={extractedData.subdomain}
                        onChange={(e) => setExtractedData({ ...extractedData, subdomain: e.target.value })}
                        className="w-full p-2.5 font-mono text-xs bg-transparent outline-none"
                      />
                      <span className="text-[11px] font-bold text-slate-500 pr-2.5">.neurozy.site</span>
                    </div>
                  </div>
                </div>

                {/* ================= AUTO-GENERATED CATALOG OFFERINGS WITH SUBSCRIPTION OPTION ================= */}
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <label className="font-bold text-slate-900 text-xs block">
                        Auto-Generated Catalog Offerings ({extractedData.products.length} items):
                      </label>
                      <p className="text-[11px] text-slate-500">
                        Products extracted from your speech with realistic prices in ₹ INR.
                      </p>
                    </div>

                    {/* Prominent Subscription Action Pill */}
                    <button
                      type="button"
                      onClick={() => {
                        setSubscriptionContextProduct('');
                        setIsSubscriptionModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-xs shadow hover:opacity-95 transition flex items-center gap-1.5 transform active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Subscription Lena Hai (₹199/mo)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Individual Items List with Clickable Subscription Options */}
                  <div className="space-y-2">
                    {extractedData.products.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs shadow-sm group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-slate-200" 
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 block truncate group-hover:text-indigo-600 transition-colors">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-slate-500">{item.category} • In Stock</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                          <div className="font-black text-slate-900 text-sm">
                            ₹{item.price.toLocaleString('en-IN')}
                          </div>

                          {/* Click to enable customer recurring order / subscription on this product */}
                          <button
                            type="button"
                            onClick={() => {
                              setSubscriptionContextProduct(item.name);
                              setIsSubscriptionModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-white border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700 font-extrabold text-[11px] transition shadow-xs flex items-center gap-1.5"
                            title={`Click to set up customer subscription plan for ${item.name}`}
                          >
                            <Repeat className="w-3 h-3 text-indigo-500" />
                            <span>Subscribe Option</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Featured Subscription Callout Banner */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm mt-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#9333EA] text-white flex items-center justify-center font-black shadow-md flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-slate-900 text-xs">Want Unlimited Products & Customer Subscriptions?</span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-black uppercase">MSME PERK</span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          Accept weekly cake deliveries, monthly salon memberships & unlimited catalog items.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSubscriptionContextProduct('');
                        setIsSubscriptionModalOpen(true);
                      }}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition whitespace-nowrap flex items-center justify-center gap-1.5 self-start sm:self-auto"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Upgrade Plan (₹199)</span>
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* ================= STEP 3: TEMPLATE & THEME SELECTION ================= */}
            {step === 3 && extractedData && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Choose Website Template</h4>
                  <p className="text-xs text-slate-500">
                    Select a tailored layout. You can switch anytime without losing your business data.
                  </p>
                </div>

                {/* Template Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {TEMPLATES.map((tmpl) => {
                    const isSelected = selectedTemplateId === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => {
                          setSelectedTemplateId(tmpl.id);
                          setExtractedData({ ...extractedData, primaryColor: tmpl.defaultPrimaryColor });
                        }}
                        className={`cursor-pointer rounded-2xl border-2 p-3 transition-all relative overflow-hidden flex gap-3 ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/40 shadow-md ring-2 ring-indigo-200' 
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <img 
                          src={tmpl.previewImage} 
                          alt={tmpl.name} 
                          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-indigo-600 uppercase">
                              {tmpl.category}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-slate-900 text-xs truncate mt-0.5">{tmpl.name}</h5>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{tmpl.tagline}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Primary Color Palette */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-700 block mb-2">Accent Brand Color:</span>
                  <div className="flex items-center gap-3">
                    {[
                      { color: '#4F46E5', label: 'Indigo' },
                      { color: '#7C3AED', label: 'Violet' },
                      { color: '#E11D48', label: 'Rose' },
                      { color: '#DB2777', label: 'Pink' },
                      { color: '#D97706', label: 'Amber' },
                      { color: '#059669', label: 'Emerald' },
                      { color: '#0F172A', label: 'Slate' }
                    ].map((swatch) => (
                      <button
                        key={swatch.color}
                        onClick={() => setExtractedData({ ...extractedData, primaryColor: swatch.color })}
                        className={`w-8 h-8 rounded-full border-2 transition transform hover:scale-110 flex items-center justify-center ${
                          extractedData.primaryColor === swatch.color ? 'border-slate-900 shadow-md ring-2 ring-offset-2 ring-indigo-500' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: swatch.color }}
                        title={swatch.label}
                      >
                        {extractedData.primaryColor === swatch.color && (
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ================= STEP 4: GENERATING LOADER ================= */}
            {step === 4 && (
              <div className="py-12 text-center space-y-6">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-pulse" />
                  <div className="w-full h-full rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-indigo-600 animate-bounce" />
                  </div>
                </div>

                <div className="space-y-2 max-w-sm mx-auto">
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {generationProgress < 40 && 'Analyzing business essence...'}
                    {generationProgress >= 40 && generationProgress < 80 && 'Generating responsive website layout...'}
                    {generationProgress >= 80 && 'Connecting WhatsApp order button...'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Synthesizing professional copy, catalog items, and mobile components.
                  </p>
                </div>

                {/* Progress counter */}
                <div className="w-full max-w-xs mx-auto bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Controls */}
          {step !== 4 && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep((prev) => (prev - 1) as any)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
              )}

              {step === 1 && (
                <button
                  disabled={!transcript.trim()}
                  onClick={() => handleProceedToReview(transcript)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] text-white font-bold text-xs shadow-md hover:shadow-indigo-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5"
                >
                  <span>Process Speech & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] text-white font-bold text-xs shadow-md hover:shadow-indigo-500/25 transition flex items-center gap-1.5"
                >
                  <span>Choose Template</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 3 && (
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md hover:shadow-emerald-500/25 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate My Website</span>
                </button>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Subscription Modal Popup */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        user={user || null}
        productContext={subscriptionContextProduct}
        onPlanSelected={(plan) => {
          if (onUpdateUserPlan) {
            onUpdateUserPlan(plan);
          }
        }}
      />
    </>
  );
};
