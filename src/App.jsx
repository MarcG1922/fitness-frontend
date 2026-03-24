import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTraining from "./pages/CreateTraining";
import Tips from "./pages/Tips";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
           
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <Navbar />
            <CreateTraining />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tips"
        element={
          <ProtectedRoute>
            <Navbar />
            <Tips />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;