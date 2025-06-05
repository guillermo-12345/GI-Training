import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [training, setTraining] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const datos = JSON.parse(localStorage.getItem("trainings") || "{}");
      const fecha = selectedDate.toISOString().split("T")[0];
      setTraining(datos[fecha]);
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Calendario de Entrenamientos</h1>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      {training ? (
        <div
          className={`mt-4 p-4 rounded shadow-lg ${
            training.tipo === "Ciclismo"
              ? "bg-yellow-200"
              : training.tipo === "Running"
              ? "bg-green-200"
              : training.tipo === "Natación"
              ? "bg-blue-200"
              : "bg-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold">{training.tipo}</h2>
          <p>{training.descripcion}</p>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">No hay entrenamiento cargado.</p>
      )}
    </div>
  );
}

