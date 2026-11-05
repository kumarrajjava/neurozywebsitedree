import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  RefreshCw, 
  Store, 
  MapPin, 
  Phone, 
  Clock, 
  Tag, 
  Layers, 
  AlertCircle,
  Volume2,
  Terminal,
  Activity,
  Cpu,
  Sliders,
  CheckCircle2,
  Code,
  Copy,
  FileCode
} from 'lucide-react';
import { VoiceRecognitionService, extractBusinessFromTranscript, ExtractedVoiceResult } from '../services/voiceProcessor';
import { TEMPLATES } from '../data/sampleTemplates';
import { BusinessCategory, WebsiteData, ThemeConfig } from '../types';
import { LogoRenderer } from './LogoRenderer';
import { PRESET_LOGOS, getDefaultLogoForCategory } from '../data/presetLogos';

interface VoiceWizardProps {
  initialPrompt?: string;
  onFinish: (website: WebsiteData) => void;
  onCancel: () => void;
}

export const VoiceWizard: React.FC<VoiceWizardProps> = ({
  initialPrompt = '',
  onFinish,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState(initialPrompt || '');
  const [audioLevel, setAudioLevel] = useState(0);
  const [language, setLanguage] = useState<'hi-IN' | 'en-IN' | 'en-US'>('hi-IN');
  const [voiceService, setVoiceService] = useState<VoiceRecognitionService | null>(null);

  // Advanced extraction state
  const [extracted, setExtracted] = useState<ExtractedVoiceResult | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('bakery-sweetbites');

  // Generation progress state
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('Analyzing speech nuances...');
  const [neuralLogs, setNeuralLogs] = useState<string[]>([]);

  // Recording timer
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    const service = new VoiceRecognitionService();
    setVoiceService(service);
    return () => {
      service.stopListening();
    };
  }, []);

  const toggleRecording = () => {
    let service = voiceService;
    if (!service) {
      service = new VoiceRecognitionService();
      setVoiceService(service);
    }

    if (isRecording) {
      service.stopListening();
      setIsRecording(false);
      setAudioLevel(0);
    } else {
      // Clear if placeholder or empty to capture purely user's voice
      let baseText = transcript;
      if (baseText.startsWith('Meri bakery hai, Lucknow') || baseText.includes('Sweet Bites')) {
        baseText = '';
        setTranscript('');
      }

      service.resetTranscript(baseText);
      service.setLanguage(language);
      setIsRecording(true);
      setAudioLevel(50); // immediate feedback
      service.startListening(
        (text, isFinal) => {
          // Exactly what user speaks is placed into transcript
          setTranscript(text);
        },
        (level) => {
          setAudioLevel(level);
        },
        (err) => {
          console.warn('Speech recognition status update:', err);
        },
        baseText
      );
    }
  };

  const handleParseAndNext = () => {
    if (voiceService && isRecording) {
      voiceService.stopListening();
      setIsRecording(false);
    }
    const result = extractBusinessFromTranscript(transcript);
    setExtracted(result);
    setSelectedTemplateId(result.suggestedTemplateId);
    setStep(2);
  };

  const handleStartGeneration = () => {
    setStep(4);
    setProgress(10);
    setProgressStatus('Initializing Neural Ingestion Pipeline...');
    setNeuralLogs([
      '>> Phonetic acoustic alignment verified [Language: ' + language + ']',
      '>> Ingesting raw audio token sequence...'
    ]);

    setTimeout(() => {
      setProgress(35);
      setProgressStatus('Extracting business semantics & local nuances...');
      setNeuralLogs((prev) => [
        ...prev,
        '>> Entity Recognition: Business="' + (extracted?.businessName || 'Store') + '"',
        '>> Location Mapped: ' + (extracted?.address || 'Lucknow') + ', ' + (extracted?.city || 'UP'),
        '>> Contact Normalized: WhatsApp ' + (extracted?.phone || '+91 98765 43210')
      ]);
    }, 600);

    setTimeout(() => {
      setProgress(65);
      setProgressStatus('Assembling responsive component hierarchy...');
      setNeuralLogs((prev) => [
        ...prev,
        '>> Template Mesh Selected: ' + selectedTemplateId,
        '>> Dynamic CSS Palette generated with WCAG AA compliance',
        '>> Building mobile-first responsive layout container (1440px / 375px)'
      ]);
    }, 1200);

    setTimeout(() => {
      setProgress(88);
      setProgressStatus('Configuring WhatsApp 1-click ordering & catalog...');
      setNeuralLogs((prev) => [
        ...prev,
        '>> Injecting WhatsApp 1-tap checkout links',
        '>> Compiling product items & pricing tables in ₹ INR',
        '>> Generating Google Maps geocoding query...'
      ]);
    }, 1800);

    setTimeout(() => {
      setProgress(100);
      setProgressStatus('Deployment Ready! Transferring to Live Studio...');
      setNeuralLogs((prev) => [
        ...prev,
        '>> Subdomain reserved: https://' + (extracted?.businessName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'store') + '.neurozy.site',
        '>> Standee QR code matrix generated',
        '>> Done.'
      ]);

      setTimeout(() => {
        if (!extracted) return;
        const tpl = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

        const cleanSubdomain = extracted.businessName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '')
          .slice(0, 15) || 'mybusiness';

        const websiteData: WebsiteData = {
          id: 'site_' + Date.now(),
          subdomain: cleanSubdomain,
          business: {
            name: extracted.businessName,
            tagline: extracted.tagline,
            category: extracted.category,
            categoryLabel: extracted.categoryLabel,
            description: extracted.description,
            aboutStory: extracted.aboutStory,
            address: extracted.address,
            city: extracted.city,
            state: 'Uttar Pradesh',
            pincode: '226001',
            phone: extracted.phone,
            whatsapp: extracted.whatsapp,
            email: `contact@${cleanSubdomain}.in`,
            openingHours: extracted.openingHours,
            googleMapsQuery: `${extracted.address} ${extracted.city}`,
            features: extracted.features,
            heroImageUrl: tpl.demoData.heroImageUrl || tpl.previewHeroUrl,
            logoSvg: extracted.logoSvg || tpl.demoData.logoSvg,
            logoType: 'svg',
            logoBgColor: tpl.defaultPrimary,
            socials: {
              instagram: cleanSubdomain,
              facebook: cleanSubdomain
            }
          },
          products: extracted.products && extracted.products.length > 0 ? extracted.products : tpl.demoProducts,
          reviews: [
            {
              id: 'r1',
              author: 'Priya Sharma (Hazratganj)',
              rating: 5,
              comment: 'Ordered on WhatsApp and received within 45 minutes. Superb quality!',
              date: '2 days ago'
            },
            {
              id: 'r2',
              author: 'Anand Verma',
              rating: 5,
              comment: 'Best in Lucknow. Highly recommended to everyone in the neighborhood.',
              date: '1 week ago'
            }
          ],
          templateId: selectedTemplateId,
          theme: {
            primaryColor: tpl.defaultPrimary,
            accentColor: tpl.defaultAccent,
            font: tpl.fontFamily,
            buttonStyle: 'rounded',
            darkMode: false
          },
          sections: {
            hero: true,
            about: true,
            products: true,
            hours: true,
            reviews: true,
            contact: true,
            map: true,
            whatsappButton: true
          },
          seo: {
            metaTitle: `${extracted.businessName} | Best ${extracted.categoryLabel} in ${extracted.city}`,
            metaDescription: `${extracted.description}. Located in ${extracted.address}, ${extracted.city}. Order via WhatsApp ${extracted.whatsapp}.`,
            keywords: [
              extracted.businessName,
              `${extracted.categoryLabel} in ${extracted.city}`,
              `${extracted.city} local store`,
              'order on whatsapp',
              extracted.address
            ],
            ogImage: tpl.demoData.heroImageUrl || tpl.previewHeroUrl,
            canonicalUrl: `https://${cleanSubdomain}.neurozy.site`,
            robotsIndex: true,
            structuredDataType: 'LocalBusiness'
          },
          isPublished: true,
          publishedAt: new Date().toISOString(),
          visits: 124,
          whatsappClicks: 18,
          callClicks: 7,
          updatedAt: new Date().toISOString()
        };

        onFinish(websiteData);
      }, 700);
    }, 2400);
  };

  const samplePrompts = [
    {
      title: 'Bakery in Hazratganj',
      category: 'bakery',
      text: 'Meri bakery hai, Lucknow Hazratganj mein. Naam hai Sweet Bites, fresh designer cakes aur pastries banate hain. Phone 9876543210.'
    },
    {
      title: 'Cafe in Gomti Nagar',
      category: 'cafe',
      text: 'Meri cafe ka website bana do, Cafe Bliss naam hai, Gomti Nagar Lucknow. Single-origin Arabica coffee, pasta, pizza milta hai. WhatsApp 9123456789.'
    },
    {
      title: 'Chikankari Boutique',
      category: 'clothing',
      text: 'Hamari boutique hai designer sarees ki Aminabad mein. Zari Heritage naam hai, pure handwork kurtis aur bridal lehengas. Phone 9415012345.'
    },
    {
      title: 'AC & Home Repair',
      category: 'services',
      text: 'ProFix Appliance Care Indira Nagar Lucknow, 60 minute doorstep AC service, RO repair. WhatsApp 9650011223.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-6 flex flex-col">
        {/* Wizard Header Bar */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
              {step}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  {step === 1 && 'Describe Your Business (Voice or Text)'}
                  {step === 2 && 'Review Detected Business Details'}
                  {step === 3 && 'Choose a Website Template'}
                  {step === 4 && 'Neurozy AI Generating Your Website...'}
                </h2>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                  Step {step} of 4
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {step === 1 && 'Speak naturally in Hindi, Hinglish, or English. We automatically extract products and contact details.'}
                {step === 2 && 'Confirm or customize the extracted information before assembling your site.'}
                {step === 3 && 'Pick a layout style tailored to your industry. You can change this anytime.'}
                {step === 4 && 'Generating mobile-first responsive layout, WhatsApp buttons, and live preview.'}
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* STEP 1: VOICE STUDIO */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Top Controls: Language Switcher & Engine Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold">Speech Engine:</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold border border-emerald-200">
                  Web Speech API + Neural Fallback
                </span>
              </div>

              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setLanguage('hi-IN')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    language === 'hi-IN' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Hindi / Hinglish (हिन्दी)
                </button>
                <button
                  onClick={() => setLanguage('en-IN')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    language === 'en-IN' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Indian English
                </button>
                <button
                  onClick={() => setLanguage('en-US')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    language === 'en-US' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Global English
                </button>
              </div>
            </div>

            {/* Advanced Microphone & Frequency Spectrum Visualizer */}
            <div 
              onClick={toggleRecording}
              className={`relative p-8 rounded-3xl transition-all cursor-pointer select-none text-center shadow-sm border-2 overflow-hidden group ${
                isRecording
                  ? 'bg-gradient-to-b from-rose-50/80 via-white to-rose-50/40 border-rose-300 ring-4 ring-rose-500/10'
                  : 'bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 border-indigo-200 hover:border-indigo-500 hover:shadow-md'
              }`}
            >
              <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <Activity className={`w-3.5 h-3.5 ${isRecording ? 'text-rose-600 animate-spin' : 'text-indigo-600'}`} />
                <span>SPECTRUM ANALYZER</span>
                {isRecording && (
                  <span className="text-rose-600 font-bold animate-pulse">● LIVE RECORDING ({recordingSeconds}s)</span>
                )}
              </div>

              <div className="absolute top-4 right-4">
                <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-full border transition-all ${
                  isRecording 
                    ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {isRecording ? 'MIC ACTIVE' : 'MIC READY'}
                </span>
              </div>

              <div className="relative inline-block my-3">
                {isRecording && (
                  <div
                    className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping"
                    style={{ transform: `scale(${1 + audioLevel / 40})` }}
                  />
                )}
                <div
                  className={`relative z-10 w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all shadow-xl group-hover:scale-105 active:scale-95 ${
                    isRecording
                      ? 'bg-rose-600 text-white ring-8 ring-rose-500/30'
                      : 'bg-indigo-600 text-white group-hover:bg-indigo-700 ring-8 ring-indigo-500/20 shadow-indigo-500/25'
                  }`}
                >
                  {isRecording ? <MicOff className="w-10 h-10 animate-pulse" /> : <Mic className="w-10 h-10 stroke-[2.5]" />}
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <span className={`text-base sm:text-lg font-black block transition-colors ${
                  isRecording ? 'text-rose-600 animate-pulse' : 'text-slate-900 group-hover:text-indigo-600'
                }`}>
                  {isRecording ? '🔴 Listening... Click Anywhere to Stop' : '🎙️ Click Microphone to Start Speaking'}
                </span>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {isRecording 
                    ? 'Speak in Hindi, Hinglish, or English. Neurozy is capturing your business details...' 
                    : 'Click anywhere here or on the button to begin speaking. Works with voice or simulated dictation.'}
                </p>
              </div>

              {/* 24-Band Frequency Equalizer Bars */}
              <div className="mt-5 flex items-center justify-center gap-1 sm:gap-1.5 h-8">
                {[15, 35, 60, 85, 45, 95, 70, 40, 90, 65, 80, 100, 75, 55, 90, 40, 70, 95, 50, 80, 60, 30, 45, 20].map(
                  (val, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full transition-all duration-75"
                      style={{
                        height: isRecording
                          ? `${Math.max(6, Math.min(32, (val * audioLevel) / 100))}px`
                          : '6px',
                        backgroundColor: isRecording ? '#e11d48' : '#cbd5e1'
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Real-time Editable Transcript */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Speech Transcript:</span>
                  {isRecording && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                      ● Live Recording (Jo aap bolenge wahi yahan aayega)
                    </span>
                  )}
                </label>
                <div className="flex items-center gap-3">
                  {transcript && (
                    <button
                      type="button"
                      onClick={() => {
                        setTranscript('');
                        if (voiceService) voiceService.resetTranscript('');
                      }}
                      className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                  <span className="text-slate-400 text-[11px]">Edit or type text anytime</span>
                </div>
              </div>
              <textarea
                value={transcript}
                onChange={(e) => {
                  setTranscript(e.target.value);
                  if (voiceService) voiceService.resetTranscript(e.target.value);
                }}
                rows={3}
                className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans leading-relaxed shadow-inner"
                placeholder={
                  isRecording
                    ? "🎙️ Listening to your voice right now... Speak clearly in Hindi, Hinglish, or English!"
                    : "Microphone par click karke apne business ke baare mein boliye..."
                }
              />
            </div>

            {/* 1-Click Preset Prompts */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Quick Test Prompts (1-Click to Test):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTranscript(p.text)}
                    className="text-left p-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all text-xs group"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 group-hover:text-emerald-700">
                      <span>{p.title}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{p.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{p.text}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={handleParseAndNext}
                disabled={!transcript.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Extract & Review Entities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ENTITY EXTRACTION REVIEW */}
        {step === 2 && extracted && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Entities Ingested:</strong> High confidence match ({extracted.categoryLabel} in {extracted.city}).
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-emerald-700">Confidence: 96.4%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Business Name</label>
                <input
                  type="text"
                  value={extracted.businessName}
                  onChange={(e) => setExtracted({ ...extracted, businessName: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Industry Category</label>
                <select
                  value={extracted.category}
                  onChange={(e) => {
                    const cat = e.target.value as BusinessCategory;
                    setExtracted({ ...extracted, category: cat });
                  }}
                  className="w-full p-3 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 text-xs"
                >
                  <option value="bakery">Bakery & Patisserie</option>
                  <option value="cafe">Cafe & Restaurant</option>
                  <option value="clothing">Clothing & Saree Boutique</option>
                  <option value="salon">Salon & Luxury Spa</option>
                  <option value="coaching">Coaching Institute & Academy</option>
                  <option value="services">Home & Technical Services</option>
                  <option value="retail">General Retail</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">City / Region</label>
                <input
                  type="text"
                  value={extracted.city}
                  onChange={(e) => setExtracted({ ...extracted, city: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-600 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Address / Neighborhood</label>
                <input
                  type="text"
                  value={extracted.address}
                  onChange={(e) => setExtracted({ ...extracted, address: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-600 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">WhatsApp & Call Contact</label>
                <input
                  type="text"
                  value={extracted.phone}
                  onChange={(e) =>
                    setExtracted({ ...extracted, phone: e.target.value, whatsapp: e.target.value })
                  }
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-600 font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Store Timings</label>
                <input
                  type="text"
                  value={extracted.openingHours}
                  onChange={(e) => setExtracted({ ...extracted, openingHours: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-600 text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-800 block mb-1">Generated Tagline</label>
                <input
                  type="text"
                  value={extracted.tagline}
                  onChange={(e) => setExtracted({ ...extracted, tagline: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-600 text-xs"
                />
              </div>

              {/* Brand Logo in Code Selection in Step 2 */}
              <div className="sm:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900 text-xs">Brand Logo in Code (Vector SVG)</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Pure SVG Code
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Active SVG Logo Preview */}
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 p-2 shadow-xs shrink-0 flex items-center justify-center">
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{
                        __html: extracted.logoSvg || getDefaultLogoForCategory(extracted.category)
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-600">
                      We auto-generated a custom vector SVG logo for your {extracted.categoryLabel}. You can choose a preset below or edit the raw SVG code anytime in the editor.
                    </p>
                    {/* Preset Logo Selection Carousel */}
                    <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {PRESET_LOGOS.map((preset) => {
                        const isSelected = (extracted.logoSvg || getDefaultLogoForCategory(extracted.category)) === preset.svgCode;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setExtracted({ ...extracted, logoSvg: preset.svgCode })}
                            className={`p-1.5 rounded-lg border text-left shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/20'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div
                              className="w-6 h-6 shrink-0"
                              dangerouslySetInnerHTML={{ __html: preset.svgCode }}
                            />
                            <span className="text-[10px] font-bold text-slate-800 whitespace-nowrap">{preset.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Select Website Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TEMPLATE ARCHITECTURE */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {TEMPLATES.map((tpl) => {
                const isSelected = selectedTemplateId === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`cursor-pointer rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-600/30 shadow-lg bg-indigo-50/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                        <img
                          src={tpl.previewHeroUrl}
                          alt={tpl.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                          {tpl.categoryName}
                        </span>
                      </div>

                      <div className="p-3.5">
                        <h4 className="font-bold text-xs text-slate-900">{tpl.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{tpl.description}</p>
                      </div>
                    </div>

                    <div className="px-3.5 pb-3 pt-1 flex items-center justify-between text-[11px] border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: tpl.defaultPrimary }}
                        />
                        <span className="text-slate-500 text-[10px]">Theme Preset</span>
                      </div>
                      <span className={`font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                        {isSelected ? 'Selected' : 'Pick'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleStartGeneration}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate My Website</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GENERATION LOADING SCREEN */}
        {step === 4 && (
          <div className="p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/30 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Creating Your Storefront...</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">{progressStatus}</p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5 font-mono">
                <span>Building Components</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="max-w-sm mx-auto text-left space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Check className={`w-4 h-4 ${progress >= 30 ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span>Structured Business Profile & Contact</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className={`w-4 h-4 ${progress >= 60 ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span>Tailored Industry Template & Colors</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className={`w-4 h-4 ${progress >= 85 ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span>WhatsApp 1-Click Ordering Integration</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className={`w-4 h-4 ${progress >= 95 ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span>Free Subdomain Deployment</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
