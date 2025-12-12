import fs from 'fs';
import path from 'path';
import type { PortfolioData, Personal, Skills, Education, Experience, Project, Goals, ProblemSolving, Meta } from '@/types';

/**
 * Repository Pattern - Data Access Layer
 * Single Responsibility: Handles all data fetching from Memory directory
 * Open/Closed: Can be extended without modifying existing code
 */
export class PortfolioRepository {
  private readonly memoryPath: string;

  constructor(memoryPath: string = path.join(process.cwd(), 'Memory')) {
    this.memoryPath = memoryPath;
  }

  /**
   * Dependency Inversion: Depends on abstraction (file system)
   * Can be easily mocked for testing
   */
  private readJsonFile<T>(filename: string): T | null {
    try {
      const filePath = path.join(this.memoryPath, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as T;
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      return null;
    }
  }

  async getPersonal(): Promise<Personal | null> {
    return this.readJsonFile<Personal>('personal.json');
  }

  async getSkills(): Promise<Skills | null> {
    return this.readJsonFile<Skills>('skills.json');
  }

  async getEducation(): Promise<Education | null> {
    return this.readJsonFile<Education>('education.json');
  }

  async getExperience(): Promise<Experience | null> {
    return this.readJsonFile<Experience>('experience.json');
  }

  async getProjects(): Promise<Record<string, Project> | null> {
    return this.readJsonFile<Record<string, Project>>('projects.json');
  }

  async getGoals(): Promise<Goals | null> {
    return this.readJsonFile<Goals>('goals.json');
  }

  async getProblemSolving(): Promise<ProblemSolving | null> {
    return this.readJsonFile<ProblemSolving>('problemSolving.json');
  }

  async getMeta(): Promise<Meta | null> {
    return this.readJsonFile<Meta>('index.json');
  }

  /**
   * Factory Method: Creates complete portfolio data object
   */
  async getAllData(): Promise<PortfolioData | null> {
    const [
      meta,
      personal,
      skills,
      education,
      experience,
      projects,
      goals,
      problemSolving,
    ] = await Promise.all([
      this.getMeta(),
      this.getPersonal(),
      this.getSkills(),
      this.getEducation(),
      this.getExperience(),
      this.getProjects(),
      this.getGoals(),
      this.getProblemSolving(),
    ]);

    if (!personal || !skills || !education || !experience || !projects || !goals || !problemSolving) {
      return null;
    }

    return {
      meta: meta || {
        source: 'Portfolio',
        lastUpdated: new Date().toISOString(),
        summary: '',
        lastStatusSummary: '',
      },
      personal,
      skills,
      education,
      experience,
      projects,
      goals,
      problemSolving,
    };
  }
}

// Singleton Pattern for global access
let repositoryInstance: PortfolioRepository | null = null;

export function getPortfolioRepository(): PortfolioRepository {
  if (!repositoryInstance) {
    repositoryInstance = new PortfolioRepository();
  }
  return repositoryInstance;
}

