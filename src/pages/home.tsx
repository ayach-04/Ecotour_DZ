import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Footprints,
  Heart,
  Leaf,
  Lock,
  Shield,
  Snowflake,
  Sun,
  Trees,
  TrendingUp,
  Unlock,
  Users,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

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
    description:
      "Saharan dunes and palm oases - fragile ecosystems requiring careful seasonal timing",
    sensitivity: "Very High",
  },
  {
    title: "Wetlands",
    image:
      "https://images.unsplash.com/photo-1564247300406-a9c93aefa5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwd2V0bGFuZCUyMGxha2UlMjBuYXR1cmV8ZW58MXx8fHwxNzY4NDExOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Critical bird habitats and water ecosystems - protected during nesting seasons",
    sensitivity: "Very High",
  },
  {
    title: "Coastal Areas",
    image:
      "https://images.unsplash.com/photo-1748869094275-8852ce7a3146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwb2FzaXMlMjBwYWxtJTIwdHJlZXN8ZW58MXx8fHwxNzY4NDExOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Mediterranean biodiversity hotspots - seasonal restrictions apply",
    sensitivity: "Moderate",
  },
];

const destinations = [
  {
    id: 1,
    name: "Hoggar Mountains",
    top: "65%",
    left: "45%",
    story: "Where silence speaks louder than words",
    ecosystem: "Mountain desert",
    unlocked: false,
  },
  {
    id: 2,
    name: "Tassili n'Ajjer",
    top: "60%",
    left: "52%",
    story: "Ancient rock art tells 10,000 years of stories",
    ecosystem: "Plateau & canyons",
    unlocked: false,
  },
  {
    id: 3,
    name: "Timgad",
    top: "35%",
    left: "48%",
    story: "Roman ruins meet Berber heritage",
    ecosystem: "Archaeological heritage",
    unlocked: false,
  },
  {
    id: 4,
    name: "Oran Coast",
    top: "25%",
    left: "32%",
    story: "Where the Mediterranean meets tradition",
    ecosystem: "Coastal waters",
    unlocked: false,
  },
  {
    id: 5,
    name: "M'zab Valley",
    top: "50%",
    left: "42%",
    story: "Oasis architecture unchanged for centuries",
    ecosystem: "Desert oasis",
    unlocked: false,
  },
];

const journeys = [
  {
    name: "The Date Palm Covenant",
    duration: "7 days",
    impact: "Supports 3 oasis families",
    visitorLimit: "Max 8 travelers/month",
    image:
      "https://images.unsplash.com/photo-1641497499382-f775ba7240ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlJTIwcGFsbSUyMG9hc2lzfGVufDF8fHx8MTc2ODI0ODYwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Silence of the Hoggar",
    duration: "10 days",
    impact: "Carbon offset via local reforestation",
    visitorLimit: "Max 6 travelers/month",
    image:
      "https://images.unsplash.com/photo-1691160435598-81505a9be11c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwbW91bnRhaW5zJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODI0ODYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Wind & Wool",
    duration: "5 days",
    impact: "Preserves traditional weaving practices",
    visitorLimit: "Max 10 travelers/month",
    image:
      "https://images.unsplash.com/photo-1677053199368-6d6360d3cc9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJiZXIlMjBhcnRpc2FuJTIwd2VhdmluZ3xlbnwxfHx8fDE3NjgyNDg2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    role: "Artisan weaver, GhardaA_a",
    quote:
      "When travelers value our craft, they preserve our culture. This is the exchange we believe in.",
    image:
      "https://images.unsplash.com/photo-1677053199368-6d6360d3cc9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJiZXIlMjBhcnRpc2FuJTIwd2VhdmluZ3xlbnwxfHx8fDE3NjgyNDg2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const steps = [
  {
    icon: BookOpen,
    title: "Learn",
    description: "Complete modules about culture, ecology, and ethics",
  },
  {
    icon: Unlock,
    title: "Unlock",
    description: "Access destinations as you gain knowledge",
  },
  {
    icon: Footprints,
    title: "Travel Responsibly",
    description: "Journey with intention and respect",
  },
  {
    icon: Heart,
    title: "Give Back",
    description: "Your journey supports conservation and communities",
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
      "Traditional knowledge holds answers to questions modern tourism hasn't learned to ask.",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1762603933471-ad5a57b5facf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBub21hZCUyMHRlbnR8ZW58MXx8fHwxNzY4MjQ4NjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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

function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
            Travel Algeria Without Taking From It
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Ethical eco-tourism rooted in nature, culture, and community
            stewardship.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors">
              Begin the Journey
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors">
              Why Travel Differently?
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

function PlatformIdentity() {
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
          <h2 className="text-4xl md:text-5xl mb-6 text-zinc-900">What Is EcoTour DZ?</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We are an educational ecotourism guidance platform, not a travel agency.
            Our mission is to promote responsible exploration of Algeria's natural heritage
            through education, sustainability, and ecological awareness.
          </p>
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
    <section className="py-24 px-6 bg-zinc-50">
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
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-zinc-900/5"
            >
              <div className="relative" style={{ aspectRatio: "4 / 5" }}>
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: hoveredIndex === index ? 1.08 : 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ImageWithFallback
                    src={ecosystem.image}
                    alt={ecosystem.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <motion.div
                  className="absolute inset-0 bg-black/30"
                  initial={false}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl mb-2">{ecosystem.title}</h3>
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

function ProblemPromise() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-zinc-100 text-zinc-700 text-sm mb-6">
                The Old Way
              </span>
              <h3 className="text-3xl mb-6">What's Been Lost</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-lg text-zinc-700 mb-2">
                    <span className="font-medium">Ecosystems strained</span> by unchecked visitor numbers
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-lg text-zinc-700 mb-2">
                    <span className="font-medium">Communities sidelined</span> as profits leave local hands
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-lg text-zinc-700 mb-2">
                    <span className="font-medium">Culture commodified</span> without understanding or respect
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-lg text-zinc-700 mb-2">
                    <span className="font-medium">Resources depleted</span> as needs of locals take second place
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 text-sm mb-6">
                Our Approach
              </span>
              <h3 className="text-3xl mb-6">How We're Different</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-lg text-zinc-700 mb-2">
                    <span className="font-medium">Visitor limits protect</span> fragile landscapes year-round
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-lg text-zinc-700 mb-2">
                    <span className="font-medium">Local voices lead</span> every decision and experience
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-lg text-zinc-700 mb-2">
                    <span className="font-medium">Education unlocks access</span> to ensure prepared, respectful travelers
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-lg text-zinc-700 mb-2">
                    <span className="font-medium">Revenue flows back</span> to conservation and communities
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FourPillars() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6">What Makes Us Different</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <pillar.icon className="w-8 h-8 text-emerald-700" />
                </div>
              </div>
              <h3 className="text-xl mb-3">{pillar.title}</h3>
              <p className="text-zinc-600">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="px-8 py-3 bg-black text-white hover:bg-black/90 transition-colors">
            Explore Our Ethics
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function LivingMap() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="destinations" className="py-24 px-6 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">
            A Map That Reveals Itself Slowly
          </h2>
          <p className="text-xl text-white/70">
            Each place must be understood before it can be visited
          </p>
        </motion.div>

        <motion.div
          className="relative w-full max-w-4xl mx-auto aspect-[4/3] bg-zinc-800 rounded-lg overflow-hidden mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <svg
            viewBox="0 0 800 600"
            className="absolute inset-0 w-full h-full opacity-30"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M 200 150 L 600 150 L 650 200 L 680 300 L 650 450 L 500 550 L 300 550 L 200 400 Z" />
          </svg>

          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="absolute"
              style={{ top: dest.top, left: dest.left }}
              onMouseEnter={() => setHoveredId(dest.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                whileHover={{ scale: 1.2 }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    dest.unlocked ? "bg-emerald-500" : "bg-zinc-500"
                  } border-2 border-white`}
                />
                {!dest.unlocked && (
                  <Lock className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 text-zinc-400" />
                )}

                {hoveredId === dest.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {hoveredId === dest.id && (
                <motion.div
                  className="absolute top-8 left-1/2 -translate-x-1/2 w-64 bg-white text-black p-4 rounded-lg shadow-xl z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{dest.name}</h4>
                    {dest.unlocked ? (
                      <Unlock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-zinc-700 mb-2 italic">
                    "{dest.story}"
                  </p>
                  <p className="text-xs text-zinc-500 mb-3">{dest.ecosystem}</p>
                  {!dest.unlocked && (
                    <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded text-center">
                      Learn to Unlock
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          ))}

          <div className="absolute inset-0 backdrop-blur-sm bg-black/20 pointer-events-none" />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button className="px-8 py-3 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
            Unlock Your First Place
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedJourneys() {
  return (
    <section id="journeys" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">Journeys, Not Tours</h2>
          <p className="text-xl text-zinc-600">
            Each journey is designed with limits, purpose, and impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {journeys.map((journey, index) => (
            <motion.div
              key={journey.name}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <ImageWithFallback
                  src={journey.image}
                  alt={journey.name}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl mb-3">{journey.name}</h3>
              <div className="space-y-2 text-zinc-600">
                <p className="text-sm">{journey.duration}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>{journey.impact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-zinc-500" />
                  <span>{journey.visitorLimit}</span>
                </div>
              </div>
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
            See All Journeys
          </button>
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

function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">How It Works</h2>
          <p className="text-xl text-zinc-600">
            A simple path to meaningful travel
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-emerald-200" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative mb-6 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-2 relative z-10">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm z-20">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl mb-3">{step.title}</h3>
                <p className="text-zinc-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="px-8 py-3 bg-black text-white hover:bg-black/90 transition-colors">
            See How It Works
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function EcoPassport() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-emerald-900 to-emerald-700 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">
            Your Travel Leaves a Trace - Make It a Good One
          </h2>
          <p className="text-xl text-white/80">
            Your Eco-Passport grows with every responsible choice
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-300" />
                <h3 className="text-xl">Learning Progress</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cultural Understanding</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-3/4" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ecological Knowledge</span>
                    <span>60%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-3/5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-emerald-300" />
                <h3 className="text-xl">Achievements</h3>
              </div>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center opacity-50">
                  ?
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl mb-1">0</div>
              <div className="text-sm text-white/70">Journeys</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">0kg</div>
              <div className="text-sm text-white/70">CO2 Offset</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">0</div>
              <div className="text-sm text-white/70">Communities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">2</div>
              <div className="text-sm text-white/70">Places Unlocked</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button className="px-8 py-3 bg-white text-emerald-900 hover:bg-white/90 transition-colors">
            Create Your Eco-Passport
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactNumbers() {
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">Impact in Numbers</h2>
          <p className="text-xl text-zinc-600">
            Transparency, not marketing. Real impact, measurable change.
          </p>
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
              className="text-center p-8 rounded-lg bg-zinc-50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <metric.icon className="w-8 h-8 text-emerald-700" />
                </div>
              </div>
              <div className="text-4xl mb-2">
                {hasAnimated ? (
                  <>
                    <CountUp end={metric.value} />
                    {metric.suffix}
                  </>
                ) : (
                  <>0{metric.suffix}</>
                )}
              </div>
              <div className="text-zinc-600">{metric.label}</div>
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
          <p>Updated January 2026 - Verified by independent auditors</p>
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
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-zinc-500 mb-3">
                  {article.readTime}
                </div>
                <h3 className="text-xl mb-3">{article.title}</h3>
                <p className="text-zinc-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-emerald-700 group-hover:gap-3 transition-all">
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
    <section id="contact" className="py-32 px-6 bg-gradient-to-br from-zinc-900 to-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
            Travel is a privilege.
            <br />
            <span className="text-emerald-400">
              Caring for a place is a responsibility.
            </span>
          </h2>

          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Join us in reimagining what tourism can be - a force for preservation,
            not extraction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
              Start Your Journey
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors">
              Learn Our Ethics First
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <PlatformIdentity />
      <EcosystemsSnapshot />
      <ProblemPromise />
      <FourPillars />
      <LivingMap />
      <FeaturedJourneys />
      <CommunityVoices />
      <HowItWorks />
      <EcoPassport />
      <ImpactNumbers />
      <Stories />
      <FinalCTA />
    </main>
  );
}
