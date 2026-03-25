import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTraining from "./pages/CreateTraining";
import Tips from "./pages/Tips";
import DayView from "./pages/DayView";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Register from "./pages/Register";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />

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
            <CreateTraining />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tips"
        element={
          <ProtectedRoute>
            <Tips />
          </ProtectedRoute>
        }
      />

      <Route
        path="/day/:day"
        element={
          <ProtectedRoute>
            <DayView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;