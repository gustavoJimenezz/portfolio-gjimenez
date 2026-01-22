import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UserCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="w-full bg-background flex justify-center px-8">
      <div className="container">
        <div className="flex max-lg:flex-col-reverse gap-8 w-full">
          <div className="w-full">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Sobre Mí
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
             Soy Gustavo, Desarrollador Full Stack en Buenos Aires. Me dedico a construir software robusto. Mis herramientas principales son Python (Django/Flask) y Node.js en el backend, y React en el frontend.
            </p>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Mi experiencia me dio dominio en patrones de diseño y la administración de servicios. Busco aportar soluciones escalables, colaborar activamente en la creación de soluciones y sumar mi conocimiento. Mi perfil se integra sin problemas a cualquier tecnología que el equipo requiera en un entorno de trabajo ágil.
            </p>
          </div>

          <div className="w-1/2 max-lg:w-full">
            <Card className="">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <UserCircle2 className="h-10 w-10 text-primary" />
                  <CardTitle>Información Personal</CardTitle>
                </div>
              </CardHeader>

              {/* Información Personal */}
              <CardContent className="space-y-2 text-sm">
                <p><strong>Nombre:</strong> Gustavo Jimenez Crespo  17/10/1995</p>
                <p><strong>Email:</strong> gustavo.jimenez.crespo@gmail.com</p>
                <p><strong>Teléfono:</strong> 1161025274</p>
                <p><strong>Ubicación:</strong> Lomas de Zamora, Buenos Aires</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
