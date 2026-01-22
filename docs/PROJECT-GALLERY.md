# ProjectGallery - Documentación

## Descripción

`ProjectGallery` es un componente React que muestra una galería de imágenes responsiva para proyectos del portafolio. Soporta de 1 a 4 imágenes por proyecto con layouts adaptativos.

## Flujo de Trabajo

```
1. Agregar imagen → placeholder-images.json
2. Referenciar ID → projects.tsx (array images)
3. Renderizado → ProjectGallery.tsx (automático)
```

## Cómo Agregar Imágenes

### Paso 1: Registrar la imagen en placeholder-images.json

Ubicación: `src/lib/placeholder-images.json`

```json
{
  "placeholderImages": [
    {
      "id": "mi-proyecto-imagen-1",
      "description": "Descripción de la imagen",
      "imageUrl": "/images/mi-proyecto.png",
      "imageHint": "proyecto web"
    }
  ]
}
```

| Campo | Descripción |
|-------|-------------|
| `id` | Identificador único (kebab-case recomendado) |
| `description` | Descripción interna de la imagen |
| `imageUrl` | Ruta a la imagen (desde `/public`) |
| `imageHint` | Hint para accesibilidad/AI |

### Paso 2: Agregar al proyecto en projects.tsx

Ubicación: `src/components/sections/projects.tsx`

```tsx
const projectData: Project[] = [
  {
    name: "Mi Proyecto",
    description: "...",
    techStack: ["React", "Node.js"],
    githubRepoUrl: "https://github.com/...",
    images: [
      { id: 'mi-proyecto-imagen-1' },
      { id: 'mi-proyecto-imagen-2', caption: 'Vista del dashboard' },
      // Máximo 4 imágenes
    ],
  },
];
```

## Layouts Según Cantidad

| Imágenes | Layout | Descripción |
|----------|--------|-------------|
| 1 | `■` | Imagen única a ancho completo |
| 2 | `■ ■` | Dos columnas iguales |
| 3 | `■ ▪` | Principal (2 filas) + 2 secundarias |
|   | `  ▪` | |
| 4 | `■ ■` | Grilla 2x2 uniforme |
|   | `■ ■` | |

## Estructura del Componente

```
ProjectGallery.tsx
├── MAX_IMAGES = 4
├── GRID_LAYOUTS (config de grids por cantidad)
├── MAIN_IMAGE_STYLES (estilos imagen principal)
└── Render: grid dinámico con imágenes
```

## Ejemplo Completo

```json
// placeholder-images.json
{
  "id": "ecommerce-home",
  "description": "Página principal del ecommerce",
  "imageUrl": "/images/projects/ecommerce-home.png",
  "imageHint": "ecommerce landing"
}
```

```tsx
// projects.tsx
{
  name: "E-commerce Platform",
  images: [
    { id: 'ecommerce-home' },
    { id: 'ecommerce-cart', caption: 'Carrito de compras' },
    { id: 'ecommerce-checkout' },
    { id: 'ecommerce-admin' },
  ],
}
```

## Notas

- Las imágenes deben estar en `/public/images/`
- El componente filtra automáticamente a máximo 4 imágenes
- Si un ID no existe en placeholder-images.json, la imagen se omite
- El caption es opcional y se usa como alt text
