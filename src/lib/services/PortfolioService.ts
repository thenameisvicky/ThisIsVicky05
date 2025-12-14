import { PortfolioRepository } from '@/lib/repositories/PortfolioRepository';
import type { PortfolioData } from '@/types';

/**
 * Service Layer - Business Logic
 * Single Responsibility: Orchestrates data operations
 * Dependency Inversion: Depends on repository abstraction
 */
export class PortfolioService {
  constructor(private repository: PortfolioRepository) {}

  async getPortfolioData(): Promise<PortfolioData | null> {
    return this.repository.getAllData();
  }

  async getPortfolioDataOrThrow(): Promise<PortfolioData> {
    const data = await this.getPortfolioData();
    if (!data) {
      throw new Error('Failed to load portfolio data');
    }
    return data;
  }
}

// Factory Pattern
export function createPortfolioService(repository?: PortfolioRepository): PortfolioService {
  return new PortfolioService(repository || new PortfolioRepository());
}

