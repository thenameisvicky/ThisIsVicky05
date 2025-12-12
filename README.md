# Portfolio - Engineering Themed Portfolio

A modern, creative portfolio website built with Next.js, TypeScript, and themed around Engineering, OS, GPU Kernels, Process Threads, and AI.

## 🎨 Themes

The portfolio incorporates multiple engineering themes:

1. **Engineering** - Technical, mechanical aesthetic with terminal styling
2. **OS (Operating System)** - Terminal windows, process management UI
3. **Process Threads** - Multi-threaded processing visualizations
4. **GPU Kernels** - Parallel processing grid visualizations
5. **Tech Legends** - Linus Torvalds & Jensen Huang inspiration
6. **AI** - LLM, TTS, Image/Video generation themes

## 🏗️ Architecture

### SOLID Principles

- **Single Responsibility**: Each component/service has one clear purpose
- **Open/Closed**: Easy to extend with new variants/themes without modifying existing code
- **Liskov Substitution**: Components follow consistent interfaces
- **Interface Segregation**: Focused, minimal interfaces
- **Dependency Inversion**: Depends on abstractions (Repository pattern)

### Design Patterns

- **Repository Pattern**: Data access layer abstraction
- **Service Layer**: Business logic orchestration
- **Factory Pattern**: Component/service creation
- **Singleton Pattern**: Repository instance management
- **Strategy Pattern**: Card variant selection

### Project Structure

```
folio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page (orchestrates sections)
│   └── globals.css        # Global styles with theme colors
├── components/
│   ├── cards/             # Reusable card components
│   ├── layout/            # Header, Footer
│   ├── sections/         # Page sections (About, Skills, etc.)
│   └── themes/            # Theme-based visualizations
│       ├── ProcessThreads.tsx
│       ├── GPUKernels.tsx
│       ├── TerminalWindow.tsx
│       ├── AIVisualization.tsx
│       └── TechLegends.tsx
├── lib/
│   ├── repositories/     # Data access layer
│   └── services/         # Business logic layer
├── types/                # TypeScript type definitions
├── Memory/               # JSON data files (copied to build)
└── scripts/              # Build scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

The build process:
1. Builds Next.js static export
2. Copies Memory directory to `out/Memory/` for runtime access

### Type Checking

```bash
npm run type-check
```

## 📦 Deployment

### GitHub Pages

The project includes a GitHub Actions workflow (`.github/workflows/production.yml`) that:

1. Verifies email authentication
2. Builds the Next.js application
3. Deploys to GitHub Pages

**Setup:**
1. Set `DEPLOYMENT_EMAIL` secret in repository settings
2. Go to Actions → "Production" workflow
3. Run workflow manually with branch name and email

**Note:** Ensure GitHub Pages is configured to use "GitHub Actions" as the source.

## 🎨 Customization

### Adding New Themes

1. Create component in `components/themes/`
2. Add variant to `SectionCard` if needed
3. Use in sections as needed

### Adding New Sections

1. Create component in `components/sections/`
2. Add to `app/page.tsx`
3. Update types in `types/index.ts` if needed

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Theme colors defined in Tailwind config

## 📝 Data Structure

Data is stored in JSON files in the `Memory/` directory:

- `personal.json` - Personal information
- `skills.json` - Skills data
- `experience.json` - Work experience
- `projects.json` - Project portfolio
- `education.json` - Education history
- `goals.json` - Goals and growth
- `problemSolving.json` - Problem-solving progress
- `index.json` - Metadata

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📄 License

Private project - All rights reserved

