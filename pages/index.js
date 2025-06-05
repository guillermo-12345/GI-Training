import { useState } from 'react';
import Head from 'next/head';

// Datos iniciales de entrenamiento
const initialTrainingData = {
  "2025-06-06": {
    swim: {
      distance: "1500m",
      warmup: "200m técnica",
      main: "4x300m fuerte",
      pace: "1:45/100m",
      cooldown: "200m suave"
    },
    bike: {
      distance: "40km",
      warmup: "5km suave",
      main: "30km con cadencia alta",
      pace: "32 km/h",
      cooldown: "5km relajado"
    },
    run: {
      distance: "10km",
      warmup: "2km trote",
      main: "4x1km rápido",
      pace: "4:20/km",
      cooldown: "2km caminata"
    }
  }
};

export default function Home() {
  // Estados principales
  const [role, setRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [copied, setCopied] = useState(false);
  const [trainings, setTrainings] = useState(initialTrainingData);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Estado para formulario de admin
  const [newTraining, setNewTraining] = useState({
    date: '',
    swim: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
    bike: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
    run: { distance: '', warmup: '', main: '', pace: '', cooldown: '' }
  });
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const handleAdminClick = () => {
    setShowAdminAuth(true);
  };

  const handleAdminAuth = () => {
    if (adminPassword === 'admin123') {
      setRole('admin');
      setShowAdminAuth(false);
      setAdminPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };
  // Funciones auxiliares
  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDateToKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateToDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Handlers
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSelectedDate('');
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(formatDateToKey(date));
  };

  const handleAddTraining = () => {
    if (!newTraining.date || !/^\d{4}-\d{2}-\d{2}$/.test(newTraining.date)) {
      alert('Formato de fecha inválido. Use YYYY-MM-DD');
      return;
    }
    
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
    const value = e.target.value;
    
    if (discipline) {
      setNewTraining(prev => ({
        ...prev,
        [discipline]: { ...prev[discipline], [field]: value }
      }));
    } else {
      setNewTraining(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    const message = `Entrenamiento del ${selectedDate}: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Renderizado
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  return (
    <div className="min-h-screen p-6 text-white bg-cover bg-center" style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/logo.png')"
    }}>
      <Head>
        <title>Entrenamientos Triatlón</title>
      </Head>

      <div className="max-w-3xl mx-auto bg-opacity-10 rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Hola Melgarin 👋</h1>

        {!role ? (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-white mb-2">Papushin</h2>
      <p className="text-lg text-gray-300">¿Eres admin o usuario?</p>
      
      {showAdminAuth ? (
        <div className="flex flex-col items-center gap-4 mt-4">
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Ingresa la contraseña"
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <button
              onClick={handleAdminAuth}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Verificar
            </button>
            <button
              onClick={() => {
                setShowAdminAuth(false);
                setAdminPassword('');
              }}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={handleAdminClick}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105"
          >
            <span className="font-bold text-lg">Admin</span>
          </button>
          <button
            onClick={() => setRole('usuario')}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-lg hover:from-green-700 hover:to-green-900 transition-all transform hover:scale-105"
          >
            <span className="font-bold text-lg">Usuario</span>
          </button>
        </div>
      )}
    </div>
  ) : (
          <>
            {role === 'admin' && (
              <AdminPanel 
                newTraining={newTraining}
                handleInputChange={handleInputChange}
                handleAddTraining={handleAddTraining}
              />
            )}

            <CalendarView
              currentDate={currentDate}
              changeMonth={changeMonth}
              daysInMonth={daysInMonth}
              trainings={trainings}
              selectedDate={selectedDate}
              handleDateClick={handleDateClick}
            />

            {selectedDate && (
              <TrainingDetails
                selectedDate={selectedDate}
                trainings={trainings}
                formatDateToDisplay={formatDateToDisplay}
                handleShare={handleShare}
                handleCopy={handleCopy}
                copied={copied}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Componentes secundarios
function RoleSelector({ setRole }) {
  return (
    <div className="text-center space-y-4">
      <p className="text-lg">¿Eres admin o usuario?</p>
      <div className="flex justify-center gap-4">
        <button onClick={() => setRole('admin')} className="btn-admin">
          Admin
        </button>
        <button onClick={() => setRole('usuario')} className="btn-user">
          Usuario
        </button>
      </div>
    </div>
  );
}

function AdminPanel({ newTraining, handleInputChange, handleAddTraining }) {
  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Añadir Entrenamiento</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Fecha (YYYY-MM-DD)</label>
          <input
            type="text"
            value={newTraining.date}
            onChange={(e) => handleInputChange(e, null, 'date')}
            className="input-field"
            placeholder="Ej: 2025-06-15"
          />
        </div>
        
        {['swim', 'bike', 'run'].map(discipline => (
          <DisciplineForm 
            key={discipline}
            discipline={discipline}
            data={newTraining[discipline]}
            handleInputChange={handleInputChange}
          />
        ))}
        
        <button onClick={handleAddTraining} className="btn-save">
          Guardar Entrenamiento
        </button>
      </div>
    </div>
  );
}

function DisciplineForm({ discipline, data, handleInputChange }) {
  const labels = {
    swim: 'Nado',
    bike: 'Bicicleta',
    run: 'Correr'
  };

  return (
    <div className="border border-gray-700 p-3 rounded-lg">
      <h4 className="font-semibold mb-2">{labels[discipline]}</h4>
      {['distance', 'warmup', 'main', 'pace', 'cooldown'].map(field => (
        <div key={field} className="mb-2">
          <label className="block text-sm mb-1 capitalize">{field}:</label>
          <input
            type="text"
            value={data[field]}
            onChange={(e) => handleInputChange(e, discipline, field)}
            className="input-field-sm"
          />
        </div>
      ))}
    </div>
  );
}

function CalendarView({ currentDate, changeMonth, daysInMonth, trainings, selectedDate, handleDateClick }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Entrenamientos de Triatlón</h2>
      
      <div className="flex justify-between items-center mb-4 px-4">
        <button onClick={() => changeMonth(-1)} className="btn-month">
          &lt; Mes Anterior
        </button>
        <h3 className="text-lg font-semibold">
          {currentDate.toLocaleString('es-AR', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => changeMonth(1)} className="btn-month">
          Mes Siguiente &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center mb-6">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="font-semibold">{day}</div>
        ))}

        {daysInMonth.map((date, index) => (
          <CalendarDay 
            key={date ? date.toISOString() : `empty-${index}`}
            date={date}
            trainings={trainings}
            selectedDate={selectedDate}
            handleDateClick={handleDateClick}
          />
        ))}
      </div>
    </>
  );
}

function CalendarDay({ date, trainings, selectedDate, handleDateClick }) {
  if (!date) return <div />;
  
  const dateStr = date.toISOString().split('T')[0];
  const isSelected = selectedDate === dateStr;
  const hasTraining = trainings[dateStr];

  return (
    <button
      onClick={() => handleDateClick(date)}
      className={`day-button ${isSelected ? 'selected' : hasTraining ? 'has-training' : 'no-training'}`}
    >
      {date.getDate()}
    </button>
  );
}

function TrainingDetails({ selectedDate, trainings, formatDateToDisplay, handleShare, handleCopy, copied }) {
  const training = trainings[selectedDate];
  const labels = {
    swim: 'Nado',
    bike: 'Bicicleta',
    run: 'Correr'
  };

  return (
    <div className="training-details">
      <h3>Entrenamiento para el {formatDateToDisplay(selectedDate)}</h3>
      
      {training ? (
        <ul className="training-list">
          {['swim', 'bike', 'run'].map(discipline => (
            training[discipline] && (
              <li key={discipline}>
                <strong>{labels[discipline]}:</strong>
                {Object.entries(training[discipline]).map(([key, val]) => (
                  <div key={key}>{key}: {val}</div>
                ))}
              </li>
            )
          ))}
        </ul>
      ) : (
        <p className="rest-day">Descanso</p>
      )}

      <div className="action-buttons">
        <button onClick={handleShare} className="btn-share">
          Compartir por WhatsApp
        </button>
        <button onClick={handleCopy} className="btn-copy">
          {copied ? 'Copiado ✔️' : 'Copiar enlace'}
        </button>
      </div>
    </div>
  );
}

// Estilos (puedes moverlos a CSS modules o a un archivo aparte)
const styles = `
  .btn-admin { background-color: #2563eb; }
  .btn-user { background-color: #16a34a; }
  .btn-month, .btn-save, .btn-share, .btn-copy { 
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: white;
    transition: background-color 0.2s;
  }
  .btn-month { background-color: #374151; }
  .btn-month:hover { background-color: #4b5563; }
  .btn-save { background-color: #2563eb; }
  .btn-save:hover { background-color: #1d4ed8; }
  .btn-share { background-color: #16a34a; }
  .btn-share:hover { background-color: #15803d; }
  .btn-copy { background-color: #374151; }
  .btn-copy:hover { background-color: #4b5563; }
  .input-field, .input-field-sm {
    background-color: #374151;
    color: white;
    border-radius: 0.25rem;
  }
  .input-field { padding: 0.5rem; width: 100%; }
  .input-field-sm { padding: 0.25rem; width: 100%; font-size: 0.875rem; }
  .day-button {
    padding: 0.5rem;
    border-radius: 0.75rem;
    transition: all 0.2s;
  }
  .selected { background-color: #2563eb; color: white; }
  .has-training { background-color: #16a34a; color: white; }
  .has-training:hover { background-color: #15803d; }
  .no-training { background-color: rgba(55, 65, 81, 0.5); color: #d1d5db; }
  .no-training:hover { background-color: #4b5563; }
  .training-details {
    background: rgba(59, 130, 246, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 0.75rem;
    padding: 1.5rem;
    color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  .training-list {
    list-style-type: disc;
    padding-left: 1.25rem;
    text-align: left;
    margin-top: 0.5rem;
  }
  .rest-day { text-align: center; font-size: 1.125rem; }
  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: center;
  }
`;

// Añadir estilos al documento
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}