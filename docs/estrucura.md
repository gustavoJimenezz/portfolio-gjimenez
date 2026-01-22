  1. Arquitectura de Next.js App Router

  src/app/
  ├── layout.tsx      → Layout raíz (envuelve toda la aplicación)
  ├── page.tsx        → Página principal (Home)
  ├── globals.css     → Estilos globales y variables CSS
  └── favicon.ico     → Icono del sitio

  layout.tsx - Layout Raíz:
  - Define metadata SEO (título y descripción en español)
  - Carga fuentes de Google: Inter (texto) y Space Grotesk (títulos)
  - Envuelve la aplicación con ThemeProvider (dark mode)
  - Incluye el componente Toaster para notificaciones

  page.tsx - Composición de Secciones:
  - Estructura simple: Header + Secciones + Footer
  - Las 6 secciones se renderizan secuencialmente:
    a. Hero - Introducción con foto de perfil
    b. About - Información personal
    c. Education - Formación académica
    d. Skills - Habilidades técnicas
    e. Experience - Experiencia laboral
    f. Projects - Portafolio de proyectos

  ---
  2. Componentes de Layout

  src/components/layout/header.tsx

  Funcionalidad:
  - Header sticky con navegación
  - Menú responsive (desktop y móvil)
  - Logo con icono <Code /> de Lucide
  - 5 enlaces de navegación anchor (#about, #skills, etc.)
  - Toggle de tema (dark/light)
  - Menú hamburguesa para móvil con estado local

  Características técnicas:
  - Client component ("use client")
  - Estado local con useState para el menú móvil
  - Backdrop blur effect para el header
  - Navegación con next/link para optimización

  src/components/layout/footer.tsx

  Funcionalidad:
  - Sección de contacto (id="contact")
  - 3 tarjetas de contacto: Email, LinkedIn, GitHub
  - Links a redes sociales
  - Copyright dinámico con año actual

  Características técnicas:
  - Usa componentes Card de shadcn/ui
  - Iconos de Lucide React
  - Hover effects (scale y shadow)

  ---
  3. Componentes de Secciones

  src/components/sections/hero.tsx

  - Grid de 2 columnas (texto + imagen)
  - Título, subtítulo, descripción
  - 2 botones CTA: "Ver Proyectos" y "Contáctame"
  - Imagen de perfil circular (400x400px) con next/image
  - Animación de fade-in

  src/components/sections/about.tsx

  - Grid de 2 columnas (texto + tarjeta)
  - Descripción personal y profesional
  - Tarjeta con información de contacto
  - Icono UserCircle2

  src/components/sections/education.tsx

  - Lista de educación (grado universitario + cursos)
  - Cada item es una Card con:
    - Icono diferenciado: GraduationCap (grado) o Award (curso)
    - Título, institución, período
    - Descripción de tecnologías/contenido
  - Hover effects (scale + shadow)
  - Total: 5 items de educación

  src/components/sections/skills.tsx

  - 6 categorías de habilidades:
    a. Lenguajes & Core
    b. Backend & APIs
    c. Frontend & Estilos
    d. Bases de Datos & ORMs
    e. DevOps & Cloud
    f. Metodologías & Prácticas
  - Cada categoría es una Card con:
    - Icono de Lucide (Code, Server, Globe, Database, Layers, BrainCircuit)
    - Lista de Badge con las tecnologías
  - Grid responsive (1, 2 o 3 columnas)

  src/components/sections/experience.tsx

  Diseño de Timeline:
  - Línea vertical central (timeline)
  - Experiencias alternadas izquierda/derecha
  - Cada experiencia tiene:
    - Dot en la timeline
    - Card con icono Briefcase
    - Rol, empresa, período
    - Lista de responsabilidades
  - 2 experiencias: Onapsis (2022-2023) y Trabajo Independiente (2023-actual)

  src/components/sections/projects.tsx

  Estructura:
  - Grid de 2 columnas
  - 4 proyectos hardcodeados
  - Cada proyecto tiene:
    - Imagen (desde PlaceHolderImages)
    - Título y descripción
    - Badges de tecnologías
    - Botón "Ver Código" (GitHub)
  - Imágenes con next/image optimizadas
  - Uso de data-ai-hint para accesibilidad AI

  Sistema de Imágenes:
  - Las imágenes se cargan desde src/lib/placeholder-images.ts
  - Este archivo importa un JSON con metadatos de imágenes
  - Cada proyecto busca su imagen por imageId

  ---
  4. Sistema de Temas (Dark Mode)

  src/components/theme-provider.tsx

  Funcionalidad:
  - Context API para gestión de tema
  - Persiste tema en localStorage (key: "ui-theme")
  - Tema por defecto: "dark"
  - Añade clase dark o light al <html>

  Implementación:
  - Client component ("use client")
  - Hook personalizado useTheme() para consumir el context
  - Validación SSR (verifica typeof window)

  src/components/theme-toggle.tsx

  - Botón para cambiar entre dark/light
  - Probablemente usa iconos de sol/luna

  src/app/globals.css

  Sistema de Variables CSS:
  - Define variables HSL para colores
  - 2 paletas: :root (light) y .dark
  - Colores principales:
    - primary: Verde (140° hue) - distintivo del portfolio
    - secondary: Gris neutro
    - background/foreground: Contrastes invertidos entre temas
  - Variables semánticas: --card, --popover, --muted, --accent, --destructive
  - Variables para charts (5 colores)
  - scroll-behavior: smooth para navegación suave

  ---
  5. Componentes UI (shadcn/ui)

  Ubicación: src/components/ui/

  Componentes utilizados:
  - button.tsx - Botones con variantes (default, secondary, outline, ghost)
  - card.tsx - Cards con Header, Content, Footer
  - badge.tsx - Badges para tecnologías
  - separator.tsx - Líneas divisoras
  - toast.tsx / toaster.tsx - Sistema de notificaciones
  - Y muchos más componentes predefinidos...

  Patrones shadcn/ui:
  - Componentes base de Radix UI
  - Estilos con Tailwind CSS
  - Variantes con class-variance-authority
  - Configuración en components.json

  Nota: Hay archivos duplicados con "(1)" en el nombre que deberían limpiarse.

  ---
  6. Utilidades y Hooks

  src/lib/utils.ts

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  - Función cn(): Combina clases de Tailwind
  - Usa clsx para condicionales y twMerge para resolver conflictos
  - Patrón estándar en shadcn/ui

  src/lib/placeholder-images.ts

  - Exporta array PlaceHolderImages
  - Importa datos desde placeholder-images.json
  - Tipado TypeScript con ImagePlaceholder

  src/hooks/use-toast.ts

  - Hook para sistema de notificaciones toast

  src/hooks/use-mobile.tsx

  - Hook para detectar viewport móvil

  ---
  7. Configuración de Estilos

  tailwind.config.ts

  Problema detectado: Tiene 200+ líneas comentadas (código duplicado)

  Configuración activa:
  - darkMode: 'class' - Modo oscuro por clase CSS
  - Content paths: ./src/**/*.{js,ts,jsx,tsx,mdx}
  - Fuentes personalizadas:
    - font-body: Inter
    - font-headline: Space Grotesk
    - font-code: monospace
  - Colores: Basados en variables CSS (hsl(var(--background)))
  - Animaciones personalizadas:
    - accordion-down/up
    - fade-in - Usada en las secciones
  - Plugin: tailwindcss-animate

  postcss.config.mjs

  - Configuración básica de PostCSS con Tailwind y Autoprefixer

  ---
  8. Configuración TypeScript

  tsconfig.json

  - Target: ES2017
  - Modo estricto activado
  - Module resolution: bundler (Next.js 15)
  - Path alias: @/* apunta a la raíz
  - Plugin Next.js para tipos

  Nota sobre paths:
  - Los imports usan @/src/... en el código
  - La configuración components.json sugiere @/components
  - Hay inconsistencia entre ambos

  ---
  9. Scripts de Desarrollo

  Puerto personalizado:

  npm run dev  # Corre en puerto 9002 (no el 3000 default)

  Turbopack:

  - Next.js 15 usa --turbopack para compilación más rápida

  Genkit (AI):

  - Scripts genkit:dev y genkit:watch configurados
  - Problema: Referencian src/ai/dev.ts que no existe
  - Dependencias instaladas:
    - @genkit-ai/google-genai
    - @genkit-ai/next
    - Firebase Genkit
  - Parece que era una integración AI planificada pero no implementada

  ---
  Flujo de Datos

  1. Carga de la Aplicación

  1. Next.js Server → Renderiza layout.tsx
  2. Layout → Carga fuentes de Google + ThemeProvider
  3. ThemeProvider → Lee localStorage + aplica clase dark/light
  4. page.tsx → Renderiza Header + 6 Secciones + Footer
  5. Cada sección → Renderiza datos hardcodeados

  2. Navegación

  - Tipo: Anchor navigation (#about, #skills, etc.)
  - Comportamiento: scroll-behavior: smooth en CSS
  - Sin rutas: Todo en una sola página

  3. Datos

  - Todo hardcodeado en cada componente
  - Arrays de datos: projectData, skillData, experienceData, educationData
  - No hay API calls ni CMS
  - No hay base de datos

  ---
  Tecnologías y Patrones

  Stack Principal

  - Next.js 15.3.3 - Framework React con SSR/SSG
  - React 18.3.1 - Library UI
  - TypeScript - Tipado estático
  - Tailwind CSS 3.4 - Utility-first CSS
  - shadcn/ui - Componentes UI pre-diseñados

  Patrones de Diseño

  1. Composition Pattern - page.tsx compone secciones
  2. Compound Components - Card (Header, Content, Footer)
  3. Render Props - ThemeProvider con Context API
  4. Single Responsibility - Cada sección es independiente
  5. Data-Driven UI - Arrays de datos renderizados con .map()

  Optimizaciones

  - next/image para imágenes optimizadas
  - next/link para prefetching
  - Turbopack para builds rápidos
  - Lazy loading implícito de Next.js
  - CSS variables para theming eficiente

  ---
  Puntos a Mejorar

  Problemas Detectados:

  1. Archivos duplicados: ui/accordion (1).tsx, ui/alert (1).tsx, etc.
  2. tailwind.config.ts: 200 líneas comentadas innecesarias
  3. Genkit AI: Scripts referencian archivos inexistentes
  4. Inconsistencia de paths: @/src/ vs @/components
  5. Typo en projects.tsx: "TypeScriptF" en techStack

  Arquitectura:

  - Datos hardcodeados - podría usar un CMS (Contentful, Sanity)
  - Sin i18n - todo en español
  - Sin analytics configurado
  - Sin testing configurado

  ---
  Resumen de Funciones por Archivo

  | Archivo                            | Función Principal                             |
  |------------------------------------|-----------------------------------------------|
  | app/layout.tsx                     | Layout raíz, metadata, fuentes, ThemeProvider |
  | app/page.tsx                       | Composición de secciones del portfolio        |
  | app/globals.css                    | Variables CSS para temas y estilos globales   |
  | components/layout/header.tsx       | Navegación sticky con menú responsive         |
  | components/layout/footer.tsx       | Contacto y redes sociales                     |
  | components/sections/hero.tsx       | Presentación con foto y CTAs                  |
  | components/sections/about.tsx      | Bio y datos personales                        |
  | components/sections/education.tsx  | Timeline de formación académica               |
  | components/sections/skills.tsx     | Categorías de habilidades técnicas            |
  | components/sections/experience.tsx | Timeline de experiencia laboral               |
  | components/sections/projects.tsx   | Grid de proyectos con imágenes                |
  | components/theme-provider.tsx      | Context para dark/light mode                  |
  | components/theme-toggle.tsx        | Botón cambio de tema                          |
  | components/ui/*                    | Componentes reutilizables de shadcn/ui        |
  | lib/utils.ts                       | Función cn() para merge de clases             |
  | lib/placeholder-images.ts          | Sistema de gestión de imágenes                |
  | hooks/use-toast.ts                 | Hook para notificaciones                      |
  | hooks/use-mobile.tsx               | Hook para detección móvil                     |

  ---
  Este es un portfolio sólido y bien estructurado, con buenas prácticas de Next.js, diseño responsive, y un sistema de temas robusto. La arquitectura es simple pero efectiva para su propósito: mostrar información profesional de forma atractiva y accesible.
