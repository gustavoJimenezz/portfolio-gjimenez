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
- Sistema de galería de imágenes para proyectos con layouts adaptativos

## Agregar Imágenes a Proyectos

El sistema de proyectos soporta múltiples imágenes por proyecto con layouts automáticos basados en la cantidad de imágenes.

### Paso 1: Agregar la imagen al directorio público

Coloca las imágenes en la carpeta `/public/`:

```
public/
├── mi-proyecto-1.png
├── mi-proyecto-2.png
└── ...
```

### Paso 2: Registrar la imagen en placeholder-images.json

Abre `src/lib/placeholder-images.json` y agrega un nuevo objeto al array `placeholderImages`:

```json
{
  "placeholderImages": [
    {
      "id": "mi-proyecto-screenshot",
      "description": "Descripción de la imagen",
      "imageUrl": "/mi-proyecto-screenshot.png",
      "imageHint": "mi-proyecto"
    }
  ]
}
```

- **id**: Identificador único para referenciar la imagen
- **description**: Descripción accesible de la imagen
- **imageUrl**: Ruta relativa desde `/public/`
- **imageHint**: Hint para optimización de AI (opcional)

### Paso 3: Agregar las imágenes al proyecto

En `src/components/sections/projects.tsx`, actualiza el array `images` del proyecto:

```typescript
{
  name: "Mi Proyecto",
  description: "Descripción del proyecto",
  techStack: ["React", "Node.js"],
  githubRepoUrl: "https://github.com/usuario/proyecto",
  images: [
    { id: 'mi-proyecto-principal', caption: 'Vista principal' },
    { id: 'mi-proyecto-detalle', caption: 'Detalle de funcionalidad' },
    { id: 'mi-proyecto-mobile' },  // caption es opcional
  ],
}
```

### Layouts Automáticos

El componente `ProjectGallery` ajusta automáticamente el layout según la cantidad de imágenes:

| Cantidad | Layout |
|----------|--------|
| 1 imagen | Ocupa 100% del espacio con aspect-video |
| 2 imágenes | Principal 2/3, secundaria 1/3 |
| 3-5 imágenes | Grilla 3x2: principal en 2 cols x 2 rows, secundarias en columna lateral |

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
