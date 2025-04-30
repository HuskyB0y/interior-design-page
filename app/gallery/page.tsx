'use client';

import Image from 'next/image';
import Link from 'next/link';

const albums = [
    {
        slug: 'modern-interiors', // slug used in URL
        title: 'Modern Interiors', // name shown
        cover: '/modern/1.jpg', // first image as cover
    },
    {
        slug: 'classic-rooms',
        title: 'Classic Rooms',
        cover: '/classic/1.jpg',
    },
];

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-gray-950 text-gray-100 py-12 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-12">Gallery</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-6xl">
                {albums.map((album, index) => (
                    <Link
                        key={index}
                        href={`/gallery/${album.slug}`}
                        className="flex flex-col items-center bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition"
                    >
                        {/* Album Cover */}
                        <div className="w-full h-64 relative rounded-md overflow-hidden mb-4">
                            <Image
                                src={album.cover}
                                alt={album.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Album Name */}
                        <h2 className="text-2xl font-semibold">{album.title}</h2>
                    </Link>
                ))}
            </div>
        </main>
    );
}
