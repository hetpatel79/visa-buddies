// ── Contact (from environment — never hardcode in source) ─────────
export const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER ?? "+918160050554";
export const WA_NUMBER    = import.meta.env.VITE_WA_NUMBER    ?? "918160050554";
const WA_MSG_RAW          = import.meta.env.VITE_WA_MSG       ?? "Hi Visa Buddies! I'm interested in visa consultation services. Could you please share more details?";
export const WA_LINK      = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG_RAW)}`;
export const CONTACT_EMAIL   = import.meta.env.VITE_EMAIL          ?? "info@visabuddies.in";
export const CONTACT_WEBSITE = import.meta.env.VITE_WEBSITE        ?? "https://www.visa-buddies.com";
export const OFFICE_ADDRESS  = import.meta.env.VITE_OFFICE_ADDRESS ?? "Office Address, Gujarat, India";

// ── Navigation ────────────────────────────────────────────────────
export const NAV = ["Home", "About Us", "Study Abroad", "Work Visa", "Tourist Visa", "Business Visa", "PR", "Success Stories", "Contact"];
export const NAV_TARGET = {
  "Study Abroad":  "services",
  "Work Visa":     "services",
  "Business Visa": "services",
  "PR":            "services",
};

// ── Services overview ─────────────────────────────────────────────
export const SERVICES = [
  { icon: "🎓", title: "Student Visa",       desc: "Expert guidance from university selection to visa approval." },
  { icon: "💼", title: "Work Visa",           desc: "Work permit pathways for NZ, Australia, UK, Europe & more." },
  { icon: "🌍", title: "Tourist Visa",        desc: "Hassle-free travel visa processing for 50+ countries." },
  { icon: "🏢", title: "Business Visa",       desc: "Investor, entrepreneur, and business visitor visas." },
  { icon: "🛂", title: "Permanent Residency", desc: "PR pathways for Canada, Australia, NZ, and UK." },
  { icon: "📄", title: "Documentation",       desc: "Complete document preparation and review support." },
];

// ── Visa category cards ───────────────────────────────────────────
export const VISA_CATEGORIES = [
  { key: "study-abroad",  visa: "student",  icon: "🎓", title: "Study Abroad",            desc: "From shortlisting universities to securing your student visa, we guide you through every step — SOPs, LORs, financial documentation, and interview prep — for top study destinations including Canada, UK, Australia, and Europe." },
  { key: "work-visa",     visa: "work",     icon: "💼", title: "Work Visa",                desc: "Work permit pathways for skilled professionals heading to New Zealand, Australia, UK, Europe, and beyond — we handle job offer documentation, sponsorships, and application filing end-to-end." },
  { key: "business-visa", visa: "business", icon: "🏢", title: "Business Visa",            desc: "Whether you're attending a conference, exploring investment opportunities, or visiting business partners abroad, our team handles documentation and applications for business and investor visas across major economies." },
  { key: "pr",            visa: "pr",       icon: "🛂", title: "Permanent Residency (PR)", desc: "Settle abroad for good. We help you navigate points-based and employer-sponsored PR pathways for Canada, Australia, New Zealand, and the UK — from eligibility assessment to final approval." },
];

// ── Stats ─────────────────────────────────────────────────────────
export const STATS = [
  { n: "10",   s: "+",  l: "Destination Countries" },
  { n: "5000", s: "+",  l: "Applications Processed" },
  { n: "98",   s: "%",  l: "Visa Success Rate" },
  { n: "24",   s: "/7", l: "Support Available" },
];

// ── Hero ──────────────────────────────────────────────────────────
export const HERO_WORDS = ["Global Opportunities", "a Better Future", "Your Dream Life", "New Horizons"];

// ── Destinations ──────────────────────────────────────────────────
export const DESTINATIONS = [
  { f: "🇨🇦", n: "Canada",         sub: "Study • Work • PR" },
  { f: "🇦🇺", n: "Australia",      sub: "Study • Work • Migrate" },
  { f: "🇳🇿", n: "New Zealand",    sub: "Work • PR • Lifestyle" },
  { f: "🇬🇧", n: "United Kingdom", sub: "Study • Work • Settle", formName: "UK" },
  { f: "🇺🇸", n: "USA",           sub: "Study • Business • Travel" },
  { f: "🇩🇪", n: "Germany",        sub: "Work • Engineering • Tech" },
  { f: "🇮🇪", n: "Ireland",        sub: "Tech • Study • Work" },
  { f: "🇸🇬", n: "Singapore",      sub: "Business • Finance • Tech" },
];

// ── Process timeline ──────────────────────────────────────────────
export const TIMELINE = [
  "Free Consultation", "Profile Evaluation", "Document Preparation",
  "Application Submission", "Visa Filing", "Interview Guidance",
  "Visa Approval", "Fly Abroad 🎉",
];

// ── Form ──────────────────────────────────────────────────────────
export const POPULAR_COUNTRIES = ["USA", "Canada", "UK", "Australia", "New Zealand"];
export const EUROPE_COUNTRIES  = ["Germany", "Hungary", "Poland", "France", "Netherlands", "Ireland"];
export const VISA_TYPES = [
  { v: "pr",       l: "PR Visa" },
  { v: "student",  l: "Student Visa" },
  { v: "work",     l: "Work Permit" },
  { v: "tourist",  l: "Tourist Visa" },
  { v: "business", l: "Business Visa" },
  { v: "other",    l: "Other Visa" },
];

// ── Testimonials ──────────────────────────────────────────────────
export const TESTIMONIALS = [
  { name: "Rahul Sharma", visa: "Canada Student Visa",    av: "RS", text: "The entire process was smooth. VISA BUDDIES handled everything professionally." },
  { name: "Priya Patel",  visa: "New Zealand Work Visa",  av: "PP", text: "They explained every step clearly and were always available to answer questions." },
  { name: "Aman Singh",   visa: "Australia Tourist Visa", av: "AS", text: "I received my visa on time with complete guidance from the team." },
];

// ── FAQ ───────────────────────────────────────────────────────────
export const FAQS = [
  { q: "How long does a Student Visa take?",    a: "Processing times vary by country and institution. We provide a detailed timeline during your free consultation based on your specific destination and intake." },
  { q: "Do you help with SOP writing?",         a: "Yes! Our team provides professional SOP (Statement of Purpose) and LOR guidance to strengthen your application." },
  { q: "Can I apply for PR after study?",       a: "Absolutely. Many countries like Canada, Australia, and New Zealand offer post-study PR pathways. We guide you from day one with this long-term goal in mind." },
  { q: "What documents are required?",          a: "Requirements vary by visa type and destination. We provide a personalised document checklist after reviewing your profile." },
  { q: "Do you provide interview preparation?", a: "Yes. For visa categories that require interviews, our consultants provide mock sessions and comprehensive preparation support." },
];

// ── Marquee / Trust ───────────────────────────────────────────────
export const MARQUEE_ITEMS = ["🇨🇦 Canada PR", "🇦🇺 Australia Visa", "🇳🇿 New Zealand Work", "🇬🇧 UK Skilled Worker", "🇺🇸 USA Student", "🇩🇪 Germany Work", "🇸🇬 Singapore Business", "🇮🇪 Ireland Tech Visa", "Tourist Visa", "Business Visa", "Student Visa", "Work Permit"];
export const TRUST         = ["Expert Guidance", "Licensed Consultants", "Transparent Process", "End-to-End Support", "Dedicated Case Manager", "High Success Rate"];
export const TRUST_POINTS  = ["Honest Advice", "Personalized Consultation", "SOP Assistance", "University Admissions", "Interview Preparation", "Visa Documentation", "Fast Response Time", "Dedicated Case Manager"];

// ── Founders ──────────────────────────────────────────────────────
export const FOUNDERS = [
  { name: "Harshit Patel",   role: "Founder & CEO",                       av: "HP" },
  { name: "Aakansha Mahida", role: "Co-Founder & Managing Director (MD)",  av: "AM" },
];
