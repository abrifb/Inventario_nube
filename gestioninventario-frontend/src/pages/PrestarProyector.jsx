import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PrestarProyector.css";

const PrestarProyector = () => {
  const [proyectores, setProyectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProyectores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/proyectores");
        setProyectores(response.data);
      } catch (error) {
        console.error("Error al obtener proyectores:", error);
        setErrorMessage("Error al cargar los proyectores.");
      } finally {
        setLoading(false);
      }
    };

    fetchProyectores();
  }, []);

  const handleDelete = async (idProyector) => {
    try {
      await axios.delete(`http://localhost:3000/proyectores/${idProyector}`);
      setProyectores((prevProyectores) =>
        prevProyectores.filter((proyector) => proyector.idProyector !== idProyector)
      );
      setSuccessMessage("Proyector eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el proyector:", error);
      setErrorMessage("Error al eliminar el proyector.");
    }
  };

  if (loading) {
    return <p>Cargando proyectores...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h3>Proyectores Disponibles</h3>
        </div>
        <div className="card-body">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Resolución</th>
                <th>Luminosidad</th>
                <th>Tipo de Pantalla</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectores.map((proyector) => (
                <tr key={proyector.idProyector}>
                  <td>{proyector.idProyector}</td>
                  <td>{proyector.modelo}</td>
                  <td>{proyector.resolucion || "N/A"}</td>
                  <td>{proyector.luminosidad || "N/A"}</td>
                  <td>{proyector.tipoPantalla}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(proyector.idProyector)}
                    >
                      Ceder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrestarProyector;
