import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateTraining() {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  const token = localStorage.getItem("token");

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!type) {
      alert("Por favor, ingresa el tipo de entrenamiento");
      return;
    }

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

      setType("");
      setNotes("");

      alert("Entrenamiento creado correctamente");
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Error al crear entrenamiento");
    }
  };

  return (
    <div>
      <h1>Crear Entrenamiento</h1>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Tipo (Push, Pull, Pierna...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Notas opcionales"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <br />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CreateTraining;