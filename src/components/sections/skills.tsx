import { Badge } from '@/src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Code, Database, Globe, Layers, Server, Settings, BrainCircuit } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

const skillData: SkillCategory[] = [
  {
    title: 'Lenguajes & Core',
    icon: Code,
    skills: ["Python (Flask, Django, asyncio)", "JavaScript (ES6+)", "TypeScript", "Java"],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    skills: ["Node.js", "Express", "Desarrollo de APIs REST", "Autenticación JWT", "Arquitectura MVC"],
  },
  {
    title: 'Frontend & Estilos',
    icon: Globe,
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: 'Bases de Datos & ORMs',
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "Sequelize (ORMs, migraciones y diseño de esquemas)"],
  },
  {
    title: 'DevOps & Cloud',
    icon: Layers,
    skills: ["Docker", "Docker Compose", "Git", "GitHub", "GitLab", "AWS (EC2)", "Linux (systemctl, journalctl, iptables)"],
  },
  {
    title: 'Metodologías & Prácticas',
    icon: BrainCircuit,
    skills: ["Scrum", "Metodologías Ágiles", "TDD (Desarrollo Guiado por Pruebas)", "Patrones de Diseño", "Programación Asíncrona"],
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
