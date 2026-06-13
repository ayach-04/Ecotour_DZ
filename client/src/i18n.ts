import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        destinations: "Destinations",
        guide: "Guide",
        community: "Community",
        learn: "Learn",
        store: "Store",
        contact: "Contact",
        begin: "Begin Your Journey",
      },
      ui: {
        heroTitle: "Travel Algeria Without Taking From It",
        heroSubtitle: "Ethical eco-tourism rooted in nature, culture, and community stewardship.",
        heroPrimary: "Begin the Journey",
        heroSecondary: "Why Travel Differently?",
        howHeading: "How It Works",
        howSub: "EcoTour DZ guides you through a responsible journey of discovery, not a booking process.",
        impactHeading: "Impact in Numbers",
        impactSub: "Transparency, not marketing. Real impact, measurable change.",
        experiencesHeading: "Featured Eco-Experiences",
        experiencesSub:
          "Discover meaningful experiences that prioritize learning, conservation, and minimal environmental impact.",
        voicesHeading: "Community Voices",
        voicesSub: "The people who call Algeria home guide every decision we make",
        storiesHeading: "Education & Stories",
        storiesSub: "A visual journey through Algeria's ecosystems and responsible ecotourism",
        finalTop: "Travel is a privilege.",
        finalBottom: "Caring for a place is a responsibility.",
        finalBody: "Join us in reimagining what tourism can be - a force for preservation, not extraction.",
        finalPrimary: "Start Your Journey",
        finalSecondary: "Learn Our Ethics First",
      },
    },
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        destinations: "Destinations",
        guide: "Guide",
        community: "Communauté",
        learn: "Apprendre",
        store: "Boutique",
        contact: "Contact",
        begin: "Commencer votre voyage",
      },
      ui: {
        heroTitle: "Voyagez en Algérie sans la prendre",
        heroSubtitle: "Écotourisme éthique ancré dans la nature, la culture et les communautés.",
        heroPrimary: "Commencer le voyage",
        heroSecondary: "Pourquoi voyager autrement ?",
        howHeading: "Comment ça marche",
        howSub: "EcoTour DZ vous guide dans un parcours responsable de découverte, pas une simple réservation.",
        impactHeading: "Impact en chiffres",
        impactSub: "Transparence, pas marketing. Impact réel, changement mesurable.",
        experiencesHeading: "Expériences éco proposées",
        experiencesSub:
          "Découvrez des expériences qui privilégient l’apprentissage, la conservation et un impact minimal.",
        voicesHeading: "Voix des communautés",
        voicesSub: "Les habitants guident chacune de nos décisions",
        storiesHeading: "Éducation & Histoires",
        storiesSub: "Un voyage visuel à travers les écosystèmes algériens et l’écotourisme responsable",
        finalTop: "Voyager est un privilège.",
        finalBottom: "Prendre soin d’un lieu est une responsabilité.",
        finalBody: "Rejoignez-nous pour réinventer le tourisme : une force de préservation, pas d’extraction.",
        finalPrimary: "Commencer le voyage",
        finalSecondary: "Découvrir notre éthique d’abord",
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        destinations: "الوجهات",
        guide: "الدليل",
        community: "المجتمع",
        learn: "التعلّم",
        store: "المتجر",
        contact: "تواصل",
        begin: "ابدأ رحلتك",
      },
      ui: {
        heroTitle: "سافر في الجزائر دون أن تنتزع منها",
        heroSubtitle: "سياحة بيئية أخلاقية متجذرة في الطبيعة والثقافة والمجتمع.",
        heroPrimary: "ابدأ الرحلة",
        heroSecondary: "لماذا نسافر بشكل مختلف؟",
        howHeading: "كيف يعمل ذلك",
        howSub: "إيكوتور دي زاد ترشدك في رحلة مسؤولة للتعرف، وليست مجرد حجز.",
        impactHeading: "الأثر بالأرقام",
        impactSub: "شفافية لا تسويق. أثر حقيقي وتغيير ملموس.",
        experiencesHeading: "تجارب بيئية مميزة",
        experiencesSub: "اكتشف تجارب تركز على التعلم والحفاظ وتقليل الأثر.",
        voicesHeading: "أصوات المجتمع",
        voicesSub: "أهل المكان يوجهون كل قرار نتخذه",
        storiesHeading: "تعليم وحكايات",
        storiesSub: "رحلة بصرية عبر نظم الجزائر البيئية والسياحة المسؤولة",
        finalTop: "السفر امتياز.",
        finalBottom: "الاهتمام بالمكان مسؤولية.",
        finalBody: "انضم إلينا لإعادة تصور السياحة كقوة للحفاظ لا للاستخراج.",
        finalPrimary: "ابدأ رحلتك",
        finalSecondary: "تعرف على أخلاقنا أولاً",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
