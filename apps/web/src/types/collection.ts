export interface Curator {
  id: number;
  name: string;
}

export interface RecentVideo {
  id: number;
  title: string;
  uploadedAt: Date;
  channel: Channel;
  addedAt: Date;
}
export interface Channel {
  id: number;
  name: string;
  thumbnailUrl: string;
}

export interface Collection {
  id: number;
  curator: Curator;
  recentVideos: RecentVideo[];
  name: string;
  thumbnailPath: string;
  mainCategory: MainCategory;
  subCategories: SubCategory[];
  description: string;
  updatedAt: Date;
  subscriberCount: number;
  videoCount: number;
}
export interface MainCategory {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
}

/**
 * Hauptkategorien für eine plattformübergreifende Kurationsplattform (YouTube, Netflix, Vimeo).
 * Diese Kategorien dienen als "Heimat" für kuratierte Kollektionen.
 */
// enum MainCategory {
//   GAMING = "Gaming", // Lets Plays, Teaser, Esport
//   GADGETS = "Gadgets & Gear", // Spielereien, Gimmicks, Unboxings
//   DOCUMENTARY = "Knowledge & Documentaries", // Dokus, Deep Dives, Wissenswertes
//   NEWS_SOCIETY = "News & Society", // Berichte, Aktualität, Journalismus
//   TALKS = "Talks & Interviews", // Interviews, Audio-Formate
//   IT = "IT & Software Development", // Coding, Hardware-Builds, Netzwerke
//   SOUND = "Music & Sound", // Musik, ASMR, Soundscapes
//   TECH = "Tech & Engineering", // Robotik, Soundtechnik, techn. Entwicklungen
//   REAL_LIFE_POV = "Real Life & Observation", // Dashcams, Street-Photography, Beobachtung
//   MIND_PSYCHOLOGY = "Mind & Psychology", // Psychologie, Philosophie, Verhalten
//   CINEMA = "Cinema & Media", // Kurzfilme, Making-ofs, Filmkritik
//   OUTDOOR = "Outdoor Activities", // bushcraft, wandern,
//   BUSINESS = "Business & Ventures", // E-Commerce, Startups, Strategie
//   SPORTS = "Sports", // Klassischer Sport, Turniere
//   HEALTH = "Health & Fitness", // Workouts, Yoga, Ernährung
//   LEARNING = "Learning & Education", // Mathe, Sprachen, How-tos (akademisch/praktisch)
//   SCIENCE = "Science", // Naturwissenschaften, Raumfahrt, Forschung
//   LIFESTYLE = "Lifestyle & Hobbies", // Kochen, Reisen, Fotografie, DIY
//   CREATIVITY = "Arts, Design & Creativity", // malerei, grafikdesign,
//   ENTERTAINMENT = "Comedy & Entertainment", // sketches, pranks, satire
//   MOBILITY = "Mobility & Automative" // Ebikes, cars, urban planning

// }
