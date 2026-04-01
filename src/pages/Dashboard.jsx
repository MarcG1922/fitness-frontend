import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTrainings = async () => {
    try {
      const { data } = await api.get("/trainings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrainings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    return days[date.getDay()];
  };

  const getMostFrequentType = () => {
    if (trainings.length === 0) return "Ninguno";

    const count = {};
    trainings.forEach(t => {
      count[t.type] = (count[t.type] || 0) + 1;
    });

    return Object.keys(count).reduce((a, b) =>
      count[a] > count[b] ? a : b
    );
  };

  const daysOfWeek = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
  const trainedDays = trainings.map(t => getDayName(t.date));

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <h2>Bienvenido, {user?.name}</h2>

      <hr />

      <h3>Calendario semanal</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {daysOfWeek.map((day, index) => {
          const hasTraining = trainedDays.includes(day);

          return (
            <div
              key={index}
              onClick={() => navigate(`/day/${day}`)}
              style={{
                padding: "15px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: hasTraining ? "#00ff88" : "#1e1e1e",
                color: hasTraining ? "#000" : "#fff",
                minWidth: "100px",
                textAlign: "center"
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <hr />

      <h3>Resumen de actividad</h3>

      <div className="card">
        <p><strong>Total entrenamientos:</strong> {trainings.length}</p>

      <p>
  <strong>Días entrenados esta semana:</strong>{" "}
  {
    (() => {
      const today = new Date();
      const weekTrainings = trainings.filter(t => {
        const trainingDate = new Date(t.date);
        const diff = (today - trainingDate) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      });
      const uniqueDays = [...new Set(weekTrainings.map(t => new Date(t.date).toDateString()))];
      return uniqueDays.length;
    })()
  }
</p>

        <p>
          <strong>Tipo más repetido:</strong> {getMostFrequentType()}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;