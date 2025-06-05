// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-white text-gray-800 p-4">
      <img src="/logo.png" alt="Triatlón" className="w-32 mb-4 rounded-full shadow-lg" />
      <h1 className="text-4xl font-bold mb-2 text-center">¡Bienvenido a GI Training!</h1>
      <p className="mb-6 text-center text-lg max-w-xl">
        Esta es una app para ver tus entrenamientos de triatlón (nado, bici y correr).
      </p>
      <div className="flex gap-4">
        <Link href="/calendar">
          <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-xl shadow-lg">
            Ver Entrenamientos
          </button>
        </Link>
        <Link href="/admin">
          <button className="bg-gray-600 hover:bg-gray-800 text-white px-6 py-2 rounded-xl shadow-lg">
            Admin
          </button>
        </Link>
      </div>
      <footer className="mt-10 text-sm text-gray-500">GI Training - Powered by Next.js</footer>
    </div>
  );
}
