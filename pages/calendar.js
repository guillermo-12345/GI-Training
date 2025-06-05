import { useState } from "react";
import trainings from "../data/trainings.json";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [entrenamiento, setEntrenamiento] = useState(null);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    const isoDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    setSelectedDate(isoDate);
    setEntrenamiento(trainings[isoDate] || null);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(year, month + offset);
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  const daysInMonth = getDaysInMonth(year, month);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div style={{ color: "white", backgroundColor: "#111", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Entrenamientos de Triatlón</h2>
      <h3 style={{ textAlign: "center" }}>
        {new Date(year, month).toLocaleString('es-AR', { month: 'long', year: 'numeric' })}
      </h3>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={() => changeMonth(-1)}>Mes Anterior</button>
        <button onClick={() => changeMonth(1)}>Mes Siguiente</button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
        margin: "0 auto",
        maxWidth: "350px"
      }}>
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d, i) => (
          <div key={i} style={{ fontWeight: "bold" }}>{d}</div>
        ))}
        {daysArray.map(day => {
          const date = new Date(year, month, day).toISOString().split("T")[0];
          const isSelected = selectedDate === date;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              style={{
                padding: "10px",
                backgroundColor: isSelected ? "#007bff" : "#444",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer"
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Entrenamiento para el {selectedDate.split("-").reverse().join("/")}</h3>
          {entrenamiento ? (
            <div style={{ textAlign: "left", margin: "0 auto", maxWidth: "400px" }}>
              {["swim", "bike", "run"].map(type => (
                <div key={type}>
                  <h4>{type.toUpperCase()}</h4>
                  <ul>
                    {Object.entries(entrenamiento[type]).map(([key, val]) => (
                      <li key={key}><strong>{key}:</strong> {val}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>Descanso</p>
          )}
        </div>
      )}
    </div>
  );
}
