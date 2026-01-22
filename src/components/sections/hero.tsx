import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export default function Hero() {
  return (
    <section
      id="home"
      className="w-full animate-fade-in flex justify-center px-8"
    >
      <div className="container">
        <div className="flex gap-6 justify-between my-4 max-lg:flex-col-reverse w-full">
          <div className="flex flex-col gap-8 w-2/3 max-lg:w-full">

            <div className="space-y-2">

              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Gustavo Jimenez Crespo
              </h1>

              <h2 className="text-xl font-medium text-primary md:text-2xl">
                Desarrollador Full Stack
              </h2>

              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Desarrollador de Software, Full Stack | Python, Node.js y React. Experiencia profesional en el stack completo. Diseño, implementación y despliegue.
              </p>

            </div>

            <div className="flex flex-col max-lg:justify-center gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#projects">Ver Proyectos Destacados</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#contact">Contáctame</Link>
              </Button>
            </div>

          </div>

          <div className="flex items-center justify-center w-none">
            <Image
              src="/perfil4x4.jpg"
              width={400}
              height={400}
              alt="Gustavo Jimenez Crespo"
              className="h-44 w-44 rounded-full object-cover shadow-lg sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
