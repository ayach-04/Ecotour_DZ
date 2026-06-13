const homeContentData = {
  slug: "home",
  pillars: [
    { icon: "BookOpen", title: "Learn Before You Go", description: "Destinations unlock through knowledge." },
    { icon: "Users", title: "Community First", description: "Locals lead, host, and decide." },
    { icon: "Leaf", title: "Nature Has Limits", description: "Visitor caps and seasonal rest." },
    { icon: "Heart", title: "Give Back Every Time", description: "Every journey supports conservation." },
  ],
  features: [
    { icon: "Leaf", title: "Nature First", description: "Ecosystems set the rules, not tourism demands" },
    { icon: "Users", title: "Community", description: "Local knowledge and sustainable practices" },
    { icon: "Calendar", title: "Seasonal Approach", description: "Right time, right place, right impact" },
    { icon: "Shield", title: "Responsibility", description: "Education and ethical guidance" },
  ],
  ecosystems: [
    {
      title: "Forests & Mountains",
      image:
        "https://images.unsplash.com/photo-1623714058183-a5cfc29169f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwZm9yZXN0JTIwbW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY4NDExOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Cedar forests and Atlas peaks - sensitive to foot traffic, best explored in spring and fall",
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
  ],
  voices: [
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
      quote: "The mountains don't need more footprints. They need more people who understand why we walk softly here.",
      image:
        "https://images.unsplash.com/photo-1707557220564-0a0405c4d00a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGd1aWRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY4MjQ4NjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Amina",
      role: "Artisan weaver, Ghardaia",
      quote: "When travelers value our craft, they preserve our culture. This is the exchange we believe in.",
      image:
        "https://images.unsplash.com/photo-1677053199368-6d6360d3cc9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJiZXIlMjBhcnRpc2FuJTIwd2VhdmluZ3xlbnwxfHx8fDE3NjgyNDg2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
  howItWorksSteps: [
    {
      icon: "BookOpen",
      title: "Learn About Ecosystems",
      description: "Understand Algeria's natural environments, their fragility, and ecological importance",
    },
    {
      icon: "MapPin",
      title: "Understand Seasonal Sensitivity",
      description: "Discover when and where to visit based on environmental conditions",
    },
    {
      icon: "CheckCircle",
      title: "Receive Responsible Recommendations",
      description: "Get guided eco-experiences that minimize impact and maximize learning",
    },
  ],
  experiences: [
    {
      id: "nature-observation",
      title: "Nature Observation",
      image:
        "https://images.unsplash.com/photo-1767045086909-22a1212d9768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwd2F0Y2hpbmclMjBuYXR1cmUlMjBvYnNlcnZhdGlvbnxlbnwxfHx8fDE3Njg0MTE5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Learn to observe wildlife without disturbance. Guided experiences with local naturalists.",
      ecoReason: "No physical impact | Educational focus | Supports local guides | Seasonal timing",
      season: "Spring & Autumn",
    },
    {
      id: "agricultural-experiences",
      title: "Agricultural Experiences",
      image:
        "https://images.unsplash.com/photo-1761453502104-3481cf68fdec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmYXJtJTIwZXhwZXJpZW5jZXxlbnwxfHx8fDE3Njg0MTE5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Participate in traditional, sustainable farming practices. Connect with local communities.",
      ecoReason: "Supports local economy | Traditional methods | Cultural preservation | Zero waste",
      season: "Year-round",
    },
    {
      id: "conservation-activities",
      title: "Conservation Activities",
      image:
        "https://images.unsplash.com/photo-1658062787926-92e3cd64c4c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBjb25zZXJ2YXRpb24lMjB3aWxkbGlmZXxlbnwxfHx8fDE3Njg0MTE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Join habitat restoration projects and wildlife monitoring programs with conservation groups.",
      ecoReason: "Active contribution | Measurable impact | Scientific learning | Community benefit",
      season: "Seasonal Projects",
    },
    {
      id: "desert-night-astronomy",
      title: "Desert Night Astronomy",
      image: "https://images.pexels.com/photos/31412704/pexels-photo-31412704.jpeg",
      description: "Stargaze with local guides, learn dark-sky ethics, and understand desert constellations.",
      ecoReason: "Low-impact timing | No daylight heat stress | Supports local astronomy guides",
      season: "Winter & Early Spring",
    },
    {
      id: "coastal-dune-care",
      title: "Coastal Dune Care",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
      description: "Help stabilize dunes, remove debris, and learn about coastal flora resilience.",
      ecoReason: "Hands-on restoration | Marine litter removal | Habitat protection",
      season: "Spring & Autumn",
    },
    {
      id: "wetland-bird-safaris",
      title: "Wetland Bird Safaris",
      image: "https://images.unsplash.com/photo-1438109491414-7198515b166b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
      description: "Hide-based birding with ornithologists; etiquette-first spotting and logging.",
      ecoReason: "Non-intrusive viewing | Data sharing | Supports conservation guides",
      season: "Migration Seasons",
    },
  ],
  experienceFilters: [
    {
      id: "all",
      label: "All Algeria",
      experienceIds: [
        "nature-observation",
        "agricultural-experiences",
        "conservation-activities",
        "desert-night-astronomy",
        "coastal-dune-care",
        "wetland-bird-safaris",
      ],
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
  ],
  metrics: [
    { icon: "Trees", value: 2847, label: "Trees Planted", suffix: "" },
    { icon: "Users", value: 156, label: "Families Supported", suffix: "" },
    { icon: "Leaf", value: 12.4, label: "Tons Carbon Offset Locally", suffix: "t" },
    { icon: "Shield", value: 8, label: "Ecosystems Protected", suffix: "" },
  ],
  articles: [
    {
      title: "Why the Sahara Is Not Empty",
      excerpt: "Life persists in the world's harshest desert - if you know where to look and how to listen.",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1670015239398-659d2e53c02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwc2FoYXJhJTIwZGVzZXJ0fGVufDF8fHx8MTc2ODI0ODYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "When Tourism Should Stop",
      excerpt: "Sometimes the most responsible decision is to close a destination. Here's why we do it.",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1691160435598-81505a9be11c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdlcmlhJTIwbW91bnRhaW5zJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODI0ODYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Listening to the Desert",
      excerpt: "Traditional knowledge holds answers to questions tourism hasn't learned to ask.",
      readTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1762603933471-ad5a57b5facf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBub21hZCUyMHRlbnR8ZW58MXx8fHwxNzY4MjQ4NjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
};

module.exports = homeContentData;
