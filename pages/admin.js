import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("Ciclismo");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  useEffect(() => {
    const clave = prompt("Ingresá la clave de administrador:");
    if (clave !== "triatlon123") {
      alert("Acceso denegado.");
      window.location.href = "/";
    }
  }, []);

  const guardarEntrenamiento = (e) => {
    e.preventDefault();

    if (!fecha || !descripcion) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    const nuevosDatos = JSON.parse(localStorage.getItem("trainings") || "{}");
    nuevosDatos[fecha] = { tipo, descripcion };
    localStorage.setItem("trainings", JSON.stringify(nuevosDatos));

    setMensaje("Entrenamiento guardado ✅");
    setFecha("");
    setDescripcion("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Panel de Administrador</h1>

      <form
        onSubmit={guardarEntrenamiento}
        className="bg-white rounded shadow p-6 w-full max-w-md space-y-4"
      >
        <div>
          <label className="block font-semibold">Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Tipo:</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Ciclismo">Ciclismo</option>
            <option value="Running">Running</option>
            <option value="Natación">Natación</option>
            <option value="Gimnasio">Gimnasio</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar
        </button>
        {mensaje && <p className="text-green-600 font-medium">{mensaje}</p>}
      </form>

      <button
        className="mt-6 text-blue-700 underline"
        onClick={() => router.push("/calendar")}
      >
        Ir al calendario
      </button>
    </div>
  );
}
