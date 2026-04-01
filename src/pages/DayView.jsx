import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";


function DayView() {
  const { day } = useParams();
  const navigate = useNavigate();

  const [trainings, setTrainings] = useState([]);
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  const token = localStorage.getItem("token");

  const days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const getDateForSelectedDay = () => {
    const today = new Date();
    const todayIndex = today.getDay();
    const selectedIndex = days.indexOf(day);

    const diff = selectedIndex - todayIndex;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);

    return targetDate;
  };

  const fetchTrainings = async () => {
    try {
      const { data } = await api.get("/trainings", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const filtered = data.filter(t => getDayName(t.date) === day);
      setTrainings(filtered);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/trainings",
        {
          type,
          notes,
          exercises: [],
          date: getDateForSelectedDay()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setType("");
      setNotes("");
      fetchTrainings();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

      <h1>{day}</h1>

      <button onClick={() => navigate("/dashboard")}>
        ← Volver al Dashboard
      </button>

      <hr />

      <h3>Entrenamientos del día</h3>

      {trainings.length === 0 ? (
        <p>No hay entrenamientos este día</p>
      ) : (
        trainings.map(training => (
          <div key={training._id} className="card">
            <h4>{training.type}</h4>
            <p>{training.notes}</p>
          </div>
        ))
      )}

      <hr />

      <h3>Añadir ejercicio</h3>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Tipo (Press, sentadilla...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="series, repeticiones, peso, etc"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Añadir</button>
      </form>
    </div>
  );
}

export default DayView;