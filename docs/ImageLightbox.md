# Documentación: ImageLightbox

## Descripción General

`ImageLightbox` es un componente modal que permite visualizar imágenes en pantalla completa con capacidad de navegación entre múltiples imágenes. Se utiliza principalmente en conjunto con `ProjectGallery` para mostrar capturas de proyectos del portafolio.

## Características

- **Navegación**: Botones anterior/siguiente para navegar entre imágenes
- **Atajos de teclado**: Usa las flechas ← → para navegar
- **Contador**: Muestra la posición actual (ej: "2 / 5")
- **Captions**: Soporta texto descriptivo para cada imagen
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Accesibilidad**: Incluye labels ARIA y soporte de teclado

## Arquitectura del Flujo

### 1. Definición de Imágenes

Las imágenes se definen en `/src/lib/placeholder-images.json`:

```json
{
  "placeholderImages": [
    {
      "id": "mi-proyecto-1",
      "description": "Descripción de la imagen",
      "imageUrl": "/mi-proyecto-1.png",
      "imageHint": "mi-proyecto-1"
    }
  ]
}
```

**Campos:**
- `id`: Identificador único para referenciar la imagen
- `description`: Descripción interna (no se muestra al usuario)
- `imageUrl`: Ruta de la imagen (relativa a `/public` o URL externa)
- `imageHint`: Hint para accesibilidad y metadatos

### 2. Uso en ProjectGallery

`ProjectGallery` recibe un array de referencias a imágenes y las resuelve desde `placeholder-images.json`:

```typescript
// En el componente que llama a ProjectGallery
<ProjectGallery
  images={[
    { id: "mi-proyecto-1", caption: "Pantalla principal" },
    { id: "mi-proyecto-2", caption: "Panel de administración" },
    { id: "mi-proyecto-3" } // caption es opcional
  ]}
  projectName="Mi Proyecto"
/>
```

### 3. Flujo de Interacción

```
1. Usuario hace clic en una imagen de la galería
   ↓
2. ProjectGallery llama a openLightbox(index)
   ↓
3. Se establece selectedImageIndex y lightboxOpen = true
   ↓
4. ImageLightbox renderiza con la imagen actual
   ↓
5. Usuario puede:
   - Navegar con botones ← → o teclas del teclado
   - Cerrar con botón X o Escape
   ↓
6. Al cerrar, se ejecuta onClose() y lightboxOpen = false
```

### 4. Props de ImageLightbox

```typescript
type ImageLightboxProps = {
  images: Array<{
    imageUrl: string;     // URL de la imagen
    alt: string;          // Texto alternativo
    caption?: string;     // Texto descriptivo (opcional)
  }>;
  currentIndex: number;   // Índice de la imagen actual
  isOpen: boolean;        // Estado del modal (abierto/cerrado)
  onClose: () => void;    // Callback al cerrar
  onNavigate: (index: number) => void; // Callback al navegar
};
```

## Cómo Agregar o Cambiar Imágenes

### Paso 1: Agregar la imagen física

Coloca tu archivo de imagen en la carpeta `/public`:

```
/public
  ├── mi-proyecto-screenshot-1.png
  ├── mi-proyecto-screenshot-2.png
  └── mi-proyecto-screenshot-3.png
```

### Paso 2: Registrar la imagen en placeholder-images.json

Edita `/src/lib/placeholder-images.json` y agrega las nuevas entradas:

```json
{
  "placeholderImages": [
    {
      "id": "mi-proyecto-screenshot-1",
      "description": "Pantalla principal del proyecto",
      "imageUrl": "/mi-proyecto-screenshot-1.png",
      "imageHint": "mi-proyecto-screenshot-1"
    },
    {
      "id": "mi-proyecto-screenshot-2",
      "description": "Panel de administración",
      "imageUrl": "/mi-proyecto-screenshot-2.png",
      "imageHint": "mi-proyecto-screenshot-2"
    }
  ]
}
```

### Paso 3: Referenciar las imágenes en tu proyecto

En el componente donde defines tu proyecto (probablemente en `/src/components/sections/projects.tsx`), usa los IDs de las imágenes:

```typescript
<ProjectGallery
  images={[
    { id: "mi-proyecto-screenshot-1", caption: "Vista principal" },
    { id: "mi-proyecto-screenshot-2", caption: "Administración" },
    { id: "mi-proyecto-screenshot-3" }
  ]}
  projectName="Mi Proyecto"
/>
```

### Cambiar una Imagen Existente

**Opción 1: Reemplazar el archivo físico**

Si quieres mantener el mismo ID, simplemente reemplaza el archivo en `/public` con el mismo nombre:

```bash
# Reemplazar la imagen
cp nueva-imagen.png /public/mi-proyecto-screenshot-1.png
```

**Opción 2: Cambiar la referencia**

Actualiza el `imageUrl` en `placeholder-images.json`:

```json
{
  "id": "mi-proyecto-screenshot-1",
  "description": "Pantalla principal actualizada",
  "imageUrl": "/nueva-imagen.png",  // ← Cambiado
  "imageHint": "mi-proyecto-screenshot-1"
}
```

## Ejemplos de Uso

### Ejemplo 1: Proyecto con 1 imagen

```typescript
<ProjectGallery
  images={[
    { id: "proyecto-simple", caption: "Captura de pantalla" }
  ]}
  projectName="Proyecto Simple"
/>
```

El lightbox mostrará:
- Una sola imagen a pantalla completa
- Sin botones de navegación (solo hay 1 imagen)
- El caption debajo de la imagen

### Ejemplo 2: Proyecto con 3 imágenes

```typescript
<ProjectGallery
  images={[
    { id: "proyecto-1", caption: "Home" },
    { id: "proyecto-2", caption: "Dashboard" },
    { id: "proyecto-3", caption: "Configuración" }
  ]}
  projectName="Mi App"
/>
```

El lightbox mostrará:
- Contador "1 / 3", "2 / 3", "3 / 3"
- Botones de navegación ← →
- Navegación con teclado (ArrowLeft, ArrowRight)
- Caption dinámico según la imagen actual

### Ejemplo 3: Sin caption

```typescript
<ProjectGallery
  images={[
    { id: "screenshot-1" },
    { id: "screenshot-2" }
  ]}
  projectName="Mi Proyecto"
/>
```

El lightbox mostrará:
- Las imágenes sin texto descriptivo
- Alt text automático: "Mi Proyecto - 1", "Mi Proyecto - 2"

## Notas Técnicas

### Navegación Circular

El lightbox implementa navegación circular:
- Al estar en la última imagen y presionar "→", vuelve a la primera
- Al estar en la primera imagen y presionar "←", va a la última

### Optimización de Imágenes

El componente usa `next/image` con:
- `width={1200}` y `height={800}`: Dimensiones optimizadas
- `quality={90}`: Alta calidad de imagen
- `priority`: Carga prioritaria para mejor rendimiento
- `object-contain`: La imagen mantiene su aspect ratio

### Manejo de Eventos de Teclado

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    else if (e.key === 'ArrowRight') handleNext();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isOpen, currentIndex, images.length]);
```

Los event listeners se limpian automáticamente al cerrar el modal.

### Responsive Design

- **Desktop**: Modal de 95vw con max-width de 7xl
- **Mobile**: Padding reducido (p-2) para maximizar espacio
- **Imágenes**: max-height de 80vh para evitar scroll

## Solución de Problemas

### La imagen no se muestra

1. Verifica que el archivo existe en `/public`
2. Confirma que el ID en `placeholder-images.json` es correcto
3. Revisa que el `imageUrl` comience con `/` para rutas locales
4. Si es URL externa, verifica que sea accesible

### Las flechas de navegación no aparecen

- Las flechas solo aparecen cuando hay **más de 1 imagen**
- Verifica que el array `images` tenga al menos 2 elementos

### El keyboard navigation no funciona

- Asegúrate de que el modal esté abierto (`isOpen={true}`)
- El hook de eventos solo se activa cuando `isOpen` es true

### Las imágenes se ven distorsionadas

- Usa imágenes con aspect ratio ~3:2 o 16:9 para mejores resultados
- El componente usa `object-contain` que mantiene las proporciones
- Para galería, ProjectGallery usa `object-cover` con aspect ratios específicos

## Archivos Relacionados

- `/src/components/sections/ImageLightbox.tsx` - Componente principal
- `/src/components/sections/ProjectGallery.tsx` - Implementación de galería
- `/src/lib/placeholder-images.json` - Base de datos de imágenes
- `/src/components/ui/dialog.tsx` - Componente Dialog de shadcn/ui
- `/src/components/ui/button.tsx` - Componente Button de shadcn/ui

## Mejoras Futuras

Posibles mejoras al componente:

- **Zoom**: Permitir hacer zoom en las imágenes
- **Swipe gestures**: Navegación táctil en móviles
- **Thumbnails**: Barra de miniaturas para navegación rápida
- **Lazy loading**: Cargar imágenes bajo demanda
- **Animaciones**: Transiciones suaves entre imágenes
- **Full screen API**: Modo pantalla completa real del navegador
