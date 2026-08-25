// features/compliance/data.ts
// Static mock data and TypeScript types for the Compliance Centre

export type CQCDomain = "Safe" | "Effective" | "Caring" | "Responsive" | "Well-led";
export type AlertSeverity = "Urgent" | "Today" | "Finfo";
export type RegulationStatus = "Compliant" | "Attention" | "Risk";
export type AuditEntityType = "Plan" | "Visit" | "MAR" | "Incident" | "Risk";

export interface CQCScore {
  domain: CQCDomain;
  score: number;
  label: "Good" | "Needs Work" | "Outstanding";
  color: string; // tailwind bg class
}

export interface ComplianceAlert {
  id: string;
  title: string;
  subtitle: string;
  severity: AlertSeverity;
  timestamp: string;
}

export interface AuditEntry {
  id: string;
  time: string;
  action: string;
  detail: string;
  user: string;
  entity: AuditEntityType;
}

export interface Regulation {
  id: string;
  code: string;
  name: string;
  description: string;
  status: RegulationStatus;
}

export interface ScoreTrendPoint {
  month: string;
  actual: number;
  comparison: number;
}

// ─── CQC Scores ───────────────────────────────────────────────────────────────
export const cqcScores: CQCScore[] = [
  { domain: "Safe",       score: 90, label: "Good",       color: "#22c55e" },
  { domain: "Effective",  score: 85, label: "Good",       color: "#6366f1" },
  { domain: "Caring",     score: 92, label: "Good",       color: "#f97316" },
  { domain: "Responsive", score: 78, label: "Needs Work",  color: "#eab308" },
  { domain: "Well-led",   score: 88, label: "Good",       color: "#14b8a6" },
];

// ─── Compliance Alerts ────────────────────────────────────────────────────────
export const complianceAlerts: ComplianceAlert[] = [
  {
    id: "a1",
    title: "Safeguarding training expired",
    subtitle: "Mark Davis · Expired 3 days ago",
    severity: "Urgent",
    timestamp: "Now",
  },
  {
    id: "a2",
    title: "3 care plans unassigned",
    subtitle: "No key worker assigned",
    severity: "Today",
    timestamp: "Today",
  },
  {
    id: "a3",
    title: "DBS expiring — Lucy C.",
    subtitle: "Expires in 14 days",
    severity: "Finfo",
    timestamp: "2d",
  },
  {
    id: "a4",
    title: "4 MAR entries missing",
    subtitle: "Yesterday's morning audit",
    severity: "Today",
    timestamp: "Yesterday",
  },
  {
    id: "a5",
    title: "5 notes recorded late",
    subtitle: "Submitted >24 hrs after visit",
    severity: "Finfo",
    timestamp: "2d",
  },
  {
    id: "a6",
    title: "Supervisions due — 4 staff",
    subtitle: "Q2 supervisions overdue",
    severity: "Finfo",
    timestamp: "4d",
  },
];

// ─── Recent Audit Trail ───────────────────────────────────────────────────────
export const auditEntries: AuditEntry[] = [
  {
    id: "e1",
    time: "09:22",
    action: "Care plan reviewed",
    detail: "Lucy C. · Medication · Arthur Wilson",
    user: "Sarah W.",
    entity: "Plan",
  },
  {
    id: "e2",
    time: "08:54",
    action: "Visit completed",
    detail: "Lucy C. · Homecare · Arthur Wilson",
    user: "Lucy D.",
    entity: "Visit",
  },
  {
    id: "e3",
    time: "08:15",
    action: "Medication administered",
    detail: "Paracetamol 500mg · Robert Ahmed",
    user: "Priya P.",
    entity: "MAR",
  },
  {
    id: "e4",
    time: "08:03",
    action: "Incident reported",
    detail: "Fall risk · High · Sarah Morris",
    user: "Sarah W.",
    entity: "Incident",
  },
  {
    id: "e5",
    time: "07:37",
    action: "Risk assessment updated",
    detail: "Falls risk · High · Rosanna Clare",
    user: "Emma C.",
    entity: "Risk",
  },
];

// ─── Key Regulations ──────────────────────────────────────────────────────────
export const regulations: Regulation[] = [
  {
    id: "r12",
    code: "Reg 12",
    name: "Safe Care & Treatment",
    description: "Risk assessments, medication safety, infection control",
    status: "Compliant",
  },
  {
    id: "r17",
    code: "Reg 17",
    name: "Good Governance",
    description: "Audit trails, record keeping, quality monitoring",
    status: "Compliant",
  },
  {
    id: "r9",
    code: "Reg 9",
    name: "Person-Centred Care",
    description: "Care plans, reviews, preferences and wellbeing apps",
    status: "Attention",
  },
  {
    id: "r13",
    code: "Reg 13",
    name: "Safeguarding",
    description: "Safeguarding workflows, DBS checking, training",
    status: "Compliant",
  },
  {
    id: "r18",
    code: "Reg 18",
    name: "Staffing",
    description: "Expired training, to, supervision overdue for 4 staff",
    status: "Risk",
  },
];

// ─── Score Trend ──────────────────────────────────────────────────────────────
export const scoreTrend: ScoreTrendPoint[] = [
  { month: "Oct", actual: 68, comparison: 72 },
  { month: "Nov", actual: 70, comparison: 73 },
  { month: "Dec", actual: 71, comparison: 71 },
  { month: "Jan", actual: 74, comparison: 74 },
  { month: "Feb", actual: 78, comparison: 75 },
  { month: "Mar", actual: 82, comparison: 77 },
  { month: "Apr", actual: 83, comparison: 78 },
];
