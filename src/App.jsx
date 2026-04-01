import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tips from "./pages/Tips";
import DayView from "./pages/DayView";
import BodyProgress from "./pages/BodyProgress";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./App.css";
function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/register"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

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

        <Route
          path="/body-progress"
          element={
            <ProtectedRoute>
              <BodyProgress />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;