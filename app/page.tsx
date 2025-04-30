'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ✅ Strictly typed album image data
const homepageImages = {
  modern: ['/modern/1.jpg', '/modern/2.jpg', '/modern/3.jpg'],
  classic: ['/classic/1.jpg', '/classic/2.jpg', '/classic/3.jpg'],
  o_classic: ['/o_classic/1.jpg', '/o_classic/2.jpg', '/o_classic/3.jpg'],
} as const;

// ✅ Dynamically inferred key type
type AlbumKey = keyof typeof homepageImages;

export default function Home() {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumKey>('modern');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prev) =>
        (prev + 1) % homepageImages[selectedAlbum].length
      );
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedAlbum]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Page intro */}
      <section className="mt-8 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Interior Design Studio
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          We transform spaces into beautiful, functional environments that reflect
          your unique style.
        </p>
      </section>

      {/* Album buttons */}
      <div className="flex gap-4 mt-8">
        {(Object.keys(homepageImages) as AlbumKey[]).map((album) => (
          <button
            key={album}
            className={`px-4 py-2 rounded-lg transition ${selectedAlbum === album
                ? 'bg-gray-700'
                : 'bg-gray-800 hover:bg-gray-700'
              }`}
            onClick={() => {
              setSelectedAlbum(album);
              setCurrentImageIndex(0);
              if (timerRef.current) clearInterval(timerRef.current);
              startTimer();
            }}
          >
            {album}
          </button>
        ))}
      </div>

      {/* Slideshow */}
      <div className="relative w-full max-w-3xl h-[500px] rounded-xl overflow-hidden shadow-2xl mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={homepageImages[selectedAlbum][currentImageIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={homepageImages[selectedAlbum][currentImageIndex]}
              alt="Slideshow"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          {homepageImages[selectedAlbum].map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className="w-3 h-3 rounded-full bg-gray-500"
              animate={{
                scale: index === currentImageIndex ? 1.5 : 1,
                backgroundColor:
                  index === currentImageIndex ? '#ffffff' : '#6b7280',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
