import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Briefcase } from "lucide-react";

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string[];
};

const experienceData: Experience[] = [
  {
    role: "Desarrollador Python",
    company: "Onapsis",
    period: "Abril. 2022 - Junio. 2023",
    description: [
      "Desarrollo de software en Python con frameworks Flask y Django",
      "Implementación de tests unitarios y funcionales con Pytest siguiendo principios de TDD",
      "Uso de programación asíncrona (asyncio) y aplicación de patrones de diseño",
      "Gestión de migraciones de bases de datos y automatización de procesos",
      "Despliegue y mantenimiento de aplicaciones en AWS (EC2) con Docker y Docker Compose",
      "Administración de servicios Linux y configuración de red mediante iptables",
      "Trabajo bajo metodologías ágiles (Scrum) y herramientas de gestión como Jira, GitHub/GitLab y Postman"
    ]
  },
  {
    role: "Operador y Diseñador Gráfico",
    company: "Taller de Estampado Textil (Trabajo Independiente)",
    period: "Dic. 2023 – Actualidad",
    description: [
      "Diseño, edición y preparación de artes finales para impresión textil (DTF, vinilo y serigrafía).",
      "Manejo de Adobe Illustrator y Photoshop para la creación y ajuste de gráficos.",
      "Operación de maquinaria y procesos de serigrafía en producción textil."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="w-full py-24 md:py-32">
      <div style={{ animationDelay: '0.3s' }} className="container animate-fade-in px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Experiencia Profesional</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Mi trayectoria profesional como desarrollador.
            </p>
          </div>
        </div>
        <div className="relative mt-12">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-border"></div>

          {experienceData.map((exp, index) => (
            <div key={exp.company} className={`mb-8 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                 <Card className="relative">
                   {/* Timeline Dot */}
                   <div className="absolute left-1/2 top-6 h-4 w-4 -translate-x-1/2 transform rounded-full bg-primary ring-8 ring-background lg:left-auto lg:right-auto lg:-translate-x-0 lg:-translate-y-0"
                    style={index % 2 === 0 ? { right: '-2rem', left: 'auto' } : { left: '-2rem' }}
                   ></div>
                   <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{exp.role}</CardTitle>
                        <CardDescription>{exp.company} | {exp.period}</CardDescription>
                      </div>
                    </div>
                   </CardHeader>
                   <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                   </CardContent>
                 </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
