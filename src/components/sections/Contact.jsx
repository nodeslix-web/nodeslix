import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion as Motion } from 'framer-motion';
import { Shield, Zap, Cpu, Activity, Layers, CheckCircle2, AlertCircle, Phone, Mail, Clock } from 'lucide-react';
import { Turnstile } from 'react-turnstile';

const contactInfoCards = [
  {
    title: 'Enterprise Consultation',
    icon: Shield,
    desc: 'Speak with our infrastructure architects on architecture integration & security SLAs.',
  },
  {
    title: 'Telecom Optimization',
    icon: Zap,
    desc: 'Explore custom microwave routing protocols and dynamic congestion management.',
  },
  {
    title: 'AI Integration',
    icon: Cpu,
    desc: 'Integrate custom predictive modeling engines with existing hardware network endpoints.',
  },
  {
    title: 'Technical Support',
    icon: Activity,
    desc: 'Learn about our 24/7 network operations center support and telemetry updates.',
  },
  {
    title: 'Deployment Guidance',
    icon: Layers,
    desc: 'Step-by-step assistance on migration planning, edge integration, and rollouts.',
  },
];

const ContactInfoCard = () => (
  <div className="p-5 rounded-xl border border-[#00D4FF]/10 bg-[#00D4FF]/[0.02] space-y-4">
    <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4FF]">
      Contact Information
    </h4>
    <div className="space-y-3">
      {/* Email */}
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center size-8 rounded-lg bg-nodeslix-accent/5 border border-nodeslix-accent/15 text-nodeslix-accent">
          <Mail size={14} />
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-nodeslix-muted font-semibold">Email</p>
          <a href="mailto:help@nodeslix.com" aria-label="Email help@nodeslix.com" className="text-sm text-white hover:text-nodeslix-accent transition-colors font-medium">
            help@nodeslix.com
          </a>
        </div>
      </div>
      {/* Phone */}
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center size-8 rounded-lg bg-nodeslix-accent/5 border border-nodeslix-accent/15 text-nodeslix-accent">
          <Phone size={14} />
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-nodeslix-muted font-semibold">Phone</p>
          <a href="tel:+13105568137" aria-label="Call +1 (310) 556-8137" className="text-sm text-white hover:text-nodeslix-accent transition-colors font-medium">
            +1 (310) 556-8137
          </a>
        </div>
      </div>
      {/* Hours */}
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center size-8 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/50">
          <Clock size={14} />
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-nodeslix-muted font-semibold">Business Hours</p>
          <p className="text-xs text-white/70">
            Monday – Friday, 9:00 AM – 6:00 PM (PST)
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => {
  const [state, handleSubmit] = useForm('mqeorngo');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileStatus, setTurnstileStatus] = useState('required'); // 'required', 'verified', 'expired', 'error'

  const getStatusDisplay = () => {
    switch (turnstileStatus) {
      case 'verified':
        return { text: 'Verification Complete', color: 'text-emerald-400', dot: '🟢' };
      case 'expired':
        return { text: 'Verification Expired', color: 'text-amber-400', dot: '🟠' };
      case 'error':
        return { text: 'Verification Failed', color: 'text-rose-400', dot: '🔴' };
      case 'required':
      default:
        return { text: 'Human Verification Required', color: 'text-nodeslix-muted', dot: '⚪' };
    }
  };

  const statusInfo = getStatusDisplay();

  return (
    <section id="contact" className="section-shell bg-gradient-to-b from-[#0A0A0A] to-[#0f0f0f] border-t border-white/5 scroll-mt-20">
      {/* Glow auras */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-nodeslix-accent/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/[0.02] blur-[120px]" />

      <div className="app-container space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between max-w-5xl mx-auto">
          <div className="space-y-3">
            <p className="section-kicker">Contact Us</p>
            <h2 className="section-title text-3xl sm:text-4xl">
              Let's Build Smarter Telecom Infrastructure
            </h2>
            <p className="section-copy text-sm sm:text-base max-w-2xl">
              Tell us about your infrastructure challenges and our team will get in touch.
            </p>
          </div>
          
          <div className="flex items-start shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-nodeslix-accent">
              <span className="block size-2 rounded-full bg-nodeslix-accent animate-pulse" />
              Enterprise Support Available
            </span>
          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                Talk To NodeSlix
              </h3>
              <p className="text-sm text-nodeslix-muted mb-6 leading-relaxed">
                Connect with our product and engineering specialists to assess your telecom requirements.
              </p>
            </div>

            <div className="space-y-4 flex-1">
              {contactInfoCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <Motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-[#121212]/40 hover:border-nodeslix-accent/20 hover:bg-white/[0.02] transition-all duration-200 group"
                  >
                    <span className="flex items-center justify-center size-10 shrink-0 rounded-lg bg-nodeslix-accent/5 border border-nodeslix-accent/15 text-nodeslix-accent group-hover:scale-105 transition-transform">
                      <Icon size={18} />
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-white group-hover:text-nodeslix-accent transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-xs text-nodeslix-muted leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </Motion.div>
                );
              })}
            </div>
            <div className="hidden lg:block pt-2">
              <ContactInfoCard />
            </div>
          </div>

          {/* Right Column: Form Panel */}
          <div className="lg:col-span-7">
            <div className="panel-shell h-full flex flex-col justify-center bg-gradient-to-b from-[#131313] to-[#0A0A0A] border-white/5 relative">
              
              {state.succeeded ? (
                /* SUCCESS CARD */
                <Motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="text-center py-10 px-6 space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Thank You</h3>
                    <p className="text-sm text-nodeslix-muted max-w-md mx-auto leading-relaxed">
                      Our team has received your inquiry and will respond soon.
                    </p>
                  </div>
                </Motion.div>
              ) : (
                /* FORM */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {state.errors && state.errors.length > 0 && (
                    /* ERROR CARD */
                    <Motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-start gap-3"
                    >
                      <AlertCircle className="text-rose-400 size-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-white">Submission Failed</h4>
                        <p className="text-xs text-rose-300 leading-relaxed">
                          Please try again later. Make sure all fields are valid.
                        </p>
                      </div>
                    </Motion.div>
                  )}

                  {/* Hidden Turnstile input for Formspree */}
                  <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-xs font-bold text-nodeslix-muted/80 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-nodeslix-accent focus:bg-black/60 focus:shadow-[0_0_12px_rgba(0,212,255,0.12)] focus:outline-none"
                    />
                    <ValidationError prefix="Full Name" field="fullName" errors={state.errors} className="text-xs text-rose-400 mt-1" />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-nodeslix-muted/80 uppercase tracking-wider">
                      Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-nodeslix-accent focus:bg-black/60 focus:shadow-[0_0_12px_rgba(0,212,255,0.12)] focus:outline-none"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-400 mt-1" />
                  </div>

                  {/* Company & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-xs font-bold text-nodeslix-muted/80 uppercase tracking-wider">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        placeholder="Acme Telecom"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-nodeslix-accent focus:bg-black/60 focus:shadow-[0_0_12px_rgba(0,212,255,0.12)] focus:outline-none"
                      />
                      <ValidationError prefix="Company" field="company" errors={state.errors} className="text-xs text-rose-400 mt-1" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="role" className="text-xs font-bold text-nodeslix-muted/80 uppercase tracking-wider">
                        Role
                      </label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        required
                        placeholder="Network Operations Manager"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-nodeslix-accent focus:bg-black/60 focus:shadow-[0_0_12px_rgba(0,212,255,0.12)] focus:outline-none"
                      />
                      <ValidationError prefix="Role" field="role" errors={state.errors} className="text-xs text-rose-400 mt-1" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-nodeslix-muted/80 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Infrastructure Optimization Inquiry"
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-nodeslix-accent focus:bg-black/60 focus:shadow-[0_0_12px_rgba(0,212,255,0.12)] focus:outline-none"
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-xs text-rose-400 mt-1" />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-nodeslix-muted/80 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      placeholder="Describe your infrastructure challenge."
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-nodeslix-accent focus:bg-black/60 focus:shadow-[0_0_12px_rgba(0,212,255,0.12)] focus:outline-none resize-none"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-rose-400 mt-1" />
                  </div>

                  {/* Turnstile Verification Widget */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-nodeslix-muted/80 uppercase tracking-wider">
                        Security Check
                      </span>
                      
                      <Motion.div
                        key={turnstileStatus}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`text-xs font-semibold flex items-center gap-1.5 ${statusInfo.color}`}
                        aria-live="polite"
                      >
                        <span>{statusInfo.dot}</span>
                        <span>{statusInfo.text}</span>
                      </Motion.div>
                    </div>

                    <div className="rounded-lg overflow-hidden border border-white/5 bg-black/25 p-2.5 flex justify-center">
                      <Turnstile
                        sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                        onVerify={(token) => {
                          setTurnstileToken(token);
                          setTurnstileStatus('verified');
                        }}
                        onExpire={() => {
                          setTurnstileToken('');
                          setTurnstileStatus('expired');
                        }}
                        onError={() => {
                          setTurnstileToken('');
                          setTurnstileStatus('error');
                        }}
                        theme="dark"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <Motion.button
                      type="submit"
                      disabled={!turnstileToken || state.submitting}
                      whileHover={turnstileToken ? { y: -3, boxShadow: '0 8px 24px rgba(0,212,255,0.22)' } : {}}
                      whileTap={turnstileToken ? { scale: 0.98 } : {}}
                      transition={{ duration: 0.2 }}
                      className="w-full primary-button font-bold text-sm h-12 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      {state.submitting ? 'Sending...' : 'Send Inquiry'}
                    </Motion.button>
                  </div>

                </form>
              )}
            </div>
            <div className="block lg:hidden mt-6">
              <ContactInfoCard />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
