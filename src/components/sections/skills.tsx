import { Badge } from '@/src/components/ui/badge';
import { Code, Globe, Layers, Server, BrainCircuit, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ColorTheme = 'accent' | 'muted';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
  colorTheme: ColorTheme;
};

const colorClasses: Record<ColorTheme, { icon: string; badge: string; row: string }> = {
  accent: {
    icon: 'text-primary',
    badge: 'border-primary/40 text-primary hover:bg-primary/10',
    row: 'hover:bg-primary/5',
  },
  muted: {
    icon: 'text-muted-foreground',
    badge: 'border-border text-muted-foreground hover:bg-muted/60',
    row: 'hover:bg-muted/30',
  },
};

const skillData: SkillCategory[] = [
  {
    title: 'Backend & Core Engineering',
    icon: Code,
    colorTheme: 'accent',
    skills: ["Python (Asyncio, Flask, Django)", "Node.js (TypeScript/Express)", "SQLAlchemy & Sequelize ORM", "Java (POO & Design Patterns)"],
  },
  {
    title: 'Arquitectura & Seguridad',
    icon: Server,
    colorTheme: 'muted',
    skills: ["Arquitecturas en Capas (DAO/MVC)", "Diseño de Base de Datos (+20 modelos)", "Seguridad (JWT, Bcrypt, OAuth2)", "Integración de Pagos (Mercado Pago SDK)"],
  },
  {
    title: 'Modern Frontend',
    icon: Globe,
    colorTheme: 'accent',
    skills: ["React 19", "Astro 5 (SSG/Hybrid)", "Tailwind CSS v4", "TypeScript (Interfaces & Types)", "Mobile-first Design"],
  },
  {
    title: 'Infraestructura & DevOps',
    icon: Layers,
    colorTheme: 'muted',
    skills: ["Docker & Docker Compose", "Nginx (Proxy Reverso & SSL)", "AWS EC2 & Linux Admin", "CI/CD (GitHub Actions)", "Automatización con Bash"],
  },
  {
    title: 'IA & Eficiencia de Desarrollo',
    icon: Zap,
    colorTheme: 'accent',
    skills: ["Claude Code CLI (Agentic workflows)", "Prompt Engineering profesional", "Contexto persistente (CLAUDE.md)", "Documentación Automática"],
  },
  {
    title: 'Calidad & Metodologías',
    icon: BrainCircuit,
    colorTheme: 'muted',
    skills: ["TDD (Pytest/Jest)", "Scrum", "Git (Conventional Commits)", "Clean Code", "Arquitectura dirigida por planes"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full border border-primary rounded-xl flex justify-center">
      <div
        style={{ animationDelay: '0.2s' }}
        className="container animate-fade-in p-10"
      >
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            Aptitudes Técnicas
          </h2>
        </div>

        <div className="w-full">
          <div className="divide-y divide-border/50 rounded-xl border border-border/30 bg-[hsl(var(--background))]">
            {skillData.map((category) => {
              const colors = colorClasses[category.colorTheme];
              return (
                <div
                  key={category.title}
                  className={`flex flex-col gap-4 p-5 transition-colors md:flex-row md:items-center md:justify-between ${colors.row}`}
                >
                  <div className="flex items-center gap-3 md:min-w-[280px]">
                    <category.icon className={`h-5 w-5 shrink-0 ${colors.icon}`} />
                    <span className="font-headline text-sm font-medium">
                      {category.title}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className={`text-xs transition-colors ${colors.badge}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
