import { useState, useEffect } from 'react';
import Head from 'next/head';

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  
  // Agregar días vacíos para el primer día de la semana
  for (let i = 0; i < date.getDay(); i++) {
    days.push(null);
  }
  
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  
  return days;
}

export default function Home() {
  const [role, setRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [copied, setCopied] = useState(false);
  const [trainings, setTrainings] = useState({});

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch('/data/trainings.json');
        const data = await res.json();
        setTrainings(data);
      } catch (error) {
        console.error('Error loading trainings:', error);
      }
    };
    fetchTrainings();
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const prevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(year => year - 1);
        return 11;
      }
      return prev - 1;
    });
    setSelectedDate('');
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(year => year + 1);
        return 0;
      }
      return prev + 1;
    });
    setSelectedDate('');
  };

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

  const handleDateClick = (date) => {
    if (!date) return;
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  };

  return (
    <div
      className="min-h-screen p-6 text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/logo.png')",
      }}
    >
      <Head>
        <title>Entrenamientos Triatlón</title>
      </Head>

      <div className="max-w-3xl mx-auto bg-opacity-10 rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Hola Melgarin 👋</h1>

        {!role ? (
          <div className="text-center space-y-4">
            <p className="text-lg">¿Sos admin o usuario?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setRole('admin')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Admin
              </button>
              <button
                onClick={() => setRole('usuario')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Usuario
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Entrenamientos de Triatlón
            </h2>

            <div className="flex justify-between items-center mb-4 px-4">
              <button
                onClick={prevMonth}
                className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded"
              >
                &lt; Mes Anterior
              </button>
              <h3 className="text-lg font-semibold">
                {new Date(currentYear, currentMonth).toLocaleString('es-AR', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>
              <button
                onClick={nextMonth}
                className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded"
              >
                Mes Siguiente &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-6">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="font-semibold">
                  {day}
                </div>
              ))}

              {daysInMonth.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} />;
                }
                
                const dateStr = date.toISOString().split('T')[0];
                const isSelected = selectedDate === dateStr;
                const hasTraining = trainings[dateStr];
                
                return (
                  <button
                    key={dateStr}
                    onClick={() => handleDateClick(date)}
                    className={`rounded-xl p-2 transition ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : hasTraining
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="rounded-xl bg-blue/70 backdrop-blur-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  Entrenamiento para el{' '}
                  {new Date(selectedDate).toLocaleDateString('es-AR')}
                </h3>
                {trainings[selectedDate] ? (
                  <ul className="list-disc pl-5 space-y-1 text-left">
                    {['swim', 'bike', 'run'].map((discipline) => {
                      const data = trainings[selectedDate][discipline];
                      return data ? (
                        <li key={discipline}>
                          <strong>{discipline === 'swim' ? 'Nado' : discipline === 'bike' ? 'Bicicleta' : 'Correr'}:</strong>
                          <div>Distancia: {data.distance}</div>
                          <div>Calentamiento: {data.warmup}</div>
                          <div>Principal: {data.main}</div>
                          <div>Ritmo: {data.pace}</div>
                          <div>Enfriamiento: {data.cooldown}</div>
                        </li>
                      ) : null;
                    })}
                  </ul>
                ) : (
                  <p className="text-center text-lg">Descanso</p>
                )}
                <div className="flex gap-4 mt-4 justify-center">
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
          </>
        )}
      </div>
    </div>
  );
}