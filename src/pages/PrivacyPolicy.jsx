import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail, ShieldAlert, ArrowRight } from "lucide-react";

const tocItems = [
  { id: "interpretation", label: "Interpretation" },
  { id: "definitions", label: "Definitions" },
  { id: "data-collection", label: "Data Collection" },
  { id: "cookies", label: "Cookies" },
  { id: "use-of-personal-data", label: "Use of Personal Data" },
  { id: "retention", label: "Retention" },
  { id: "transfers", label: "Transfers" },
  { id: "security", label: "Security" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "external-links", label: "External Links" },
  { id: "changes", label: "Changes" },
  { id: "contact-section", label: "Contact" },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // Set document title and meta description
    document.title = "Privacy Policy | NodeSlix";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn how NodeSlix collects, uses, protects, and manages your information while using our AI Telecom Intelligence Platform.",
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle "Back to Top" button
      if (window.pageYOffset > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-10% 0px -60% 0px",
      threshold: 0,
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
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // Card animation configuration
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
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
            Privacy Policy
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base leading-relaxed sm:text-lg text-nodeslix-muted"
          >
            Learn how NodeSlix collects, uses, protects, and manages your
            information while using our AI Telecom Intelligence Platform.
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
                        ? "border-[#00D4FF] text-[#00D4FF]"
                        : "border-white/5 text-nodeslix-muted hover:text-white hover:border-white/20"
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
                <p>
                  This Privacy Policy describes Our policies and procedures on
                  the collection, use and disclosure of Your information when
                  You use the Service and tells You about Your privacy rights
                  and how the law protects You.
                </p>
                <p>
                  We use Your Personal Data to provide and improve the Service.
                  By using the Service, You agree to the collection and use of
                  information in accordance with this Privacy Policy.
                </p>
              </section>

              {/* Card 1: Interpretation and Definitions */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-6"
              >
                <div id="interpretation" className="space-y-4 scroll-mt-28">
                  <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                    Interpretation and Definitions
                  </h2>
                  <h3 className="text-base font-semibold text-[#00D4FF]">
                    Interpretation
                  </h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    The words whose initial letters are capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </p>
                </div>

                <div id="definitions" className="pt-4 space-y-4 scroll-mt-28">
                  <h3 className="text-base font-semibold text-[#00D4FF]">
                    Definitions
                  </h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    For the purposes of this Privacy Policy:
                  </p>
                  <ul className="space-y-4">
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Account</strong> means a
                      unique account created for You to access our Service or
                      parts of our Service.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Affiliate</strong> means an
                      entity that controls, is controlled by, or is under common
                      control with a party, where &quot;control&quot; means
                      ownership of 50% or more of the shares, equity interest or
                      other securities entitled to vote for election of
                      directors or other managing authority.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Company</strong> (referred
                      to as either &quot;the Company&quot;, &quot;We&quot;,
                      &quot;Us&quot; or &quot;Our&quot; in this Privacy Policy)
                      refers to NodeSlix Inc., 2029 Century Park E, Los Angeles,
                      CA 90067, USA.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Cookies</strong> are small
                      files that are placed on Your computer, mobile device or
                      any other device by a website, containing the details of
                      Your browsing history on that website among its many uses.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Country</strong> refers to:
                      California, United States
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Device</strong> means any
                      device that can access the Service such as a computer, a
                      cell phone or a digital tablet.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Personal Data</strong> (or
                      &quot;Personal Information&quot;) is any information that
                      relates to an identified or identifiable individual. We
                      use &quot;Personal Data&quot; and &quot;Personal
                      Information&quot; interchangeably unless a law uses a
                      specific term.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Service</strong> refers to
                      the Website.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Service Provider</strong>{" "}
                      means any natural or legal person who processes the data
                      on behalf of the Company. It refers to third-party
                      companies or individuals employed by the Company to
                      facilitate the Service, to provide the Service on behalf
                      of the Company, to perform services related to the Service
                      or to assist the Company in analyzing how the Service is
                      used.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Usage Data</strong> refers
                      to data collected automatically, either generated by the
                      use of the Service or from the Service infrastructure
                      itself (for example, the duration of a page visit).
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">Website</strong> refers to
                      NodeSlix, accessible from{" "}
                      <a
                        href="https://nodeslix.com/"
                        rel="external nofollow noopener"
                        target="_blank"
                        className="text-[#00D4FF] hover:underline"
                      >
                        https://nodeslix.com/
                      </a>
                      .
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                      <strong className="text-white">You</strong> means the
                      individual accessing or using the Service, or the company,
                      or other legal entity on behalf of which such individual
                      is accessing or using the Service, as applicable.
                    </li>
                  </ul>
                </div>
              </Motion.section>

              {/* Card 2: Collecting and Using Your Personal Data */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-6"
              >
                <div id="data-collection" className="space-y-4 scroll-mt-28">
                  <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                    Collecting and Using Your Personal Data
                  </h2>
                  <h3 className="text-base font-semibold text-[#00D4FF]">
                    Types of Data Collected
                  </h3>
                  <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                    Personal Data
                  </h4>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    While using Our Service, We may ask You to provide Us with
                    certain personally identifiable information that can be used
                    to contact or identify You. Personally identifiable
                    information may include, but is not limited to:
                  </p>
                  <ul className="list-disc list-inside text-sm text-nodeslix-muted leading-[1.75] pl-4 space-y-1.5">
                    <li>Email address</li>
                    <li>First name and last name</li>
                  </ul>
                </div>

                <div className="pt-4 space-y-4">
                  <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                    Usage Data
                  </h4>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    Usage Data is collected automatically when using the
                    Service.
                  </p>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    Usage Data may include information such as Your Device's
                    Internet Protocol address (e.g. IP address), browser type,
                    browser version, the pages of our Service that You visit,
                    the time and date of Your visit, the time spent on those
                    pages, unique device identifiers and other diagnostic data.
                  </p>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    When You access the Service by or through a mobile device,
                    We may collect certain information automatically, including,
                    but not limited to, the type of mobile device You use, Your
                    mobile device's unique ID, the IP address of Your mobile
                    device, Your mobile operating system, the type of mobile
                    Internet browser You use, unique device identifiers and
                    other diagnostic data.
                  </p>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    We may also collect information that Your browser sends
                    whenever You visit Our Service or when You access the
                    Service by or through a mobile device.
                  </p>
                </div>

                <div id="cookies" className="pt-4 space-y-4 scroll-mt-28">
                  <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                    Tracking Technologies and Cookies
                  </h4>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    We use Cookies and similar tracking technologies to track
                    the activity on Our Service and store certain information.
                    Tracking technologies We use include beacons, tags, and
                    scripts to collect and track information and to improve and
                    analyze Our Service. The technologies We use may include:
                  </p>
                  <ul className="pl-4 space-y-3">
                    <li className="text-sm text-nodeslix-muted leading-[1.75] list-disc">
                      <strong className="text-white">
                        Cookies or Browser Cookies.
                      </strong>{" "}
                      A cookie is a small file placed on Your Device. You can
                      instruct Your browser to refuse all Cookies or to indicate
                      when a Cookie is being sent. However, if You do not accept
                      Cookies, You may not be able to use some parts of our
                      Service.
                    </li>
                    <li className="text-sm text-nodeslix-muted leading-[1.75] list-disc">
                      <strong className="text-white">Web Beacons.</strong>{" "}
                      Certain sections of our Service and our emails may contain
                      small electronic files known as web beacons (also referred
                      to as clear gifs, pixel tags, and single-pixel gifs) that
                      permit the Company, for example, to count users who have
                      visited those pages or opened an email and for other
                      related website statistics (for example, recording the
                      popularity of a certain section and verifying system and
                      server integrity).
                    </li>
                  </ul>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
                    Cookies. Persistent Cookies remain on Your personal computer
                    or mobile device when You go offline, while Session Cookies
                    are deleted as soon as You close Your web browser.
                  </p>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    Where required by law, we use non-essential cookies (such as
                    analytics, advertising, and remarketing cookies) only with
                    Your consent. You can withdraw or change Your consent at any
                    time using Our cookie preferences tool (if available) or
                    through Your browser/device settings. Withdrawing consent
                    does not affect the lawfulness of processing based on
                    consent before its withdrawal.
                  </p>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    We use both Session and Persistent Cookies for the purposes
                    set out below:
                  </p>

                  <div className="pl-4 mt-4 space-y-4 border-l-2 border-white/5">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Necessary / Essential Cookies
                      </p>
                      <p className="text-[10px] text-[#00D4FF] font-mono mt-0.5">
                        Type: Session Cookies | Administered by: Us
                      </p>
                      <p className="text-sm text-nodeslix-muted leading-[1.75] mt-1.5">
                        Purpose: These Cookies are essential to provide You with
                        services available through the Website and to enable You
                        to use some of its features. They help to authenticate
                        users and prevent fraudulent use of user accounts.
                        Without these Cookies, the services that You have asked
                        for cannot be provided, and We only use these Cookies to
                        provide You with those services.
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="text-sm font-semibold text-white">
                        Cookies Policy / Notice Acceptance Cookies
                      </p>
                      <p className="text-[10px] text-[#00D4FF] font-mono mt-0.5">
                        Type: Persistent Cookies | Administered by: Us
                      </p>
                      <p className="text-sm text-nodeslix-muted leading-[1.75] mt-1.5">
                        Purpose: These Cookies identify if users have accepted
                        the use of cookies on the Website.
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="text-sm font-semibold text-white">
                        Functionality Cookies
                      </p>
                      <p className="text-[10px] text-[#00D4FF] font-mono mt-0.5">
                        Type: Persistent Cookies | Administered by: Us
                      </p>
                      <p className="text-sm text-nodeslix-muted leading-[1.75] mt-1.5">
                        Purpose: These Cookies allow Us to remember choices You
                        make when You use the Website, such as remembering your
                        login details or language preference. The purpose of
                        these Cookies is to provide You with a more personal
                        experience and to avoid You having to re-enter your
                        preferences every time You use the Website.
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-nodeslix-muted leading-[1.75] pt-3">
                    For more information about the cookies we use and your
                    choices regarding cookies, please visit our Cookies Policy
                    or the Cookies section of Our Privacy Policy.
                  </p>
                </div>
              </Motion.section>

              {/* Card 3: Use of Your Personal Data */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                id="use-of-personal-data"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Use of Your Personal Data
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  The Company may use Personal Data for the following purposes:
                </p>
                <ul className="space-y-4">
                  <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                    <strong className="text-white">
                      To provide and maintain our Service
                    </strong>
                    , including to monitor the usage of our Service.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                    <strong className="text-white">
                      To manage Your Account:
                    </strong>{" "}
                    to manage Your registration as a user of the Service. The
                    Personal Data You provide can give You access to different
                    functionalities of the Service that are available to You as
                    a registered user.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                    <strong className="text-white">
                      For the performance of a contract:
                    </strong>{" "}
                    the development, compliance and undertaking of the purchase
                    contract for the products, items or services You have
                    purchased or of any other contract with Us through the
                    Service.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                    <strong className="text-white">To contact You:</strong> To
                    contact You by email, telephone calls, SMS, or other
                    equivalent forms of electronic communication, such as a
                    mobile application's push notifications regarding updates or
                    informative communications related to the functionalities,
                    products or contracted services, including the security
                    updates, when necessary or reasonable for their
                    implementation.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                    <strong className="text-white">To provide You</strong> with
                    news, special offers, and general information about other
                    goods, services and events which We offer that are similar
                    to those that you have already purchased or inquired about
                    unless You have opted not to receive such information.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                    <strong className="text-white">
                      To manage Your requests:
                    </strong>{" "}
                    To attend and manage Your requests to Us.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                    <strong className="text-white">
                      For business transfers:
                    </strong>{" "}
                    We may use Your Personal Data to evaluate or conduct a
                    merger, divestiture, restructuring, reorganization,
                    dissolution, or other sale or transfer of some or all of Our
                    assets, whether as a going concern or as part of bankruptcy,
                    liquidation, or similar proceeding, in which Personal Data
                    held by Us about our Service users is among the assets
                    transferred.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] pl-4 border-l border-white/10">
                    <strong className="text-white">For other purposes:</strong>{" "}
                    We may use Your information for other purposes, such as data
                    analysis, identifying usage trends, determining the
                    effectiveness of our promotional campaigns and to evaluate
                    and improve our Service, products, services, marketing and
                    your experience.
                  </li>
                </ul>

                <p className="text-sm text-nodeslix-muted leading-[1.75] pt-4">
                  We may share Your Personal Data in the following situations:
                </p>
                <ul className="pl-4 space-y-3">
                  <li className="text-sm text-nodeslix-muted leading-[1.75] list-disc">
                    <strong className="text-white">
                      With Service Providers:
                    </strong>{" "}
                    We may share Your Personal Data with Service Providers to
                    monitor and analyze the use of our Service, to contact You.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] list-disc">
                    <strong className="text-white">
                      For business transfers:
                    </strong>{" "}
                    We may share or transfer Your Personal Data in connection
                    with, or during negotiations of, any merger, sale of Company
                    assets, financing, or acquisition of all or a portion of Our
                    business to another company.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] list-disc">
                    <strong className="text-white">With Affiliates:</strong> We
                    may share Your Personal Data with Our affiliates, in which
                    case we will require those affiliates to honor this Privacy
                    Policy. Affiliates include Our parent company and any other
                    subsidiaries, joint venture partners or other companies that
                    We control or that are under common control with Us.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] list-disc">
                    <strong className="text-white">
                      With business partners:
                    </strong>{" "}
                    We may share Your Personal Data with Our business partners
                    to offer You certain products, services or promotions.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] list-disc">
                    <strong className="text-white">With other users:</strong> If
                    Our Service offers public areas, when You share Personal
                    Data or otherwise interact in the public areas with other
                    users, such information may be viewed by all users and may
                    be publicly distributed outside.
                  </li>
                  <li className="text-sm text-nodeslix-muted leading-[1.75] list-disc">
                    <strong className="text-white">With Your consent:</strong>{" "}
                    We may disclose Your Personal Data for any other purpose
                    with Your consent.
                  </li>
                </ul>
              </Motion.section>

              {/* Card 4: Retention of Your Personal Data */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                id="retention"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Retention of Your Personal Data
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  The Company will retain Your Personal Data only for as long as
                  is necessary for the purposes set out in this Privacy Policy.
                  We will retain and use Your Personal Data to the extent
                  necessary to comply with our legal obligations (for example,
                  if We are required to retain Your data to comply with
                  applicable laws), resolve disputes, and enforce our legal
                  agreements and policies.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Where possible, We apply shorter retention periods and/or
                  reduce identifiability by deleting, aggregating, or
                  anonymizing data. Unless otherwise stated, the retention
                  periods below are maximum periods (&quot;up to&quot;) and We
                  may delete or anonymize data sooner when it is no longer
                  needed for the relevant purpose. We apply different retention
                  periods to different categories of Personal Data based on the
                  purpose of processing and legal obligations:
                </p>

                <div className="py-1 pl-4 space-y-4 border-l-2 border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Account Information
                    </p>
                    <ul className="list-disc list-inside text-sm text-nodeslix-muted leading-[1.75] pl-2 mt-1">
                      <li>
                        User Accounts: retained for the duration of your account
                        relationship plus up to 24 months after account closure
                        to handle any post-termination issues or resolve
                        disputes.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Customer Support Data
                    </p>
                    <ul className="list-disc list-inside text-sm text-nodeslix-muted leading-[1.75] pl-2 mt-1 space-y-1">
                      <li>
                        Support tickets and correspondence: up to 24 months from
                        the date of ticket closure to resolve follow-up
                        inquiries, track service quality, and defend against
                        potential legal claims
                      </li>
                      <li>
                        Chat transcripts: up to 24 months for quality assurance
                        and staff training purposes.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Usage Data
                    </p>
                    <ul className="list-disc list-inside text-sm text-nodeslix-muted leading-[1.75] pl-2 mt-1 space-y-1">
                      <li>
                        Website analytics data (cookies, IP addresses, device
                        identifiers): up to 24 months from the date of
                        collection, which allows us to analyze trends while
                        respecting privacy principles.
                      </li>
                      <li>
                        Server logs (IP addresses, access times): up to 24
                        months for security monitoring and troubleshooting
                        purposes.
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-nodeslix-muted leading-[1.75] pt-2">
                  Usage Data is retained in accordance with the retention
                  periods described above, and may be retained longer only where
                  necessary for security, fraud prevention, or legal compliance.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  We may retain Personal Data beyond the periods stated above
                  for different reasons:
                </p>
                <ul className="list-disc list-inside text-sm text-nodeslix-muted leading-[1.75] pl-4 space-y-1.5">
                  <li>
                    Legal obligation: We are required by law to retain specific
                    data (e.g., financial records for tax authorities).
                  </li>
                  <li>
                    Legal claims: Data is necessary to establish, exercise, or
                    defend legal claims.
                  </li>
                  <li>
                    Your explicit request: You ask Us to retain specific
                    information.
                  </li>
                  <li>
                    Technical limitations: Data exists in backup systems that
                    are scheduled for routine deletion.
                  </li>
                </ul>
                <p className="text-sm text-nodeslix-muted leading-[1.75] pt-2">
                  You may request information about how long We will retain Your
                  Personal Data by contacting Us.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  When retention periods expire, We securely delete or anonymize
                  Personal Data according to the following procedures:
                </p>
                <ul className="list-disc list-inside text-sm text-nodeslix-muted leading-[1.75] pl-4 space-y-1.5">
                  <li>
                    Deletion: Personal Data is removed from Our systems and no
                    longer actively processed.
                  </li>
                  <li>
                    Backup retention: Residual copies may remain in encrypted
                    backups for a limited period consistent with our backup
                    retention schedule and are not restored except where
                    necessary for security, disaster recovery, or legal
                    compliance.
                  </li>
                  <li>
                    Anonymization: In some cases, We convert Personal Data into
                    anonymous statistical data that cannot be linked back to
                    You. This anonymized data may be retained indefinitely for
                    research and analytics.
                  </li>
                </ul>
              </Motion.section>

              {/* Card 5: Transfer of Your Personal Data */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                id="transfers"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Transfer of Your Personal Data
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Your information, including Personal Data, is processed at the
                  Company's operating offices and in any other places where the
                  parties involved in the processing are located. It means that
                  this information may be transferred to — and maintained on —
                  computers located outside of Your state, province, country or
                  other governmental jurisdiction where the data protection laws
                  may differ from those from Your jurisdiction.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Where required by applicable law, We will ensure that
                  international transfers of Your Personal Data are subject to
                  appropriate safeguards and supplementary measures where
                  appropriate. The Company will take all steps reasonably
                  necessary to ensure that Your data is treated securely and in
                  accordance with this Privacy Policy and no transfer of Your
                  Personal Data will take place to an organization or a country
                  unless there are adequate controls in place including the
                  security of Your data and other personal information.
                </p>
              </Motion.section>

              {/* Card 6: Delete Your Personal Data */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Delete Your Personal Data
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  You have the right to delete or request that We assist in
                  deleting the Personal Data that We have collected about You.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Our Service may give You the ability to delete certain
                  information about You from within the Service.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  You may update, amend, or delete Your information at any time
                  by signing in to Your Account, if you have one, and visiting
                  the account settings section that allows you to manage Your
                  personal information. You may also contact Us to request
                  access to, correct, or delete any Personal Data that You have
                  provided to Us.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Please note, however, that We may need to retain certain
                  information when we have a legal obligation or lawful basis to
                  do so.
                </p>
              </Motion.section>

              {/* Card 7: Disclosure of Your Personal Data */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-6"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Disclosure of Your Personal Data
                </h2>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white">
                    Business Transactions
                  </h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    If the Company is involved in a merger, acquisition or asset
                    sale, Your Personal Data may be transferred. We will provide
                    notice before Your Personal Data is transferred and becomes
                    subject to a different Privacy Policy.
                  </p>
                </div>

                <div className="pt-3 space-y-3">
                  <h3 className="text-sm font-semibold text-white">
                    Law enforcement
                  </h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    Under certain circumstances, the Company may be required to
                    disclose Your Personal Data if required to do so by law or
                    in response to valid requests by public authorities (e.g. a
                    court or a government agency).
                  </p>
                </div>

                <div className="pt-3 space-y-3">
                  <h3 className="text-sm font-semibold text-white">
                    Other legal requirements
                  </h3>
                  <p className="text-sm text-nodeslix-muted leading-[1.75]">
                    The Company may disclose Your Personal Data in the good
                    faith belief that such action is necessary to:
                  </p>
                  <ul className="list-disc list-inside text-sm text-nodeslix-muted leading-[1.75] pl-4 space-y-1.5">
                    <li>Comply with a legal obligation</li>
                    <li>
                      Protect and defend the rights or property of the Company
                    </li>
                    <li>
                      Prevent or investigate possible wrongdoing in connection
                      with the Service
                    </li>
                    <li>
                      Protect the personal safety of Users of the Service or the
                      public
                    </li>
                    <li>Protect against legal liability</li>
                  </ul>
                </div>
              </Motion.section>

              {/* Card 8: Security of Your Personal Data */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                id="security"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Security of Your Personal Data
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  The security of Your Personal Data is important to Us, but
                  remember that no method of transmission over the Internet, or
                  method of electronic storage is 100% secure. While We strive
                  to use commercially reasonable means to protect Your Personal
                  Data, We cannot guarantee its absolute security.
                </p>
              </Motion.section>

              {/* Card 9: Children's Privacy */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                id="childrens-privacy"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Children's Privacy
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Our Service does not address anyone under the age of 16. We do
                  not knowingly collect personally identifiable information from
                  anyone under the age of 16. If You are a parent or guardian
                  and You are aware that Your child has provided Us with
                  Personal Data, please contact Us. If We become aware that We
                  have collected Personal Data from anyone under the age of 16
                  without verification of parental consent, We take steps to
                  remove that information from Our servers.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  If We need to rely on consent as a legal basis for processing
                  Your information and Your country requires consent from a
                  parent, We may require Your parent's consent before We collect
                  and use that information.
                </p>
              </Motion.section>

              {/* Card 10: Links to Other Websites */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                id="external-links"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Links to Other Websites
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  Our Service may contain links to other websites that are not
                  operated by Us. If You click on a third party link, You will
                  be directed to that third party's site. We strongly advise You
                  to review the Privacy Policy of every site You visit.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  We have no control over and assume no responsibility for the
                  content, privacy policies or practices of any third party
                  sites or services.
                </p>
              </Motion.section>

              {/* Card 11: Changes to this Privacy Policy */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                id="changes"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Changes to this Privacy Policy
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  We may update Our Privacy Policy from time to time. We will
                  notify You of any changes by posting the new Privacy Policy on
                  this page.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  We will let You know via email and/or a prominent notice on
                  Our Service, prior to the change becoming effective and update
                  the &quot;Last updated&quot; date at the top of this Privacy
                  Policy.
                </p>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  You are advised to review this Privacy Policy periodically for
                  any changes. Changes to this Privacy Policy are effective when
                  they are posted on this page.
                </p>
              </Motion.section>

              {/* Card 12: Contact Us */}
              <Motion.section
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                id="contact-section"
                className="scroll-mt-28 bg-[#0C0C0C]/50 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-4"
              >
                <h2 className="pb-3 text-xl font-bold tracking-tight text-white border-b border-white/5">
                  Contact Us
                </h2>
                <p className="text-sm text-nodeslix-muted leading-[1.75]">
                  If you have any questions about this Privacy Policy, You can
                  contact us:
                </p>
                <div className="list-disc list-inside text-sm text-[#00D4FF] leading-[1.75] pl-4 space-y-1">
                  <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-white">
                    <Mail size={14} className="text-[#00D4FF]/80" />
                    <a
                      href="mailto:help@nodeslix.com"
                      className="text-white hover:underline"
                    >
                      help@nodeslix.com
                    </a>
                  </div>
                </div>
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
