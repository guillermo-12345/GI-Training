import { useState, useEffect } from 'react';
import Head from 'next/head';

function getDaysInMonth(year, month) {
  // month: 0-11
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function Home() {
  const [role, setRole] = useState(null); // 'admin' o 'usuario'
  const [selectedDate, setSelectedDate] = useState('');
  const [copied, setCopied] = useState(false);
  const [trainings, setTrainings] = useState({});

  // Para manejar el mes y año que se muestra en el calendario
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11

  // Cargar trainings.json
  useEffect(() => {
    const fetchTrainings = async () => {
      const res = await fetch('/data/training.json');
      const data = await res.json();
      setTrainings(data);
    };
    fetchTrainings();
  }, []);

  // Obtener todos los días del mes actual seleccionado
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // Funciones para cambiar mes
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(''); // limpiar selección al cambiar mes
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
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

            {/* Navegación de meses */}
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

            {/* Calendario */}
            <div className="grid grid-cols-7 gap-2 text-center mb-6">
              {/* Días de la semana */}
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="font-semibold">
                  {day}
                </div>
              ))}

              {/* Espacios en blanco antes del primer día del mes */}
              {Array(daysInMonth[0].getDay())
                .fill(null)
                .map((_, i) => (
                  <div key={'empty-' + i} />
                ))}

              {/* Días del mes */}
              {daysInMonth.map((date) => {
                const dateStr = date.toISOString().split('T')[0];
                const isSelected = selectedDate === dateStr;
                const hasTraining = !!trainings[dateStr];
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
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

            {/* Mostrar detalles de entrenamiento del día seleccionado */}
            {selectedDate && (
              <div className="rounded-xl bg-blue/70 backdrop-blur-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  Entrenamiento para el{' '}
                  {new Date(selectedDate).toLocaleDateString('es-AR')}
                </h3>
                {trainings[selectedDate] ? (
                  <ul className="list-disc pl-5 space-y-1 text-left">
                    <li>
                      <strong>Nado:</strong>{' '}
                      <div>
                        Distancia: {trainings[selectedDate].swim.distance}
                      </div>
                      <div>Calentamiento: {trainings[selectedDate].swim.warmup}</div>
                      <div>Principal: {trainings[selectedDate].swim.main}</div>
                      <div>Ritmo: {trainings[selectedDate].swim.pace}</div>
                      <div>Enfriamiento: {trainings[selectedDate].swim.cooldown}</div>
                    </li>
                    <li>
                      <strong>Bicicleta:</strong>{' '}
                      <div>
                        Distancia: {trainings[selectedDate].bike.distance}
                      </div>
                      <div>Calentamiento: {trainings[selectedDate].bike.warmup}</div>
                      <div>Principal: {trainings[selectedDate].bike.main}</div>
                      <div>Ritmo: {trainings[selectedDate].bike.pace}</div>
                      <div>Enfriamiento: {trainings[selectedDate].bike.cooldown}</div>
                    </li>
                    <li>
                      <strong>Correr:</strong>{' '}
                      <div>
                        Distancia: {trainings[selectedDate].run.distance}
                      </div>
                      <div>Calentamiento: {trainings[selectedDate].run.warmup}</div>
                      <div>Principal: {trainings[selectedDate].run.main}</div>
                      <div>Ritmo: {trainings[selectedDate].run.pace}</div>
                      <div>Enfriamiento: {trainings[selectedDate].run.cooldown}</div>
                    </li>
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
