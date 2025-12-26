# Portfolio Personal

Portfolio personal desarrollado con Next.js, React y Tailwind CSS. Aplicación moderna de una sola página con soporte para modo oscuro y diseño responsive.

## Stack Tecnológico

- **Framework**: Next.js 16.1.1 (App Router + Turbopack)
- **UI**: React 19.2.3
- **Estilos**: Tailwind CSS + shadcn/ui
- **Lenguaje**: TypeScript (modo estricto)
- **Tema**: Sistema de temas con next-themes (light/dark mode)
- **Fuentes**: Inter (texto) y Space Grotesk (títulos)

## Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- npm, yarn, pnpm o bun

## Comandos de Desarrollo

### Servidor de Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo con Turbopack en [http://localhost:9002](http://localhost:9002)

### Build de Producción

```bash
npm run build
```

Crea una build optimizada para producción.

### Linting

```bash
npm run lint
```

Ejecuta ESLint para verificar el código.

### Verificación de Tipos

```bash
npm run typecheck
```

Ejecuta TypeScript en modo no-emit para verificar errores de tipos.

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raíz con ThemeProvider
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales y directivas de Tailwind
├── components/
│   ├── layout/            # Componentes de layout (Header, Footer)
│   ├── sections/          # Secciones de la página
│   │   ├── hero.tsx       # Sección de presentación
│   │   ├── about.tsx      # Sobre mí
│   │   ├── education.tsx  # Formación académica
│   │   ├── skills.tsx     # Habilidades técnicas
│   │   ├── experience.tsx # Experiencia laboral
│   │   └── projects.tsx   # Proyectos
│   ├── ui/                # Componentes shadcn/ui
│   ├── theme-provider.tsx # Proveedor de temas
│   └── theme-toggle.tsx   # Selector de tema
├── hooks/                 # Hooks personalizados de React
└── lib/                   # Utilidades y helpers
```

## Características

- Diseño responsive con enfoque mobile-first
- Modo oscuro/claro con persistencia
- Componentes UI reutilizables con shadcn/ui
- Tipado estricto con TypeScript
- Optimización de rendimiento con Turbopack
- Animaciones y transiciones suaves
- Fuentes optimizadas cargadas vía Google Fonts

## Alias de Rutas

El proyecto usa alias de TypeScript para importaciones más limpias:

```typescript
@/src/components/...  // Para componentes
@/src/lib/...         // Para utilidades
@/src/hooks/...       // Para hooks
```

## Despliegue

La forma más sencilla de desplegar esta aplicación es usar [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/deployment) para más opciones.

## Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Documentación de React](https://react.dev)

## Licencia

Este proyecto es de uso personal.
