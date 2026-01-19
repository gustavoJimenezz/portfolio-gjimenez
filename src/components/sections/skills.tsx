import { Badge } from '@/src/components/ui/badge';
import { Code, Globe, Layers, Server, BrainCircuit, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ColorTheme = 'primary' | 'blue' | 'cyan' | 'orange' | 'purple' | 'pink';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
  colorTheme: ColorTheme;
};

const colorClasses: Record<ColorTheme, { icon: string; badge: string; row: string }> = {
  primary: {
    icon: 'text-primary',
    badge: 'border-primary/40 text-primary hover:bg-primary/10',
    row: 'hover:bg-primary/5',
  },
  blue: {
    icon: 'text-blue',
    badge: 'border-blue/40 text-blue hover:bg-blue/10',
    row: 'hover:bg-blue/5',
  },
  cyan: {
    icon: 'text-cyan',
    badge: 'border-cyan/40 text-cyan hover:bg-cyan/10',
    row: 'hover:bg-cyan/5',
  },
  orange: {
    icon: 'text-orange',
    badge: 'border-orange/40 text-orange hover:bg-orange/10',
    row: 'hover:bg-orange/5',
  },
  purple: {
  icon: 'text-purple',
  badge: 'border-purple/40 text-purple hover:bg-purple/10',
  row: 'hover:bg-purple/5',
  },
  pink: {
  icon: 'text-pink',
  badge: 'border-pink/40 text-pink hover:bg-pink/10',
  row: 'hover:bg-pink/5',
  }
};

const skillData: SkillCategory[] = [
  {
    title: 'Backend & Core Engineering',
    icon: Code,
    colorTheme: 'primary',
    skills: ["Python (Asyncio, Flask, Django)", "Node.js (TypeScript/Express)", "SQLAlchemy & Sequelize ORM", "Java (POO & Design Patterns)"],
  },
  {
    title: 'Arquitectura & Seguridad',
    icon: Server,
    colorTheme: 'blue',
    skills: ["Arquitecturas en Capas (DAO/MVC)", "Diseño de Base de Datos (+20 modelos)", "Seguridad (JWT, Bcrypt, OAuth2)", "Integración de Pagos (Mercado Pago SDK)"],
  },
  {
    title: 'Modern Frontend',
    icon: Globe,
    colorTheme: 'cyan',
    skills: ["React 19", "Astro 5 (SSG/Hybrid)", "Tailwind CSS v4", "TypeScript (Interfaces & Types)", "Mobile-first Design"],
  },
  {
    title: 'Infraestructura & DevOps',
    icon: Layers,
    colorTheme: 'orange',
    skills: ["Docker & Docker Compose", "Nginx (Proxy Reverso & SSL)", "AWS EC2 & Linux Admin", "CI/CD (GitHub Actions)", "Automatización con Bash"],
  },
  {
    title: 'IA & Eficiencia de Desarrollo',
    icon: Zap,
    colorTheme: 'purple',
    skills: ["Claude Code CLI (Agentic workflows)", "Prompt Engineering profesional", "Contexto persistente (CLAUDE.md)", "Documentación Automática"],
  },
  {
    title: 'Calidad & Metodologías',
    icon: BrainCircuit,
    colorTheme: 'pink',
    skills: ["TDD (Pytest/Jest)", "Scrum", "Git (Conventional Commits)", "Clean Code", "Arquitectura dirigida por planes"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-secondary border border-primary rounded-xl">
      <div
        style={{ animationDelay: '0.2s' }}
        className="container animate-fade-in p-4"
      >
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            Aptitudes Técnicas
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
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
