const mongoose = require("mongoose");

const PillarSchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    description: String,
  },
  { _id: false }
);

const FeatureSchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    description: String,
  },
  { _id: false }
);

const EcosystemSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    description: String,
    sensitivity: String,
  },
  { _id: false }
);

const VoiceSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    quote: String,
    image: String,
  },
  { _id: false }
);

const RecommendedEcoSchema = new mongoose.Schema(
  {
    name: String,
    detail: String,
    activities: [String],
  },
  { _id: false }
);

const SeasonSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    icon: String,
    color: String,
    bgColor: String,
    textColor: String,
    condition: String,
    sensitivity: String,
    image: String,
    activities: [String],
    recommendedEcosystems: [RecommendedEcoSchema],
    description: String,
  },
  { _id: false }
);

const HowItWorksStepSchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    description: String,
  },
  { _id: false }
);

const ExperienceSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    image: String,
    description: String,
    ecoReason: String,
    season: String,
  },
  { _id: false }
);

const ExperienceFilterSchema = new mongoose.Schema(
  {
    id: String,
    label: String,
    experienceIds: [String],
  },
  { _id: false }
);

const MetricSchema = new mongoose.Schema(
  {
    icon: String,
    value: Number,
    label: String,
    suffix: String,
  },
  { _id: false }
);

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    excerpt: String,
    readTime: String,
    image: String,
  },
  { _id: false }
);

const HomeContentSchema = new mongoose.Schema(
  {
    slug: { type: String, default: "home", unique: true },
    pillars: [PillarSchema],
    features: [FeatureSchema],
    ecosystems: [EcosystemSchema],
    voices: [VoiceSchema],
    seasons: [SeasonSchema],
    howItWorksSteps: [HowItWorksStepSchema],
    experiences: [ExperienceSchema],
    experienceFilters: [ExperienceFilterSchema],
    metrics: [MetricSchema],
    articles: [ArticleSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeContent", HomeContentSchema);
