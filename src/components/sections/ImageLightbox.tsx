"use client"

import { useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';

type ImageLightboxProps = {
  images: Array<{
    imageUrl: string;
    alt: string;
    caption?: string;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(nextIndex);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl w-[95vw] p-2 sm:p-6">
        <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="relative">
          {hasMultipleImages && (
            <Button
              onClick={handlePrev}
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          <div className="relative flex items-center justify-center min-h-[200px]">
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain"
              quality={90}
              priority
            />
          </div>

          {hasMultipleImages && (
            <Button
              onClick={handleNext}
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>

        <div className="mt-4 text-center">
          {hasMultipleImages && (
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </p>
          )}
          {currentImage.caption && (
            <p className="mt-2 text-sm">{currentImage.caption}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
