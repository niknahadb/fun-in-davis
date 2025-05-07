export type TimeOfDay = "Early Bird" | "Daytime" | "Evening" | "Night";
export type Weather =
  | "Sunny & Warm"
  | "Cool & Breezy"
  | "Rainy Day"
  | "Really f*kin hot"
  | "Perfect Davis Evening";
export type Budget =
  | "Broke asf"
  | "A few dollars"
  | "Treat myself "
  | "Down to spend";
export type Mood = "Chill" | "Adventurous" | "Social" | "Creative";

export interface Activity {
  text: string;
  location: string;
  duration: string;
  emoji: string;
  timeOfDay: TimeOfDay[];
  weather: Weather[];
  budget: Budget[];
  mood: Mood[];
  weight: number;
  dynamicWeight?: number;
}

export interface UserPreferences {
  timeOfDay: TimeOfDay;
  weather: Weather;
  budget: Budget;
  mood: Mood;
  preferences: {
    outdoor: number;
    social: number;
    active: number;
    creative: number;
  };
}

export const activitiesDatabase: Activity[] = [
  {
    text: "Team up for Trivia Thursday at Woodstock's and chase it with a $9 pitcher",
    location: "Pizza & Pints, E St",
    duration: "2-3 hours",
    emoji: "🍕",
    timeOfDay: ["Evening", "Night"],
    weather: [
      "Sunny & Warm",
      "Cool & Breezy",
      "Rainy Day",
      "Really f*kin hot",
      "Perfect Davis Evening",
    ],
    budget: ["A few dollars"],
    mood: ["Social", "Chill"],
    weight: 10,
  },

  {
    text: "Grab street tacos and and beer-on-tap at Guads then people-watch on 3rd Street",
    location: "Taqueria Guadalajara, 3rd St",
    duration: "1 hour",
    emoji: "🌮",
    timeOfDay: ["Night"],
    weather: [
      "Sunny & Warm",
      "Cool & Breezy",
      "Really f*kin hot",
      "Perfect Davis Evening",
    ],
    budget: ["A few dollars"],
    mood: ["Social", "Chill"],
    weight: 9,
  },

  {
    text: "Belt out karaoke hits at G St Wunderbar",
    location: "G St Pub upstairs",
    duration: "2 hours",
    emoji: "🎤",
    timeOfDay: ["Evening", "Night"],
    weather: [
      "Sunny & Warm",
      "Cool & Breezy",
      "Rainy Day",
      "Really f*kin hot",
      "Perfect Davis Evening",
    ],
    budget: ["Treat myself "],
    mood: ["Social", "Creative"],
    weight: 9,
  },

  {
    text: "Sample a flight of locals-only taps at The Davis Beer Shoppe",
    location: "Beer Shoppe, G St",
    duration: "90 minutes",
    emoji: "🍺",
    timeOfDay: ["Evening"],
    weather: [
      "Sunny & Warm",
      "Cool & Breezy",
      "Rainy Day",
      "Perfect Davis Evening",
    ],
    budget: ["Treat myself "],
    mood: ["Social"],
    weight: 8,
  },

  {
    text: "Play spikeball or throw a frisbee around on the Quad",
    location: "UC Davis West Quad",
    duration: "2 hours",
    emoji: "🥏",
    timeOfDay: ["Evening"],
    weather: ["Sunny & Warm", "Cool & Breezy", "Perfect Davis Evening"],
    budget: ["Broke asf"],
    mood: ["Adventurous", "Social"],
    weight: 8,
  },

  {
    text: "Hit the Saturday Farmers Market for fresh produce, snacks, and baked goods",
    location: "Central Park",
    duration: "1-2 hours",
    emoji: "🫐",
    timeOfDay: ["Early Bird", "Daytime"],
    weather: ["Sunny & Warm", "Cool & Breezy"],
    budget: ["A few dollars"],
    mood: ["Social", "Chill"],
    weight: 10,
  },

  {
    text: "Go on a boba run with friends and brainstorm project ideas",
    location: "Mandro Tea, Russell Blvd",
    duration: "45 minutes",
    emoji: "🧋",
    timeOfDay: ["Night"],
    weather: [
      "Sunny & Warm",
      "Cool & Breezy",
      "Rainy Day",
      "Really f*kin hot",
      "Perfect Davis Evening",
    ],
    budget: ["A few dollars"],
    mood: ["Chill", "Creative"],
    weight: 8,
  },

  {
    text: "Race friends up the ARC climbing wall then refuel with protein smoothies at the market",
    location: "UC Davis ARC",
    duration: "1-2 hours",
    emoji: "🧗",
    timeOfDay: ["Daytime", "Evening"],
    weather: [
      "Sunny & Warm",
      "Cool & Breezy",
      "Rainy Day",
      "Really f*kin hot",
      "Perfect Davis Evening",
    ],
    budget: ["A few dollars"],
    mood: ["Adventurous", "Social"],
    weight: 9,
  },

  {
    text: "Watch a movie for $9 on Tuesdays at Regal Theaters",
    location: "Varsity Theatre, 2nd St",
    duration: "2 hours",
    emoji: "🎬",
    timeOfDay: ["Evening", "Night"],
    weather: [
      "Sunny & Warm",
      "Cool & Breezy",
      "Rainy Day",
      "Really f*kin hot",
      "Perfect Davis Evening",
    ],
    budget: ["A few dollars"],
    mood: ["Chill", "Social"],
    weight: 9,
  },

  {
    text: "String up a hammock by Lake Spafford and crank study-lofi",
    location: "UC Davis Arboretum",
    duration: "2 hours",
    emoji: "🛌",
    timeOfDay: ["Daytime", "Evening"],
    weather: ["Sunny & Warm", "Cool & Breezy", "Perfect Davis Evening"],
    budget: ["Broke asf"],
    mood: ["Chill", "Creative"],
    weight: 7,
  },

  {
    text: "Sip cold brew and crush Catan at Temple Coffee",
    location: "Temple Coffee, G St",
    duration: "2-3 hours",
    emoji: "☕️",
    timeOfDay: ["Daytime", "Evening"],
    weather: [
      "Sunny & Warm",
      "Cool & Breezy",
      "Rainy Day",
      "Really f*kin hot",
      "Perfect Davis Evening",
    ],
    budget: ["A few dollars"],
    mood: ["Social", "Chill"],
    weight: 8,
  },

  {
    text: "Jam to indie bands at Sudwerk’s Dock Store Friday night concert series",
    location: "Sudwerk Brewing Co.",
    duration: "3 hours",
    emoji: "🎸",
    timeOfDay: ["Evening"],
    weather: ["Sunny & Warm", "Cool & Breezy", "Perfect Davis Evening"],
    budget: ["Treat myself "],
    mood: ["Social", "Adventurous"],
    weight: 9,
  },
];

const W = {
  time: 5,
  mood: 5,
  weather: 3,
  budget: 2,
  penalty: -4,
};

function dynamicScore(
  act: Activity,
  user: {
    time: TimeOfDay;
    weather: Weather;
    budget: Budget;
    mood: Mood;
    pref: { outdoor: number; social: number; active: number; creative: number };
  }
): number {
  let s = act.weight;

  s += act.timeOfDay.includes(user.time) ? W.time : W.penalty;
  s += act.mood.includes(user.mood) ? W.mood : W.penalty;
  s += act.weather.includes(user.weather) ? W.weather : 0;
  s += act.budget.includes(user.budget) ? W.budget : 0;

  if (act.weather.some((w) => w === "Sunny & Warm" || w === "Cool & Breezy"))
    s += user.pref.outdoor;
  if (act.mood.includes("Social")) s += user.pref.social;
  if (act.mood.includes("Adventurous")) s += user.pref.active;
  if (act.mood.includes("Creative")) s += user.pref.creative;

  return s;
}

/* ───────────── public helpers ───────────── */
export function findMatchingActivities(
  time: TimeOfDay,
  weather: Weather,
  budget: Budget,
  mood: Mood,
  pref: UserPreferences["preferences"]
): Activity[] {
  return activitiesDatabase
    .map((a) => ({
      ...a,
      dynamicWeight: dynamicScore(a, { time, weather, budget, mood, pref }),
    }))
    .sort((a, b) => (b.dynamicWeight ?? 0) - (a.dynamicWeight ?? 0));
}

export function getRandomActivity(list: Activity[]): Activity | null {
  if (!list.length) return null;

  const total = list.reduce((sum, a) => sum + (a.dynamicWeight ?? a.weight), 0);
  let r = Math.random() * total;

  for (const a of list) {
    r -= a.dynamicWeight ?? a.weight;
    if (r <= 0) return a;
  }
  return list[0];
}
