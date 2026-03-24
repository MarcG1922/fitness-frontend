import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create">Crear Entrenamiento</Link>
      <Link to="/tips">Tips</Link>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  );
}

export default Navbar;