import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Github, Linkedin, Mail } from 'lucide-react';

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        text: "gustavo.jimenez.crespo@gmail.com",
        href: "mailto:gustavo.jimenez.crespo@gmail.com",
    },
    {
        icon: Linkedin,
        title: "LinkedIn",
        text: "gustavo-alex-jimenez-crespo",
        href: "https://linkedin.com/in/gustavo-alex-jimenez-crespo/",
    },
    {
        icon: Github,
        title: "GitHub",
        text: "gustavoJimenezz",
        href: "https://github.com/gustavoJimenezz",
    }
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-background border-t">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:py-20">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Contacto
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Estoy disponible para oportunidades de freelance o para unirme a tu equipo. Si tienes un proyecto en mente, una pregunta o simplemente quieres saludar, no dudes en contactarme.
          </p>
        </div>
        <div className="mx-auto mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {contactInfo.map((info) => (
                <Card key={info.title} className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                    <CardHeader className="items-center">
                        <div className="rounded-full bg-primary/10 p-4">
                            <info.icon className="h-8 w-8 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-2 text-xl font-headline">{info.title}</CardTitle>
                        <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary break-all">
                            {info.text}
                        </a>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="mt-16 border-t pt-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
                <p>&copy; {new Date().getFullYear()} Gustavo Jimenez Crespo. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-4">
                <a href="mailto:gustavo.jimenez.crespo@gmail.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/gustavo-alex-jimenez-crespo/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://github.com/gustavoJimenezz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
