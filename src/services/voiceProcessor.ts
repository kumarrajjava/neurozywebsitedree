import { BusinessCategory, BusinessInfo, ProductItem } from '../types';
import { TEMPLATES } from '../data/sampleTemplates';

export interface ExtractedVoiceResult {
  businessName: string;
  category: BusinessCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  aboutStory: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  openingHours: string;
  features: string[];
  suggestedTemplateId: string;
  products: ProductItem[];
  rawTranscript: string;
  logoSvg?: string;
}

import { getDefaultLogoForCategory } from '../data/presetLogos';

export class VoiceRecognitionService {
  private recognition: any = null;
  private isListening: boolean = false;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private animFrameId: number | null = null;
  private simIntervalId: any = null;
  private waveIntervalId: any = null;
  private currentLanguage: 'hi-IN' | 'en-IN' | 'en-US' = 'hi-IN';

  private accumulatedTranscript: string = '';

  constructor() {
    // Check support
  }

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public setLanguage(lang: 'hi-IN' | 'en-IN' | 'en-US') {
    this.currentLanguage = lang;
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  /**
   * Reset accumulated speech buffer
   */
  public resetTranscript(initialText: string = '') {
    this.accumulatedTranscript = initialText;
  }

  public async startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onAudioLevel?: (level: number) => void,
    onError?: (error: any) => void,
    initialTranscript: string = ''
  ): Promise<void> {
    if (this.isListening) return;
    this.isListening = true;
    this.accumulatedTranscript = initialTranscript;

    // Start Web Audio API for live frequency animation
    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);

        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        const checkLevel = () => {
          if (!this.analyser || !this.isListening) return;
          this.analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          const normalized = Math.min(100, Math.round((avg / 128) * 100));
          if (onAudioLevel) onAudioLevel(Math.max(12, normalized));
          this.animFrameId = requestAnimationFrame(checkLevel);
        };
        checkLevel();
      }
    } catch (err) {
      console.warn('Microphone audio stream visualizer note:', err);
      // Continuous waveform fallback
      let wavePhase = 0;
      this.waveIntervalId = setInterval(() => {
        if (!this.isListening) return;
        wavePhase += 0.25;
        const fakeLevel = Math.round(30 + Math.sin(wavePhase) * 20 + Math.random() * 25);
        if (onAudioLevel) onAudioLevel(fakeLevel);
      }, 100);
    }

    // Initialize native Web Speech API recognition
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      const errMsg = 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari, or type your business details directly.';
      console.warn(errMsg);
      if (onError) onError(new Error(errMsg));
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = this.currentLanguage;

      this.recognition.onresult = (event: any) => {
        let currentInterim = '';
        let newFinal = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            newFinal += item[0].transcript + ' ';
          } else {
            currentInterim += item[0].transcript;
          }
        }

        if (newFinal) {
          this.accumulatedTranscript = (this.accumulatedTranscript ? this.accumulatedTranscript + ' ' : '') + newFinal.trim();
        }

        const liveCombined = (this.accumulatedTranscript ? this.accumulatedTranscript + ' ' : '') + currentInterim;
        onResult(liveCombined.trim(), !!newFinal);
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Native speech recognition event:', event.error);
        if (event.error === 'not-allowed') {
          if (onError) onError(new Error('Microphone permission denied. Please allow microphone in your browser to speak.'));
        }
      };

      this.recognition.onend = () => {
        // If user is still recording, automatically restart to keep continuous listening active
        if (this.isListening) {
          try {
            this.recognition.start();
          } catch {
            // Already started or restarting
          }
        }
      };

      this.recognition.start();
    } catch (err) {
      console.error('Failed to initialize speech recognition:', err);
      if (onError) onError(err);
    }
  }

  /**
   * Streams speech text word-by-word with realistic cadence if mic hardware is denied in iframe
   */
  public triggerSpeechSimulation(
    onResult: (transcript: string, isFinal: boolean) => void,
    customPrompt?: string
  ) {
    if (this.simIntervalId) clearInterval(this.simIntervalId);

    const defaultScript =
      customPrompt ||
      (this.currentLanguage === 'hi-IN'
        ? 'Meri bakery hai, Lucknow Hazratganj mein. Naam hai Sweet Bites, fresh chocolate cakes, designer birthday pastries aur butter cookies banate hain. WhatsApp number 9876543210 hai. Subah 10 baje se raat 10 baje tak open rehti hai.'
        : 'I run a cafe in Gomti Nagar Lucknow named Cafe Bliss. We brew single origin arabica coffee, artisanal pizzas and pasta. Call or WhatsApp 9123456789. Open all days from 9am to 11pm.');

    const words = defaultScript.split(' ');
    let currentIndex = 0;
    let accumulated = '';

    this.simIntervalId = setInterval(() => {
      if (!this.isListening) {
        clearInterval(this.simIntervalId);
        return;
      }
      if (currentIndex < words.length) {
        accumulated += (currentIndex > 0 ? ' ' : '') + words[currentIndex];
        currentIndex++;
        onResult(accumulated, currentIndex >= words.length);
      } else {
        clearInterval(this.simIntervalId);
      }
    }, 280);
  }

  public stopListening(): void {
    this.isListening = false;
    if (this.simIntervalId) {
      clearInterval(this.simIntervalId);
      this.simIntervalId = null;
    }
    if (this.waveIntervalId) {
      clearInterval(this.waveIntervalId);
      this.waveIntervalId = null;
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
  }
}

/**
 * Intelligent multilingual speech-to-business information parser.
 * Understands Hindi, Hinglish, and English transcripts with smart extraction of:
 * - Business Name
 * - Category
 * - Location / City / Neighborhood
 * - Phone & WhatsApp numbers
 * - Opening hours
 * - Products & Services
 */
export function extractBusinessFromTranscript(text: string): ExtractedVoiceResult {
  const clean = text.trim();
  const lower = clean.toLowerCase();

  // 1. Detect Category
  let category: BusinessCategory = 'retail';
  let templateId = 'bakery-sweetbites';

  if (
    lower.includes('bakery') ||
    lower.includes('cake') ||
    lower.includes('pastry') ||
    lower.includes('bake') ||
    lower.includes('mithai') ||
    lower.includes('sweet')
  ) {
    category = 'bakery';
    templateId = 'bakery-sweetbites';
  } else if (
    lower.includes('cafe') ||
    lower.includes('coffee') ||
    lower.includes('restaurant') ||
    lower.includes('chai') ||
    lower.includes('tea') ||
    lower.includes('bistro') ||
    lower.includes('khana') ||
    lower.includes('pizza') ||
    lower.includes('burger')
  ) {
    category = 'cafe';
    templateId = 'cafe-bliss';
  } else if (
    lower.includes('boutique') ||
    lower.includes('cloth') ||
    lower.includes('kapde') ||
    lower.includes('saree') ||
    lower.includes('kurti') ||
    lower.includes('chikankari') ||
    lower.includes('fashion') ||
    lower.includes('garment') ||
    lower.includes('tailor')
  ) {
    category = 'clothing';
    templateId = 'fashion-boutique';
  } else if (
    lower.includes('salon') ||
    lower.includes('parlour') ||
    lower.includes('beauty') ||
    lower.includes('hair') ||
    lower.includes('spa') ||
    lower.includes('makeup') ||
    lower.includes('facial')
  ) {
    category = 'salon';
    templateId = 'salon-luxury';
  } else if (
    lower.includes('coaching') ||
    lower.includes('tuition') ||
    lower.includes('classes') ||
    lower.includes('academy') ||
    lower.includes('school') ||
    lower.includes('institute') ||
    lower.includes('jee') ||
    lower.includes('neet') ||
    lower.includes('cbse')
  ) {
    category = 'coaching';
    templateId = 'coaching-centre';
  } else if (
    lower.includes('service') ||
    lower.includes('repair') ||
    lower.includes('electrician') ||
    lower.includes('plumber') ||
    lower.includes('ac') ||
    lower.includes('mechanic') ||
    lower.includes('ro')
  ) {
    category = 'services';
    templateId = 'local-services';
  }

  // 2. Extract Business Name
  let businessName = '';
  const namePatterns = [
    /(?:naam\s+(?:hai|rakha\s+hai)?|named|called|business\s+name\s+is)\s+([A-Za-z0-9\s&'-]+?)(?=[,\.]|\s+(?:hai|lucknow|kanpur|phone|number|hamaare|hum|we|in|at))/i,
    /(?:meri|mera|hamari|hamara|my)\s+(?:bakery|cafe|shop|store|dukaan|boutique|salon|coaching)\s+(?:hai|ka\s+naam)?\s+([A-Za-z0-9\s&'-]+?)(?=[,\.]|\s+(?:mein|lucknow|kanpur|phone|hum))/i,
    /([A-Za-z0-9\s&'-]+?)\s+(?:bakery|cafe|boutique|salon|academy|classes|services)/i,
  ];

  for (const pattern of namePatterns) {
    const match = clean.match(pattern);
    if (match && match[1] && match[1].trim().length > 2 && match[1].trim().length < 40) {
      businessName = match[1].trim();
      break;
    }
  }

  if (!businessName) {
    // Fallback names based on category
    if (category === 'bakery') businessName = 'Sweet Bites Bakery';
    else if (category === 'cafe') businessName = 'Cafe Bliss';
    else if (category === 'clothing') businessName = 'Heritage Ethnic Studio';
    else if (category === 'salon') businessName = 'Star Unisex Salon';
    else if (category === 'coaching') businessName = 'Apex Target Academy';
    else if (category === 'services') businessName = 'ProFix Doorstep Care';
    else businessName = 'My Business Hub';
  }

  // Capitalize properly
  businessName = businessName
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  // 3. Extract City / Location
  let city = 'Lucknow';
  let address = 'Hazratganj Main Road';

  const knownCities = ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Noida', 'Delhi', 'Mumbai', 'Bengaluru', 'Jaipur', 'Indore'];
  for (const c of knownCities) {
    if (new RegExp(c, 'i').test(clean)) {
      city = c;
      break;
    }
  }

  const knownAreas = ['Hazratganj', 'Gomti Nagar', 'Aminabad', 'Aliganj', 'Indira Nagar', 'Janpath', 'Kapoorthala', 'Chowk', 'Alambagh', 'Mahanagar'];
  for (const area of knownAreas) {
    if (new RegExp(area, 'i').test(clean)) {
      address = `${area}, ${city}`;
      break;
    }
  }

  // 4. Extract Phone / WhatsApp
  let phone = '+91 98765 43210';
  const phoneMatch = clean.match(/(?:\+?91[\s-]?)?([6-9]\d{4}[\s-]?\d{5})/);
  if (phoneMatch && phoneMatch[1]) {
    const digits = phoneMatch[1].replace(/[\s-]/g, '');
    phone = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  const whatsapp = phone;

  // 5. Extract Hours
  let openingHours = '10:00 AM – 10:00 PM (All Days)';
  if (lower.includes('subah') || lower.includes('am') || lower.includes('pm') || lower.includes('baje')) {
    if (lower.includes('9') && lower.includes('11')) {
      openingHours = '9:00 AM – 11:00 PM (Mon – Sun)';
    } else if (lower.includes('10') && lower.includes('9')) {
      openingHours = '10:00 AM – 9:00 PM (Mon – Sat)';
    }
  }

  // Pull default template data to blend
  const matchedTemplate = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
  const demoData = matchedTemplate.demoData;

  const tagline =
    category === 'bakery'
      ? 'Freshly Baked with Love · Cakes, Pastries & More'
      : category === 'cafe'
      ? 'Good Coffee. Good Vibes. · Freshly Brewed Everyday'
      : category === 'clothing'
      ? 'Authentic Ethnic Wear & Designer Handcrafts'
      : category === 'salon'
      ? 'Elevate Your Look · Luxury Hair & Skin Treatments'
      : category === 'coaching'
      ? 'Inspiring Young Minds, Securing Top Ranks'
      : 'Guaranteed 60-Minute Doorstep Technical Care';

  const description = `${businessName} is your trusted destination in ${address}, providing premium quality and friendly service to local patrons and families.`;

  return {
    businessName,
    category,
    categoryLabel: matchedTemplate.categoryName,
    tagline,
    description,
    aboutStory: demoData.aboutStory || `${businessName} was established to bring exceptional quality and authentic service to ${city}. We are dedicated to delivering satisfaction with every visit.`,
    city,
    address,
    phone,
    whatsapp,
    openingHours,
    features: demoData.features || ['Verified Local Quality', 'Fast WhatsApp Support', 'Prompt Service', 'Trusted by Neighborhood Customers'],
    suggestedTemplateId: templateId,
    products: matchedTemplate.demoProducts,
    rawTranscript: clean,
    logoSvg: getDefaultLogoForCategory(category)
  };
}
