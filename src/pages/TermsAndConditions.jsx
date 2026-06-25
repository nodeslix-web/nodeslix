import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const tocItems = [
  { id: 'interpretation', label: 'Interpretation' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'acknowledgment', label: 'Acknowledgment' },
  { id: 'links-to-other-websites', label: 'Links to Other Websites' },
  { id: 'termination', label: 'Termination' },
  { id: 'limitation-of-liability', label: 'Limitation of Liability' },
  { id: 'disclaimer', label: '"AS IS" Disclaimer' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'disputes-resolution', label: 'Disputes Resolution' },
  { id: 'eu-users', label: 'EU Users' },
  { id: 'us-compliance', label: 'US Legal Compliance' },
  { id: 'severability-waiver', label: 'Severability & Waiver' },
  { id: 'translation', label: 'Translation' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact-section', label: 'Contact' }
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // Set document title and meta description
    document.title = 'Terms & Conditions | NodeSlix';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Read the Terms & Conditions governing the use of the NodeSlix platform.');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      tocItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset for sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Card animation configuration
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <div className="relative pt-28 pb-16 border-b border-white/5 bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00D4FF]/[0.02] blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1100px] mx-auto px-6 relative z-10 text-center space-y-4">
          <Motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-[10px] font-extrabold text-[#00D4FF] uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20"
          >
            LEGAL
          </Motion.span>
          <Motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-white sm:text-5xl"
          >
            Terms & Conditions
          </Motion.h1>
          <Motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base leading-relaxed sm:text-lg text-nodeslix-muted"
          >
            Read the Terms & Conditions governing the use of the NodeSlix platform.
          </Motion.p>
          <Motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2 font-mono text-xs text-white/30"
          >
            Last Updated: June 25, 2026
          </Motion.p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Sticky Table of Contents */}
          <nav className="lg:col-span-4 sticky top-24 hidden lg:block bg-[#0C0C0C]/50 border border-white/5 p-6 rounded-2xl backdrop-blur-xl">
            <h2 className="mb-4 text-xs font-extrabold tracking-widest uppercase text-white/40">
              On this page
            </h2>
            <ul className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left text-xs font-semibold py-1 border-l-2 transition-all duration-200 pl-3 ${
                      activeSection === item.id 
                        ? 'border-[#00D4FF] text-[#00D4FF]' 
                        : 'border-white/5 text-nodeslix-muted hover:text-white hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Policy Document Content */}
          <main className="lg:col-span-8 space-y-12 max-w-[900px] mx-auto">
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              
              {/* Introduction section */}
              <section className="space-y-4 text-nodeslix-muted text-sm leading-[1.8] font-medium">
                <p>Please read these terms and conditions carefully before using Our Service.</p>
              </section>

              {/* Card 1: Interpretation and Definitions */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-6"
              >
                <div id="interpretation" className="space-y-4 scroll-mt-28">
                  <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                    Interpretation and Definitions
                  </h2>
                  <h3 className="text-base font-semibold text-[#00D4FF]">Interpretation</h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                  </p>
                </div>

                <div id="definitions" className="pt-4 space-y-4 scroll-mt-28">
                  <h3 className="text-base font-semibold text-[#00D4FF]">Definitions</h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    For the purposes of these Terms and Conditions:
                  </p>
                  <ul className="space-y-4">
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Country</strong> refers to: California, United States
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in these Terms and Conditions) refers to NodeSlix Inc., 2029 Century Park E, Los Angeles, CA 90067, USA.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Service</strong> refers to the Website.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Terms and Conditions</strong> (also referred to as &quot;Terms&quot;) means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Third-Party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Website</strong> refers to NodeSlix, accessible from <a href="https://nodeslix.com/" rel="external nofollow noopener" target="_blank" className="text-[#00D4FF] hover:underline">https://nodeslix.com/</a>
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                    </li>
                  </ul>
                </div>
              </Motion.section>

              {/* Card 2: Acknowledgment */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="acknowledgment"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Acknowledgment
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our Privacy Policy carefully before using Our Service.
                </p>
              </Motion.section>

              {/* Card 3: Links to Other Websites */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="links-to-other-websites"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                    Links to Other Websites
                  </h2>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
                  </p>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.
                  </p>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
                  </p>
                </div>

                <div className="pt-4 space-y-4 border-t border-white/5">
                  <h3 className="text-base font-semibold text-[#00D4FF]">Links from a Third-Party Social Media Service</h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.
                  </p>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's terms and privacy policies.
                  </p>
                </div>
              </Motion.section>

              {/* Card 4: Termination */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="termination"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Termination
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Upon termination, Your right to use the Service will cease immediately.
                </p>
              </Motion.section>

              {/* Card 5: Limitation of Liability */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="limitation-of-liability"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Limitation of Liability
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.
                </p>
              </Motion.section>

              {/* Card 6: AS IS Disclaimer */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="disclaimer"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
                </p>
              </Motion.section>

              {/* Card 7: Governing Law */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="governing-law"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Governing Law
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
                </p>
              </Motion.section>

              {/* Card 8: Disputes Resolution */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="disputes-resolution"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Disputes Resolution
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
                </p>
              </Motion.section>

              {/* Card 9: EU Users */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="eu-users"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  For European Union (EU) Users
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
                </p>
              </Motion.section>

              {/* Card 10: US Legal Compliance */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="us-compliance"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  United States Legal Compliance
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
                </p>
              </Motion.section>

              {/* Card 11: Severability and Waiver */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="severability-waiver"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                    Severability and Waiver
                  </h2>
                  <h3 className="text-base font-semibold text-[#00D4FF]">Severability</h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                  </p>
                </div>

                <div className="pt-4 space-y-4 border-t border-white/5">
                  <h3 className="text-base font-semibold text-[#00D4FF]">Waiver</h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
                  </p>
                </div>
              </Motion.section>

              {/* Card 12: Translation Interpretation */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="translation"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Translation Interpretation
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  These Terms and Conditions may have been translated if We have made them available to You on our Service.
                  You agree that the original English text shall prevail in the case of a dispute.
                </p>
              </Motion.section>

              {/* Card 13: Changes to These Terms */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="changes"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Changes to These Terms and Conditions
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.
                </p>
              </Motion.section>

              {/* Card 14: Contact Us */}
              <Motion.section 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                id="contact-section"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Contact Us
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  If you have any questions about these Terms and Conditions, You can contact us:
                </p>
                <ul className="list-disc list-inside text-sm text-[#00D4FF] leading-[1.75] pl-4 space-y-1">
                  <li>
                    <span className="text-nodeslix-muted">By email: </span>
                    <a href="mailto:help@nodeslix.com" className="hover:underline">help@nodeslix.com</a>
                  </li>
                </ul>
              </Motion.section>

            </Motion.div>
          </main>

        </div>
      </div>

      {/* Floating "Back to Top" Button */}
      <AnimatePresence>
        {showScroll && (
          <Motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            type="button"
            aria-label="Back to top"
            className="fixed bottom-6 right-6 md:right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#00D4FF]/30 bg-[#0C0C0C]/90 text-white shadow-xl shadow-[#00D4FF]/5 hover:bg-[#121212] hover:border-[#00D4FF] hover:text-[#00D4FF] hover:shadow-[0_0_15px_rgba(0,212,255,0.25)] transition-all duration-200 outline-none"
          >
            <ArrowUp size={20} />
          </Motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
