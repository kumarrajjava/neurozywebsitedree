import React, { useState } from 'react';
import { CheckCircle2, X, Sparkles, CreditCard } from 'lucide-react';
import { PRICING_PLANS } from '../data/sampleTemplates';
import { PlanType } from '../types';

interface PricingModalProps {
  currentPlan: PlanType;
  onSelectPlan: (plan: PlanType) => void;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  currentPlan,
  onSelectPlan,
  onClose,
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-8">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-950">Neurozy Subscription Plans</h3>
            <p className="text-xs text-slate-500 mt-0.5">Scale your store with custom domains, product catalogs, and white-labeling.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  billingPeriod === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {PRICING_PLANS.map((plan) => {
              const price = billingPeriod === 'annual' ? Math.round(plan.priceInrAnnual / 12) : plan.priceInrMonthly;
              const isCurrent = currentPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/20 ring-2 ring-indigo-600/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    {isCurrent && (
                      <span className="text-[10px] font-extrabold uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full mb-2 inline-block">
                        Active Plan
                      </span>
                    )}
                    <h4 className="font-bold text-sm text-slate-900">{plan.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{plan.description}</p>

                    <div className="my-4">
                      <span className="text-2xl font-black text-slate-900 font-mono">₹{price}</span>
                      <span className="text-[11px] text-slate-500 font-medium"> / mo</span>
                    </div>

                    <ul className="space-y-2 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{plan.maxWebsites} Website{plan.maxWebsites > 1 ? 's' : ''}</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{plan.maxProducts} Products</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${plan.customDomain ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span>{plan.customDomain ? 'Custom Domain' : 'Free Subdomain'}</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${plan.removeNeurozyBranding ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span>{plan.removeNeurozyBranding ? 'No Neurozy watermark' : 'Neurozy badge'}</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      onSelectPlan(plan.id);
                      onClose();
                    }}
                    disabled={isCurrent}
                    className={`mt-5 w-full py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-slate-200 text-slate-500 cursor-default'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : 'Switch to Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
