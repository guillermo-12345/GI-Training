import { useState } from 'react';

export default function HealthKitButton({ workoutData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const exportToHealthKit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Verificar si estamos en un dispositivo iOS
      if (window.webkit && window.webkit.messageHandlers) {
        // Datos del entrenamiento en formato compatible con HealthKit
        const workout = {
          activityType: 'HKWorkoutActivityTypeCycling', // Puede ser Running, Swimming, etc.
          duration: workoutData.duration,
          energyBurned: workoutData.calories,
          distance: workoutData.distance,
          startDate: new Date(),
          endDate: new Date(Date.now() + workoutData.duration * 60000)
        };

        // Enviar a la app nativa (requiere configuración adicional)
        window.webkit.messageHandlers.healthKit.postMessage(workout);
      } else {
        // Alternativa para navegador (solo para desarrollo)
        const response = await fetch('/api/healthkit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(workoutData),
        });

        if (!response.ok) throw new Error('Error al exportar');
      }
      
      alert('Entrenamiento exportado a HealthKit correctamente');
    } catch (err) {
      setError(err.message);
      console.error('Error exporting to HealthKit:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={exportToHealthKit}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
          isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Exportando...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm8 7h-1V4l5 5h-4z"/>
              <path d="M10.42 12.401a1.001 1.001 0 00-.847.47l-2.5 4.025A1 1 0 007 18h6v2H7a2.98 2.98 0 01-2.561-1.428 3 3 0 01.232-3.415l2.5-4.025a3 3 0 012.57-1.4l1.259.066V9h2v1.6a1 1 0 00.6.8l4 2a1 1 0 00.934-1.757l-2.567-1.283-1.251-.065zM19 15h-3v2h3a1 1 0 010 2h-3v2h3a3 3 0 100-6z"/>
            </svg>
            Exportar a Apple Health
          </>
        )}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}