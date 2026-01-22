'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/src/lib/placeholder-images';

export type ProjectImage = {
  id: string;
  caption?: string;
};

type ProjectGalleryProps = {
  images: ProjectImage[];
  projectName: string;
};

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  const getImageData = (imageId: string) => {
    return PlaceHolderImages.find(p => p.id === imageId);
  };

  // 1 imagen: 100% del espacio
  if (images.length === 1) {
    const imageData = getImageData(images[0].id);
    if (!imageData) return null;

    return (
      <div className="overflow-hidden rounded-lg">
        <Image
          src={imageData.imageUrl}
          width={800}
          height={450}
          alt={images[0].caption || projectName}
          data-ai-hint={imageData.imageHint}
          className="aspect-video w-full object-scale-down transition-transform duration-300 hover:scale-105"
        />
        {images[0].caption && (
          <p className="mt-2 text-xs text-muted-foreground">{images[0].caption}</p>
        )}
      </div>
    );
  }

  // 2 imágenes: principal 2/3, secundaria 1/3
  if (images.length === 2) {
    const mainImage = getImageData(images[0].id);
    const secondImage = getImageData(images[1].id);

    return (
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {mainImage && (
          <div className="col-span-2 overflow-hidden rounded-lg">
            <Image
              src={mainImage.imageUrl}
              width={600}
              height={400}
              alt={images[0].caption || projectName}
              data-ai-hint={mainImage.imageHint}
              className="aspect-video h-full w-full object-scale-down transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        {secondImage && (
          <div className="col-span-1 overflow-hidden rounded-lg">
            <Image
              src={secondImage.imageUrl}
              width={300}
              height={400}
              alt={images[1].caption || `${projectName} - 2`}
              data-ai-hint={secondImage.imageHint}
              className="aspect-[3/4] h-full w-full object-scale-down transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>
    );
  }

  // 3-5 imágenes: grilla 3x2, principal ocupa 2 cols x 2 rows
  const mainImage = getImageData(images[0].id);
  const secondaryImages = images.slice(1, 5).map((img, idx) => ({
    data: getImageData(img.id),
    caption: img.caption,
    index: idx + 2,
  }));

  return (
    <div className="h-full grid grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2">
      {/* Imagen principal: 2 columnas x 2 filas */}
      {mainImage && (
        <div className="col-span-2 row-span-2 overflow-hidden rounded-lg ">
          <Image
            src={mainImage.imageUrl}
            width={600}
            height={400}
            alt={images[0].caption || projectName}
            data-ai-hint={mainImage.imageHint}
            className="h-full w-full object-containtransition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      {/* Imágenes secundarias en la columna restante */}
      {secondaryImages.map((img) => (
        img.data && (
          <div key={img.data.id} className="col-span-1 overflow-hidden rounded-lg">
            <Image
              src={img.data.imageUrl}
              width={300}
              height={200}
              alt={img.caption || `${projectName} - ${img.index}`}
              data-ai-hint={img.data.imageHint}
              className="h-full w-full object-scale-down transition-transform duration-300 hover:scale-105"
            />
          </div>
        )
      ))}
    </div>
  );
}
