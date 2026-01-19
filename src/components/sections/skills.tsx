import { Badge } from '@/src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
// import { Code, Database, Globe, Layers, Server, Settings, BrainCircuit } from 'lucide-react';
// import type { LucideIcon, Zap} from 'lucide-react';

// 1. Agregamos Zap aquí (como componente)
import { Code, Database, Globe, Layers, Server, Settings, BrainCircuit, Zap } from 'lucide-react';

// 2. Aquí solo dejamos LucideIcon (como tipo)
import type { LucideIcon } from 'lucide-react';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

const skillData: SkillCategory[] = [
  {
    title: 'Backend & Core Engineering',
    icon: Code,
    // Agregamos Asyncio explícito y SQLAlchemy que usaste en el Hotel
    skills: ["Python (Asyncio, Flask, Django)", "Node.js (TypeScript/Express)", "SQLAlchemy & Sequelize ORM", "Java (POO & Design Patterns)"],
  },
  {
    title: 'Arquitectura & Seguridad',
    icon: Server,
    // Aquí destacamos el manejo de lógica compleja y seguridad que se ve en tus proyectos
    skills: ["Arquitecturas en Capas (DAO/MVC)", "Diseño de Base de Datos (+20 modelos)", "Seguridad (JWT, Bcrypt, OAuth2)", "Integración de Pagos (Mercado Pago SDK)"],
  },
  {
    title: 'Modern Frontend',
    icon: Globe,
    // Agregamos Astro 5 y Mobile-first que es lo que hiciste en la migración
    skills: ["React 19", "Astro 5 (SSG/Hybrid)", "Tailwind CSS v4", "TypeScript (Interfaces & Types)", "Mobile-first Design"],
  },
  {
    title: 'Infraestructura & DevOps',
    icon: Layers,
    // Tu manejo de Nginx y SSL es un diferencial enorme para un Junior
    skills: ["Docker & Docker Compose", "Nginx (Proxy Reverso & SSL)", "AWS EC2 & Linux Admin", "CI/CD (GitHub Actions)", "Automatización con Bash"],
  },
  {
    title: 'IA & Eficiencia de Desarrollo',
    icon: Zap, // Cambié el icono para resaltar velocidad/modernidad
    // Esto te hace resaltar sobre el resto: sabes usar herramientas de IA profesionalmente
    skills: ["Claude Code CLI (Agentic workflows)", "Prompt Engineering profesional", "Contexto persistente (CLAUDE.md)", "Documentación Automática"],
  },
  {
    title: 'Calidad & Metodologías',
    icon: BrainCircuit,
    // Agregamos los conventional commits que usaste en la migración
    skills: ["TDD (Pytest/Jest)", "Scrum", "Git (Conventional Commits)", "Clean Code", "Arquitectura dirigida por planes"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-secondary py-24 md:py-32">
      <div
        style={{ animationDelay: '0.2s' }}
        className="container animate-fade-in px-4 md:px-6"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Aptitudes Técnicas
            </h2>
          </div>
        </div>
        <div className="mx-auto mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillData.map((category) => (
            <Card key={category.title}>
              <CardHeader className="flex flex-row items-center gap-4">
                <category.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
