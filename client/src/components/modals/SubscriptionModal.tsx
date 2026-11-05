import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Zap, ArrowRight, CreditCard, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from '../../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onPlanSelected: (planName: 'FREE' | 'STARTER' | 'BUSINESS' | 'PRO') => void;
  productContext?: string; // Optional context, e.g. "Belgian Dark Chocolate Cake"
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  user,
  onPlanSelected,
  productContext
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'STARTER' | 'BUSINESS' | 'PRO'>(
    user?.planTier || 'STARTER'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (tier: 'FREE' | 'STARTER' | 'BUSINESS' | 'PRO') => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessNotice(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
      onPlanSelected(tier);
      setTimeout(() => {
        setSuccessNotice(false);
        onClose();
      }, 1800);
    }, 600);
  };

  const plans = [
    {
      id: 'FREE' as const,
      name: 'Free Forever',
      price: '₹0',
      period: '/month',
      badge: 'Basic Tier',
      description: 'Ideal for trying out voice-to-website generation.',
      features: [
        '1 Generated Website',
        'Free .neurozy.site subdomain',
        'Up to 5 Catalog Items',
        'WhatsApp direct order button',
        'Standard mobile layout'
      ],
      cta: 'Current Plan',
      accent: 'border-slate-200 bg-white'
    },
    {
      id: 'STARTER' as const,
      name: 'Starter Plan',
      price: '₹199',
      period: '/month',
      badge: 'Most Popular for Shops',
      isPopular: true,
      description: 'Perfect for retail shops, cafes, and local bakeries.',
      features: [
        'Everything in Free',
        'Up to 25 Catalog Products',
        'Customer Recurring Order Tagging',
        'Remove Neurozy watermark',
        'Basic Visitor & WhatsApp Lead Analytics',
        'Fast Lucknow Edge Hosting'
      ],
      cta: 'Choose Starter (₹199)',
      accent: 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-200'
    },
    {
      id: 'BUSINESS' as const,
      name: 'Business Pro',
      price: '₹499',
      period: '/month',
      badge: 'Best Value',
      description: 'For established shops wanting their own custom domain.',
      features: [
        'Everything in Starter',
        'Custom Domain Connection (e.g. yourshop.com)',
        'Unlimited Catalog Offerings',
        'Product Subscription & Weekly Delivery Mode',
        'Priority WhatsApp Business Support',
        'Automated Free SSL Certificate'
      ],
      cta: 'Choose Business (₹499)',
      accent: 'border-purple-500 bg-purple-50/30'
    },
    {
      id: 'PRO' as const,
      name: 'Storefront Pro',
      price: '₹999',
      period: '/month',
      badge: 'Full Automation',
      description: 'Multi-store setup with direct online payments & CRM.',
      features: [
        'Up to 3 Active Websites',
        'Direct UPI & Razorpay Payment Integration',
        'Automated Monthly Customer Subscriptions',
        'Dedicated Merchant Relationship Manager',
        'Advanced Inventory & Lead Export'
      ],
      cta: 'Choose Storefront Pro (₹999)',
      accent: 'border-emerald-500 bg-emerald-50/30'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-4xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-indigo-50/30">
          <div className="flex items-center gap-3">
            <img src="/neurozy-logo.png" alt="Neurozy Logo" className="h-9 w-auto object-contain mix-blend-multiply" />
            <div className="border-l border-slate-200 pl-3">
              <h3 className="font-black text-slate-900 text-base leading-tight">
                Store Subscription Plans
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {productContext 
                  ? `Enable recurring subscription / unlock full features for "${productContext}"`
                  : 'Empower your small business with high-converting online tools'
                }
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successNotice && (
          <div className="p-4 bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 animate-in slide-in-from-top">
            <Check className="w-5 h-5" />
            <span>🎉 Congratulations! Your plan subscription is now active!</span>
          </div>
        )}

        {/* Pricing Tiers Grid */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[75vh]">
          
          <div className="text-center max-w-lg mx-auto mb-8 space-y-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              ⚡ Transparent MSME Pricing
            </span>
            <h4 className="text-2xl font-black text-slate-900">
              Pick the Perfect Plan for Your Shop
            </h4>
            <p className="text-xs text-slate-500">
              Upgrade anytime. Instant WhatsApp ordering, automated website generation, and fast cloud delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`rounded-2xl border-2 p-5 flex flex-col justify-between transition-all relative cursor-pointer ${
                    isSelected ? 'border-indigo-600 bg-indigo-50/40 shadow-lg ring-2 ring-indigo-200' : plan.accent
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Popular
                    </span>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-wider">
                        {plan.badge}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div>
                      <h5 className="font-extrabold text-slate-900 text-base">{plan.name}</h5>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-black text-slate-900">{plan.price}</span>
                        <span className="text-xs text-slate-500 font-medium">{plan.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{plan.description}</p>
                    </div>

                    <div className="border-t border-slate-200/80 pt-3 space-y-2 text-xs text-slate-700">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-200/60">
                    <button
                      disabled={isProcessing}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubscribe(plan.id);
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-95'
                          : 'bg-slate-900 text-white hover:bg-indigo-600'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isProcessing && selectedPlan === plan.id ? 'Activating...' : plan.cta}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Banner */}
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>100% Risk-Free Guarantee:</strong> Cancel or upgrade your plan anytime with 1-click. No hidden charges.
              </span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>UPI, Cards, NetBanking Supported</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

