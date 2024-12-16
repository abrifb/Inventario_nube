import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import IngresarTonner from "./pages/IngresarTonner"; // Componente de ingreso de tóner (Añadido)
import Proveedores from "./pages/Proveedores";
import EditarMovimiento from "./pages/EditarMovimiento";
import CederTonner from "./pages/CederTonner";
import PrestarProyector from "./pages/PrestarProyector";
import IngresarProyector from "./pages/IngresarProyector";
import EditarEliminarMovimientoProyectores from "./pages/EditarEliminarMovimientoProyectores";
import AdministrarUsuarios from "./pages/AdministrarUsuarios";
import Reportes from "./pages/Reportes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica el token en el localStorage al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (data) => {
    setIsAuthenticated(true); // Cambiar estado a autenticado
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token del localStorage
    setIsAuthenticated(false); // Cambiar estado a no autenticado
  };

  // Ruta protegida: Solo accesible si el usuario está autenticado
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        {/* Ruta del Dashboard */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard onLogout={handleLogout} />} />}
        />
        {/* Ruta de ingreso de tóner */}
        <Route
          path="/ingresar-tonner"
          element={<ProtectedRoute element={<IngresarTonner />} />} // Ruta protegida de ingreso de tóner
        />
        {/* Ruta de PROVEEDORES */}
        <Route
          path="/proveedores"
          element={<ProtectedRoute element={<Proveedores />} />} // Ruta protegida de PROVEEDORES
        />
        {/* Ruta de editar movimiento toner */}
        <Route
          path="/editar-tonner"
          element={<ProtectedRoute element={<EditarMovimiento />} />} // Ruta protegida para ingresar tóner
        />
        {/* Ruta de ceder toner */}
        <Route
          path="/ceder-tonner"
          element={<ProtectedRoute element={<CederTonner />} />} // Ruta protegida de ceder toner
        />
        {/* Ruta de prestar proyecto */}
        <Route
          path="/prestar-proyector"
          element={<ProtectedRoute element={<PrestarProyector />} />} // Ruta protegida de prestar proyecto 
        />
        {/* Ruta de ingresar proyector */}
        <Route
          path="/ingresar-proyector"
          element={<ProtectedRoute element={<IngresarProyector />} />} // Ruta protegida de ingresar proyector
        />
        <Route
          path="/editar-movimiento-proyector"
          element={<ProtectedRoute element={<EditarEliminarMovimientoProyectores />} />} // Ruta protegida de ingresar proyector
        />
        <Route
          path="/administrar-usuarios"
          element={<ProtectedRoute element={<AdministrarUsuarios />} />} // Ruta protegida de ingresar proyector
        />
        <Route
          path="/reportes"
          element={<ProtectedRoute element={<Reportes/>} />} // Ruta protegida de ingresar proyector
        />
      </Routes>
      
    </Router>
  );
};

export default App;
