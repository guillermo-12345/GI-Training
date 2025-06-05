import { useState, useEffect } from 'react';
import Head from 'next/head';

// Datos de entrenamiento directamente en el componente (solución temporal)
const trainingData = {
  "2025-06-06": {
    "swim": {
      "distance": "1500m",
      "warmup": "200m técnica",
      "main": "4x300m fuerte",
      "pace": "1:45/100m",
      "cooldown": "200m suave"
    },
    "bike": {
      "distance": "40km",
      "warmup": "5km suave",
      "main": "30km con cadencia alta",
      "pace": "32 km/h",
      "cooldown": "5km relajado"
    },
    "run": {
      "distance": "10km",
      "warmup": "2km trote",
      "main": "4x1km rápido",
      "pace": "4:20/km",
      "cooldown": "2km caminata"
    }
  }
};
const [newTraining, setNewTraining] = useState({
  date: '',
  swim: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
  bike: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
  run: { distance: '', warmup: '', main: '', pace: '', cooldown: '' }
});
function getDaysInMonth(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  
  // Agregar días vacíos para el primer día de la semana
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }
  
  // Agregar todos los días del mes
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
}

export default function Home() {
  const [role, setRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [copied, setCopied] = useState(false);
  const [trainings, setTrainings] = useState(trainingData); // Usamos los datos directamente

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // Eliminamos el useEffect de carga ya que usamos los datos directamente

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
    const dateStr = formatDateToKey(date);
    setSelectedDate(dateStr);
  };

  // Función para formatear la fecha como clave (YYYY-MM-DD)
  const formatDateToKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Función para formatear la fecha para mostrar
  const formatDateToDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };
  const handleAddTraining = () => {
    if (!newTraining.date) return;
    
    setTrainings(prev => ({
      ...prev,
      [newTraining.date]: {
        swim: { ...newTraining.swim },
        bike: { ...newTraining.bike },
        run: { ...newTraining.run }
      }
    }));
    
    setNewTraining({
      date: '',
      swim: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
      bike: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
      run: { distance: '', warmup: '', main: '', pace: '', cooldown: '' }
    });
  };

  const handleInputChange = (e, discipline, field) => {
    if (discipline) {
      setNewTraining(prev => ({
        ...prev,
        [discipline]: {
          ...prev[discipline],
          [field]: e.target.value
        }
      }));
    } else {
      setNewTraining(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    }
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
            <p className="text-lg">¿admin o usuario?</p>
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
          <>{role === 'admin' && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Añadir Entrenamiento</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Fecha (YYYY-MM-DD)</label>
                  <input
                    type="text"
                    value={newTraining.date}
                    onChange={(e) => handleInputChange(e, null, 'date')}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    placeholder="Ej: 2025-06-15"
                  />
                </div>
                
                {['swim', 'bike', 'run'].map(discipline => (
                  <div key={discipline} className="border border-gray-700 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      {discipline === 'swim' ? 'Nado' : discipline === 'bike' ? 'Bicicleta' : 'Correr'}
                    </h4>
                    {['distance', 'warmup', 'main', 'pace', 'cooldown'].map(field => (
                      <div key={field} className="mb-2">
                        <label className="block text-sm mb-1 capitalize">{field}:</label>
                        <input
                          type="text"
                          value={newTraining[discipline][field]}
                          onChange={(e) => handleInputChange(e, discipline, field)}
                          className="w-full p-1 rounded bg-gray-700 text-white text-sm"
                        />
                      </div>
                    ))}
                  </div>
                ))}
                
                <button
                  onClick={handleAddTraining}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Guardar Entrenamiento
                </button>
              </div>
            </div>
          )}
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
                
                const dateStr = formatDateToKey(date);
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
                  Entrenamiento para el {formatDateToDisplay(selectedDate)}
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