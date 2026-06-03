export type RiskLevel = "low" | "monitor" | "refer";

export const children = [
  {
    id: "C-1042",
    name: "Aarav Sharma",
    ageMonths: 28,
    gender: "Male",
    parent: "Priya Sharma",
    village: "Rampur, UP",
    risk: "monitor" as RiskLevel,
    lastScreening: "12 May 2026",
    milestoneScore: 78,
    visionScore: 64,
    speechScore: 52,
    insights: [
      "Limited eye contact observed",
      "Delayed two-word phrases",
      "Motor balance within expected range",
    ],
  },
  {
    id: "C-1043",
    name: "Meera Patel",
    ageMonths: 14,
    gender: "Female",
    parent: "Anjali Patel",
    village: "Anand, GJ",
    risk: "low" as RiskLevel,
    lastScreening: "08 May 2026",
    milestoneScore: 92,
    visionScore: 88,
    speechScore: 90,
    insights: ["All age-appropriate milestones met"],
  },
  {
    id: "C-1044",
    name: "Rohan Verma",
    ageMonths: 42,
    gender: "Male",
    parent: "Sunita Verma",
    village: "Sitapur, UP",
    risk: "refer" as RiskLevel,
    lastScreening: "01 May 2026",
    milestoneScore: 54,
    visionScore: 48,
    speechScore: 41,
    insights: [
      "Motor coordination below expected range",
      "Speech milestones delayed by 8+ months",
      "Recommend specialist evaluation",
    ],
  },
];

export const milestoneGroups = [
  {
    age: "0–6 months",
    items: ["Holds head up", "Smiles socially", "Follows objects with eyes", "Coos and gurgles"],
  },
  {
    age: "6–12 months",
    items: ["Sits without support", "Babbles consonants", "Responds to name", "Pulls to stand"],
  },
  {
    age: "1–2 years",
    items: [
      "Walks independently",
      "Says 5+ words",
      "Points to objects",
      "Follows simple instructions",
    ],
  },
  {
    age: "2–3 years",
    items: ["Runs steadily", "Uses 2-word phrases", "Stacks 6 blocks", "Names body parts"],
  },
  {
    age: "3–4 years",
    items: ["Hops on one foot", "Speaks in sentences", "Draws a circle", "Plays cooperatively"],
  },
  {
    age: "4–6 years",
    items: ["Skips with both feet", "Tells stories", "Counts to 10", "Dresses independently"],
  },
];

export const referralTimeline = [
  { stage: "Screened", date: "12 May 2026", done: true },
  { stage: "Assessed", date: "13 May 2026", done: true },
  { stage: "Referral Generated", date: "14 May 2026", done: true },
  { stage: "Appointment Scheduled", date: "20 May 2026", done: true },
  { stage: "Follow-up", date: "05 Jun 2026", done: false },
];

export const referralServices = [
  { name: "DEIC Centre, Lucknow", type: "DEIC", distance: "12 km", scheme: "RBSK" },
  {
    name: "Dr. Anita Rao — Pediatric Neurology",
    type: "Specialist",
    distance: "18 km",
    scheme: "Ayushman Bharat",
  },
  { name: "Asha Therapy Foundation", type: "Therapy NGO", distance: "8 km", scheme: "NGO Subsidy" },
  { name: "District Therapy Centre", type: "Therapy", distance: "22 km", scheme: "State Scheme" },
];

export const recommendations = [
  {
    title: "Naming Game",
    desc: "Point to objects and name them aloud 10 minutes/day.",
    category: "Speech",
  },
  {
    title: "Balance Walk",
    desc: "Walk along a chalk line for short distances.",
    category: "Motor",
  },
  {
    title: "Story Mirror",
    desc: "Read picture books and mimic facial expressions.",
    category: "Social",
  },
  {
    title: "Block Stacking",
    desc: "Stack 4–6 blocks to build fine motor control.",
    category: "Cognitive",
  },
];

export const ashaStats = {
  screened: 184,
  pending: 12,
  highRisk: 9,
  completion: 81,
};

export const clinicianStats = {
  newReferrals: 14,
  highRisk: 6,
  followUps: 9,
  conversion: 72,
};

export function riskColor(risk: RiskLevel) {
  return risk === "low" ? "success" : risk === "monitor" ? "warning" : "destructive";
}

export function riskLabel(risk: RiskLevel) {
  return risk === "low" ? "Low Risk" : risk === "monitor" ? "Monitor" : "Refer";
}
