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
    description: "Desarrollo colaborativo de una plataforma escalable para gimnasios, presentada como tesina final ante clientes y evaluadores. El proyecto incluyó la definición de la arquitectura Backend (Express/TypeScript), la normalización de una base de datos con más de 20 modelos y el despliegue en producción. El sistema implementa una estructura multi-dominio que separa el sitio público de un dashboard administrativo para el control total de datos. Además, se trabajó con un ciclo de vida profesional incluyendo Actas de Constitución, Auditoría Ética y gestión de hitos.",
    techStack: [
      "React 19",
      "Node.js",
      "TypeScript",
      "Docker Compose",
      "Nginx & SSL",
      "GitHub Actions"
    ],
    githubRepoUrl: "https://activafitness.com.ar/",
    images: [{ id: 'activa-fitness' }, { id: 'activa-fitness-dashboard' }, { id: 'activa-fitness-UML' }, { id: 'activa-fitness-docu-PM' }],
  },
  {
    name: "CodoViajero 2.0",
    description: "Evolución del sitio CodoViajero:Node.js arquitectura MVC modular. Implementa una gestión avanzada de base de datos relacional con Sequelize (8 modelos), utilizando migraciones, seeders y patrones como Soft Deletes (Paranoid Mode). Destaca por su seguridad robusta mediante autenticación dual (JWT en cookies HttpOnly y Google OAuth 2.0 con Passport.js), validaciones centralizadas con express-validator y un frontend dinámico renderizado con EJS, Tailwind CSS y Flowbite.",
    techStack: [
      "Node.js",
      "Express.js",
      "MySQL",
      "Sequelize ORM",
      "JWT",
      "Passport.js (OAuth 2.0)",
      "EJS",
      "Tailwind CSS & Flowbite",
      "Express-Validator"
    ],
    githubRepoUrl: "https://github.com/gustavoJimenezz/codo-a-codo-codoViajero-2.0-nodejs",
    images: [
      { id: 'codoViajero-codo-a-codo-2-0' }, 
      { id: 'codoViajero-codo-a-codo-2-0-excursiones' }, 
      { id: 'codoViajero-codo-a-codo-2-0-detail' }
    ],
  },
  {
    name: "CodoViajero:Node.js",
    description: "Desarrollo Full Stack integral de una plataforma de reservas turísticas. Implementa un backend robusto en Node.js con autenticación basada en sesiones y una arquitectura MVC simplificada. El frontend destaca por un maquetado semántico avanzado con Flexbox/Grid, validaciones de formularios personalizadas en Vanilla JS y optimización de activos para la web. Incluye lógica de persistencia con creación automática de esquemas en MySQL.",
    techStack: [
      "Node.js",
      "Express",
      "Express-Session",
      "JavaScript (Vanilla)",
      "HTML5 Semántico",
      "CSS3 (Flexbox/Grid)"
    ],
    githubRepoUrl: "https://github.com/gustavoJimenezz/codo-a-codo-trabajo-practico-integrador-CodoViajero-nodejs",
    images: [{ id: 'codoViajero-codo-a-codo' }],
  },
  {
    name: "Modernización Astro 5: Sistema Dave Chappelle",
    description: "Migración integral de un sitio legacy HTML/CSS 'Arquitectura Semántica (Dave Chappelle)' hacia una arquitectura moderna SSG (Static Site Generation). El proyecto destaca por el uso de 'Agentic Workflows' con Claude Code CLI para la planificación en 10 fases y documentación automatizada. Implementa componentización avanzada, tipado estricto con TypeScript y diseño mobile-first mediante Tailwind CSS v4, logrando una optimización superior de activos y performance.",
    techStack: [
      "Astro 5", 
      "Tailwind CSS v4", 
      "TypeScript", 
      "Claude Code CLI", 
      "Sharp (Image Opt)", 
      "Conventional Commits"
    ],
    githubRepoUrl: "https://github.com/gustavoJimenezz/dwn1dv-jimenez-parcial-_2FINAL-chapelle-migracion-astro",
    images: [{ id: 'maqueta-dave-astro' }, { id: 'maqueta-dave-astro-responsive' }, { id: 'claude-code-terminal' }],
  },

  {
    name: "Arquitectura Semántica (Dave Chappelle)",
    description: "Colección de proyectos educativos y exámenes parciales enfocados en el dominio de HTML5 semántico y CSS3 puro. Incluye desarrollos con estructuras complejas de más de 6 secciones, maquetación con Flexbox y Grid, y formularios funcionales. Proyectos diseñados bajo estrictos criterios de usabilidad, accesibilidad y organización de directorios, cumpliendo con estándares de anatomía de etiquetas y validación de lenguaje.",
    techStack: [
      "HTML5 Semántico", 
      "CSS3 (Flexbox/Grid)", 
      "Google Fonts", 
      "Responsive Design", 
      "Web Accessibility"
    ],
    githubRepoUrl: "https://github.com/gustavoJimenezz/maquteado-web-css-html",
    images: [{ id: 'maqueta-dave' }],
  }
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
                  <div className="relative ounded-xl overflow-hidden shadow-md group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-500 group-hover:scale-[1.02]">
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
