import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, CreditCard, Zap, Globe, ArrowRight } from 'lucide-react';

const plansData = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal for learning and small-scale deployments.',
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    monthlyInterval: 'Forever',
    yearlyInterval: 'Forever',
    monthlyStripeId: '',
    yearlyStripeId: '',
    features: [
      '5 infrastructure sources',
      'Basic monitoring',
      '5 team members',
      '24-hour analytics history',
      'Email support'
    ],
    isPopular: false,
    buttonLabel: 'Get Started',
    href: '/product'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Built for growing telecom operations.',
    monthlyPrice: '$29',
    yearlyPrice: '$24',
    monthlyInterval: 'Per Month',
    yearlyInterval: 'Per Month',
    monthlyStripeId: '',
    yearlyStripeId: '',
    features: [
      'Unlimited monitoring',
      'AI optimization engine',
      '50 team members',
      'Topology visualizer',
      'Advanced analytics',
      'Priority support'
    ],
    isPopular: true,
    buttonLabel: 'Start Professional',
    href: '/product'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large-scale telecom infrastructure.',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom',
    monthlyInterval: '',
    yearlyInterval: '',
    monthlyStripeId: '',
    yearlyStripeId: '',
    features: [
      'Unlimited everything',
      'Dedicated AI engine',
      'Unlimited users',
      'Multi-region deployment',
      'Dedicated support',
      'Custom integrations'
    ],
    isPopular: false,
    buttonLabel: 'Contact Sales',
    href: '#contact'
  }
];

const trustItems = [
  { icon: Shield, label: 'Secure Payments' },
  { icon: CreditCard, label: 'Stripe Ready' },
  { icon: Zap, label: 'Instant Activation' },
  { icon: Globe, label: 'Global Availability' }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  // Map elements so they match the exact Stripe-ready architecture properties requested
  const plans = plansData.map(plan => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: isYearly ? plan.yearlyPrice : plan.monthlyPrice,
    interval: isYearly ? plan.yearlyInterval : plan.monthlyInterval,
    stripePriceId: isYearly ? plan.yearlyStripeId : plan.monthlyStripeId,
    features: plan.features,
    isPopular: plan.isPopular,
    buttonLabel: plan.buttonLabel,
    href: plan.href
  }));

  return (
    <section id="pricing" className="section-shell scroll-mt-20 bg-[#0A0A0A] text-white">
      <div className="app-container space-y-16 py-12 md:py-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="section-kicker">Pricing</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-nodeslix-accent/20 bg-nodeslix-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-nodeslix-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-nodeslix-accent animate-pulse" />
              Stripe Ready
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Flexible Plans For Every Infrastructure Scale
          </h2>
          
          <p className="text-nodeslix-muted text-base md:text-lg max-w-2xl leading-relaxed">
            Choose a plan that matches your telecom operations and AI optimization needs.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4">
          <span className={`text-sm font-medium transition-colors duration-200 ${!isYearly ? 'text-[#00D4FF]' : 'text-nodeslix-muted'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 rounded-full bg-white/5 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 cursor-pointer"
            aria-label="Toggle billing interval"
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5.5 h-5.5 rounded-full bg-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-transform duration-300 ease-out ${
                isYearly ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium transition-colors duration-200 ${isYearly ? 'text-[#00D4FF]' : 'text-nodeslix-muted'}`}>
              Yearly
            </span>
            <span className="inline-flex items-center rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 px-2 py-0.5 text-xs font-bold text-[#00D4FF] tracking-wide animate-pulse">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const isProfessional = plan.isPopular;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 212, 255, 0.12)',
                  borderColor: 'rgba(0, 212, 255, 0.4)'
                }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 border bg-[#121212]/60 backdrop-blur-md ${
                  isProfessional 
                    ? 'border-[#00D4FF] shadow-[0_0_30px_rgba(0,212,255,0.08)] bg-gradient-to-b from-[#00D4FF]/5 to-transparent' 
                    : 'border-white/10 hover:border-[#00D4FF]/30'
                }`}
              >
                {/* Most Popular Badge */}
                {isProfessional && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#00D4FF] px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[#080808] shadow-[0_4px_20px_rgba(0,212,255,0.4)]">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6">
                  {/* Plan Meta */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-white">{plan.name}</h3>
                    <p className="text-sm text-nodeslix-muted min-h-[40px] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-white/5 flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      {plan.price}
                    </span>
                    {plan.interval && (
                      <span className="text-sm font-semibold text-nodeslix-muted uppercase tracking-wider">
                        / {plan.interval}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-nodeslix-muted leading-relaxed">
                        <Check className="h-5 w-5 text-[#00D4FF] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call To Action */}
                <div className="mt-8 pt-4">
                  <a
                    href={plan.href}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all duration-200 cursor-pointer ${
                      isProfessional
                        ? 'bg-[#00D4FF] text-[#080808] hover:bg-[#7CEBFF] shadow-[0_10px_30px_rgba(0,212,255,0.25)]'
                        : 'bg-white/5 border border-white/10 hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/5 text-white'
                    }`}
                  >
                    <span>{plan.buttonLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/5 pt-12 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center justify-items-center">
            {trustItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 group">
                  <div className="flex items-center justify-center p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-[#00D4FF] transition-colors group-hover:border-[#00D4FF]/30 group-hover:bg-[#00D4FF]/5">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-nodeslix-muted group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
