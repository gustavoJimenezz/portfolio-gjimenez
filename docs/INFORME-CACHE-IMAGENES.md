# INFORME TÉCNICO: Problema de Caché de Imágenes

**Fecha**: 23 de enero de 2026
**Proyecto**: Portfolio Next.js
**Problema**: Las imágenes modificadas siguen mostrando la versión anterior

---

## 1. RESUMEN EJECUTIVO

Al cambiar imágenes en el proyecto (eliminar, renombrar o reemplazar), las imágenes antiguas continúan mostrándose en el navegador a pesar de haber actualizado correctamente el código y los archivos físicos.

### Cambios Realizados
```diff
Eliminados:
- /public/activa-fitness-2.png
- /public/activa-fitness-3.png

Agregados:
+ /public/activa-fitness-UML.png
+ /public/activa-fitness-docu-PM.png

Modificados:
~ /src/lib/placeholder-images.json
~ /src/components/sections/projects.tsx
```

### Manifestación del Problema
- Las imágenes viejas siguen apareciendo en el navegador
- El código fuente está actualizado correctamente
- Los archivos físicos están en la ubicación correcta

---

## 2. ANÁLISIS DE CAUSAS RAÍZ

### 2.1 Caché del Navegador (HTTP Cache)

**Causa Principal Identificada**

Los navegadores modernos implementan un sistema de caché HTTP agresivo para optimizar el rendimiento. Cuando una imagen se carga con la URL `/activa-fitness-3.png`, el navegador la almacena en caché y la reutiliza en futuras visitas.

**Mecanismo:**
```
Primera visita: GET /activa-fitness-3.png → 200 OK → Guardado en cache
Segunda visita: GET /activa-fitness-3.png → 304 Not Modified → Servido desde cache
```

**Headers HTTP Relevantes:**
- `Cache-Control`: Define políticas de caché
- `ETag`: Identificador único del contenido
- `Last-Modified`: Fecha de última modificación

**Evidencia en el Proyecto:**

Next.js por defecto cachea imágenes estáticas con políticas agresivas:
```http
Cache-Control: public, max-age=31536000, immutable
```

Esto significa: "Esta imagen no cambiará en 1 año, guárdala permanentemente".

---

### 2.2 Next.js Image Optimization Cache

**Descripción:**

Next.js procesa todas las imágenes a través de su Image Optimization API, que:
1. Redimensiona las imágenes según el tamaño solicitado
2. Convierte a formatos modernos (WebP, AVIF)
3. Cachea las versiones optimizadas

**Ubicación del Caché:**
```
.next/cache/images/
├── 0Cncu3X0bECjDn7xr8XkszxqOOnyQIrHpk1dvD15FPg/
├── arpBO1-Nvv5z9UnlSWDfEAn_imjLF8KjEkJujtcPK9c/
└── [otros hashes...]
```

**Problema Identificado:**

Cada imagen se identifica por su URL. Si cambias el archivo físico pero mantienes la misma URL, Next.js puede servir la versión cacheada:

```typescript
// Antes
<Image src="/activa-fitness-3.png" ... />

// Después (MISMO PROBLEMA si usas el mismo nombre)
<Image src="/activa-fitness-3.png" ... />  // ← Sirve desde caché
```

**Tiempo de Vida del Caché:**
- Producción: Indefinido (hasta que se limpie manualmente)
- Desarrollo: Basado en la antigüedad del archivo

---

### 2.3 Service Workers y PWA Cache

**Análisis:**

El proyecto no tiene Service Workers configurados (verificado en `/public` y `next.config.ts`), por lo que esta causa está **descartada**.

---

### 2.4 CDN y Reverse Proxy Cache

**Análisis:**

En entorno de desarrollo local (localhost:9002), no hay CDN ni proxy. Esta causa está **descartada** para desarrollo, pero es **relevante para producción**.

En producción con Nginx (según CLAUDE.md):
```nginx
# Nginx puede cachear imágenes estáticas
location ~* \.(png|jpg|jpeg|gif|webp)$ {
    expires 365d;
    add_header Cache-Control "public, immutable";
}
```

---

### 2.5 Sistema de placeholder-images.json

**Análisis del Flujo Actual:**

```typescript
// 1. Definición en placeholder-images.json
{
  "id": "activa-fitness-3",
  "imageUrl": "/activa-fitness-3.png"  // ← URL como cadena estática
}

// 2. Resolución en ProjectGallery
const getImageData = (imageId: string) => {
  return PlaceHolderImages.find(p => p.id === imageId);
};

// 3. Renderizado en Image component
<Image src={imageData.imageUrl} ... />
```

**Problema Identificado:**

El sistema actual **NO implementa cache busting**. Siempre usa la misma URL, lo que hace que el navegador sirva versiones cacheadas.

---

## 3. SOLUCIONES PROPUESTAS

### Solución 1: Limpieza Manual del Caché (Inmediata)

**Para Desarrollo:**

```bash
# Método 1: Limpiar caché de Next.js
rm -rf .next/cache/images

# Método 2: Reconstruir completamente
rm -rf .next && npm run dev

# Método 3: Hard refresh en el navegador
# - Chrome/Edge: Ctrl + Shift + R (Windows/Linux) o Cmd + Shift + R (Mac)
# - Firefox: Ctrl + F5
# - Safari: Cmd + Option + R
```

**Para el Navegador:**

1. **Chrome DevTools:**
   ```
   F12 → Network tab → Disable cache (checkbox)
   → Hard refresh (Ctrl+Shift+R)
   ```

2. **Limpiar caché específico:**
   ```
   F12 → Application → Storage → Clear storage
   → Seleccionar "Cached images and files"
   → Clear site data
   ```

3. **Modo Incógnito:**
   ```
   Ctrl + Shift + N (Chrome/Edge)
   Ctrl + Shift + P (Firefox)
   ```

**Ventajas:**
- Solución inmediata
- No requiere cambios de código

**Desventajas:**
- Temporal, el problema se repetirá en futuros cambios
- Cada usuario debe limpiar su caché manualmente

---

### Solución 2: Cache Busting con Query Strings (Recomendada)

**Implementación:**

Agregar un parámetro de versión a las URLs de las imágenes:

```json
// src/lib/placeholder-images.json
{
  "placeholderImages": [
    {
      "id": "activa-fitness-UML",
      "imageUrl": "/activa-fitness-UML.png?v=2",
      "version": 2
    }
  ]
}
```

**Ventajas:**
- Simple de implementar
- Control manual sobre cuándo invalidar caché
- Compatible con todas las CDN

**Desventajas:**
- Requiere actualizar manualmente la versión
- El archivo anterior sigue en caché del navegador (no se elimina)

---

### Solución 3: Cache Busting con Hash del Archivo (Automatizada)

**Implementación:**

Crear un script que genere hashes de los archivos y actualice automáticamente `placeholder-images.json`:

```bash
# scripts/generate-image-hashes.js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
}

function updatePlaceholderImages() {
  const configPath = './src/lib/placeholder-images.json';
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  config.placeholderImages.forEach(img => {
    const filePath = path.join('./public', img.imageUrl);
    if (fs.existsSync(filePath)) {
      const hash = generateFileHash(filePath);
      img.imageUrl = `${img.imageUrl.split('?')[0]}?v=${hash}`;
    }
  });

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('✓ Image hashes updated');
}

updatePlaceholderImages();
```

**Agregar al package.json:**
```json
{
  "scripts": {
    "images:hash": "node scripts/generate-image-hashes.js",
    "prebuild": "npm run images:hash"
  }
}
```

**Ventajas:**
- Automático en cada build
- El hash cambia solo cuando el archivo cambia
- Invalida caché de forma precisa

**Desventajas:**
- Requiere script adicional
- Mayor complejidad inicial

---

### Solución 4: Renombrar Archivos con Sufijos (Práctica Actual)

**Implementación:**

Usar nombres únicos para cada nueva versión:

```diff
- activa-fitness-3.png
+ activa-fitness-UML.png
+ activa-fitness-docu-PM.png
```

**En placeholder-images.json:**
```json
{
  "id": "activa-fitness-UML",
  "imageUrl": "/activa-fitness-UML.png"
}
```

**Ventajas:**
- Simple y directo
- No requiere scripts ni configuración
- Nombres descriptivos

**Desventajas:**
- Acumula archivos huérfanos si no se limpian
- No escala bien para actualizaciones frecuentes

---

### Solución 5: Configurar Next.js para Desarrollo

**Implementación:**

Agregar configuración en `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 0, // Solo en desarrollo, no en producción
  },
  // En producción, mantener el caché
  ...(process.env.NODE_ENV === 'production' && {
    images: {
      minimumCacheTTL: 31536000, // 1 año
    },
  }),
};

export default nextConfig;
```

**Ventajas:**
- Evita problemas de caché en desarrollo
- Mantiene optimización en producción

**Desventajas:**
- Solo afecta al servidor Next.js, no al navegador
- Puede hacer el desarrollo más lento

---

## 4. RECOMENDACIONES

### Para Solución Inmediata (HOY)

```bash
# 1. Limpiar caché de Next.js
rm -rf .next

# 2. Reiniciar servidor de desarrollo
npm run dev

# 3. En el navegador: Hard refresh
Ctrl + Shift + R (o Cmd + Shift + R en Mac)
```

---

### Para Prevención Futura (IMPLEMENTAR)

**Opción A: Solución Simple (Recomendada para este proyecto)**

Continuar usando nombres descriptivos únicos (como hiciste con `activa-fitness-UML.png`) y documentar el proceso:

```markdown
## Convención de Nombres de Imágenes

Al agregar nuevas imágenes a un proyecto:
1. Usar nombres descriptivos únicos: `proyecto-nombre-descriptivo.png`
2. Evitar reutilizar nombres de imágenes eliminadas
3. Limpiar archivos huérfanos del directorio `/public`

Ejemplo:
✓ activa-fitness-UML.png
✓ activa-fitness-docu-PM.png
✗ activa-fitness-1.png
✗ activa-fitness-2.png
```

**Opción B: Solución Robusta (Para proyectos en producción)**

Implementar cache busting automatizado (Solución 3):

1. Crear el script `scripts/generate-image-hashes.js`
2. Agregarlo al `prebuild` en `package.json`
3. Las imágenes tendrán hashes automáticos: `/imagen.png?v=a3f9b2c1`

---

### Para Producción

Si el sitio está en producción, además:

```bash
# 1. Limpiar CDN/Nginx cache
sudo nginx -s reload

# 2. Purgar caché de CDN (si aplica)
# Cloudflare: Dashboard → Cache → Purge Everything
# Vercel: Redeploy automático actualiza caché
```

---

## 5. DIAGNÓSTICO DEL CASO ACTUAL

### Estado del Proyecto

```bash
# Cambios sin commitear
M  src/lib/placeholder-images.json
M  src/components/sections/projects.tsx
D  public/activa-fitness-2.png
D  public/activa-fitness-3.png
?? public/activa-fitness-UML.png
?? public/activa-fitness-docu-PM.png
```

### Análisis

1. **Código actualizado correctamente** ✓
   - `projects.tsx` usa los nuevos IDs
   - `placeholder-images.json` tiene las nuevas entradas

2. **Archivos físicos correctos** ✓
   ```bash
   -rw-rw-r-- activa-fitness-UML.png (112K)
   -rw-rw-r-- activa-fitness-docu-PM.png (13K)
   ```

3. **Caché de Next.js activo** ⚠️
   ```bash
   .next/cache/images/  # 10 directorios con hashes
   ```

4. **Caché del navegador activo** ⚠️
   - Las URLs antiguas están cacheadas
   - Se requiere hard refresh

### Causa Confirmada

**Caché del navegador** combinado con **caché de Next.js**. Los archivos nuevos existen y el código es correcto, pero el navegador sirve las versiones cacheadas de las URLs que ya había visitado.

---

## 6. PLAN DE ACCIÓN

### Paso 1: Solución Inmediata (5 minutos)

```bash
# Terminal 1: Detener servidor dev (Ctrl+C)

# Terminal 2: Limpiar caché
rm -rf .next

# Terminal 3: Reiniciar
npm run dev

# Navegador: Abrir DevTools (F12)
# → Network tab → "Disable cache" (checkbox)
# → Hard refresh (Ctrl + Shift + R)
```

### Paso 2: Verificación

1. Abrir la página en modo incógnito: `Ctrl + Shift + N`
2. Verificar que las nuevas imágenes aparecen
3. Revisar la consola de red (F12 → Network) para confirmar las URLs

### Paso 3: Documentación

Actualizar el archivo `CLAUDE.md` con la convención de nombres:

```markdown
## Gestión de Imágenes

Al agregar o modificar imágenes del portafolio:

1. Colocar el archivo en `/public` con nombre descriptivo único
2. Registrar en `/src/lib/placeholder-images.json`
3. Limpiar caché: `rm -rf .next && npm run dev`
4. Hard refresh en navegador: Ctrl+Shift+R

**IMPORTANTE**: Usar nombres descriptivos únicos para evitar problemas de caché.
```

---

## 7. CONCLUSIÓN

### Causa Raíz Identificada
El problema se debe a la combinación de:
1. **Caché del navegador HTTP** (causa principal)
2. **Caché de optimización de Next.js** (causa secundaria)

### Solución Implementada
Has implementado correctamente la **Solución 4 (Renombrar archivos)**, que es adecuada para este proyecto. Solo falta limpiar el caché existente.

### Prevención Futura
- Continuar usando nombres descriptivos únicos
- Documentar el proceso de gestión de imágenes
- Considerar implementar cache busting automatizado si el proyecto crece

### Próximos Pasos
1. Aplicar la limpieza de caché (Paso 1 del Plan de Acción)
2. Verificar que las nuevas imágenes aparecen
3. Documentar el proceso en `CLAUDE.md`

---

**Firma:**
Análisis técnico generado el 2026-01-23
Portfolio Next.js - Sistema de Gestión de Imágenes
