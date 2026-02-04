export type Stage = 1 | 2 | 3 | 4 | 5;

export type StageContent = {
  stage: Stage;
  eyebrow?: string;
  title: string;
  subtext?: string;
  microcopy?: string;
  primaryCta: string;
  secondaryCta?: string;
};

export const stages: Record<Stage, StageContent> = {
  1: {
    stage: 1,
    eyebrow: "Niyyah",
    title: "Hello, Ifrath.",
    subtext: "Some feelings are made with intention, and some questions are asked with sincerity.",
    microcopy: "Asked with sincere intention. A moment chosen with care.",
    primaryCta: "Continue",
  },
  2: {
    stage: 2,
    eyebrow: "Story",
    title: "Love, when it is real, is gentle.",
    subtext:
      "A small reminder of mercy, kindness, and calm — told with restraint.",
    microcopy: "Rahmah. Sakinah. Mawaddah.",
    primaryCta: "Continue",
  },
  3: {
    stage: 3,
    eyebrow: "The Question",
    title: "Would you like to walk this path with me?",
    subtext: "With patience, mercy, and sincerity.",
    microcopy: "No pressure. Just a gentle question.",
    primaryCta: "Yes",
    secondaryCta: "No",
  },
  4: {
    stage: 4,
    eyebrow: "Patience",
    title: "Take your time.",
    subtext: "Whatever you feel, it will be respected.",
    microcopy: "Sabr, with adab.",
    primaryCta: "Yes",
    secondaryCta: "No",
  },
  5: {
    stage: 5,
    eyebrow: "Acceptance",
    title: "Alhamdulillah.",
    subtext: "May this be written with mercy and peace.",
    microcopy: "Received with care.",
    primaryCta: "Replay this moment",
    secondaryCta: "Save this memory",
  },
};

export const noClickProgression: string[] = [
  "Are you sure?",
  "There is no pressure here.",
  "Take your time.",
  "This was asked with sincere intention.",
  "Some moments are written with patience.",
  "I made a quiet dua before asking — for honesty, not an answer.",
  "Whatever brings peace to your heart will be respected.",
  "If this feels right, perhaps it was meant to be.",
];

export type ReflectionQuote = {
  source: "Qur’an" | "Hadith";
  text: string;
  reference: string;
};

// Displayed respectfully as reflections (no heavy styling, no sensational treatment).
export const reflections: ReflectionQuote[] = [
  {
    source: "Qur’an",
    text: "And He placed between you affection and mercy.",
    reference: "30:21",
  },
  {
    source: "Hadith",
    text: "The best of you are the best to their families.",
    reference: "Tirmidhi",
  },
  {
    source: "Hadith",
    text: "Kindness beautifies everything it touches.",
    reference: "Muslim",
  },
];

