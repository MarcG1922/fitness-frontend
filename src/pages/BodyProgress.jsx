import { useState, useEffect } from "react";
import api from "../api/axios";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

function BodyProgress() {
  const [weights, setWeights] = useState([]);
  const [weightInput, setWeightInput] = useState("");
  const token = localStorage.getItem("token");

  const fetchWeights = async () => {
    try {
      const { data } = await api.get("/weights", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWeights(data);
    } catch (error) {
      console.log("Error al obtener pesos:", error);
    }
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  const handleAddWeight = async () => {
    if (!weightInput) return;
    try {
      await api.post(
        "/weights",
        { weight: Number(weightInput) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWeightInput("");
      fetchWeights();
    } catch (error) {
      console.log("Error al registrar peso:", error);
    }
  };

  const chartData = weights.map(w => ({
    date: new Date(w.date).toLocaleDateString(),
    weight: w.weight
  }));

  return (
    <div className="container">

      <h1>Progreso de peso corporal</h1>

      <div className="card" style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Introduce tu peso (kg)"
          value={weightInput}
          onChange={e => setWeightInput(e.target.value)}
        />
        <button onClick={handleAddWeight}>Registrar peso</button>
      </div>

      <div className="card">
        <h3>Gráfico de progreso</h3>
        {weights.length === 0 ? (
          <p>No hay datos aún.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default BodyProgress;