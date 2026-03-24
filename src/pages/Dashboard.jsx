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

  return (
    <div>
      <Navbar />

      <h1>Dashboard</h1>
      <h2>Bienvenido, {user?.name}</h2>

      <hr />

      <h3>Mis entrenamientos</h3>
      {trainings.length === 0 ? (
        <p>No tienes entrenamientos</p>
      ) : (
        trainings.map((training) => (
          <div key={training._id} style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}>
            <h4>{training.type}</h4>
            <p>{training.notes}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;