import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

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

  const daysOfWeek = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
  const trainedDays = trainings.map(t => getDayName(t.date));

  return (
    <div className="container">
      <Navbar />

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

      <h3>Mis entrenamientos</h3>

      {trainings.length === 0 ? (
        <p>No tienes entrenamientos</p>
      ) : (
        trainings.map((training) => (
          <div key={training._id} className="card">
            <h4>{training.type}</h4>
            <p>{training.notes}</p>
            <p><strong>Día:</strong> {getDayName(training.date)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;