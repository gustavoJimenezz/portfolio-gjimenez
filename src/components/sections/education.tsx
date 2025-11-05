import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

type EducationItem = {
  title: string;
  institution: string;
  period: string;
  description: string;
  type: 'degree' | 'course';
};

const educationData: EducationItem[] = [
  {
    title: "Tecnicatura Universitaria en Programación",
    institution: "Universidad Nacional de Lomas de Zamora",
    period: "2023 – 2025 (Graduado)",
    description: "Formación práctica en desarrollo de software, POO y bases de datos. Tecnologías: C, C++, Java, C#, .NET, ASP.NET, desarrollo web, UML, seguridad y SO.",
    type: 'degree',
  },
  {
    title: "Node.js – Codo a Codo",
    institution: "Govierno de la Ciudad de Buenos Aires",
    period: "2024",
    description: "Desarrollo web con Node.js, Express, HTML, CSS, Sequelize, JWT y Tailwind.",
    type: 'course',
  },
  {
    title: "Python 3 Avanzado",
    institution: "UTN Centro de e-Learning",
    period: "2024",
    description: "Aprendizaje de Asyncio, patrones de diseño, metaclasses, decoradores y namespaces.",
    type: 'course',
  },
  {
    title: "Desarrollo de Software con Python",
    institution: "Onapsis / Puerta18",
    period: "2022",
    description: "Capacitación en Flask, APIs REST, TDD y programación orientada a objetos.",
    type: 'course',
  },
  {
    title: "Diseño y Programación Web",
    institution: "Escuela Da Vinci",
    period: "2021",
    description: "Maquetado HTML5/CSS3, UX/UI y accesibilidad web.",
    type: 'course',
  },
];

export default function Education() {
  return (
    <section id="education" className="w-full bg-background py-24 md:py-32">
      <div style={{ animationDelay: '0.4s' }} className="container animate-fade-in px-4 md:px-6">

        <div className="flex flex-col items-center justify-center space-y-4 text-center">

          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Formación Académica</h2>
          </div>

        </div>
        
        <div className="mx-auto mt-12 flex flex-col gap-1">
          {educationData.map((item) => (
            <Card key={item.title} className="flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    {item.type === 'degree' ? <GraduationCap className="h-6 w-6 text-primary" /> : <Award className="h-6 w-6 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                    <CardDescription className="font-semibold">{item.institution} | {item.period}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
