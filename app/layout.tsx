import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Interior Design Studio',
  description: 'Modern interior design services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100">
        {/* Header menu */}
        <header className="w-full py-4 bg-gray-900 flex justify-center gap-8 shadow-md">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/gallery" className="hover:underline">
            Gallery
          </Link>
          <Link href="/contacts" className="hover:underline">
            Contacts
          </Link>
        </header>

        {/* Page content */}
        <main className="flex flex-col items-center justify-start min-h-screen pt-8">
          {children}
        </main>
      </body>
    </html>
  )
}
