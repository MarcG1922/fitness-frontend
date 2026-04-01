import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function CreateTraining() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedDay = queryParams.get("day");

  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");

  const token = localStorage.getItem("token");

  const dayToDate = (dayName) => {
    if (!dayName) return new Date();
    const today = new Date();
    const todayDay = today.getDay();
    const days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const targetDay = days.indexOf(dayName);
    let diff = targetDay - todayDay;
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + diff);
    return targetDate;
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/trainings",
        {
          type,
          notes,
          exercises: [],
          date: date || dayToDate(selectedDay)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Navbar />

      <h1>Crear Entrenamiento</h1>

      {selectedDay && (
        <p>Entrenamiento para: <strong>{selectedDay}</strong></p>
      )}

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Ejercicio (Prensa, Curl, etc.)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Repes, series, peso, etc."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CreateTraining;