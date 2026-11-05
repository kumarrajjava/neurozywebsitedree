/**
 * Curated, production-grade SVG Vector Logos in Code.
 * Users can pick presets, paste custom SVG code, or customize in real-time.
 */

export interface PresetLogo {
  id: string;
  name: string;
  category: string;
  svgCode: string;
  recommendedBg: string;
}

export const PRESET_LOGOS: PresetLogo[] = [
  {
    id: 'bakery-chef',
    name: 'Artisan Cupcake & Swirl',
    category: 'bakery',
    recommendedBg: '#fff7ed',
    svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
  <defs>
    <linearGradient id="bakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
    <linearGradient id="creamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
  </defs>
  <!-- Cupcake Base -->
  <path d="M26 58 L32 86 C32.5 88 35 90 38 90 L62 90 C65 90 67.5 88 68 86 L74 58 Z" fill="url(#bakeGrad)" stroke="#c2410c" stroke-width="2.5" stroke-linejoin="round"/>
  <!-- Ribs on Cup -->
  <line x1="38" y1="62" x2="42" y2="86" stroke="#9a3412" stroke-width="2" stroke-linecap="round"/>
  <line x1="50" y1="62" x2="50" y2="87" stroke="#9a3412" stroke-width="2" stroke-linecap="round"/>
  <line x1="62" y1="62" x2="58" y2="86" stroke="#9a3412" stroke-width="2" stroke-linecap="round"/>
  <!-- Whipped Frosting -->
  <path d="M20 58 C18 52 24 45 32 46 C33 40 40 34 49 35 C56 32 64 36 67 43 C74 42 80 48 79 56 C79 61 74 62 70 60 C66 63 60 62 57 60 C53 63 47 63 43 60 C39 63 34 62 30 60 C26 62 21 62 20 58 Z" fill="url(#creamGrad)" stroke="#ca8a04" stroke-width="2.5" stroke-linejoin="round"/>
  <!-- Cherry on Top -->
  <circle cx="50" cy="28" r="9" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
  <path d="M54 22 C56 16 63 12 68 13" fill="none" stroke="#65a30d" stroke-width="3" stroke-linecap="round"/>
  <!-- Sparkles -->
  <circle cx="36" cy="46" r="1.5" fill="#ffffff"/>
  <circle cx="62" cy="48" r="1.5" fill="#ffffff"/>
</svg>`
  },
  {
    id: 'cafe-steam',
    name: 'Espresso Mug & Aroma Steam',
    category: 'cafe',
    recommendedBg: '#fef2f2',
    svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
  <defs>
    <linearGradient id="coffeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
  </defs>
  <!-- Saucer -->
  <ellipse cx="48" cy="85" rx="36" ry="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
  <!-- Cup Body -->
  <path d="M22 42 L26 74 C26.5 79 32 82 46 82 C60 82 65.5 79 66 74 L70 42 Z" fill="#ffffff" stroke="#0f172a" stroke-width="3" stroke-linejoin="round"/>
  <!-- Coffee Fill -->
  <ellipse cx="46" cy="45" rx="20" ry="5" fill="url(#coffeeGrad)"/>
  <!-- Handle -->
  <path d="M68 48 C78 48 83 56 81 65 C79 72 73 74 66 73" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Aroma Steam Waves -->
  <path d="M38 32 C35 25 41 18 37 11" fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
  <path d="M48 30 C45 21 52 14 47 7" fill="none" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
  <path d="M58 32 C55 25 61 18 57 11" fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
  <!-- Heart Crema in Cup -->
  <path d="M46 43 C43 40 40 42 41 45 C42 47 46 49 46 49 C46 49 50 47 51 45 C52 42 49 40 46 43 Z" fill="#fde68a"/>
</svg>`
  },
  {
    id: 'fashion-peacock',
    name: 'Chikankari Royal Boutique',
    category: 'clothing',
    recommendedBg: '#faf5ff',
    svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
  <defs>
    <linearGradient id="boutiqueGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="royalPurple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9333ea"/>
      <stop offset="100%" stop-color="#6b21a8"/>
    </linearGradient>
  </defs>
  <!-- Outer Royal Ring -->
  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#boutiqueGold)" stroke-width="2.5" stroke-dasharray="4 2"/>
  <!-- Needle -->
  <path d="M30 75 L68 25" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="68" cy="25" r="2.5" fill="#f59e0b"/>
  <!-- Golden Thread Loop -->
  <path d="M68 25 C75 20 82 28 78 35 C72 43 55 45 42 55 C32 63 36 78 48 76 C58 74 65 64 68 56" fill="none" stroke="url(#royalPurple)" stroke-width="3" stroke-linecap="round"/>
  <!-- Paisley / Mango Motif -->
  <path d="M50 35 C42 35 38 42 38 48 C38 56 46 62 52 64 C56 60 58 54 56 48 C55 42 52 38 50 35 Z" fill="url(#boutiqueGold)"/>
  <circle cx="48" cy="48" r="3" fill="#ffffff"/>
</svg>`
  },
  {
    id: 'salon-scissor',
    name: 'Luxury Salon & Shears',
    category: 'salon',
    recommendedBg: '#fdf2f8',
    svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
  <defs>
    <linearGradient id="pinkGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
  </defs>
  <!-- Left Blade & Handle -->
  <path d="M32 78 C25 78 20 73 20 66 C20 59 25 54 32 54 C36 54 39 56 41 58 L54 48 L42 22 L49 18 L60 44 L48 56 C46 54 43 53 40 53" fill="none" stroke="url(#pinkGlow)" stroke-width="3" stroke-linejoin="round"/>
  <!-- Right Blade & Handle -->
  <path d="M68 78 C75 78 80 73 80 66 C80 59 75 54 68 54 C64 54 61 56 59 58 L46 48 L58 22 L51 18 L40 44 L52 56 C54 54 57 53 60 53" fill="none" stroke="#475569" stroke-width="3" stroke-linejoin="round"/>
  <!-- Pivot Screw -->
  <circle cx="50" cy="48" r="4.5" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
  <!-- Salon Sparkle Stars -->
  <path d="M72 26 L74 20 L80 18 L74 16 L72 10 L70 16 L64 18 L70 20 Z" fill="#ec4899"/>
  <path d="M26 36 L27 32 L31 31 L27 30 L26 26 L25 30 L21 31 L25 32 Z" fill="#f59e0b"/>
</svg>`
  },
  {
    id: 'academy-torch',
    name: 'Wisdom Academy & Torch',
    category: 'coaching',
    recommendedBg: '#eff6ff',
    svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
  <defs>
    <linearGradient id="blueEdu" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <!-- Mortarboard Cap -->
  <polygon points="50,22 84,36 50,48 16,36" fill="url(#blueEdu)" stroke="#1e3a8a" stroke-width="2.5"/>
  <!-- Cap Skull Base -->
  <path d="M30 43 L30 58 C30 66 40 70 50 70 C60 70 70 66 70 58 L70 43" fill="#1e40af" stroke="#1e3a8a" stroke-width="2.5"/>
  <!-- Tassel -->
  <path d="M50 35 L80 46 L82 64" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="82" cy="65" r="2.5" fill="#f59e0b"/>
  <!-- Open Book Base -->
  <path d="M20 78 C35 74 48 76 50 82 C52 76 65 74 80 78 L80 88 C65 84 52 86 50 92 C48 86 35 84 20 88 Z" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
</svg>`
  },
  {
    id: 'service-shield',
    name: 'ProFix Repair & Shield',
    category: 'services',
    recommendedBg: '#ecfdf5',
    svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
  </defs>
  <!-- Shield Contour -->
  <path d="M50 14 L80 26 C80 56 68 76 50 88 C32 76 20 56 20 26 Z" fill="url(#shieldGrad)" stroke="#065f46" stroke-width="3" stroke-linejoin="round"/>
  <!-- Golden Lightning Bolt -->
  <polygon points="52,24 36,50 48,50 44,74 64,44 52,44" fill="#fbbf24" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/>
</svg>`
  },
  {
    id: 'neurozy-tech',
    name: 'Neurozy Geometric Monogram',
    category: 'retail',
    recommendedBg: '#eef2ff',
    svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
  <defs>
    <linearGradient id="neuroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="50%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect x="15" y="15" width="70" height="70" rx="20" fill="url(#neuroGrad)"/>
  <!-- Stylized N in white with dynamic stroke -->
  <path d="M34 68 L34 32 L46 32 L60 55 L60 32 L68 32 L68 68 L56 68 L42 45 L42 68 Z" fill="#ffffff"/>
  <circle cx="70" cy="30" r="5" fill="#fde047"/>
</svg>`
  }
];

/**
 * Returns default SVG logo based on business category.
 */
export function getDefaultLogoForCategory(category: string): string {
  const match = PRESET_LOGOS.find((l) => l.category === category);
  return match ? match.svgCode : PRESET_LOGOS[0].svgCode;
}

/**
 * Generates clean monogram SVG in code with user initials & custom colors.
 */
export function generateMonogramSvg(text: string, bgColor: string = '#4f46e5', textColor: string = '#ffffff'): string {
  const initials = text
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || 'N';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
  <rect x="6" y="6" width="88" height="88" rx="24" fill="${bgColor}"/>
  <text x="50" y="58" font-family="sans-serif" font-weight="900" font-size="40" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
    ${initials}
  </text>
</svg>`;
}
