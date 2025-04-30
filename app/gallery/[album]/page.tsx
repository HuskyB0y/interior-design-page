'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';

// Album data
const albums = {
    'modern-interiors': [
        { src: '/modern/1.jpg', title: 'Modern Living Room' },
        { src: '/modern/2.jpg', title: 'Modern Kitchen' },
        { src: '/modern/3.jpg', title: 'Modern Bedroom' },
    ],
    'classic-rooms': [
        { src: '/classic/1.jpg', title: 'Classic Living Room' },
        { src: '/classic/2.jpg', title: 'Classic Dining Room' },
        { src: '/classic/3.jpg', title: 'Classic Library' },
    ],
};

// ✅ Correct Promise-unwrapped access using use()
export default function AlbumPage({ params }: { params: Promise<{ album: string }> }) {
    const { album } = use(params); // ✅ unwrap the Promise

    const images = albums[album as keyof typeof albums] ?? [];


    if (images.length === 0) {
        notFound(); // show 404 if not found
    }

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    return (
        <main className="min-h-screen bg-gray-950 text-gray-100 py-12 flex flex-col items-center">
            {/* Back to gallery link */}
            <Link href="/gallery" className="mb-8 text-gray-400 hover:text-gray-200 underline">
                ← Back to Gallery
            </Link>

            {/* Album title */}
            <h1 className="text-4xl font-bold mb-12 capitalize">
                {album.replace('-', ' ')}
            </h1>

            {/* Images grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative w-full h-64 rounded-md overflow-hidden shadow-md cursor-pointer"
                        onClick={() => {
                            setIndex(idx);
                            setOpen(true);
                        }}
                    >
                        <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox with thumbnails and captions */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images}
                plugins={[Thumbnails, Captions]}
            />
        </main>
    );
}
