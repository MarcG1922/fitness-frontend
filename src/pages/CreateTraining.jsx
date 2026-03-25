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

  const token = localStorage.getItem("token");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/trainings",
        {
          type,
          notes,
          exercises: []
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
          placeholder="Tipo (Push, Pull...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Notas"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CreateTraining;