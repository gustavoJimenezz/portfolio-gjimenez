'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/src/lib/placeholder-images';
import ImageLightbox from './ImageLightbox';

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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const getImageData = (imageId: string) => {
    return PlaceHolderImages.find(p => p.id === imageId);
  };

  const allImages = images
    .map((img, idx) => {
      const imageData = getImageData(img.id);
      return imageData ? {
        imageUrl: imageData.imageUrl,
        alt: img.caption || `${projectName} - ${idx + 1}`,
        caption: img.caption,
      } : null;
    })
    .filter((img): img is NonNullable<typeof img> => img !== null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const navigateToImage = (index: number) => setSelectedImageIndex(index);

  // 1 imagen: 100% del espacio
  if (images.length === 1) {
    const imageData = getImageData(images[0].id);
    if (!imageData) return null;

    return (
      <>
        <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => openLightbox(0)}>
          <Image
            src={imageData.imageUrl}
            width={800}
            height={450}
            alt={images[0].caption || projectName}
            data-ai-hint={imageData.imageHint}
            className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {images[0].caption && (
            <p className="mt-2 text-xs text-muted-foreground">{images[0].caption}</p>
          )}
        </div>
        {allImages.length > 0 && (
          <ImageLightbox
            images={allImages}
            currentIndex={selectedImageIndex}
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            onNavigate={navigateToImage}
          />
        )}
      </>
    );
  }

  // 2 imágenes: principal 2/3, secundaria 1/3
  if (images.length === 2) {
    const mainImage = getImageData(images[0].id);
    const secondImage = getImageData(images[1].id);

    return (
      <>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {mainImage && (
            <div className="col-span-2 overflow-hidden rounded-lg cursor-pointer" onClick={() => openLightbox(0)}>
              <Image
                src={mainImage.imageUrl}
                width={600}
                height={400}
                alt={images[0].caption || projectName}
                data-ai-hint={mainImage.imageHint}
                className="aspect-video h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
          {secondImage && (
            <div className="col-span-1 overflow-hidden rounded-lg cursor-pointer" onClick={() => openLightbox(1)}>
              <Image
                src={secondImage.imageUrl}
                width={300}
                height={400}
                alt={images[1].caption || `${projectName} - 2`}
                data-ai-hint={secondImage.imageHint}
                className="aspect-[3/4] h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
        </div>
        {allImages.length > 0 && (
          <ImageLightbox
            images={allImages}
            currentIndex={selectedImageIndex}
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            onNavigate={navigateToImage}
          />
        )}
      </>
    );
  }

    // 2 imágenes: principal 2/3, secundaria 1/3
  if (images.length === 3) {
    const mainImage = getImageData(images[0].id);
    const secondaryImages = images.slice(1, 3).map((img, idx) => ({
      data: getImageData(img.id),
      caption: img.caption,
      index: idx + 1,
    }));
    
    
    return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-2 overflow-hidden h-[400px]">
        {/* Imagen principal: 2 columnas x 2 filas */}
        {mainImage && (
          <div className="row-span-3 overflow-hidden rounded-lg cursor-pointer" onClick={() => openLightbox(0)}>
            <Image
              src={mainImage.imageUrl}
              width={600}
              height={400}
              alt={images[0].caption || projectName}
              data-ai-hint={mainImage.imageHint}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        {/* Imágenes secundarias en la columna restante */}
        {secondaryImages.map((img) => (
          img.data && (
            <div
              key={img.data.id}
              className="overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox(img.index)}
            >
              <Image
                src={img.data.imageUrl}
                width={300}
                height={200}
                alt={img.caption || `${projectName} - ${img.index + 1}`}
                data-ai-hint={img.data.imageHint}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )
        ))}
      </div>
      {allImages.length > 0 && (
        <ImageLightbox
          images={allImages}
          currentIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={navigateToImage}
        />
      )}
    </>
    );
  }

  // 3-5 imágenes: grilla 3x2, principal ocupa 2 cols x 2 rows
  const mainImage = getImageData(images[0].id);
  const secondaryImages = images.slice(1, 5).map((img, idx) => ({
    data: getImageData(img.id),
    caption: img.caption,
    index: idx + 1,
  }));

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-3 gap-1.5 sm:gap-2 overflow-hidden h-[400px]">
        {/* Imagen principal: 2 columnas x 2 filas */}
        {mainImage && (
          <div className="row-span-3 overflow-hidden rounded-lg cursor-pointer" onClick={() => openLightbox(0)}>
            <Image
              src={mainImage.imageUrl}
              width={600}
              height={400}
              alt={images[0].caption || projectName}
              data-ai-hint={mainImage.imageHint}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        {/* Imágenes secundarias en la columna restante */}
        {secondaryImages.map((img) => (
          img.data && (
            <div
              key={img.data.id}
              className="overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox(img.index)}
            >
              <Image
                src={img.data.imageUrl}
                width={300}
                height={200}
                alt={img.caption || `${projectName} - ${img.index + 1}`}
                data-ai-hint={img.data.imageHint}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )
        ))}
      </div>
      {allImages.length > 0 && (
        <ImageLightbox
          images={allImages}
          currentIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={navigateToImage}
        />
      )}
    </>
  );
}



