import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Award,
  LucideIcon,
  BookOpen,
  Calendar,
  CheckCircle,
  Footprints,
  Map,
  MapPin,
  Leaf,
  Lock,
  Heart,
  Shield,
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

type Pillar = { icon: string; title: string; description: string };
type Feature = { icon: string; title: string; description: string };
type Ecosystem = { title: string; image: string; description: string; sensitivity: string };
type Voice = { name: string; role: string; quote: string; image: string };
type HowItWorksStep = { icon: string; title: string; description: string };
type Experience = { id: string; title: string; image: string; description: string; ecoReason: string; season: string };
type ExperienceFilter = { id: string; label: string; experienceIds: string[] };
type Metric = { icon: string; value: number; label: string; suffix: string };
type Article = { title: string; excerpt: string; readTime: string; image: string };
type HomeContent = {
  pillars: Pillar[];
  features: Feature[];
  ecosystems: Ecosystem[];
  voices: Voice[];
  howItWorksSteps: HowItWorksStep[];
  experiences: Experience[];
  experienceFilters: ExperienceFilter[];
  metrics: Metric[];
  articles: Article[];
};

const iconMap: Record<string, LucideIcon> = {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Footprints,
  Map,
  MapPin,
  Leaf,
  Lock,
  Heart,
  Shield,
  Trees,
  TrendingUp,
  Unlock,
  Users,
};

const getIcon = (name?: string, fallback: LucideIcon = Leaf) => iconMap[name || ""] || fallback;
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").trim();

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

function HeroSection({ copy }: { copy: UiCopy }) {
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

function PlatformIdentity({ copy, features = [] }: { copy: UiCopy; features?: Feature[] }) {
  if (!features?.length) return null;

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">EcoTour DZ</h2>
          <p className="text-xl text-zinc-700 max-w-2xl mx-auto">{copy.howSub}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-emerald-100 p-8 rounded-lg text-center shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                {(() => {
                  const Icon = getIcon(feature.icon, Leaf);
                  return <Icon size={24} className="text-emerald-600" strokeWidth={1.5} />;
                })()}
              </div>
              <h3 className="text-xl mb-2">{feature.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemsSnapshot({ ecosystems = [] }: { ecosystems?: Ecosystem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!ecosystems?.length) return null;

  return (
    <section id="ecosystems" className="py-16 px-6 bg-white">
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







function HowItWorksSection({ copy, steps = [] }: { copy: UiCopy; steps?: HowItWorksStep[] }) {
  if (!steps?.length) return null;

  return (
    <section id="guide" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">{copy.howHeading}</h2>
          <p className="text-xl text-zinc-700 max-w-3xl mx-auto">{copy.howSub}</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const StepIcon = getIcon(step.icon, BookOpen);
              return (
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
                      <StepIcon size={40} className="text-emerald-600" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl mb-4">{step.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
              );
            })}
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

function FeaturedExperiences({
  copy,
  experiences = [],
  experienceFilters = [],
}: {
  copy: UiCopy;
  experiences?: Experience[];
  experienceFilters?: ExperienceFilter[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState(() => experienceFilters?.[0]?.id || "all");

  useEffect(() => {
    setActiveFilter(experienceFilters?.[0]?.id || "all");
  }, [experienceFilters]);

  if (!experiences?.length) return null;

  const selectedFilter = experienceFilters.find((f) => f.id === activeFilter);
  const filteredExperiences =
    !experienceFilters.length || activeFilter === "all" || !selectedFilter
      ? experiences.slice(0, 3)
      : experiences.filter((exp) => selectedFilter.experienceIds.includes(exp.id));

  return (
    <section id="journeys" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">{copy.experiencesHeading}</h2>
          <p className="text-lg text-zinc-700 max-w-3xl mx-auto mb-8">{copy.experiencesSub}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                  <h3 className="text-lg">{experience.title}</h3>
                  <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                    {experience.season}
                  </span>
                </div>

                <p className="text-sm text-zinc-600 mb-4 line-clamp-2">{experience.description}</p>

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
          <button className="px-8 py-3 bg-black text-white hover:bg-black/90 transition-colors">
            See All Experiences
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactNumbers({ copy, metrics = [] }: { copy: UiCopy; metrics?: Metric[] }) {
  const [hasAnimated, setHasAnimated] = useState(false);

  if (!metrics?.length) return null;

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
          <h2 className="text-4xl md:text-5xl mb-4 text-white">{copy.impactHeading}</h2>
          <p className="text-xl text-zinc-400">{copy.impactSub}</p>
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
                  {(() => {
                    const Icon = getIcon(metric.icon, Trees);
                    return <Icon className="w-8 h-8 text-emerald-400" />;
                  })()}
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
          <p>Updated January 2026 - Verified by independent auditors</p>
        </motion.div>
      </div>
    </section>
  );
}

function CommunityVoices({ copy, voices = [] }: { copy: UiCopy; voices?: Voice[] }) {
  if (!voices?.length) return null;

  return (
    <section id="community" className=" py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">{copy.voicesHeading}</h2>
          <p className="text-xl text-zinc-600">{copy.voicesSub}</p>
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

function Stories({ copy, articles = [] }: { copy: UiCopy; articles?: Article[] }) {
  if (!articles?.length) return null;

  return (
    <section id="learn" className="py-24 px-6 -mb-24">
      <div className="max-w-7xl mx-auto ">
        <motion.div
          className="text-center mb-16 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4">{copy.storiesHeading}</h2>
          <p className="text-xl text-zinc-600">{copy.storiesSub}</p>
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
                <div className="story-meta text-sm text-zinc-500 mb-3">{article.readTime}</div>
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
          <button className="px-8 py-3 bg-black text-white hover:bg-black/90 transition-colors mb-16">
            Read Our Stories
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA({ copy }: { copy: UiCopy }) {
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
            <span className="text-gray-300 block mb-2">{copy.finalTop}</span>
            <span className="text-emerald-400 block">{copy.finalBottom}</span>
          </h2>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">{copy.finalBody}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="finalcta-primary">{copy.finalPrimary}</button>
            <button className="finalcta-secondary">{copy.finalSecondary}</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type UiCopy = {
  heroTitle: string;
  heroSubtitle: string;
  heroPrimary: string;
  heroSecondary: string;
  howHeading: string;
  howSub: string;
  impactHeading: string;
  impactSub: string;
  experiencesHeading: string;
  experiencesSub: string;
  voicesHeading: string;
  voicesSub: string;
  storiesHeading: string;
  storiesSub: string;
  finalTop: string;
  finalBottom: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

type HomePageProps = {
  lang: "en" | "fr" | "ar";
};

export function HomePage({ lang }: HomePageProps) {
  const { t } = useTranslation();
  const copy = t("ui", { returnObjects: true }) as UiCopy;
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [loadingContent, setLoadingContent] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setContentError(null);
        setLoadingContent(true);
        const fallbackBase =
          API_BASE_URL ||
          (window.location.origin.includes("localhost:") ? "http://localhost:5000" : window.location.origin);
        const base = fallbackBase.endsWith("/") ? fallbackBase.slice(0, -1) : fallbackBase;
        const response = await fetch(`${base}/api/home`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("API_BASE_URL is not pointing to the backend or proxy. Expected JSON response.");
        }

        const data = (await response.json()) as HomeContent;
        setHomeContent(data);
      } catch (err) {
        setContentError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setLoadingContent(false);
      }
    };

    fetchContent();
  }, []);

  if (loadingContent) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-zinc-700" dir={lang === "ar" ? "rtl" : "ltr"}>
        <p>Loading content...</p>
      </main>
    );
  }

  if (!homeContent || contentError) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-red-600" dir={lang === "ar" ? "rtl" : "ltr"}>
        <p>{contentError || "Unable to load home content."}</p>
      </main>
    );
  }

  const {
    features = [],
    ecosystems = [],
    howItWorksSteps = [],
    experiences = [],
    experienceFilters = [],
    metrics = [],
    voices = [],
    articles = [],
  } = homeContent;

  return (
    <main className="min-h-screen" dir={lang === "ar" ? "rtl" : "ltr"}>
      <HeroSection copy={copy} />
      <div className="bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
        <PlatformIdentity copy={copy} features={features} />
        <EcosystemsSnapshot ecosystems={ecosystems} />
        <HowItWorksSection copy={copy} steps={howItWorksSteps} />
        <ImpactNumbers copy={copy} metrics={metrics} />
        <FeaturedExperiences copy={copy} experiences={experiences} experienceFilters={experienceFilters} />
        <CommunityVoices copy={copy} voices={voices} />
        <Stories copy={copy} articles={articles} />
      </div>
      <FinalCTA copy={copy} />
    </main>
  );
}
