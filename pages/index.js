
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  const [trainings, setTrainings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch('/data/trainings.json')
      .then((res) => res.json())
      .then(setTrainings);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <Head>
        <title>Triatlón Entrenamientos</title>
      </Head>

      <h1 className="text-3xl font-bold text-center mb-6">Hola Melgarin 👋</h1>
      <p className="text-center mb-4 text-gray-600">Selecciona un día para ver el entrenamiento</p>

      <div className="space-y-4">
        {Object.entries(trainings).map(([date, details]) => (
          <div key={date} className="border rounded-lg p-4 shadow-md bg-white">
            <button onClick={() => setSelectedDate(selectedDate === date ? null : date)}
              className="w-full text-left font-semibold text-lg">
              {new Date(date).toLocaleDateString('es-AR')}
            </button>

            {selectedDate === date && (
              <div className="mt-4 space-y-4">
                {['swim', 'bike', 'run'].map((sport) => (
                  details[sport] && (
                    <div key={sport} className="border rounded-md p-3 bg-gray-50">
                      <h3 className="capitalize font-bold text-blue-700">{sport}</h3>
                      <p><strong>Distancia:</strong> {details[sport].distance}</p>
                      <p><strong>Warm-up:</strong> {details[sport].warmup}</p>
                      <p><strong>Main:</strong> {details[sport].main}</p>
                      <p><strong>Ritmo:</strong> {details[sport].pace}</p>
                      <p><strong>Cooldown:</strong> {details[sport].cooldown}</p>
                    </div>
                  )
                ))}

                <div className="mt-4">
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Mirá el entrenamiento del ${date}: https://tusitio.vercel.app`);
                      window.open(`https://wa.me/?text=${msg}`, '_blank');
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600">
                    Compartir vía WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}