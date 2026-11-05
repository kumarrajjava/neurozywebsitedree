import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Sparkles, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  Store, 
  Phone, 
  MapPin, 
  Clock, 
  Palette,
  ChevronLeft
} from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { extractBusinessFromTranscript, SAMPLE_VOICE_PRESETS } from '../../services/businessExtractor';
import { BusinessData, WebsiteTemplate, TemplateCategory } from '../../types';
import { TEMPLATES } from '../../templates/templateData';

interface VoiceWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWebsiteGenerated: (data: BusinessData) => void;
}

export const VoiceWebsiteModal: React.FC<VoiceWebsiteModalProps> = ({
  isOpen,
  onClose,
  onWebsiteGenerated
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<'hi-IN' | 'en-IN' | 'en-US'>('hi-IN');
  const [extractedData, setExtractedData] = useState<BusinessData | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('sweet-bites-bakery');
  const [generationProgress, setGenerationProgress] = useState(0);

  const {
    isListening,
    transcript,
    setTranscript,
    isSupported,
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
      if (!transcript) {
        // Pre-fill with Hazratganj bakery sample for immediate delight if desired
      }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#7C3AED] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                Neurozy Voice-to-Website Builder
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Step {step} of 4: {
                  step === 1 ? 'Describe Your Business' :
                  step === 2 ? 'Review Extracted Details' :
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
              
              {/* Language Pills */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-slate-700">Choose Speaking Language:</span>
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

              {/* Pulsing Microphone Button */}
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

                {/* Animated Waveform Bars when listening */}
                {isListening ? (
                  <div className="mt-4 flex items-center gap-1 h-8">
                    {[12, 24, 16, 28, 20, 14, 26, 18, 22].map((height, i) => (
                      <span
                        key={i}
                        className="w-1.5 bg-indigo-600 rounded-full wave-bar"
                        style={{
                          height: `${height}px`,
                          animationDelay: `${i * 0.15}s`
                        }}
                      />
                    ))}
                    <span className="text-xs font-bold text-indigo-600 ml-2 animate-pulse">
                      Listening... Bolte rahiye!
                    </span>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-slate-500">
                    Press the microphone and speak naturally in Hindi, Hinglish, or English.
                  </p>
                )}

                {speechError && (
                  <p className="mt-2 text-xs text-rose-500 font-semibold bg-rose-50 px-3 py-1 rounded-lg">
                    {speechError}
                  </p>
                )}
              </div>

              {/* Live Transcript / Editable Text Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Your Speech Transcript / Business Description:</span>
                  {transcript && (
                    <button
                      onClick={resetTranscript}
                      className="text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Clear
                    </button>
                  )}
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
                <span className="text-xs font-bold text-slate-500">Or Try a Real Lucknow Business Preset:</span>
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

              {/* Extracted Sample Products Preview */}
              <div className="pt-2">
                <label className="font-bold text-slate-700 text-xs block mb-2">
                  Auto-Generated Catalog Offerings ({extractedData.products.length} items):
                </label>
                <div className="space-y-1.5">
                  {extractedData.products.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="font-bold text-indigo-600">₹{item.price}</span>
                    </div>
                  ))}
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
  );
};
