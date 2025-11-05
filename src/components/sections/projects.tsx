import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { PlaceHolderImages } from '@/src/lib/placeholder-images';
import { Github } from 'lucide-react';
import { Badge } from '../ui/badge';

type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubRepoUrl: string;
  imageId: string;
};

const projectData: Project[] = [
    {
    name: "Proyecto Final Colaborativo",
    description: "Proyecto Final de curso desarrollado en colaboración, que culmina la aplicación de un stack completo de tecnologías. Demuestra trabajo en equipo (Git/GitHub) e integración de módulos.",
    techStack: ["Node.js", "React", "Git", "GitHub", "TypeScriptF"],
    githubRepoUrl: "https://activafitness.com.ar/",
    imageId: 'activa-fitness',
  },
  {
    name: "CodoViajero 2.0: Módulo Backend",
    description: "Versión avanzada del backend en Node.js, centrada en la optimización de las APIs, la lógica de negocio y la eficiencia de las consultas a la base de datos.",
    techStack: ["Node.js", "Express", "MySQL", "Sequelize"],
    githubRepoUrl: "https://github.com/gustavoJimenezz/codo-a-codo-codoViajero-2.0-nodejs",
    imageId: 'codoViajero-codo-a-codo-2-0',
  },
  {  
    name: "Maquetado Web Estático y Responsive",
    description: "Demostración de habilidades de Diseño Web y Responsive sin dependencias de frameworks complejos. Dominio de HTML5 (semántica) y CSS3 para la creación de diseños atractivos y flexibles.",
    techStack: ["HTML5", "CSS3"],
    githubRepoUrl: "https://github.com/gustavoJimenezz/maquteado-web-css-html",
    imageId: 'maqueta-dave',
  },
  {
    name: "Sistema de Reservas Full Stack (Core)",
    description: "Desarrollo integral de una plataforma de reservas web. Backend con Node.js/Express (MVC, APIs REST, JWT). Base de datos MySQL con Sequelize.",
    techStack: ["Node.js", "Express", "React", "MySQL", "Sequelize", "APIs REST", "JWT"],
    githubRepoUrl: "https://github.com/gustavoJimenezz/codo-a-codo-trabajo-practico-integrador-CodoViajero-nodejs",
    imageId: 'codoViajero-codo-a-codo',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-secondary py-24 md:py-32">
      <div style={{ animationDelay: '0.4s' }} className="container animate-fade-in px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Mi Portafolio</h2>
          </div>
        </div>
        <div className="mx-auto mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectData.map((project) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);
            return (
              <Card key={project.name} className="flex flex-col">
                {projectImage && (
                  <Image
                    src={projectImage.imageUrl}
                    width={600}
                    height={400}
                    alt={project.name}
                    data-ai-hint={projectImage.imageHint}
                    className="aspect-video w-full rounded-t-lg object-cover"
                  />
                )}
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription className="pt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Ver Código
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
