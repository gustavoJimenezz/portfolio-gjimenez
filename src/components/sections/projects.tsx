import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';
import ProjectGallery, { type ProjectImage } from './ProjectGallery';

type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubRepoUrl: string;
  images: ProjectImage[];
};

const projectData: Project[] = [
  {
    name: "Proyecto Final Colaborativo",
    description: "Proyecto Final de curso desarrollado en colaboración, que culmina la aplicación de un stack completo de tecnologías. Demuestra trabajo en equipo (Git/GitHub) e integración de módulos.",
    techStack: ["Node.js", "React", "Git", "GitHub", "TypeScript"],
    githubRepoUrl: "https://activafitness.com.ar/",
    images: [{ id: 'activa-fitness' }],
  },
  {
    name: "CodoViajero 2.0: Módulo Backend",
    description: "Versión avanzada del backend en Node.js, centrada en la optimización de las APIs, la lógica de negocio y la eficiencia de las consultas a la base de datos.",
    techStack: ["Node.js", "Express", "MySQL", "Sequelize"],
    githubRepoUrl: "https://github.com/gustavoJimenezz/codo-a-codo-codoViajero-2.0-nodejs",
    images: [{ id: 'codoViajero-codo-a-codo-2-0' }],
  },
  {
    name: "Maquetado Web Estático y Responsive",
    description: "Demostración de habilidades de Diseño Web y Responsive sin dependencias de frameworks complejos. Dominio de HTML5 (semántica) y CSS3 para la creación de diseños atractivos y flexibles.",
    techStack: ["HTML5", "CSS3"],
    githubRepoUrl: "https://github.com/gustavoJimenezz/maquteado-web-css-html",
    images: [{ id: 'maqueta-dave' }],
  },
  {
    name: "Sistema de Reservas Full Stack (Core)",
    description: "Desarrollo integral de una plataforma de reservas web. Backend con Node.js/Express (MVC, APIs REST, JWT). Base de datos MySQL con Sequelize.",
    techStack: ["Node.js", "Express", "React", "MySQL", "Sequelize", "APIs REST", "JWT"],
    githubRepoUrl: "https://github.com/gustavoJimenezz/codo-a-codo-trabajo-practico-integrador-CodoViajero-nodejs",
    images: [{ id: 'codoViajero-codo-a-codo' }],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full border-2 border-primary rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl shadow-primary/10"
    >
      <div style={{ animationDelay: '0.4s' }} className="container animate-fade-in px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Mi Portafolio
            </h2>
          </div>
        </div>

        {/* Grid de proyectos */}
        <div className="mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 gap-6 sm:gap-8">
          {projectData.map((project, index) => (
            <Card
              key={project.name}
              className="group relative flex flex-col lg:flex-row overflow-hidden rounded-2xl border border-border hover:border-primary/50 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 ease-out hover:scale-[1.01] hover:-translate-y-1"
            >
              {/* Efecto de brillo sutil en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Número de proyecto decorativo */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-muted/20 group-hover:text-primary/10 transition-colors duration-500">
                  0{index + 1}
                </span>
              </div>

              {/* Galería de imágenes */}
              {project.images.length > 0 && (
                <div className="relative w-full lg:w-[45%] p-4 sm:p-5 md:p-6">
                  <div className="relative rounded-xl overflow-hidden shadow-md group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-500 group-hover:scale-[1.02]">
                    <ProjectGallery
                      images={project.images}
                      projectName={project.name}
                    />
                  </div>
                </div>
              )}

              {/* Contenido */}
              <div className="relative flex flex-col w-full lg:w-[55%] z-10">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="pt-2 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow pt-2">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs sm:text-sm px-2.5 py-1 rounded-lg hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto rounded-xl border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20"
                  >
                    <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Ver Proyecto
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
