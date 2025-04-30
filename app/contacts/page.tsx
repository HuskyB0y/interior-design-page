import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react'; // 👈 Import icons!

export default function ContactsPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-start bg-gray-950 text-gray-100 pt-12">
            {/* Profile Picture */}
            <Image
                src="/contacts/1.jpg"
                alt="Contact Profile"
                width={200}
                height={200}
                className="rounded-full shadow-lg mb-8 object-cover"
                priority
            />

            {/* Content */}
            <h1 className="text-4xl font-bold mb-4">Contacts</h1>
            <p className="text-lg text-gray-300 mb-8 text-center">
                Feel free to reach out to us at <br />
                <strong>design@example.com</strong>
            </p>

            <div className="text-center text-gray-400 mb-8">
                <p>123 Interior Ave, Design City</p>
                <p>Phone: +370 699 23 178</p>
            </div>

            {/* Social Media Links with Icons */}
            <div className="flex gap-8 items-center mb-12">
                <Link href="https://www.instagram.com/youraccount" target="_blank" className="flex items-center gap-2 text-pink-400 hover:text-pink-300">
                    <Instagram size={28} /> {/* Icon size in pixels */}
                    <span>Instagram</span>
                </Link>
                <Link href="https://www.facebook.com/youraccount" target="_blank" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                    <Facebook size={28} />
                    <span>Facebook</span>
                </Link>
            </div>
        </main>
    );
}
