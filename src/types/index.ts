// Domain Models - Single Responsibility Principle
export interface Personal {
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  experience: string;
}

export interface Skills {
  technical: string;
  softSkills: string;
  tools: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  cgpa: string;
  class12: string;
  class10: string;
  learningProgress: string;
}

export interface ExperiencePosition {
  company: string;
  role: string;
  duration: string;
  owner?: string;
  createdDate?: string;
  lastUpdatedDate?: string;
  totalTasksCompleted?: number;
  achievements: string[];
  detailedTasks?: Task[];
}

export interface Task {
  taskNumber: number;
  assignedDate: string;
  title: string;
  type: string;
  changesMade: string[];
  developmentPeriod: string;
  liveDate: string;
  learnings: string[];
  hotFixes: string[];
}

export interface Experience {
  currentPosition: ExperiencePosition;
  previousPosition?: ExperiencePosition;
}

export interface Project {
  name: string;
  description: string;
  features?: string[];
}

export interface Problem {
  name: string;
  file: string;
  approach: string;
  description: string;
  recentlyAdded?: boolean;
}

export interface ProblemSolving {
  currentLevel: string;
  areasOfImprovement: string[];
  lastSolvedStrategyDate: string;
  problems: Problem[];
}

export interface Ambition {
  dream: string;
  longTermGoals: string[];
  shortTermGoals: string[];
  progress: string;
}

export interface GrowthHistory {
  date: string;
  summary: string;
}

export interface Goals {
  ambition: Ambition;
  growthHistory: GrowthHistory[];
  areasForImprovement: string[];
}

export interface Meta {
  source: string;
  task?: string;
  lastUpdated: string;
  summary: string;
  lastStatusSummary: string;
  imports?: string[];
}

export interface PortfolioData {
  meta: Meta;
  personal: Personal;
  skills: Skills;
  education: Education;
  experience: Experience;
  projects: Record<string, Project>;
  goals: Goals;
  problemSolving: ProblemSolving;
}

