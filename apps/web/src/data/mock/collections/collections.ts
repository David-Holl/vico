import type { Channel, Collection, RecentVideo, SubCategory } from "@/types/collection";

const mockDate: Date = new Date("2026-03-12T14:30:00Z");

export const channels: Channel[] = [
  {
    id: 1,
    name: "The Gamer",
    thumbnailUrl: "/mock/collections/assets/channelThumbnails/play.png",
  },
  {
    id: 2,
    name: "How the fuck..?",
    thumbnailUrl: "/mock/collections/assets/channelThumbnails/youtube.png",
  },
  {
    id: 3,
    name: "Behaind",
    thumbnailUrl: "/mock/collections/assets/channelThumbnails/circle.png",
  },
  {
    id: 4,
    name: "Business Insider",
    thumbnailUrl: "/mock/collections/assets/channelThumbnails/logo.png",
  },
  {
    id: 5,
    name: "Mindset Matters",
    thumbnailUrl: "/mock/collections/assets/channelThumbnails/wave.png",
  },
];

export const recentVideos: RecentVideo[] = [
  {
    id: 1,
    title: "Lets Play Minecraft #001",
    uploadedAt: mockDate,
    channel: channels[0]!,
    addedAt: mockDate,
  },
  {
    id: 2,
    title: "Lets Play Minecraft #002",
    uploadedAt: mockDate,
    channel: channels[0]!,
    addedAt: mockDate,
  },
  {
    id: 7,
    title: "Lets Play Minecraft #003",
    uploadedAt: mockDate,
    channel: channels[0]!,
    addedAt: mockDate,
  },
  {
    id: 3,
    title: "Die Zukunft der Nickelbatterien?",
    uploadedAt: mockDate,
    channel: channels[1]!,
    addedAt: mockDate,
  },
  {
    id: 8,
    title: "Quantenphysik einfach erklärt",
    uploadedAt: mockDate,
    channel: channels[1]!,
    addedAt: mockDate,
  },
  {
    id: 4,
    title: "Warum die Serie Andor scheisse ist",
    uploadedAt: mockDate,
    channel: channels[2]!,
    addedAt: mockDate,
  },
  {
    id: 5,
    title: "Meine Top Filme 2025",
    uploadedAt: mockDate,
    channel: channels[2]!,
    addedAt: mockDate,
  },
  {
    id: 6,
    title: "How to e-commerce",
    uploadedAt: mockDate,
    channel: channels[3]!,
    addedAt: mockDate,
  },
  {
    id: 9,
    title: "Die Psychologie des Verkaufens",
    uploadedAt: mockDate,
    channel: channels[3]!,
    addedAt: mockDate,
  },
  {
    id: 10,
    title: "Burnout vermeiden: 5 Tipps",
    uploadedAt: mockDate,
    channel: channels[4]!,
    addedAt: mockDate,
  },
];

export const subCategories: SubCategory[] = [
  { id: 1, name: "Minecraft" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Vertrieb" },
  { id: 4, name: "Strategie" },
  { id: 5, name: "Serie" },
  { id: 6, name: "Kinofilm" },
  { id: 7, name: "Lets Plays" },
  { id: 8, name: "Energieversorgung" },
  { id: 9, name: "Auto" },
  { id: 10, name: "Science" },
  { id: 11, name: "Meinung" },
  { id: 12, name: "Chemie" },
  { id: 13, name: "Physik" },
  { id: 14, name: "Teaser" },
  { id: 15, name: "Report" },
  { id: 16, name: "Podcast" },
  { id: 17, name: "Persoenliche Entwicklung" },
  { id: 18, name: "Team lead" },
  { id: 19, name: "Gesang" },
];

export const collections: Collection[] = [
  {
    id: 1,
    curator: { id: 1, name: "The Gamer" },
    recentVideos: [
      recentVideos[0]!,
      recentVideos[6]!,
      recentVideos[4]!,
      recentVideos[1]!,
      recentVideos[2]!,
    ],
    name: "Epische Schlacht",
    thumbnailPath: "/mock/collections/assets/collectionThumbnails/schlacht.jpg",
    mainCategory: { id: 1, name: "Gaming" },
    subCategories: [subCategories[0]!, subCategories[6]!],
    description:
      "Eine Sammlung der besten React Tutorials und Best Practices für moderne Web-Entwicklung. Hier findest du professionelle Anleitungen zu React Hooks, State Management, Performance-Optimierung und modernen Design Patterns. Perfekt für Entwickler, die ihre React-Skills auf das nächste Level bringen möchten. Mit regelmäßigen Updates zu den neuesten Features und Community-Best-Practices.",
    updatedAt: mockDate,
    subscriberCount: 2000,
    videoCount: 50,
  },
  {
    id: 2,
    curator: { id: 2, name: "How the fuck..?" },
    recentVideos: [recentVideos[3]!, recentVideos[4]!],
    name: "Warum? Wie es funktioniert",
    thumbnailPath: "/mock/collections/assets/collectionThumbnails/warum.jpg",
    mainCategory: { id: 15, name: "Learning & Education" },
    subCategories: [subCategories[9]!, subCategories[12]!, subCategories[7]!],
    description:
      "Komplexe wissenschaftliche Themen für jedermann verständlich aufbereitet.",
    updatedAt: mockDate,
    subscriberCount: 15400,
    videoCount: 120,
  },
  {
    id: 3,
    curator: { id: 3, name: "Behaind" },
    recentVideos: [recentVideos[5]!, recentVideos[6]!],
    name: "Besser als das Original?",
    thumbnailPath: "/mock/collections/assets/collectionThumbnails/kritik.jpg",
    mainCategory: { id: 11, name: "Cinema & Media" },
    subCategories: [subCategories[5]!, subCategories[4]!, subCategories[10]!],
    description:
      "Tiefgründige Analysen und kritische Blicke auf die aktuelle Filmlandschaft.",
    updatedAt: mockDate,
    subscriberCount: 8900,
    videoCount: 245,
  },
  {
    id: 4,
    curator: { id: 4, name: "Business Insider" },
    name: "Vom Startup zum Unicorn",
    thumbnailPath: "/mock/collections/assets/collectionThumbnails/unicorn.jpg",
    mainCategory: { id: 12, name: "Business & Ventures" },
    subCategories: [subCategories[1]!, subCategories[3]!, subCategories[2]!],
    description: "Strategien, Insights und Case-Studies aus der Welt der Startups.",
    updatedAt: mockDate,
    subscriberCount: 45000,
    videoCount: 85,
  },
  {
    id: 5,
    curator: { id: 5, name: "Mindset Matters" },
    recentVideos: [recentVideos[9]!],
    name: "Der Weg zur Meisterschaft",
    thumbnailPath: "/mock/collections/assets/collectionThumbnails/warum.jpg",
    mainCategory: { id: 10, name: "Mind & Psychology" },
    subCategories: [subCategories[16]!, subCategories[17]!],
    description:
      "Psychologische Deep Dives zur persönlichen Weiterentwicklung und mentalen Stärke.",
    updatedAt: mockDate,
    subscriberCount: 3200,
    videoCount: 12,
  },
];
