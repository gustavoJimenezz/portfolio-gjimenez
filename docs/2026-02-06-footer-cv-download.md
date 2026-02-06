# Sección de Descarga de CV en Footer

**Fecha:** 2026-02-06

## Resumen

Implementación de una nueva tarjeta en el footer del portfolio para permitir a los visitantes descargar el Curriculum Vitae directamente desde la página. La tarjeta sigue el mismo estilo visual que las demás tarjetas de contacto.

## Cambios Principales

- Agregado icono `FileDown` de lucide-react
- Nueva entrada en array `contactInfo` para el CV
- Soporte para atributo `download` en enlaces
- Grid ajustado de 3 a 4 columnas en pantallas grandes

## Flujo de Trabajo

```
[Usuario ve Footer] → [Clic en tarjeta "Curriculum"] → [Descarga automática del PDF]
```

1. El usuario navega a la sección de contacto en el footer
2. Visualiza la tarjeta "Curriculum" con icono de descarga
3. Al hacer clic en "Descargar CV", el navegador descarga el archivo PDF

## Archivos Afectados

| Archivo | Cambio |
|---------|--------|
| `src/components/layout/footer.tsx` | Nueva tarjeta de CV, ajuste de grid, soporte download |
| `public/pdf/jimenezCV2025-v02.pdf` | Archivo PDF referenciado (existente) |

## Notas Técnicas

- El atributo `download` en el enlace fuerza la descarga en lugar de abrir el PDF en el navegador
- El grid se ajustó a `lg:grid-cols-4` para acomodar las 4 tarjetas uniformemente
- El enlace usa ruta relativa `/pdf/jimenezCV2025-v02.pdf` que apunta a la carpeta `public/`
