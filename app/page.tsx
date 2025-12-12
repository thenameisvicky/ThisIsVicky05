import { createPortfolioService } from '@/lib/services/PortfolioService';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import ProblemSolvingSection from '@/components/sections/ProblemSolvingSection';
import GoalsSection from '@/components/sections/GoalsSection';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';

/**
 * Main Page Component
 * Orchestrates all sections using Service Layer
 * Follows Single Responsibility Principle
 */
export default async function Home() {
  const service = createPortfolioService();
  const portfolioData = await service.getPortfolioDataOrThrow();

  return (
    <div className="min-h-screen">
      <Header
        name={portfolioData.personal.name}
        role={portfolioData.personal.currentRole}
      />
      <main className="container mx-auto px-4 py-8">
        <HeroSection personal={portfolioData.personal} meta={portfolioData.meta} />
        <AboutSection
          personal={portfolioData.personal}
          meta={portfolioData.meta}
        />
        <SkillsSection skills={portfolioData.skills} />
        <ExperienceSection experience={portfolioData.experience} />
        <ProjectsSection projects={portfolioData.projects} />
        <EducationSection education={portfolioData.education} />
        <ProblemSolvingSection
          problemSolving={portfolioData.problemSolving}
        />
        <GoalsSection goals={portfolioData.goals} />
        <ContactSection personal={portfolioData.personal} />
      </main>
      <Footer meta={portfolioData.meta} />
    </div>
  );
}
