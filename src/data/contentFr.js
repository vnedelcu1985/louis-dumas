/**
 * Version française canadienne (fr-CA) pour la présence web de Louis Dumas
 * Registre diplomatique et exécutif de haut niveau
 */

export const brandFr = {
  name: "LOUIS DUMAS",
  monogram: "LD",
  eyebrow: "ÉTHIQUE & LEADERSHIP",
  credential: "Ancien ambassadeur du Canada et haut conseiller diplomatique",
  location: "Ottawa · Canada · International",
  currentYear: 2026,
  copyrightNotice: "Louis Dumas. Tous droits réservés. Discrétion diplomatique assurée.",
  inquiryNotice: "Toutes les communications sont examinées directement et traitées dans la plus stricte confidentialité diplomatique.",
};

export const heroFr = {
  headline: "Qu'est-ce qui compte\npour vous ?",
  subhead:
    "Aider les dirigeants à affronter des décisions complexes sous pression, avec clarté et intégrité.",
  scrollPrompt: "Découvrir le mandat",
  // Cadence tokens for stage-1 animation
  tokens: {
    line1: "Qu'est-ce qui",
    word1: "compte",
    word2: "pour",
    word3: "vous ?",
  },
};

export const mandateFr = {
  kicker: "Le mandat",
  peekLead: "Un regard approfondi sur la manière dont vous décidez lorsque la voie n'est pas claire, l'information est incomplète et plus d'une option semble juste.",
  lead: "Aider les dirigeants à affronter des décisions complexes sous pression, avec clarté et intégrité.",
  body: "Au Canada comme à l'étranger, les dirigeants et les organisations font appel à Louis Dumas lorsque les décisions à prendre sont cruciales. Ancien ambassadeur du Canada et coach certifié, il conjugue un cadre éthique rigoureux à des décennies de conduite du changement, aidant les leaders à remettre en question leurs certitudes, à affiner leur pensée stratégique et à agir avec discernement, clarté et courage.",
  primaryAction: {
    label: "Engager la conversation",
    href: "#inquiry",
  },
  secondaryAction: {
    label: "Événements et interventions",
    href: "#events",
  },
  learnMore: "En savoir plus",
};

export const institutionalTrustFr = {
  eyebrow: "CONFIANCE INSTITUTIONNELLE",
  headline: "Un leadership éprouvé dans des contextes à forts enjeux.",
  portraitUrl: "/images/louis-dumas-portrait.jpg",
  portraitCutoutUrl: "/images/louis-dumas-cutout.png",
  portraitAlt: "Ancien ambassadeur du Canada Louis Dumas",
  badgeName: "Louis Dumas",
  paragraphs: [
    "Ancien ambassadeur du Canada et haut dirigeant, Louis Dumas offre des conseils fondés sur des décennies de prises de décisions critiques, enrichis par des études supérieures en gestion à l'Université de Boston et en éthique à l'Université d'Oxford. Sa carrière a façonné les politiques nationales, renforcé les relations internationales et traversé certaines des périodes les plus marquantes de l'histoire récente, notamment la chute de l'Union soviétique, l'après-11 septembre et la crise à Gaza. Récipiendaire du Prix d'excellence pour l'ensemble de la carrière d'APEX, il s'est vu maintes fois confier la protection de l'intégrité des institutions lorsque les décisions engageaient l'avenir de la nation.",
  ],
  milestones: [
    {
      id: "diplomatic",
      category: "PARCOURS DIPLOMATIQUE",
      title: "Ancien ambassadeur du Canada",
      color: "#B48B44",
    },
    {
      id: "stewardship",
      category: "DIRECTION STRATÉGIQUE",
      title: "Prix d'excellence pour l'ensemble de la carrière d'APEX",
      color: "#9D2933",
    },
    {
      id: "operational",
      category: "RÉALITÉS OPÉRATIONNELLES",
      title: "Optimisation de la prise de décision",
      color: "#B48B44",
    },
  ],
};

export const triptychFr = {
  kicker: "Le mandat socratique",
  headerKicker: "résoudre la complexité sous pression",
  title: "Discernement éthique, clarté et le courage d'agir.",
  pillars: [
    {
      numeral: "I",
      title: "Discernement",
      accentColor: "#9D2933",
      description:
        "Un cadre éthique solide pour les décisions difficiles. Un espace confidentiel de réflexion et de recentrage, où les intérêts divergents sont soupesés avec intégrité.",
      question:
        "Lorsque chaque option comporte un coût, quel principe refuserez-vous de sacrifier ?",
    },
    {
      numeral: "II",
      title: "Clarté",
      accentColor: "#B48B44",
      description:
        "Remettre en question les certitudes et aiguiser la pensée stratégique. Embrasser la situation dans son ensemble pour distinguer ce qui est urgent de ce qui est fondamental.",
      question:
        "Quelle urgence du moment vous détourne de la conversation qui compte réellement ?",
    },
    {
      numeral: "III",
      title: "Courage",
      accentColor: "#165E83",
      description:
        "Transformer la lucidité en action ciblée, afin que les dirigeants puissent mener un changement porteur de sens avec confiance et impact.",
      question:
        "Quelle décision avez-vous déjà prise, mais sans encore passer à l'action ?",
    },
  ],
};

export const servicesFr = [
  {
    id: "executive-coaching",
    title: "Coaching exécutif",
    subtitle: "Coaching exécutif",
    tagline: "Conseil individuel",
    description:
      "Accompagnement individuel pour dirigeants, cadres à mi-carrière et leaders de la relève. Un espace pour remettre en question les certitudes, aiguiser la pensée stratégique et concilier des intérêts divergents avec clarté et intégrité.",
    action: "S'informer sur le coaching",
    href: "#inquiry",
    scope: "Mandat de direction",
  },
  {
    id: "leadership-workshops",
    title: "Ateliers de leadership",
    subtitle: "Ateliers de leadership",
    tagline: "Conseils d'administration et équipes de direction",
    description:
      "Séances de facilitation pour les conseils d'administration et comités de direction au sein du secteur public et des entreprises. Conçues pour faire émerger les intérêts divergents, fédérer autour de valeurs communes et transformer la vision en actions ciblées.",
    action: "Vérifier la disponibilité des ateliers",
    href: "#inquiry",
    scope: "Intensif de direction / En personne",
  },
  {
    id: "keynotes-forums",
    title: "Conférences et forums",
    subtitle: "Conférences et forums",
    tagline: "Allocutions publiques et conférences principales",
    description:
      "Conférences sur la diplomatie éthique, la confiance institutionnelle et la conduite du changement avec intégrité. Tirées de décennies au service de l'État canadien et de la diplomatie, présentées à des auditoires à l'échelle mondiale.",
    action: "Consulter les événements et interventions",
    href: "#events",
    scope: "Conférence / Règle de Chatham House",
  },
];

export const forumBrochureFr = {
  eyebrow: "FORUMS ÉTHIQUE ET LEADERSHIP",
  subEyebrow: "OTTAWA · 2027 · HUIT PLACES PAR COHORTE",
  pdfUrl: "/documents/forums-ethique-et-leadership-2027-fr.pdf",
  pdfFileName: "Louis-Dumas-Forums-Ethique-et-Leadership-2027-FR.pdf",
  thumbnailUrl: "/images/forums/forum-2027-fr-page-1.jpg",
  venue: "Alt Hotel Ottawa",
  seats: "Huit",
  seatsDetail: "Huit places par cohorte",
  schedule: {
    english: "11–12 janv. 2027",
    french: "14–15 janv. 2027",
    venue: "Alt Hotel Ottawa",
  },
  host: {
    name: "Louis Dumas",
    role: "Ancien ambassadeur du Canada",
    coachTitle: "Coach certifié en éthique et leadership",
    portraitUrl: "/images/louis-dumas-portrait.jpg",
  },
  slides: [
    {
      page: 1,
      numeral: "01",
      pillar: "DISCERNEMENT",
      accentColor: "#9D2933",
      imageUrl: "/images/forums/forum-2027-fr-page-1.jpg",
      headline: "Qu’est-ce qui compte pour vous ?",
      subhead: "Lorsque la pression monte, qu’est-ce qui guide votre discernement ?",
      body: "Deux jours pour examiner comment vous prenez réellement vos décisions sous pression, à l’aide de questions socratiques.",
    },
    {
      page: 2,
      numeral: "02",
      pillar: "CLARTÉ",
      accentColor: "#B48B44",
      imageUrl: "/images/forums/forum-2027-fr-page-2.jpg",
      headline: "Deux jours. Huit leaders. Un dialogue franc.",
      steps: [
        {
          number: "01",
          text: "Apportez une décision qui compte pour vous aujourd’hui.",
        },
        {
          number: "02",
          text: "Examinez-la à l’aide de questions socratiques, dans un dialogue franc et confidentiel.",
        },
        {
          number: "03",
          text: "Repartez avec plus de discernement, de clarté et le courage d’agir.",
        },
      ],
    },
    {
      page: 3,
      numeral: "03",
      pillar: "COURAGE",
      accentColor: "#165E83",
      imageUrl: "/images/forums/forum-2027-fr-page-3.jpg",
      kicker: "VOTRE HÔTE",
      headline: "Louis Dumas",
      subhead: "Ancien ambassadeur du Canada · Coach certifié en éthique et leadership",
      quote: "« Pas de cours magistraux. Pas de théorie. Seulement des décisions, discutées ensemble. »",
      sections: [
        {
          label: "POURQUOI LOUIS",
          text: "Ancien ambassadeur et haut dirigeant, fort de décennies de prises de décisions critiques, là où les valeurs ne peuvent être compromises.",
        },
        {
          label: "DANS LA SALLE",
          text: "Il aide les leaders à remettre en question leurs certitudes, à affiner leur pensée stratégique et à agir avec discernement, clarté et courage.",
        },
        {
          label: "POUR QUI",
          text: "Dirigeants, cadres à mi-carrière et leaders de la relève des secteurs public et privé, face à des décisions cruciales.",
        },
      ],
    },
  ],
};

export const eventsFr = [
  {
    id: 2,
    date: new Date(2027, 0, 11),
    endDate: new Date(2027, 0, 12),
    dateDisplay: "11-12 janv. 2027",
    city: "Ottawa, Ontario / En personne",
    venue: "Alt Hotel Ottawa",
    seats: "Huit",
    cohortLang: "en",
    title: "Forum Éthique et Leadership — Cohorte anglophone",
    subtitle: "Lorsque la pression monte, qu’est-ce qui guide votre discernement ?",
    summary:
      "Anglais — 11-12 janvier 2027 pour leaders et leaders de la relève des secteurs public et privé.",
    description:
      "Ces forums s'adressent aux leaders et aux leaders de la relève qui souhaitent aller au-delà des cadres théoriques et du management traditionnel — pour examiner comment ils prennent réellement leurs décisions sous pression, et comment instaurer les conditions permettant aux autres d'en faire autant.",
    type: "Forum de direction",
    badge: "Cohorte anglophone",
  },
  {
    id: 3,
    date: new Date(2027, 0, 14),
    endDate: new Date(2027, 0, 15),
    dateDisplay: "14-15 janv. 2027",
    city: "Ottawa, Ontario / En personne",
    venue: "Alt Hotel Ottawa",
    seats: "Huit",
    cohortLang: "fr",
    title: "Forum Éthique et Leadership — Cohorte francophone",
    subtitle: "Lorsque la pression monte, qu’est-ce qui guide votre discernement ?",
    summary:
      "Français — 14-15 janvier 2027 pour leaders et leaders de la relève des secteurs public et privé.",
    description:
      "Ces forums s'adressent aux leaders et aux leaders de la relève qui souhaitent aller au-delà des cadres théoriques et du management traditionnel — pour examiner comment ils prennent réellement leurs décisions sous pression, et comment instaurer les conditions permettant aux autres d'en faire autant.",
    type: "Forum de direction",
    badge: "Cohorte francophone",
  },
];

export const calendarI18nFr = {
  sectionKicker: "Calendrier des engagements",
  sectionTitle: "Conférences à venir, exercices de simulation et forums",
  calendarHeader: "Calendrier de direction",
  yearRange: "2026–2027",
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  weekDays: ["DI", "LU", "MA", "ME", "JE", "VE", "SA"],
  scheduledForum: "Forum prévu",
  clearDateFilter: "Effacer le filtre ×",
  reset: "Réinitialiser",
  noEvents: "Aucun engagement public n'est prévu à cette date.",
  locationLabel: "Lieu :",
  prevMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  registerButton: "S'inscrire",
  registerForEvent: "S'inscrire à cet événement",
  viewPoster: "Voir l'affiche",
  downloadPdf: "Télécharger le PDF",
  openPdf: "Ouvrir le PDF",
  whenLabel: "Quand",
  whereLabel: "Lieu",
  seatsLabel: "Places",
  hostedByLabel: "Animé par",
  pageLabel: "Page",
  closeModal: "Fermer l'aperçu",
};

export const navLinksFr = [
  { label: "Le mandat", href: "#mandate" },
  { label: "Engagements", href: "#services" },
  { label: "Événements et interventions", href: "#events" },
  { label: "Prise de contact", href: "#inquiry" },
];

export const inquiryFr = {
  titleLine1: "Correspondance",
  titleLine2: "directe",
  description:
    "Demandes relatives au conseil de direction, à la gestion de crise ou à la facilitation organisationnelle. Toutes les communications sont examinées directement par l'ancien ambassadeur Louis Dumas.",
  linkedinLabel: "Profil LinkedIn",
  requestOptions: [
    "Coaching exécutif",
    "Ateliers de leadership",
    "Conférences et forums",
    "Autre",
  ],
  labels: {
    fullName: "Nom complet *",
    organization: "Organisation / Titre",
    email: "Adresse courriel *",
    phone: "Numéro de téléphone (optionnel)",
    requestType: "Nature de la demande *",
    selectRequestType: "Sélectionner la nature de la demande *",
    details: "Précisions ou contexte *",
    submitButton: "Transmettre la demande",
    receivedTitle: "Envoyé",
    receivedMessage: (name) => `Merci, ${name}.`,
    sendAnother: "Envoyer un autre message →",
  },
};

export const footerFr = {
  protocolLabel: "Protocole de confidentialité et de sécurité",
};
