/**
 * Single Source of Truth for Louis Dumas Web Presence
 * Shared across Template 1, Template 2, and Template 3
 */

export const brand = {
  name: "LOUIS DUMAS",
  monogram: "LD",
  eyebrow: "ETHICS & LEADERSHIP",
  credential: "Former Canadian Ambassador & Senior Diplomatic Advisor",
  location: "Ottawa · Canada · Global",
  currentYear: 2026,
  copyrightNotice: "Louis Dumas. All rights reserved. Sovereign discretion maintained.",
  inquiryNotice: "All communications are reviewed directly and held in strict diplomatic confidence.",
};

export const hero = {
  headline: "What's important\nto you",
  subhead:
    "Helping leaders face complex decisions under pressure with clarity and integrity.",
  scrollPrompt: "Explore Mandate",
};

export const mandate = {
  kicker: "The Mandate",
  peekLead: "A deeper look at how you decide when the path isn’t clear, the information is incomplete, and more than one way forward seems right.",
  lead: "Helping leaders face complex decisions under pressure with clarity and integrity.",
  body: "Leaders and organisations in Canada and overseas turn to Louis Dumas when the decisions in front of them matter most. A former Canadian Ambassador and trained coach, he pairs a strong ethical framework with decades of leading change, helping leaders challenge assumptions, sharpen their thinking and act with judgement, clarity and courage.",
  primaryAction: {
    label: "Begin a Conversation",
    href: "#inquiry",
  },
  secondaryAction: {
    label: "Events & Appearances",
    href: "#events",
  },
};

export const institutionalTrust = {
  eyebrow: "INSTITUTIONAL TRUST",
  headline: "Leadership proven in high-consequence environments.",
  portraitUrl: "/images/louis-dumas-portrait.jpg",
  portraitCutoutUrl: "/images/louis-dumas-cutout.png",
  portraitAlt: "Former Canadian Ambassador Louis Dumas",
  paragraphs: [
    "As a former Canadian Ambassador and senior executive, Louis Dumas offers counsel built on decades of critical decision-making, framed by graduate studies in Management at Boston University and in Ethics at the University of Oxford. His career shaped national policy, strengthened international relationships and spanned some of the most pivotal periods in recent history, including the breakup of the Soviet Union, the years after 9/11 and the crisis in Gaza. He received the APEX Career Contribution Award and was repeatedly trusted to protect the integrity of institutions when decisions carried national weight."
  ],
  milestones: [
    {
      id: "diplomatic",
      category: "DIPLOMATIC RECORD",
      title: "Former Ambassador of Canada",
      color: "#B48B44",
    },
    {
      id: "stewardship",
      category: "EXECUTIVE STEWARDSHIP",
      title: "APEX Career Contribution",
      color: "#9D2933",
    },
    {
      id: "operational",
      category: "OPERATIONAL REALITY",
      title: "Optimising Decision-Making",
      color: "#B48B44",
    },
  ],
};

export const triptych = {
  kicker: "The Socratic Mandate",
  title: "Ethical judgement, clarity, and the courage to act.",
  pillars: [
    {
      numeral: "I",
      title: "Judgement",
      accentColor: "#9D2933",
      description:
        "A strong ethical framework for hard decisions. A confidential space for reflection and reset, where competing interests are weighed with integrity.",
      question:
        "When every option carries a cost, which principle will you refuse to trade away?",
    },
    {
      numeral: "II",
      title: "Clarity",
      accentColor: "#B48B44",
      description:
        "Challenging assumptions and sharpening strategic thinking. Seeing the full picture so leaders can separate what is urgent from what matters.",
      question:
        "Which urgent issue is keeping you from the conversation that really matters?",
    },
    {
      numeral: "III",
      title: "Courage",
      accentColor: "#165E83",
      description:
        "Turning insight into focused action so leaders can drive purposeful change with confidence and impact.",
      question:
        "What decision have you already made but not yet acted on?",
    },
  ],
};

export const services = [
  {
    id: "executive-coaching",
    title: "Executive Coaching",
    subtitle: "Executive Coaching",
    tagline: "One-on-One Advisory",
    description:
      "One-on-one coaching for executives, mid-career leaders and aspiring leaders. A space to challenge assumptions, sharpen strategic thinking, and navigate competing interests with clarity and integrity.",
    action: "Inquire about coaching",
    href: "#inquiry",
    scope: "Executive Retainer",
  },
  {
    id: "leadership-workshops",
    title: "Leadership Workshops",
    subtitle: "Leadership Workshops",
    tagline: "Boards & Leadership Teams",
    description:
      "Facilitated sessions for boards and leadership teams in government and business. Designed to surface competing interests, align people around shared values, and turn insight into focused action.",
    action: "Request workshop availability",
    href: "#inquiry",
    scope: "Executive Intensive / In-Person",
  },
  {
    id: "keynotes-forums",
    title: "Keynotes & Forums",
    subtitle: "Keynotes & Forums",
    tagline: "Public & Keynote Addresses",
    description:
      "Talks on ethical diplomacy, institutional trust, and leading change with integrity. Drawn from decades of Canadian public service and diplomacy, delivered to audiences globally.",
    action: "View events & appearances",
    href: "#events",
    scope: "Keynote / Chatham House Format",
  },
];

export const forumBrochure = {
  eyebrow: "ETHICS & LEADERSHIP FORUMS",
  subEyebrow: "OTTAWA · 2027 · EIGHT SEATS PER COHORT",
  pdfUrl: "/documents/ethics-and-leadership-forums-2027-en.pdf",
  pdfFileName: "Louis-Dumas-Ethics-and-Leadership-Forums-2027-EN.pdf",
  thumbnailUrl: "/images/forums/forum-2027-en-page-1.jpg",
  venue: "Alt Hotel Ottawa",
  seats: "Eight",
  seatsDetail: "Eight seats per cohort",
  schedule: {
    english: "Jan 11–12, 2027",
    french: "14–15 janv. 2027",
    venue: "Alt Hotel Ottawa",
  },
  host: {
    name: "Louis Dumas",
    role: "Former Canadian Ambassador",
    coachTitle: "Ethics & Leadership Coach",
    portraitUrl: "/images/louis-dumas-portrait.jpg",
  },
  slides: [
    {
      page: 1,
      numeral: "01",
      pillar: "JUDGEMENT",
      accentColor: "#9D2933",
      imageUrl: "/images/forums/forum-2027-en-page-1.jpg",
      headline: "What’s important to you?",
      subhead: "When the pressure is on, what guides your judgement?",
      body: "Two days of candid dialogue on real leadership decisions, examined through Socratic questions.",
    },
    {
      page: 2,
      numeral: "02",
      pillar: "CLARITY",
      accentColor: "#B48B44",
      imageUrl: "/images/forums/forum-2027-en-page-2.jpg",
      headline: "Two days. Eight leaders. Candid dialogue.",
      steps: [
        {
          number: "01",
          text: "Bring a decision that is important to you now.",
        },
        {
          number: "02",
          text: "Examine it through Socratic questions, in candid, confidential dialogue.",
        },
        {
          number: "03",
          text: "Leave with sharper judgement and a clearer way forward.",
        },
      ],
    },
    {
      page: 3,
      numeral: "03",
      pillar: "COURAGE",
      accentColor: "#165E83",
      imageUrl: "/images/forums/forum-2027-en-page-3.jpg",
      kicker: "YOUR HOST",
      headline: "Louis Dumas",
      subhead: "Former Canadian Ambassador · Ethics & Leadership Coach",
      quote: "“No lectures. No theory. Just decisions, talked through.”",
      sections: [
        {
          label: "WHY LOUIS",
          text: "Decades as a Canadian Ambassador and senior executive, making decisions where values could not be compromised.",
        },
        {
          label: "IN THE ROOM",
          text: "He challenges assumptions, sharpens strategic thinking and creates a confidential space for reflection and reset.",
        },
        {
          label: "WHO IT’S FOR",
          text: "Executives, mid-career and aspiring leaders in government and business facing decisions that matter.",
        },
      ],
    },
  ],
};

export const events = [
  {
    id: 2,
    date: new Date(2027, 0, 11), // Jan 11, 2027
    endDate: new Date(2027, 0, 12), // Jan 12, 2027
    dateDisplay: "Jan 11–12, 2027",
    city: "Ottawa, Ontario / In-Person",
    venue: "Alt Hotel Ottawa",
    seats: "Eight",
    cohortLang: "en",
    title: "Ethics and Leadership Forum — English Cohort",
    subtitle: "When the pressure is on, what guides your judgement?",
    summary: "English — January 11–12, 2027 for leaders and aspiring leaders from government and the private sector.",
    description:
      "These forums are designed for leaders and aspiring leaders who want to go beyond frameworks and management theory—to examine how they actually make decisions when the pressure is on, and how they can create the conditions for others to do the same.",
    type: "Executive Forum",
    badge: "English Cohort",
  },
  {
    id: 3,
    date: new Date(2027, 0, 14), // Jan 14, 2027
    endDate: new Date(2027, 0, 15), // Jan 15, 2027
    dateDisplay: "Jan 14–15, 2027",
    city: "Ottawa, Ontario / In-Person",
    venue: "Alt Hotel Ottawa",
    seats: "Eight",
    cohortLang: "fr",
    title: "Ethics and Leadership Forum — French Cohort",
    subtitle: "When the pressure is on, what guides your judgement?",
    summary: "French — January 14–15, 2027 for leaders and aspiring leaders from government and the private sector.",
    description:
      "These forums are designed for leaders and aspiring leaders who want to go beyond frameworks and management theory—to examine how they actually make decisions when the pressure is on, and how they can create the conditions for others to do the same.",
    type: "Executive Forum",
    badge: "Cohorte Francophone",
  },
];

export const navLinks = [
  { label: "The Mandate", href: "#mandate" },
  { label: "Engagements", href: "#services" },
  { label: "Events & Appearances", href: "#events" },
  { label: "Direct Inquiry", href: "#inquiry" },
];

export const contactDetails = {
  office: "Ottawa, Canada",
  protocol: "Diplomatic Discretion Guaranteed",
  responseTime: "Within 24-48 business hours",
  email: "info@louisdumas.com",
  linkedin: "https://www.linkedin.com/in/louis-dumas-b24634161/",
};

export const socialLinks = [
  {
    name: "Email",
    label: "info@louisdumas.com",
    href: "mailto:info@louisdumas.com",
    type: "email",
  },
  {
    name: "LinkedIn",
    label: "LinkedIn Profile",
    handle: "louis-dumas",
    href: "https://www.linkedin.com/in/louis-dumas-b24634161/",
    type: "linkedin",
  },
];
