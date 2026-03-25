import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Cuenta creada correctamente");
      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="container">
      <h1>Crear cuenta</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tienes cuenta?{" "}
        <span
          style={{ color: "#00ff88", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Inicia sesión
        </span>
      </p>
    </div>
  );
}

export default Register;