import React, { useState, useCallback } from 'react';
import {
  Shield, BookOpen, Calculator, Scale, FileText, CheckCircle,
  Phone, Mail, MapPin, Menu, X, ArrowRight, MessageCircle,
  Building2, Users, Briefcase, ChevronRight, ChevronLeft, Landmark, BadgeCheck,
  Building, Lightbulb, Target, UserCheck, Headphones, TrendingUp, ShieldCheck,
  User, Clock
} from 'lucide-react';
import SplashScreen from '@/components/SplashScreen';
import ladyJustice from '@/assets/lady-justice.png';
import unicoreLogo from '@/assets/unicore-logo.png';
import heroBgVideo from '@/assets/hero-bg-video.mp4.asset.json';
import servicesHeroBg from '@/assets/services-hero-bg.png';
import allianceFirmsBg from '@/assets/alliance-firms-bg.jpg';
import aboutHeroBg from '@/assets/about-hero-bg.jpg';
import industriesHeroBg from '@/assets/industries-hero-bg.jpg';
import philosophyHeroBg from '@/assets/philosophy-hero.jpg';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '', companyName: '', designation: '', email: '', phone: '', countryCode: '+91',
    domain: '', subService: '', urgency: 'standard', preferredDate: '', preferredTime: '',
    description: '', howDidYouHear: '', agreeToTerms: false,
  });

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About Us' },
    { key: 'services', label: 'Services' },
    { key: 'firms', label: 'Alliance Firms' },
    { key: 'industries', label: 'Industries' },
  ];

  // Navbar
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--hero-deep))] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group">
          <img src={unicoreLogo} alt="UniCore Professional Alliance" className="h-14 w-auto rounded-lg bg-white/95 p-1.5" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 font-body text-sm">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => navigateTo(item.key)}
              className={`relative px-4 py-2 rounded-md transition-all duration-200 ${
                currentPage === item.key
                  ? 'text-accent font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
              {currentPage === item.key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent rounded-full" />
              )}
            </button>
          ))}
          <button
            onClick={() => navigateTo('contact')}
            className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2.5 rounded-md font-semibold transition-colors text-sm"
          >
            Book Consultation
          </button>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-300 hover:text-white">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[hsl(var(--hero-deep))] px-6 pb-6 font-body border-t border-white/5">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => navigateTo(item.key)}
              className={`block w-full text-left py-3 border-b border-white/5 transition-colors ${
                currentPage === item.key ? 'text-accent font-semibold' : 'text-gray-200 hover:text-accent'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => navigateTo('contact')} className="block w-full text-left py-3 text-accent font-bold">
            Book Consultation
          </button>
        </div>
      )}
    </nav>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-[hsl(var(--hero-deep))] text-gray-300 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-sm">
        <div>
          <img src={unicoreLogo} alt="UniCore" className="h-12 w-auto rounded-lg bg-white/95 p-1 mb-4" />
          <p className="text-gray-400 text-xs leading-relaxed">A strategic collaboration of experienced professionals delivering integrated excellence.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2 text-gray-400">
            {navItems.map((item) => (
              <button key={item.key} onClick={() => navigateTo(item.key)} className="block hover:text-accent transition-colors text-sm">{item.label}</button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>Legal Advisory</p><p>Tax & Audit</p><p>Compliance</p><p>IP & Regulatory</p>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-start gap-2"><MapPin size={16} className="text-accent mt-0.5 shrink-0" /> 284 Tharva, 1st Cross, Upkar Layout, Ullal RTO, Bangalore 560091</div>
            <div className="flex items-start gap-2"><Phone size={16} className="text-accent mt-0.5 shrink-0" /> +91 98765 43210</div>
            <div className="flex items-start gap-2"><Mail size={16} className="text-accent mt-0.5 shrink-0" /> hello@unicorealliance.com</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-500 px-4">
        © {new Date().getFullYear()} UniCore Professional Alliance. All rights reserved.<br className="sm:hidden" />
        <span className="hidden sm:inline"> | </span>
        Disclaimer: The UniCore Professional Alliance is a non-exclusive strategic association. HRB & Co., Panaya Business Hub, and M.G Meti & Co. operate as distinct and independent professional entities in compliance with the regulations of the ICSI and ICAI. This website is for informational purposes only.
      </div>
    </footer>
  );

  // ========== HERO SECTION ==========
  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={heroBgVideo.url}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[hsl(var(--hero-deep))]/75" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Unicore Professional Alliance
          </h1>
          <p className="font-heading text-xl sm:text-2xl text-accent italic">
            Integrated Expertise. Collaborative Solutions.
          </p>
          <h2 className="font-heading text-xl sm:text-3xl font-bold text-white leading-snug">
            One Platform. Multiple Experts.<br />Complete Solutions.
          </h2>
          <div className="space-y-4 font-body text-gray-300 leading-relaxed max-w-2xl">
            <p>
              We are a collaborative network of independent professionals delivering seamless solutions across corporate law, taxation, compliance audit and regulatory advisory.
            </p>
            <p>
              From business structuring to ongoing compliance, Unicore ensures your business is legally sound, financially efficient and future ready.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('contact')}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3.5 font-bold tracking-wider text-sm transition-colors flex items-center gap-3 rounded-full font-body"
            >
              Book a Consultation <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigateTo('services')}
              className="border-2 border-white text-white hover:bg-white hover:text-foreground px-8 py-3.5 font-bold tracking-wider text-sm transition-colors flex items-center gap-3 rounded-full font-body"
            >
              Our Services <ChevronRight size={16} />
            </button>
          </div>

          {/* Stat cards */}
          <div className="pt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4">
            {[
              { value: '15+', label: 'Years of Combined Expertise' },
              { value: '3', label: 'Elite Firms' },
              { value: '98%', label: 'Compliance Rate' },
              { value: '500+', label: 'Satisfied Clients' },
            ].map((stat) => (
              <div key={stat.label} className="border border-white/20 rounded-xl px-4 sm:px-5 py-3 bg-white/10 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-heading font-bold text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-300 font-body mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // ========== SERVICES SECTION (Home) ==========
  const ServicesOverview = () => {
    const services = [
      { icon: Scale, title: 'Legal & Secretarial', desc: 'Corporate law advisory, secretarial audits, and business structuring.' },
      { icon: Calculator, title: 'Tax & Compliance', desc: 'End-to-end bookkeeping, GST/TDS filings, and routine tax compliance.' },
      { icon: Shield, title: 'Audit & Assurance', desc: 'Statutory audits, tax audits, and rigorous financial due diligence.' },
      { icon: Briefcase, title: 'Business Advisory', desc: 'Transaction structuring and specialized, high-level tax advisory.' },
      { icon: BookOpen, title: 'Trademark & IP', desc: 'Brand protection through rigorous trademark and copyright services.' },
      { icon: Lightbulb, title: 'Startup Services', desc: 'FSSAI licensing, structuring, and early-stage regulatory compliance.' },
    ];

    return (
      <section className="py-24 bg-background font-body">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground text-center">Core Competencies</h2>
          <p className="text-muted-foreground text-center mt-4 max-w-2xl mx-auto">Delivering specialized expertise across critical business domains.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((s) => (
              <div key={s.title} className="shimmer-card bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow group">
                <s.icon size={32} className="text-accent mb-4" />
                <h3 className="font-heading text-xl font-semibold text-card-foreground">{s.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Why UniCore section on home
  const WhyUnicore = () => {
    const leftReasons = [
      { icon: Target, title: 'Integrated Expertise', desc: 'Multi-disciplinary solutions under one platform' },
      { icon: UserCheck, title: 'Independent Professionals', desc: 'Unbiased, expert-driven advice' },
      { icon: ShieldCheck, title: 'Compliance First Approach', desc: 'Risk mitigation at every stage' },
    ];
    const rightReasons = [
      { icon: Headphones, title: 'Single Point Coordination', desc: 'No need to deal with multiple consultants' },
      { icon: TrendingUp, title: 'Scalable Support', desc: 'From startups to growing enterprises' },
      { icon: CheckCircle, title: 'Consistent Quality', desc: 'Standardized deliverables across all engagements' },
    ];

    const ReasonItem = ({ icon: Icon, title, desc, align }: { icon: any; title: string; desc: string; align: 'left' | 'right' }) => (
      <div className={`flex items-start gap-4 ${align === 'left' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg">
          <Icon size={24} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed max-w-[220px]">{desc}</p>
        </div>
      </div>
    );

    return (
      <section className="py-14 bg-secondary/30 font-body overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground text-center">Why UniCore</h2>
          <p className="text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
            What makes us the preferred choice for businesses seeking integrated professional services.
          </p>

          {/* Desktop layout: items around centered person */}
          <div className="hidden lg:grid grid-cols-3 items-center gap-6 mt-10" style={{ minHeight: '420px' }}>
            {/* Left column */}
            <div className="flex flex-col gap-14 justify-center">
              {leftReasons.map((r) => (
                <ReasonItem key={r.title} icon={r.icon} title={r.title} desc={r.desc} align="left" />
              ))}
            </div>

            {/* Center: Lady Justice */}
            <div className="flex justify-center relative">
              <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-b from-accent/20 to-accent/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <img
                src={ladyJustice}
                alt="Lady Justice — symbol of law and fairness"
                loading="lazy"
                className="relative z-10 h-[500px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-14 justify-center">
              {rightReasons.map((r) => (
                <ReasonItem key={r.title} icon={r.icon} title={r.title} desc={r.desc} align="right" />
              ))}
            </div>
          </div>

          {/* Mobile layout: stacked */}
          <div className="lg:hidden flex flex-col items-center gap-8 mt-12">
            <div className="relative">
              <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-b from-accent/20 to-accent/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <img
                src={ladyJustice}
                alt="Lady Justice — symbol of law and fairness"
                loading="lazy"
                className="relative z-10 h-[320px] object-contain drop-shadow-2xl"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
              {[...leftReasons, ...rightReasons].map((r) => (
                <div key={r.title} className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <r.icon size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground">{r.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Alliance Advantage
  const AllianceAdvantage = () => {
    const advantages = [
      'Integrated Solutions', 'Independent Expertise', 'Single Point of Contact',
      'Premium Quality Standards', 'End-to-End Compliance', 'Dedicated Specialists'
    ];
    return (
      <section className="py-24 bg-background font-body">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground text-center">The Alliance Advantage</h2>
          <p className="text-muted-foreground text-center mt-4">Combining deep niche expertise with seamless service delivery.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {advantages.map((a) => (
              <div key={a} className="flex items-start gap-3 p-6 bg-card border border-border rounded-lg">
                <CheckCircle size={16} className="text-accent mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-card-foreground">{a}</h3>
                  <p className="text-muted-foreground text-sm mt-1">Ensuring maximum value and regulatory safety for your business lifecycle.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Member Firms overview
  const MemberFirmsOverview = () => {
    const firms = [
      { icon: Scale, tag: 'Legal & Structuring', name: 'HRB & Co.', sub: 'Practicing Company Secretary', desc: 'Spearheading corporate law advisory, secretarial audits, FSSAI licensing, and intellectual property protection.', highlights: ['Corporate Law', 'Secretarial Audit', 'FSSAI & IP'] },
      { icon: Calculator, tag: 'Operations & Compliance', name: 'Panaya Business Hub', sub: 'Accounting Firm', desc: 'The operational backbone handling rigorous bookkeeping, routine tax filings, and critical labour law compliance.', highlights: ['Bookkeeping', 'Tax Filings', 'Labour Law'] },
      { icon: FileText, tag: 'Audit & Assurance', name: 'M.G Meti & Co.', sub: 'Chartered Accountants', desc: 'Delivering robust statutory and tax audits, high-level financial due diligence, and specialized tax advisory.', highlights: ['Statutory Audit', 'Due Diligence', 'Tax Advisory'] },
    ];
    return (
      <section className="relative py-28 font-body overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={allianceFirmsBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4">Alliance Firms</span>
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary-foreground">Our Member Firms</h2>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">Three distinct entities, united in their commitment to excellence, integrity, and client success.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {firms.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.name} className="group relative bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-1">
                  {/* Accent top line */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-6 group-hover:bg-accent/25 transition-colors duration-300">
                    <Icon className="text-accent" size={26} />
                  </div>

                  {/* Tag */}
                  <span className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">{f.tag}</span>
                  
                  {/* Name & Sub */}
                  <h3 className="font-heading text-2xl font-bold text-primary-foreground mt-2">{f.name}</h3>
                  <p className="text-primary-foreground/60 text-sm mt-1 italic">{f.sub}</p>
                  
                  {/* Description */}
                  <p className="text-primary-foreground/70 text-sm mt-5 leading-relaxed">{f.desc}</p>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {f.highlights.map((h) => (
                      <span key={h} className="text-xs bg-accent/10 text-accent border border-accent/20 rounded-full px-3 py-1 font-medium">{h}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Industries
  const IndustriesSection = () => {
    const industries = ['Startups & Founders', 'Manufacturing Sector', 'Information Technology', 'Food & FMCG (FSSAI)', 'Real Estate & Infra', 'E-Commerce & Retail'];
    return (
      <section className="py-24 bg-background font-body">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground text-center">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {industries.map((ind) => (
              <div key={ind} className="bg-card border border-border rounded-lg p-6 text-center hover:border-accent transition-colors">
                <Building2 size={24} className="text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-card-foreground text-sm">{ind}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Philosophy Section
  const PhilosophySection = () => (
    <section className="relative min-h-[90vh] font-body overflow-hidden flex flex-col justify-end">
      {/* Full background image */}
      <img
        src={philosophyHeroBg}
        alt="Scales of justice in crystal prism"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        width={1920}
        height={1080}
      />
      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Top right quote */}
      <div className="absolute top-16 right-8 lg:right-16 max-w-xs text-right hidden sm:block">
        <p className="text-white/80 text-sm lg:text-base leading-relaxed italic">
          Where independent expertise converges into unified delivery. Every discipline, every insight, coordinated into your next advantage.
        </p>
        <div className="mt-3 h-px w-32 bg-accent/60 ml-auto" />
      </div>

      {/* Bottom content */}
      <div className="relative z-10 px-6 lg:px-16 pb-12 lg:pb-16 flex flex-col lg:flex-row justify-between items-end gap-8">
        {/* Left - Main text */}
        <div className="max-w-lg">
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            Independent expertise.<br />
            Unified delivery.
          </h2>
          <p className="mt-4 text-white/60 text-base lg:text-lg">
            Each member firm operates within a coordinated framework
          </p>
        </div>

        {/* Right - Pill tags */}
        <div className="flex flex-wrap justify-end gap-2 max-w-sm">
          {[
            'Seamless Coordination',
            'Consistent Quality',
            'Efficient Execution',
            'Compliance First',
            'Scalable Support',
            'Strategic Advisory',
          ].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );

  // ========== PAGES ==========

  const HomePage = () => (
    <div className="animate-fadeIn">
      <HeroSection />
      <ServicesOverview />
      <WhyUnicore />
      <AllianceAdvantage />
      <MemberFirmsOverview />
      <IndustriesSection />
      <PhilosophySection />
    </div>
  );

  const AboutPage = () => (
    <div className="animate-fadeIn pt-20 font-body">
      {/* Hero with background image */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutHeroBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4">About Us</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-primary-foreground">Who We Are</h1>
          <p className="text-primary-foreground/70 mt-4 max-w-3xl mx-auto leading-relaxed text-lg">
            A strategic collaboration of experienced professionals delivering integrated excellence.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              <span className="font-heading font-bold text-foreground">Unicore Professional Alliance</span> is a strategic collaboration of experienced professionals, including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: FileText, title: 'Practicing Company Secretaries', desc: 'Corporate governance, secretarial compliance, and legal structuring experts.' },
                { icon: Calculator, title: 'Chartered Accountants', desc: 'Financial assurance, tax advisory, and statutory audit specialists.' },
                { icon: Shield, title: 'Compliance & Accounting Specialists', desc: 'Day-to-day compliance management, bookkeeping, and regulatory filings.' },
              ].map((item) => (
                <div key={item.title} className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 hover:-translate-y-1">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <item.icon size={26} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-card-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We bring together domain expertise under one coordinated framework — enabling clients to access end-to-end professional services without complexity. Our collaborative model ensures that every engagement is handled by the right specialist, with seamless coordination across disciplines.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're a startup seeking foundational compliance or an established enterprise navigating complex regulatory landscapes, UniCore provides a single point of access to multi-disciplinary expertise — ensuring consistency, quality, and accountability at every step.
            </p>
          </div>

          {/* ROFR */}
          <div className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all duration-500 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <BadgeCheck size={20} className="text-accent" />
              </div>
              <h3 className="font-heading text-lg font-bold text-card-foreground">Right of First Refusal (ROFR)</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">To ensure quality and synergy, opportunities across specialized domains are offered within the alliance first, guaranteeing our clients receive vetted, premium service.</p>
          </div>

          {/* Ethics */}
          <h2 className="font-heading text-2xl font-bold text-foreground pt-4">Core Ethical Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: 'Strict Confidentiality', desc: 'All client data is compartmentalized on a need-to-know basis, ensuring total confidentiality.' },
              { icon: UserCheck, title: 'Client Ownership', desc: 'Clients introduced by a specific firm remain their exclusive client. Jointly developed clients are handled transparently.' },
              { icon: Target, title: 'Total Independence', desc: 'Firms accept full liability only for their own services. There is no joint liability, preserving objective integrity.' },
              { icon: BadgeCheck, title: 'Premium Quality', desc: 'Every engagement adheres to the highest professional standards of ICSI and ICAI.' },
            ].map((p) => (
              <div key={p.title} className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-500 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <p.icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-card-foreground">{p.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const ServicesPage = () => {
    const serviceCategories = [
      {
        icon: Scale,
        title: 'Company & Legal Advisory',
        accent: 'from-accent/20 to-accent/5',
        items: [
          { name: 'Company Incorporation & Structuring', desc: 'End-to-end setup of private limited, LLP, OPC, and partnership firms with optimal structuring.' },
          { name: 'Corporate Governance & Compliance', desc: 'Board procedures, annual filings, statutory registers, and director compliance management.' },
          { name: 'Secretariat Audit', desc: 'Independent audit of secretarial records ensuring adherence to Companies Act provisions.' },
          { name: 'Transaction Structuring & Advisory', desc: 'Strategic advisory on mergers, acquisitions, share transfers, and corporate restructuring.' },
        ],
      },
      {
        icon: Calculator,
        title: 'Taxation & Audit',
        accent: 'from-primary/20 to-primary/5',
        items: [
          { name: 'Income Tax Advisory & Filings', desc: 'Comprehensive income tax planning, return preparation, and assessment representation.' },
          { name: 'Statutory & Tax Audits', desc: 'Independent audits under Companies Act, Income Tax Act, and other statutory requirements.' },
          { name: 'Financial Certifications', desc: 'Net worth certificates, turnover certificates, and other financial attestations.' },
          { name: 'Tax Structuring & Optimization', desc: 'Strategic tax planning to minimize liability while ensuring full regulatory compliance.' },
        ],
      },
      {
        icon: FileText,
        title: 'Compliance & Accounting',
        accent: 'from-accent/20 to-accent/5',
        items: [
          { name: 'Bookkeeping & Financial Reporting', desc: 'Accurate day-to-day accounting, ledger maintenance, and periodic financial statements.' },
          { name: 'GST Compliance & Filings', desc: 'Registration, monthly/quarterly returns, reconciliation, and GST audit support.' },
          { name: 'TDS Compliance', desc: 'Deduction, deposit, return filing, and TDS certificate generation for all applicable sections.' },
          { name: 'Labour Law Compliance', desc: 'PF, ESI, professional tax, shops & establishment, and other employee-related filings.' },
        ],
      },
      {
        icon: BookOpen,
        title: 'Intellectual Property & Regulatory',
        accent: 'from-primary/20 to-primary/5',
        items: [
          { name: 'Trademark Registration & Protection', desc: 'Filing, prosecution, opposition, and enforcement of trademark rights across classes.' },
          { name: 'Copyright Advisory', desc: 'Registration and advisory for literary, artistic, and software copyright protection.' },
          { name: 'FSSAI Licensing & Compliance', desc: 'Food business licensing, renewals, label compliance, and FSSAI audit preparation.' },
          { name: 'Regulatory Approvals & Advisory', desc: 'Sector-specific licenses, government approvals, and regulatory framework navigation.' },
        ],
      },
    ];

    return (
      <div className="animate-fadeIn pt-20 font-body">
        {/* Hero Banner */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={servicesHeroBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[hsl(var(--hero-deep))]/80" />
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold">What We Offer</span>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-white mt-4">Our Services</h1>
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
              Comprehensive professional services across corporate law, taxation, compliance, and intellectual property — delivered by domain specialists.
            </p>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 space-y-24">
            {serviceCategories.map((cat, catIdx) => (
              <div key={cat.title} className="relative">
                {/* Category Header */}
                <div className={`flex items-center gap-5 mb-10 ${catIdx % 2 === 1 ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.accent} border border-border flex items-center justify-center shrink-0`}>
                    <cat.icon size={30} className="text-accent" />
                  </div>
                  <div>
                    <span className="text-accent text-xs uppercase tracking-[0.2em] font-semibold">0{catIdx + 1}</span>
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">{cat.title}</h2>
                  </div>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.items.map((item, idx) => (
                    <div
                      key={item.name}
                      className="group relative bg-card border border-border rounded-xl p-7 hover:border-accent/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Subtle number watermark */}
                      <span className="absolute top-4 right-5 text-6xl font-heading font-bold text-border/40 select-none group-hover:text-accent/10 transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle size={18} className="text-accent shrink-0" />
                          <h3 className="font-heading text-lg font-bold text-card-foreground">{item.name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                      {/* Bottom accent line on hover */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-[hsl(var(--hero-deep))] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">Need Tailored Advisory?</h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Every business is unique. Let our specialists craft a customized service package aligned to your specific regulatory and financial needs.
            </p>
            <button
              onClick={() => navigateTo('contact')}
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-4 font-bold tracking-wider text-sm transition-colors inline-flex items-center gap-3 rounded-full"
            >
              Book a Consultation <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>
    );
  };

  const FirmsPage = () => {
    const firms = [
      {
        icon: Scale, name: 'HRB & Co.', sub: 'Practicing Company Secretary',
        desc: 'HRB & Co. anchors the legal, structural, and regulatory arm of the alliance. With a sharp focus on corporate governance and intellectual property, the firm ensures that business foundations are legally unshakeable and compliant from day one.',
        services: ['Corporate Law Advisory', 'Secretarial Audit', 'Trademark & Copyrights', 'FSSAI Licensing'],
      },
      {
        icon: Calculator, name: 'Panaya Business Hub', sub: 'Associate Entity (Accounting Firm)',
        desc: 'Panaya Business Hub serves as the critical operational backbone. By taking charge of daily financial administration, routine tax filings, and continuous compliance, Panaya frees businesses to focus entirely on their core commercial growth.',
        services: ['Bookkeeping & Accounting', 'GST & TDS Filings', 'Labour Law Compliance', 'Income Tax Returns'],
      },
      {
        icon: FileText, name: 'M.G Meti & Co.', sub: 'Chartered Accountants',
        desc: 'Bringing high-level assurance and financial intelligence, M.G Meti & Co. steps in for critical statutory requirements. From deep-dive financial due diligence to specialized tax advisory, they provide sophisticated oversight demanded by stakeholders.',
        services: ['Statutory & Tax Audit', 'Law Certifications', 'Specialized Tax Advisory', 'Financial Due Diligence'],
      },
    ];
    return (
      <div className="animate-fadeIn pt-20 font-body">
        {/* Hero with background image */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={allianceFirmsBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="relative text-center">
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4">Our Alliance</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-primary-foreground">Alliance Firms</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">Three distinct entities, united in their commitment to excellence, integrity, and client success.</p>
          </div>
        </section>

        {/* Firm cards */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-6 space-y-10">
            {firms.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.name} className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5">
                  {/* Accent left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-8">
                    {/* Left: Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                          <Icon className="text-accent" size={24} />
                        </div>
                        <div>
                          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-card-foreground">{f.name}</h2>
                          <p className="text-accent text-sm font-semibold">{f.sub}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-4 leading-relaxed max-w-3xl">{f.desc}</p>
                    </div>

                    {/* Right: Services */}
                    <div className="lg:w-72 shrink-0">
                      <h4 className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-4">Key Services</h4>
                      <div className="space-y-3">
                        {f.services.map((s) => (
                          <div key={s} className="flex items-center gap-3 bg-secondary/50 rounded-lg px-4 py-2.5 border border-border">
                            <CheckCircle size={16} className="text-accent shrink-0" />
                            <span className="text-card-foreground text-sm font-medium">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  };

  const IndustriesPage = () => {
    const industries = [
      { icon: Lightbulb, name: 'Startups & Founders', desc: 'Entity structuring, founder agreements, and early-stage compliance tracking.' },
      { icon: Building, name: 'Manufacturing', desc: 'Complex labour law compliance, equipment depreciation planning, and GST handling.' },
      { icon: TrendingUp, name: 'IT & Tech', desc: 'Software copyrighting, service tax structuring, and cross-border tech remittances.' },
      { icon: ShieldCheck, name: 'Food & FMCG', desc: 'FSSAI advisory, trademarking brand assets, and supply chain tax audits.' },
      { icon: Building2, name: 'Real Estate', desc: 'Due diligence on land acquisitions, RERA compliance, and project accounting.' },
      { icon: Briefcase, name: 'E-Commerce', desc: 'High-volume GST reconciliations, vendor agreement drafting, and tax structuring.' },
    ];
    return (
      <div className="animate-fadeIn pt-20 font-body">
        {/* Hero with background image */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={industriesHeroBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
            <div className="absolute inset-0 bg-primary/80" />
          </div>
          <div className="relative z-10 text-center">
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4">Sectors</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-primary-foreground">Industries We Serve</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">Tailored regulatory and financial frameworks for specific sectors.</p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div key={ind.name} className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon size={28} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-card-foreground">{ind.name}</h3>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{ind.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
        {/* Philosophy section removed */}
      </div>
    );
  };

  const ContactPage = () => {
    const updateField = (field: string, value: string | boolean) => setFormData(prev => ({ ...prev, [field]: value }));

    const domainServices: Record<string, string[]> = {
      'Legal & Secretarial (HRB & Co.)': ['Company Incorporation', 'Corporate Governance', 'Regulatory Compliance', 'Contract Drafting & Review', 'Intellectual Property', 'Other'],
      'Accounting & Compliance (Panaya)': ['GST Filing & Advisory', 'Income Tax Planning', 'TDS/TCS Compliance', 'Bookkeeping & Payroll', 'FEMA Compliance', 'Other'],
      'Audit & Assurance (M.G Meti)': ['Statutory Audit', 'Internal Audit', 'Tax Audit', 'Due Diligence', 'Forensic Audit', 'Other'],
      'General / Multiple Services': ['Multi-domain Advisory', 'Business Setup Consultation', 'Strategic Planning', 'Other'],
    };

    const steps = [
      { title: 'Personal Details', icon: <User size={18} /> },
      { title: 'Service Selection', icon: <Briefcase size={18} /> },
      { title: 'Schedule & Details', icon: <Clock size={18} /> },
    ];

    const canProceedStep0 = formData.fullName && formData.email && formData.phone;
    const canProceedStep1 = formData.domain;
    const canSubmit = formData.description && formData.agreeToTerms;
    const canAccessStep = (step: number) => {
      if (step === 0) return true;
      if (step === 1) return Boolean(canProceedStep0);
      if (step === 2) return Boolean(canProceedStep0 && canProceedStep1);
      return false;
    };
    const handleStepChange = (step: number) => {
      if (canAccessStep(step)) setFormStep(step);
    };

    const inputClasses = "w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all";

    return (
      <div className="animate-fadeIn pt-20 font-body">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-secondary/80 via-secondary/40 to-background text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--primary)) 0%, transparent 50%)' }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
              <Shield size={14} /> Confidential & Secure
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Book a Consultation</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">Engage with our experts. All inquiries undergo a mandatory conflict check and are routed to the specialized domain authority.</p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">Direct Contact</h2>
                <div className="mt-6 space-y-5">
                  {[
                    { icon: <MapPin size={20} />, label: 'Corporate Office', value: '284 Tharva, 1st Cross, Upkar Layout\nUllal RTO, Bangalore 560091' },
                    { icon: <Phone size={20} />, label: 'Telephone', value: '+91 98765 43210' },
                    { icon: <Mail size={20} />, label: 'Email', value: 'hello@unicorealliance.com' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="text-accent shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                        <p className="text-muted-foreground text-xs whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground text-sm mb-4">Why Choose Us</h3>
                <div className="space-y-3">
                  {['Mandatory conflict check on every inquiry', '1 business day response guarantee', 'DPDP Act compliant data protection', 'Multi-domain expertise under one roof'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <CheckCircle size={14} className="text-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {formSubmitted ? (
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-green-800 dark:text-green-300">Inquiry Received</h3>
                  <p className="text-green-700 dark:text-green-400 text-sm max-w-md">Thank you, <strong>{formData.fullName}</strong>. Your request for <strong>{formData.domain || 'consultation'}</strong> has been routed to the respective alliance partner. We will respond within 1 business day.</p>
                  <button onClick={() => { setFormSubmitted(false); setFormStep(0); setFormData({ fullName: '', companyName: '', designation: '', email: '', phone: '', countryCode: '+91', domain: '', subService: '', urgency: 'standard', preferredDate: '', preferredTime: '', description: '', howDidYouHear: '', agreeToTerms: false }); }} className="mt-4 text-sm text-accent hover:underline font-semibold">
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <div className="border border-border rounded-2xl bg-card shadow-sm overflow-hidden">
                  {/* Step indicator */}
                  <div className="flex border-b border-border">
                    {steps.map((step, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => handleStepChange(i)}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold tracking-wide transition-all ${
                          i === formStep ? 'bg-accent/10 text-accent border-b-2 border-accent' :
                          canAccessStep(i) ? 'text-accent/70 cursor-pointer hover:bg-secondary/50' :
                          'text-muted-foreground cursor-not-allowed'
                        }`}
                        aria-disabled={!canAccessStep(i)}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          i <= formStep ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                        }`}>{i < formStep ? '✓' : i + 1}</span>
                        <span className="hidden sm:inline">{step.title}</span>
                      </button>
                    ))}
                  </div>

                  <form className="p-6 md:p-8" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                    {/* Step 0: Personal Details */}
                    {formStep === 0 && (
                      <div className="space-y-5 animate-fadeIn">
                        <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2"><User size={18} className="text-accent" /> Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">Full Name <span className="text-destructive">*</span></label>
                            <input type="text" value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} placeholder="e.g. Rajesh Kumar" required className={inputClasses} />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">Company / Entity</label>
                            <input type="text" value={formData.companyName} onChange={e => updateField('companyName', e.target.value)} placeholder="e.g. Acme Pvt Ltd" className={inputClasses} />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-foreground mb-1.5 block">Designation / Role</label>
                          <input type="text" value={formData.designation} onChange={e => updateField('designation', e.target.value)} placeholder="e.g. Managing Director" className={inputClasses} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">Email Address <span className="text-destructive">*</span></label>
                            <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="you@company.com" required className={inputClasses} />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">Phone Number <span className="text-destructive">*</span></label>
                            <div className="flex gap-2">
                              <select value={formData.countryCode} onChange={e => updateField('countryCode', e.target.value)} className="w-20 border border-border rounded-lg px-2 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+971">+971</option>
                                <option value="+65">+65</option>
                              </select>
                              <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="98765 43210" required className={`${inputClasses} flex-1`} />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end pt-2">
                          <button type="button" disabled={!canProceedStep0} onClick={() => setFormStep(1)} className="bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground px-8 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                            Next: Service Selection <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 1: Service Selection */}
                    {formStep === 1 && (
                      <div className="space-y-5 animate-fadeIn">
                        <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2"><Briefcase size={18} className="text-accent" /> Service Selection</h3>
                        <div>
                          <label className="text-xs font-semibold text-foreground mb-1.5 block">Practice Area / Domain <span className="text-destructive">*</span></label>
                          <select value={formData.domain} onChange={e => { updateField('domain', e.target.value); updateField('subService', ''); }} required className={inputClasses}>
                            <option value="">Select a practice area...</option>
                            {Object.keys(domainServices).map(d => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                        {formData.domain && (
                          <div className="animate-fadeIn">
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">Specific Service</label>
                            <select value={formData.subService} onChange={e => updateField('subService', e.target.value)} className={inputClasses}>
                              <option value="">Select a service (optional)...</option>
                              {domainServices[formData.domain]?.map(s => <option key={s}>{s}</option>)}
                            </select>
                          </div>
                        )}
                        <div>
                          <label className="text-xs font-semibold text-foreground mb-3 block">Priority Level</label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { value: 'standard', label: 'Standard', desc: '3-5 days', color: 'border-border' },
                              { value: 'priority', label: 'Priority', desc: '1-2 days', color: 'border-amber-400' },
                              { value: 'urgent', label: 'Urgent', desc: '24 hours', color: 'border-destructive' },
                            ].map(u => (
                              <button key={u.value} type="button" onClick={() => updateField('urgency', u.value)} className={`p-3 rounded-xl border-2 text-center transition-all ${formData.urgency === u.value ? `${u.color} bg-accent/5 ring-1 ring-accent` : 'border-border hover:border-muted-foreground/30'}`}>
                                <span className="block text-sm font-semibold text-foreground">{u.label}</span>
                                <span className="block text-[10px] text-muted-foreground mt-0.5">{u.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between pt-2">
                          <button type="button" onClick={() => setFormStep(0)} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                            <ChevronLeft size={14} /> Back
                          </button>
                          <button type="button" disabled={!canProceedStep1} onClick={() => setFormStep(2)} className="bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground px-8 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                            Next: Schedule <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Schedule & Details */}
                    {formStep === 2 && (
                      <div className="space-y-5 animate-fadeIn">
                        <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2"><Clock size={18} className="text-accent" /> Schedule & Additional Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">Preferred Date</label>
                            <input type="date" value={formData.preferredDate} onChange={e => updateField('preferredDate', e.target.value)} min={new Date().toISOString().split('T')[0]} className={inputClasses} />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">Preferred Time</label>
                            <select value={formData.preferredTime} onChange={e => updateField('preferredTime', e.target.value)} className={inputClasses}>
                              <option value="">Select a time slot...</option>
                              <option>Morning (9 AM - 12 PM)</option>
                              <option>Afternoon (12 PM - 3 PM)</option>
                              <option>Evening (3 PM - 6 PM)</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-foreground mb-1.5 block">Describe Your Requirement <span className="text-destructive">*</span></label>
                          <textarea value={formData.description} onChange={e => updateField('description', e.target.value)} placeholder="Please provide a brief overview of your matter or requirement..." rows={4} required className={`${inputClasses} resize-none`} />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-foreground mb-1.5 block">How did you hear about us?</label>
                          <select value={formData.howDidYouHear} onChange={e => updateField('howDidYouHear', e.target.value)} className={inputClasses}>
                            <option value="">Select (optional)...</option>
                            <option>Referral</option>
                            <option>Google Search</option>
                            <option>LinkedIn</option>
                            <option>Industry Event</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input type="checkbox" checked={formData.agreeToTerms} onChange={e => updateField('agreeToTerms', e.target.checked)} className="mt-1 accent-accent" />
                          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">I acknowledge that this inquiry will undergo a conflict check and consent to the processing of my data under the DPDP Act and professional confidentiality obligations. <span className="text-destructive">*</span></span>
                        </label>
                        <div className="flex justify-between pt-2">
                          <button type="button" onClick={() => setFormStep(1)} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                            <ChevronLeft size={14} /> Back
                          </button>
                          <button type="submit" disabled={!canSubmit} className="bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground px-10 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2 uppercase tracking-wider">
                            <Shield size={14} /> Submit Inquiry
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  };

  // Router
  const renderPage = () => {
    switch (currentPage) {
      case 'about': return AboutPage();
      case 'services': return ServicesPage();
      case 'firms': return FirmsPage();
      case 'industries': return IndustriesPage();
      case 'contact': return ContactPage();
      default: return HomePage();
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={`min-h-screen bg-background ${showSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Navbar />
      <main>{renderPage()}</main>
      <Footer />
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919845346214?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.924 15.924 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.312 22.594c-.39 1.1-1.932 2.012-3.178 2.278-.854.18-1.968.324-5.72-1.23-4.804-1.988-7.9-6.862-8.138-7.18-.23-.318-1.926-2.566-1.926-4.892s1.22-3.472 1.652-3.946c.432-.474.944-.592 1.258-.592.314 0 .63.002.904.016.29.014.68-.11 1.064.812.39.938 1.326 3.236 1.442 3.47.116.236.194.51.038.826-.154.318-.232.514-.462.79-.23.278-.484.62-.692.832-.23.232-.47.484-.202.948.268.462 1.192 1.966 2.56 3.184 1.76 1.568 3.242 2.054 3.704 2.284.462.23.732.194 1.002-.116.268-.31 1.152-1.342 1.46-1.802.308-.462.616-.384 1.038-.23.422.154 2.674 1.262 3.136 1.492.462.23.77.346.886.534.116.19.116 1.092-.274 2.192z"/>
        </svg>
      </a>
      </div>
    </>
  );
}
