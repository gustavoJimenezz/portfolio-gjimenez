import Header from '@/src/components/layout/header';
import Footer from '@/src/components/layout/footer';
import Hero from '@/src/components/sections/hero';
import About from '@/src/components/sections/about';
import Skills from '@/src/components/sections/skills';
import Education from '@/src/components/sections/education';
import Experience from '@/src/components/sections/experience';
import Projects from '@/src/components/sections/projects';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <main className="flex flex-col gap-24 py-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
    </div>
  );
}
