import { useState, useEffect } from 'react';
import Head from 'next/head';

// Datos iniciales de entrenamiento
const initialTrainingData = {
  "2025-06-07": {
 "run": {
   "distance": "45 minutos",
   "warmup": "15 minutos fácil",
   "main": "3 series de (8 minutos a ritmo cómodo, 2 minutos caminando)",
   "pace": "RPE 60-70% (puedes hablar con oraciones completas)",
   "cooldown": "10 minutos caminando/trote muy suave"
 },
 "swim": {
   "distance": "800 metros",
   "warmup": "200 metros estilo libre fácil",
   "main": "4 x 100 metros (descanso 20 segundos entre series)",
   "pace": "Ritmo moderado, enfócate en técnica",
   "cooldown": "100 metros estilo libre muy suave"
 },
 "bike": null,
 "notes": "Entrenamiento de ajuste - mantener intensidad moderada"
},
 
   "2025-06-09": {
     "swim": {
       "distance": "1200m",
       "warmup": "200m elección, 100m patada",
       "main": "2x (300m nado fácil con pull en 15\" descanso, 100m patada fácil en 10\" descanso)",
       "pace": "RPE 50-60%",
       "cooldown": "100m fácil"
     },
     "run": null,
     "bike": null
   },
   "2025-06-10": {
     "run": {
       "distance": "35'",
       "warmup": "15' fácil",
       "main": "6x 30\" esfuerzo fuerte en cuesta (60\" trote/caminata fácil entre repeticiones)",
       "pace": "RPE 85-90%",
       "cooldown": "11' fácil"
     },
     "swim": null,
     "bike": null
   },
   "2025-06-11": {
     "swim": {
       "distance": "1500m",
       "warmup": "200m elección, 8x25m (descanso 10\" descendiendo 1-4, más rápido)",
       "main": "8x50m rápido (30\" descanso), 100m fácil, 2x200m nado fácil con pull (30\" descanso)",
       "pace": "Variado",
       "cooldown": "100m elección"
     },
     "run": null,
     "bike": null
   },
   "2025-06-12": {
     "bike": {
       "distance": "1 hora",
       "warmup": "30' fácil",
       "main": "5x (1' esfuerzo fuerte en cuesta, 2' fácil)",
       "pace": "RPE 85-90%",
       "cooldown": "15' fácil"
     },
     "swim": null,
     "run": null
   },
   "2025-06-13": {
     "swim": null,
     "run": null,
     "bike": null,
     "notes": "Día de descanso"
   },
   "2025-06-14": {
     "run": {
       "distance": "1 hora",
       "warmup": "20' fácil",
       "main": "2x (25' a ritmo de carrera objetivo, 5' fácil)",
       "pace": "RPE 65-75%",
       "cooldown": "10' fácil"
     },
     "swim": {
       "distance": "30' en aguas abiertas",
       "warmup": "5' fácil varios estilos",
       "main": "2x (10' a ritmo de carrera, 30\" descanso)",
       "pace": "RPE 65-75%",
       "cooldown": "5' fácil varios estilos"
     },
     "bike": null
   },
   "2025-06-15": {
     "run": {
       "distance": "10'",
       "warmup": null,
       "main": "Simulación de carrera",
       "pace": "RPE 65-75%",
       "cooldown": null
     },
     "bike": null,
     "swim": null
   },
   "2025-06-16": {
     "swim": {
       "distance": "1500m",
       "warmup": "200m elección, 100m patada",
       "main": "2x (400m nado fácil con pull en 15\" descanso, 100m patada fácil en 10\" descanso)",
       "pace": "RPE 50-60%",
       "cooldown": "200m fácil"
     },
     "run": null,
     "bike": null
   },
   "2025-06-17": {
     "run": {
       "distance": "40'",
       "warmup": "15' fácil",
       "main": "8x 30\" esfuerzo fuerte en cuesta (60\" trote/caminata fácil entre repeticiones)",
       "pace": "RPE 85-90%",
       "cooldown": "13' fácil"
     },
     "swim": null,
     "bike": null
   },
   "2025-06-18": {
     "swim": {
       "distance": "1600m",
       "warmup": "100m elección, 100m patada, 100m crol",
       "main": "10x50m rápido (30\" descanso), 100m fácil, 2x300m nado fácil con pull (30\" descanso)",
       "pace": "Variado",
       "cooldown": "100m elección"
     },
     "run": null,
     "bike": null
   },
   "2025-06-19": {
     "bike": {
       "distance": "1 hora",
       "warmup": "30' fácil",
       "main": "4x (2' esfuerzo fuerte en cuesta, 3' fácil)",
       "pace": "RPE 85-90%",
       "cooldown": "10' fácil"
     },
     "swim": null,
     "run": null
   },
   "2025-06-20": {
     "swim": null,
     "run": null,
     "bike": null,
     "notes": "Día de descanso"
   },
   "2025-06-21": {
     "run": {
       "distance": "1 hora 15'",
       "warmup": "20' fácil",
       "main": "2x (40' a ritmo de carrera objetivo, 5' fácil)",
       "pace": "RPE 65-75%",
       "cooldown": "10' fácil"
     },
     "bike": {
       "distance": "2 horas 15'",
       "warmup": null,
       "main": "Bici/Carrera combinada",
       "pace": "RPE 65-75%",
       "cooldown": null
     },
     "swim": {
       "distance": "40' en aguas abiertas",
       "warmup": "5' fácil varios estilos",
       "main": "3x (8' a ritmo de carrera, 30\" descanso)",
       "pace": "RPE 65-75%",
       "cooldown": "5' fácil varios estilos"
     }
   },
   "2025-06-22": {
     "run": {
       "distance": "10'",
       "warmup": null,
       "main": "Simulación de carrera",
       "pace": "RPE 65-75%",
       "cooldown": null
     },
     "bike": null,
     "swim": null
   }
 }

export default function Home() {
  // Estados principales
  const [role, setRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [copied, setCopied] = useState(false);
  const [trainings, setTrainings] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Estado para formulario de admin
  const [newTraining, setNewTraining] = useState({
    date: '',
    swim: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
    bike: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
    run: { distance: '', warmup: '', main: '', pace: '', cooldown: '' }
  });
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Cargar datos iniciales
  useEffect(() => {
    const loadTrainings = async () => {
      try {
        // Intenta cargar datos externos primero
        const response = await fetch('/data/trainings.json');
        const externalData = await response.json();
        
        // Combina con datos iniciales (los externos tienen prioridad)
        setTrainings({
          ...initialTrainingData,
          ...externalData
        });
      } catch (error) {
        console.log("Usando datos iniciales (error al cargar JSON externo)");
        setTrainings(initialTrainingData);
      } finally {
        setLoading(false);
      }
    };

    loadTrainings();
  }, []);

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

  const handleAddTraining = () => {
    if (!newTraining.date || !/^\d{4}-\d{2}-\d{2}$/.test(newTraining.date)) {
      alert('Formato de fecha inválido. Use YYYY-MM-DD');
      return;
    }
    
    const updatedTrainings = {
      ...trainings,
      [newTraining.date]: {
        swim: { ...newTraining.swim },
        bike: { ...newTraining.bike },
        run: { ...newTraining.run }
      }
    };
    
    setTrainings(updatedTrainings);
    
    // Reset form
    setNewTraining({
      date: '',
      swim: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
      bike: { distance: '', warmup: '', main: '', pace: '', cooldown: '' },
      run: { distance: '', warmup: '', main: '', pace: '', cooldown: '' }
    });
    
    alert('Entrenamiento guardado correctamente');
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
    const message = `Entrenamiento del ${formatDateToDisplay(selectedDate)}: ${url}`;
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Cargando entrenamientos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 text-white bg-cover bg-center bg-gray-900">
      <Head>
        <title>Entrenamientos Triatlón</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="max-w-3xl mx-auto bg-gray-800 bg-opacity-80 rounded-xl p-4 md:p-6 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Hola Melgarin 👋</h1>

        {!role ? (
          <div className="text-center space-y-4">
            <p className="text-md md:text-lg text-gray-300">¿Eres admin o usuario?</p>
            
            {showAdminAuth ? (
              <div className="flex flex-col items-center gap-4 mt-4">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  className="px-4 py-2 w-full max-w-xs rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-6">
                <button
                  onClick={handleAdminClick}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105"
                >
                  <span className="font-bold">Admin</span>
                </button>
                <button
                  onClick={() => setRole('usuario')}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-lg hover:from-green-700 hover:to-green-900 transition-all transform hover:scale-105"
                >
                  <span className="font-bold">Usuario</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {role === 'admin' && (
              <div className="mt-4 mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Añadir Entrenamiento</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Fecha (YYYY-MM-DD)</label>
                    <input
                      type="text"
                      value={newTraining.date}
                      onChange={(e) => handleInputChange(e, null, 'date')}
                      className="w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: 2025-06-15"
                    />
                  </div>
                  
                  {['swim', 'bike', 'run'].map(discipline => (
                    <div key={discipline} className="border border-gray-600 p-3 rounded-lg">
                      <h4 className="font-semibold mb-3">
                        {discipline === 'swim' ? 'Natación' : 
                         discipline === 'bike' ? 'Ciclismo' : 'Carrera'}
                      </h4>
                      {['distance', 'warmup', 'main', 'pace', 'cooldown'].map(field => (
                        <div key={field} className="mb-3">
                          <label className="block text-sm mb-1 capitalize">{field}:</label>
                          <input
                            type="text"
                            value={newTraining[discipline][field]}
                            onChange={(e) => handleInputChange(e, discipline, field)}
                            className="w-full p-2 rounded bg-gray-600 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  
                  <button
                    onClick={handleAddTraining}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Guardar Entrenamiento
                  </button>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Entrenamientos de Triatlón</h2>
              
              <div className="flex justify-between items-center mb-4 px-2">
                <button 
                  onClick={() => changeMonth(-1)}
                  className="px-3 py-1 md:px-4 md:py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm md:text-base"
                >
                  &lt; Anterior
                </button>
                <h3 className="text-lg font-semibold mx-2 text-center">
                  {currentDate.toLocaleString('es-AR', { 
                    month: 'long', 
                    year: 'numeric' 
                  }).replace(/^\w/, c => c.toUpperCase())}
                </h3>
                <button 
                  onClick={() => changeMonth(1)}
                  className="px-3 py-1 md:px-4 md:py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm md:text-base"
                >
                  Siguiente &gt;
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-xs sm:text-sm mb-4">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                  <div key={day} className="font-semibold p-1 text-center truncate">
                    {day}
                  </div>
                ))}
                
                {daysInMonth.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="p-1" />;
                  }
                  
                  const dateStr = formatDateToKey(date);
                  const isSelected = selectedDate === dateStr;
                  const hasTraining = trainings[dateStr];
                  
                  return (
                    <button
                      key={dateStr}
                      onClick={() => handleDateClick(date)}
                      className={`p-1 sm:p-2 rounded-lg text-center transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : hasTraining
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <div className="bg-blue-900 bg-opacity-70 rounded-lg p-4 md:p-6 backdrop-blur-sm">
                <h3 className="text-lg md:text-xl font-semibold mb-3">
                  Entrenamiento para el {formatDateToDisplay(selectedDate)}
                </h3>
                
                {trainings[selectedDate] ? (
                  <div className="space-y-4">
                    {['swim', 'bike', 'run'].map(discipline => (
                      trainings[selectedDate][discipline] && (
                        <div key={discipline} className="bg-gray-800 bg-opacity-80 p-3 rounded-lg">
                          <h4 className="font-medium text-blue-300 mb-2">
                            {discipline === 'swim' ? '🏊 Natación' : 
                             discipline === 'bike' ? '🚴 Ciclismo' : '🏃 Carrera'}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {Object.entries(trainings[selectedDate][discipline]).map(([key, val]) => (
                              <div key={key} className="flex items-start">
                                <span className="font-medium text-gray-300 w-24 sm:w-28">
                                  {key === 'distance' ? 'Distancia:' :
                                   key === 'warmup' ? 'Calentamiento:' :
                                   key === 'main' ? 'Serie principal:' :
                                   key === 'pace' ? 'Ritmo:' : 'Enfriamiento:'}
                                </span>
                                <span className="flex-1">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-800 bg-opacity-50 rounded-lg">
                    <p className="text-lg text-gray-300">Día de descanso</p>
                    <p className="text-sm text-gray-400 mt-1">Aprovecha para recuperar</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button 
                    onClick={handleShare}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2"
                  >
                    <span>WhatsApp</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29 3.617c-.545 1.514-1.656 2.813-3.172 3.402-1.204.468-2.355.416-3.114.049-1.168-.565-1.923-2.117-2.003-2.297-.08-.18-.688-1.655-.334-3.162.354-1.506 1.347-2.591 1.684-2.9.337-.31.896-.403 1.224-.22.326.183.495.5.578.694.082.193.164.455.062.792-.102.338-.369.98-.506 1.255-.136.276-.273.318-.506.198-.232-.12-.974-.359-1.856-1.144-.693-.627-1.16-1.434-1.295-1.677-.135-.242-.015-.373.102-.492.106-.107.232-.272.348-.407.115-.136.154-.232.231-.386.078-.155.039-.289-.019-.405-.058-.117-.529-1.273-.735-1.747-.204-.472-.408-.407-.529-.416-.122-.008-.26-.01-.396-.01-.136 0-.357.05-.543.24-.186.19-.711.695-.711 1.695 0 1 .709 2.106.809 2.248.1.142 1.38 2.312 3.342 3.26.478.232.852.371 1.143.465.478.154.913.133 1.256.08.342-.053 1.054-.432 1.203-.854.149-.422.149-.783.104-.854-.045-.07-.186-.132-.396-.232z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <span>Copiado</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Copiar enlace</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      </>
                    )}
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