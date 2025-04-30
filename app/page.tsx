'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { homepageImages } from '../lib/albums'; // 🔁 import dynamic image data

// Convert album keys to display names
const displayNames: Record<string, string> = {
  modern: 'Modern',
  classic: 'Classic',
};

export default function Home() {
  const albumKeys = Object.keys(homepageImages);
  const [selectedAlbum, setSelectedAlbum] = useState(albumKeys[0]);
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

  const handleAlbumChange = (album: string) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const currentImage = homepageImages[selectedAlbum][currentImageIndex];

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <section className="mt-8 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Interior Design Studio</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          We transform spaces into beautiful, functional environments that reflect your unique style.
          Explore our gallery to see how we bring interiors to life.
        </p>
      </section>

      {/* Album buttons */}
      <div className="flex gap-4 mt-8">
        {albumKeys.map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-lg transition ${selectedAlbum === key ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            onClick={() => handleAlbumChange(key)}
          >
            {displayNames[key] || key}
          </button>
        ))}
      </div>

      {/* Slideshow */}
      <div className="relative w-full max-w-3xl h-[500px] rounded-xl overflow-hidden shadow-2xl mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt="Interior Design"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Dot navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          {homepageImages[selectedAlbum].map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className="w-3 h-3 rounded-full"
              animate={{
                scale: index === currentImageIndex ? 1.5 : 1,
                backgroundColor: index === currentImageIndex ? '#ffffff' : '#6b7280',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
