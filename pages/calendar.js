import { useState } from 'react';

const sampleTrainings = {
  '2025-06-05': {
    swim: '1000m técnica',
    bike: '40km rodaje suave',
    run: '5km ritmo constante',
  },
  '2025-06-06': {
    swim: 'Descanso',
    bike: '60km fondo',
    run: '8km progresivo',
  },
  // Agregá más días según necesites
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [copied, setCopied] = useState(false);

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const handleShare = () => {
    const url = window.location.href;
    const message = `Mirá el entrenamiento del día: ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const datesToShow = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  return (
    <div
      className="min-h-screen p-6 text-white bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/logo.png')`,
      }}
    >
      <div className="max-w-3xl mx-auto bg-white bg-opacity-10 rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Entrenamientos de Triatlón</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {datesToShow.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`rounded-xl p-3 text-center font-semibold transition ${
                selectedDate === date
                  ? 'bg-blue-600 text-white'
                  : 'bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
            >
              {new Date(date).toLocaleDateString('es-AR', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </button>
          ))}
        </div>

        {selectedDate && (
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-white">
            <h2 className="text-2xl font-semibold mb-2">
              Entrenamiento para el {new Date(selectedDate).toLocaleDateString('es-AR')}
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Nado:</strong> {sampleTrainings[selectedDate]?.swim || 'Descanso'}</li>
              <li><strong>Bicicleta:</strong> {sampleTrainings[selectedDate]?.bike || 'Descanso'}</li>
              <li><strong>Correr:</strong> {sampleTrainings[selectedDate]?.run || 'Descanso'}</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleShare}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Compartir por WhatsApp
              </button>
              <button
                onClick={handleCopy}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
              >
                {copied ? 'Copiado ✔️' : 'Copiar enlace'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

