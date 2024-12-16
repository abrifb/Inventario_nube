import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path); // Redirige a la ruta especificada
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Administración</h1>
      <button onClick={() => onLogout()} className="logout-button">
        Cerrar Sesión
      </button>
      <section>
        <div className="inventory-options">
          <div className="tonners-group">
            <h3>Tonners</h3>
            <button onClick={() => navigateTo("/ceder-tonner")}>Ceder Tonner</button>
            <button onClick={() => navigateTo("/ingresar-tonner")}>
              Ingresar Tonner a Inventario
            </button>
            <button onClick={() => navigateTo("/editar-tonner")}>
                Editar Movimiento Tonner
            </button>
          </div>

          <div className="proyectores-group">
            <h3>Proyectores</h3>
            <button onClick={() => navigateTo("/prestar-proyector")}>
              Prestar Proyector
            </button>
            <button onClick={() => navigateTo("/ingresar-proyector")}>
              Ingresar Proyector a Inventario
            </button>
            <button onClick={() => navigateTo("/editar-movimiento-proyector")}>
            Editar Movimiento de Proyectores
            </button>
          </div>

          <div className="otros-group">
            <h3>Otros</h3>
            <button onClick={() => navigateTo("/administrar-usuarios")}>
              Administrar Usuarios
            </button>
            <button onClick={() => navigateTo("/reportes")}>Reportes</button>
            <button onClick={() => navigateTo("/proveedores")}>Proveedores</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
