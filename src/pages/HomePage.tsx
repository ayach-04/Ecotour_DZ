import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Footprints,
  Flower,
  Map,
  MapPin,
  Leaf,
  Lock,
  Heart,
  Shield,
  Snowflake,
  Sun,
  Trees,
  TrendingUp,
  Unlock,
  Users,
} from "lucide-react";
function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);
  const ERROR_IMG_SRC =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Rya2Utd2lkdGg9IjMuNyI+PHJlY3QgeD0iMTYiIHk9IjE2IiB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHJ4PSI2Ii8+PHBhdGggZD0ibTE2IDU4IDE2LTE4IDMyIDMyIi8+PGNpcmNsZSBjeD0iNTMiIGN5PSIzNSIgcj0iNyIvPjwvc3ZnPgoK";

  const handleError = () => setDidError(true);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  );
}

const pillars = [
  {
    icon: BookOpen,
    title: "Learn Before You Go",
    description: "Destinations unlock through knowledge.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Locals lead, host, and decide.",
  },
  {
    icon: Leaf,
    title: "Nature Has Limits",
    description: "Visitor caps and seasonal rest.",
  },
  {
    icon: Heart,
    title: "Give Back Every Time",
    description: "Every journey supports conservation.",
  },
];

const features = [
  {
    icon: Leaf,
    title: "Nature First",
    description: "Ecosystems set the rules, not tourism demands",
  },
  {
    icon: Users,
    title: "Community",
    description: "Local knowledge and sustainable practices",
  },
  {
    icon: Calendar,
    title: "Seasonal Approach",
    description: "Right time, right place, right impact",
  },
  {
    icon: Shield,
    title: "Responsibility",
    description: "Education and ethical guidance",
  },
];

const ecosystems = [
  {
    title: "Forests & Mountains",
    image:
      "https://images.unsplash.com/photo-1623714058183-a5cfc29169f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwZm9yZXN0JTIwbW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY4NDExOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Cedar forests and Atlas peaks - sensitive to foot traffic, best explored in spring and fall",
    sensitivity: "High",
  },
  {
    title: "Desert & Oases",
    image:
      "https://images.unsplash.com/photo-1638732984003-d2a05a69ebd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwZGVzZXJ0JTIwc2FoYXJhJTIwZHVuZXN8ZW58MXx8fHwxNzY4NDExOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Saharan dunes and palm oases - fragile ecosystems requiring careful seasonal timing",
    sensitivity: "Very High",
  },
  {
    title: "Wetlands",
    image:
      "https://images.unsplash.com/photo-1564247300406-a9c93aefa5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwd2V0bGFuZCUyMGxha2UlMjBuYXR1cmV8ZW58MXx8fHwxNzY4NDExOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Critical bird habitats and water ecosystems - protected during nesting seasons",
    sensitivity: "Very High",
  },
  {
    title: "Coastal Areas",
    image:
      "https://images.unsplash.com/photo-1748869094275-8852ce7a3146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwb2FzaXMlMjBwYWxtJTIwdHJlZXN8ZW58MXx8fHwxNzY4NDExOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Mediterranean biodiversity hotspots - seasonal restrictions apply",
    sensitivity: "Moderate",
  },
];

const voices = [
  {
    name: "Fatima",
    role: "Oasis farmer, M'zab Valley",
    quote:
      "Tourism should help our land breathe, not exhaust it. Every visitor who learns our ways becomes a guardian, not just a guest.",
    image:
      "https://images.unsplash.com/photo-1677053199368-6d6360d3cc9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJiZXIlMjBhcnRpc2FuJTIwd2VhdmluZ3xlbnwxfHx8fDE3NjgyNDg2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Youssef",
    role: "Mountain guide, Hoggar",
    quote:
      "The mountains don't need more footprints. They need more people who understand why we walk softly here.",
    image:
      "https://images.unsplash.com/photo-1707557220564-0a0405c4d00a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGd1aWRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY4MjQ4NjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Amina",
    role: "Artisan weaver, Ghardaïa",
    quote:
      "When travelers value our craft, they preserve our culture. This is the exchange we believe in.",
    image:
      "https://images.unsplash.com/photo-1677053199368-6d6360d3cc9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJiZXIlMjBhcnRpc2FuJTIwd2VhdmluZ3xlbnwxfHx8fDE3NjgyNDg2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const seasons = [
  {
    id: "spring",
    name: "Spring",
    icon: Flower,
    color: "from-green-400 to-emerald-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    condition: "Blooming & Renewal",
    sensitivity: "Moderate",
    image:
      "https://images.unsplash.com/photo-1656355691752-a576cbf30ac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtaXN0JTIwbW91bnRhaW5zfGVufDF8fHx8MTc2ODQxMTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Bird watching", "Wildflower photography", "Forest hiking"],
    recommendedEcosystems: [
      {
        name: "Coastal north",
        detail: "Mild temps and sea breezes keep impact low during peak bloom.",
        activities: ["Cliffside sunrise walks", "Coastal bird watching", "Tidepool ethics tour"],
      },
      {
        name: "Atlas foothills",
        detail: "Snowmelt feeds streams; trails stay cooler before summer heat.",
        activities: ["Forest hiking", "Waterfall approach hikes", "Wildflower photography"],
      },
      {
        name: "Wetlands during migration",
        detail: "Prime birding corridors—use boardwalks and stay quiet.",
        activities: ["Hide-based birding", "Guided wetland boardwalks", "Binocular skills workshop"],
      },
    ],
    description:
      "Ideal time for observing nature's awakening with minimal impact. Forests come alive with blooming flora and migratory birds return to their nesting grounds.",
  },
  {
    id: "summer",
    name: "Summer",
    icon: Sun,
    color: "from-yellow-400 to-orange-600",
    bgColor: "bg-yellow-50",
    textColor: "text-orange-700",
    condition: "Hot & Dry",
    sensitivity: "High",
    image:
      "https://images.unsplash.com/photo-1638732984003-d2a05a69ebd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwZGVzZXJ0JTIwc2FoYXJhJTIwZHVuZXN8ZW58MXx8fHwxNzY4NDExOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Coastal exploration", "Early morning hikes", "Cultural visits"],
    recommendedEcosystems: [
      {
        name: "Coastal breezes",
        detail: "Marine air moderates heat—stick to low-impact seaside trails.",
        activities: ["Sunrise coastal walks", "Intertidal observing", "Marine microplastics clean-up"],
      },
      {
        name: "High plateaus at dawn",
        detail: "Cooler early hours let you hike safely before temperatures spike.",
        activities: ["Early peak hikes", "Sunrise photography", "Meadow bird listening"],
      },
      {
        name: "Oases after sunset",
        detail: "Night walks and stargazing respect daytime heat stress on desert life.",
        activities: ["Oasis stargazing", "Evening palm-grove walks", "Night sky storytelling with locals"],
      },
    ],
    description:
      "Limited ecotourism due to heat stress on ecosystems. Desert regions experience extreme temperatures requiring careful planning and respect for nature's limits.",
  },
  {
    id: "autumn",
    name: "Autumn",
    icon: Leaf,
    color: "from-amber-500 to-red-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    condition: "Harvest & Migration",
    sensitivity: "Low",
    image:
      "https://images.unsplash.com/photo-1623714058183-a5cfc29169f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwZm9yZXN0JTIwbW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY4NDExOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Agricultural experiences", "Migration watching", "Mountain trekking"],
    recommendedEcosystems: [
      {
        name: "Kabylie & Aurès mountains",
        detail: "Cool, clear trekking weather with minimal vegetation stress.",
        activities: ["Ridge treks", "Cedar and oak ecology walks", "Autumn foliage photography"],
      },
      {
        name: "Tell Atlas forests",
        detail: "Understory is stable post-summer; wildlife is easier to observe.",
        activities: ["Forest birding", "Mushroom awareness walks", "Canopy-edge observation"],
      },
      {
        name: "Highland farms & orchards",
        detail: "Harvest season supports agro-ecology visits with low pressure.",
        activities: ["Harvest participation", "Olive/pomegranate picking", "Farm-to-table workshops"],
      },
    ],
    description:
      "Prime season for sustainable nature experiences. Cooler temperatures and harvest season offer unique cultural immersion opportunities.",
  },
  {
    id: "winter",
    name: "Winter",
    icon: Snowflake,
    color: "from-blue-400 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    condition: "Cold & Wet",
    sensitivity: "Moderate",
    image:
      "https://images.unsplash.com/photo-1564247300406-a9c93aefa5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwd2V0bGFuZCUyMGxha2UlMjBuYXR1cmV8ZW58MXx8fHwxNzY4NDExOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Desert exploration", "Wetland observation", "Indoor learning"],
    recommendedEcosystems: [
      {
        name: "Saharan dunes & oases",
        detail: "Cooler temps make dune treks and oasis stays safer for wildlife.",
        activities: ["Dawn dune walks", "Camel-assisted low-impact treks", "Oasis cultural visits"],
      },
      {
        name: "Chotts & winter wetlands",
        detail: "Seasonal lakes host migratory birds—watch from hides and paths.",
        activities: ["Hide-based birding", "Wetland photography", "Guided boardwalk safaris"],
      },
      {
        name: "Mild coastal bays",
        detail: "Gentle winter seas support low-impact coastal walks and marine spotting.",
        activities: ["Coastal trail walks", "Marine mammal spotting", "Harbor ecology tours"],
      },
    ],
    description:
      "Great for desert regions, limited in mountain areas. Wetlands host incredible bird diversity during winter migration season.",
  },
];

const howItWorksSteps = [
  {
    icon: BookOpen,
    title: "Learn About Ecosystems",
    description: "Understand Algeria's natural environments, their fragility, and ecological importance",
  },
  {
    icon: MapPin,
    title: "Understand Seasonal Sensitivity",
    description: "Discover when and where to visit based on environmental conditions",
  },
  {
    icon: CheckCircle,
    title: "Receive Responsible Recommendations",
    description: "Get guided eco-experiences that minimize impact and maximize learning",
  },
];

const experiences = [
  {
    id: "nature-observation",
    title: "Nature Observation",
    image:
      "https://images.unsplash.com/photo-1767045086909-22a1212d9768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwd2F0Y2hpbmclMjBuYXR1cmUlMjBvYnNlcnZhdGlvbnxlbnwxfHx8fDE3Njg0MTE5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Learn to observe wildlife without disturbance. Guided experiences with local naturalists.",
    ecoReason: "No physical impact • Educational focus • Supports local guides • Seasonal timing",
    season: "Spring & Autumn",
  },
  {
    id: "agricultural-experiences",
    title: "Agricultural Experiences",
    image:
      "https://images.unsplash.com/photo-1761453502104-3481cf68fdec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmYXJtJTIwZXhwZXJpZW5jZXxlbnwxfHx8fDE3Njg0MTE5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Participate in traditional, sustainable farming practices. Connect with local communities.",
    ecoReason: "Supports local economy • Traditional methods • Cultural preservation • Zero waste",
    season: "Year-round",
  },
  {
    id: "conservation-activities",
    title: "Conservation Activities",
    image:
      "https://images.unsplash.com/photo-1658062787926-92e3cd64c4c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBjb25zZXJ2YXRpb24lMjB3aWxkbGlmZXxlbnwxfHx8fDE3Njg0MTE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Join habitat restoration projects and wildlife monitoring programs with conservation groups.",
    ecoReason: "Active contribution • Measurable impact • Scientific learning • Community benefit",
    season: "Seasonal Projects",
  },
  {
    id: "desert-night-astronomy",
    title: "Desert Night Astronomy",
    image:
      "https://images.pexels.com/photos/31412704/pexels-photo-31412704.jpeg",
    description: "Stargaze with local guides, learn dark-sky ethics, and understand desert constellations.",
    ecoReason: "Low-impact timing • No daylight heat stress • Supports local astronomy guides",
    season: "Winter & Early Spring",
  },
  {
    id: "coastal-dune-care",
    title: "Coastal Dune Care",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    description: "Help stabilize dunes, remove debris, and learn about coastal flora resilience.",
    ecoReason: "Hands-on restoration • Marine litter removal • Habitat protection",
    season: "Spring & Autumn",
  },
  {
    id: "wetland-bird-safaris",
    title: "Wetland Bird Safaris",
    image:
      "https://images.unsplash.com/photo-1438109491414-7198515b166b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    description: "Hide-based birding with ornithologists; etiquette-first spotting and logging.",
    ecoReason: "Non-intrusive viewing • Data sharing • Supports conservation guides",
    season: "Migration Seasons",
  },
];

const experienceFilters = [
  {
    id: "all",
    label: "All Algeria",
    experienceIds: experiences.map((exp) => exp.id),
  },
  {
    id: "kabyle",
    label: "Kabyle",
    experienceIds: ["nature-observation", "coastal-dune-care", "agricultural-experiences", "wetland-bird-safaris"],
  },
  {
    id: "ghardaia",
    label: "Ghardaia",
    experienceIds: ["desert-night-astronomy", "conservation-activities", "agricultural-experiences", "nature-observation"],
  },
  {
    id: "bejaya",
    label: "Bejaya",
    experienceIds: ["coastal-dune-care", "wetland-bird-safaris", "nature-observation", "conservation-activities"],
  },
  {
    id: "tasili",
    label: "Tasili",
    experienceIds: ["desert-night-astronomy", "conservation-activities", "nature-observation", "agricultural-experiences"],
  },
  {
    id: "constantine",
    label: "Constantine",
    experienceIds: ["nature-observation", "agricultural-experiences", "conservation-activities", "wetland-bird-safaris"],
  },
  {
    id: "alger",
    label: "Alger",
    experienceIds: ["coastal-dune-care", "agricultural-experiences", "nature-observation", "conservation-activities"],
  },
  {
    id: "telemcen",
    label: "Telemcen",
    experienceIds: ["nature-observation", "agricultural-experiences", "wetland-bird-safaris", "desert-night-astronomy"],
  },
  {
    id: "messila",
    label: "Messila",
    experienceIds: ["agricultural-experiences", "conservation-activities", "desert-night-astronomy", "nature-observation"],
  },

];

const metrics = [
  {
    icon: Trees,
    value: 2847,
    label: "Trees Planted",
    suffix: "",
  },
  {
    icon: Users,
    value: 156,
    label: "Families Supported",
    suffix: "",
  },
  {
    icon: Leaf,
    value: 12.4,
    label: "Tons Carbon Offset Locally",
    suffix: "t",
  },
  {
    icon: Shield,
    value: 8,
    label: "Ecosystems Protected",
    suffix: "",
  },
];

const articles = [
  {
    title: "Why the Sahara Is Not Empty",
    excerpt:
      "Life persists in the world's harshest desert - if you know where to look and how to listen.",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1670015239398-659d2e53c02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwc2FoYXJhJTIwZGVzZXJ0fGVufDF8fHx8MTc2ODI0ODYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "When Tourism Should Stop",
    excerpt:
      "Sometimes the most responsible decision is to close a destination. Here's why we do it.",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1691160435598-81505a9be11c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwbW91bnRhaW5zJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODI0ODYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Listening to the Desert",
    excerpt:
      "Traditional knowledge holds answers to questions tourism hasn't learned to ask.",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1762603933471-ad5a57b5facf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBub21hZCUyMHRlbnR8ZW58MXx8fHwxNzY4MjQ4NjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
}

function HeroSection({ copy }: { copy: (typeof uiCopy)["en"] }) {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="https://images8.alphacoders.com/977/thumb-1920-977117.jpg"
            alt="Algeria landscape"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <motion.h1
            className="text-5xl md:text-7xl mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {copy.heroTitle}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {copy.heroSubtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors">
              {copy.heroPrimary}
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors">
              {copy.heroSecondary}
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

function PlatformIdentity({ copy }: { copy: (typeof uiCopy)["en"] }) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-zinc-900">EcoTour DZ</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{copy.howSub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="text-center p-6 rounded-lg hover:bg-emerald-50 transition-colors duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4"
              >
                <feature.icon size={48} className="text-emerald-600" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemsSnapshot() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="ecosystems" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">Algeria&apos;s Ecosystems</h2>
          <p className="text-xl text-zinc-700 max-w-3xl mx-auto">
            Discover the ecological richness of Algeria&apos;s diverse natural environments, each
            requiring specific care and seasonal considerations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystems.map((ecosystem, index) => (
            <motion.div
              key={ecosystem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={ecosystem.image}
                  alt={ecosystem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl text-white mb-2">{ecosystem.title}</h3>
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      height: hoveredIndex === index ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/90 text-sm mb-3">{ecosystem.description}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs ${
                        ecosystem.sensitivity === "Very High"
                          ? "bg-red-500/80 text-white"
                          : ecosystem.sensitivity === "High"
                          ? "bg-orange-500/80 text-white"
                          : "bg-yellow-500/80 text-white"
                      }`}
                    >
                      Sensitivity: {ecosystem.sensitivity}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeasonalPreview() {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [selectedEcoIndex, setSelectedEcoIndex] = useState(0);

  useEffect(() => {
    setSelectedEcoIndex(0);
  }, [selectedSeason]);

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">Seasonal Ecotourism</h2>

        </motion.div>

        {/* Season Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {seasons.map((season) => (
            <motion.button
              key={season.id}
              onClick={() => setSelectedSeason(season)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedSeason.id === season.id
                  ? `bg-gradient-to-r ${season.color} text-white shadow-lg`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <season.icon size={20} />
              <span>{season.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Season Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSeason.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`${selectedSeason.bgColor} rounded-2xl p-8 md:p-12`}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${selectedSeason.color}`}>
                    <selectedSeason.icon size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl mb-1">{selectedSeason.name}</h3>
                    <p className={selectedSeason.textColor}>{selectedSeason.condition}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 text-lg">{selectedSeason.description}</p>
                
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm text-gray-700 uppercase tracking-wide">Recommended Ecosystems</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeason.recommendedEcosystems.map((eco, index) => (
                      <button
                        key={eco.name}
                        onClick={() => setSelectedEcoIndex(index)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedEcoIndex === index
                            ? `bg-gradient-to-r ${selectedSeason.color} text-white shadow-md`
                            : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {eco.name}
                      </button>
                    ))}
                  </div>
                  
                </div>
              </div>

              <div>
                <h4 className="text-xl mb-4">Suitable Eco-Activities</h4>
                <div className="space-y-3">
                  {selectedSeason.recommendedEcosystems[selectedEcoIndex].activities.map((activity, index) => (
                    <motion.div
                      key={activity}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedSeason.color}`} />
                      <span className="text-gray-800">{activity}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">How It Works</h2>
          <p className="text-xl text-zinc-700 max-w-3xl mx-auto">
            EcoTour DZ guides you through a responsible journey of discovery, not a booking process.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative z-10 border border-emerald-100">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }} className="mb-6 inline-block">
                    <div className="p-4 bg-emerald-50 rounded-2xl">
                      <step.icon size={40} className="text-emerald-600" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl mb-4">{step.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-zinc-700 max-w-2xl mx-auto italic">
            "We guide, we educate, we inspire — but nature leads the way."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedExperiences() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const selectedFilter = experienceFilters.find((f) => f.id === activeFilter);
  const filteredExperiences =
    activeFilter === "all" || !selectedFilter
      ? experiences.slice(0, 4)
      : experiences.filter((exp) => selectedFilter.experienceIds.includes(exp.id));

  return (
    <section id="journeys" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-16">Featured Eco-Experiences</h2>
                  <div className="flex flex-wrap justify-center gap-3 mb-10">
          {experienceFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              <MapPin className={`w-4 h-4 ${activeFilter === filter.id ? "text-white" : "text-emerald-600"}`} />
              {filter.label}
            </button>
          ))}
        </div>
        </motion.div>



        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl">{experience.title}</h3>
                  <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                    {experience.season}
                  </span>
                </div>

                <p className="text-zinc-600 mb-4">{experience.description}</p>

                <motion.div
                  initial={false}
                  animate={{ height: hoveredIndex === index ? "auto" : 0, opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-emerald-100 pt-4 mb-4">
                    <p className="text-sm text-emerald-700 mb-2 font-medium">Why this experience is eco-friendly:</p>
                    <p className="text-sm text-zinc-600">{experience.ecoReason}</p>
                  </div>
                </motion.div>

                <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-300 group/btn font-medium">
                  <span>Learn More</span>
                  <motion.div animate={{ x: hoveredIndex === index ? 5 : 0 }} transition={{ duration: 0.3 }}>
                    <ArrowRight size={18} />
                  </motion.div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white hover:bg-zinc-800 transition-colors rounded-full group">
            <span className="text-lg">See All Experiences</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactNumbers() {
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <section id="impact" className="py-24 px-6 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Impact in Numbers</h2>
          <p className="text-xl text-zinc-400">Transparency, not marketing. Real impact, measurable change.</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => setHasAnimated(true)}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                  <metric.icon className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl mb-2 text-emerald-400 font-bold">
                {hasAnimated ? (
                  <>
                    <CountUp end={metric.value} />
                    {metric.suffix}
                  </>
                ) : (
                  <>0{metric.suffix}</>
                )}
              </div>
              <div className="text-zinc-300">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12 text-sm text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p>Updated January 2026 • Verified by independent auditors</p>
        </motion.div>
      </div>
    </section>
  );
}

function CommunityVoices() {
  return (
    <section className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">Community Voices</h2>
          <p className="text-xl text-zinc-600">
            The people who call Algeria home guide every decision we make
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {voices.map((voice, index) => (
            <motion.div
              key={voice.name}
              className="bg-white p-8 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <ImageWithFallback
                    src={voice.image}
                    alt={voice.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl mb-1">{voice.name}</h3>
                <p className="text-sm text-zinc-500">{voice.role}</p>
              </div>
              <blockquote className="text-zinc-700 italic border-l-4 border-emerald-600 pl-4">
                "{voice.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button className="px-8 py-3 bg-black text-white hover:bg-black/90 transition-colors">
            Meet Our Communities
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">Education & Stories</h2>
          <p className="text-xl text-zinc-600">
            Understanding Algeria begins before you arrive
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              className="story-card cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="story-image transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="story-meta text-sm text-zinc-500 mb-3">
                  {article.readTime}
                </div>
                <h3 className="text-xl mb-3 story-title">{article.title}</h3>
                <p className="text-zinc-600 mb-4 story-excerpt">{article.excerpt}</p>
                <div className="story-cta flex items-center gap-2 text-emerald-700 group-hover:gap-3 transition-all">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button className="px-8 py-3 bg-black text-white hover:bg-black/90 transition-colors">
            Read Our Stories
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      id="contact"
      className="py-32 px-6 text-white"
      style={{
        background: "radial-gradient(120% 120% at 10% 10%, #111 0%, #050505 50%, #000 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
            <span className="text-gray-300 block mb-2">Travel is a privilege.</span>
            <span className="text-emerald-400 block">Caring for a place is a responsibility.</span>
          </h2>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Join us in reimagining what tourism can be - a force for preservation, not extraction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="finalcta-primary">
              Start Your Journey
            </button>
            <button className="finalcta-secondary">
              Learn Our Ethics First
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
type HomePageProps = {
  lang: "en" | "fr" | "ar";
};

const uiCopy = {
  en: {
    heroTitle: "Travel Algeria Without Taking From It",
    heroSubtitle: "Ethical eco-tourism rooted in nature, culture, and community stewardship.",
    heroPrimary: "Begin the Journey",
    heroSecondary: "Why Travel Differently?",
    seasonalHeading: "Seasonal Ecotourism",
    seasonalSub: "Nature changes with the seasons. Responsible ecotourism must adapt. Choose the right season for the right experience.",
    howHeading: "How It Works",
    howSub: "EcoTour DZ guides you through a responsible journey of discovery, not a booking process.",
    impactHeading: "Impact in Numbers",
    impactSub: "Transparency, not marketing. Real impact, measurable change.",
    experiencesHeading: "Featured Eco-Experiences",
    experiencesSub: "Discover meaningful experiences that prioritize learning, conservation, and minimal environmental impact.",
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
  fr: {
    heroTitle: "Voyagez en Algérie sans la prendre",
    heroSubtitle: "Écotourisme éthique ancré dans la nature, la culture et les communautés.",
    heroPrimary: "Commencer le voyage",
    heroSecondary: "Pourquoi voyager autrement ?",
    seasonalHeading: "Écotourisme saisonnier",
    seasonalSub: "La nature change avec les saisons. L’écotourisme responsable doit s’adapter. Choisissez la bonne saison pour la bonne expérience.",
    howHeading: "Comment ça marche",
    howSub: "EcoTour DZ vous guide dans un parcours responsable de découverte, pas une simple réservation.",
    impactHeading: "Impact en chiffres",
    impactSub: "Transparence, pas marketing. Impact réel, changement mesurable.",
    experiencesHeading: "Expériences éco proposées",
    experiencesSub: "Découvrez des expériences qui privilégient l’apprentissage, la conservation et un impact minimal.",
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
  ar: {
    heroTitle: "سافر في الجزائر دون أن تنتزع منها",
    heroSubtitle: "سياحة بيئية أخلاقية متجذرة في الطبيعة والثقافة والمجتمع.",
    heroPrimary: "ابدأ الرحلة",
    heroSecondary: "لماذا نسافر بشكل مختلف؟",
    seasonalHeading: "السياحة البيئية حسب المواسم",
    seasonalSub: "الطبيعة تتغير مع الفصول. السياحة المسؤولة يجب أن تتكيف. اختر الموسم المناسب للتجربة المناسبة.",
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
};

export function HomePage({ lang }: HomePageProps) {
  const copy = uiCopy[lang];

  return (
    <main className="min-h-screen" dir={lang === "ar" ? "rtl" : "ltr"}>
      <HeroSection copy={copy} />
      <PlatformIdentity copy={copy} />
      <EcosystemsSnapshot />
      <SeasonalPreview copy={copy} />
      <HowItWorksSection copy={copy} />
      <ImpactNumbers copy={copy} />
      <FeaturedExperiences copy={copy} />
      <CommunityVoices copy={copy} />
      <Stories copy={copy} />
      <FinalCTA copy={copy} />
    </main>
  );
}
