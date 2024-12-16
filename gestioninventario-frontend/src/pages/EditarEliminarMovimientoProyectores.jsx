import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditarEliminarMovimientoProyectores.css";

const EditarEliminarMovimientoProyectores = () => {
  const [proyectores, setProyectores] = useState([]); // Lista de proyectores
  const [editingRow, setEditingRow] = useState(null); // Fila en edición
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    obtenerProyectores();
  }, []);

  const obtenerProyectores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/proyectores");
      setProyectores(response.data);
    } catch (error) {
      console.error("Error al obtener proyectores:", error);
      setErrorMessage("Error al cargar la lista de proyectores.");
    }
  };

  const handleEditRow = (idProyector) => {
    setEditingRow(idProyector);
  };

  const handleInputChange = (e, idProyector, field) => {
    const { value } = e.target;
    setProyectores((prevProyectores) =>
      prevProyectores.map((proyector) =>
        proyector.idProyector === idProyector
          ? { ...proyector, [field]: value }
          : proyector
      )
    );
  };

  const handleSaveRow = async (proyector) => {
    const {
      idProyector,
      modelo,
      resolucion,
      luminosidad,
      tipoPantalla,
      rut,
    } = proyector;

    if (!modelo || !tipoPantalla) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/proyectores/${idProyector}`, {
        modelo,
        resolucion: resolucion || null,
        luminosidad: luminosidad || null,
        tipoPantalla,
        rut: rut || null,
      });
      alert("Proyector actualizado correctamente.");
      setEditingRow(null); // Salir del modo edición
      obtenerProyectores(); // Actualizar la tabla
    } catch (error) {
      console.error("Error al modificar el proyector:", error);
      alert("Error al modificar el proyector.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white text-center">
          <h3>Editar Proyectores</h3>
        </div>
        <div className="card-body">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          <table className="table table-bordered table-hover">
            <thead className="table-info">
              <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Resolución</th>
                <th>Luminosidad</th>
                <th>Tipo de Pantalla</th>
                <th>Proveedor (RUT)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectores.map((proyector) => (
                <tr key={proyector.idProyector}>
                  <td>{proyector.idProyector}</td>
                  <td>
                    {editingRow === proyector.idProyector ? (
                      <input
                        type="text"
                        value={proyector.modelo}
                        onChange={(e) =>
                          handleInputChange(e, proyector.idProyector, "modelo")
                        }
                      />
                    ) : (
                      proyector.modelo
                    )}
                  </td>
                  <td>
                    {editingRow === proyector.idProyector ? (
                      <input
                        type="text"
                        value={proyector.resolucion || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            proyector.idProyector,
                            "resolucion"
                          )
                        }
                      />
                    ) : (
                      proyector.resolucion || "N/A"
                    )}
                  </td>
                  <td>
                    {editingRow === proyector.idProyector ? (
                      <input
                        type="text"
                        value={proyector.luminosidad || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            proyector.idProyector,
                            "luminosidad"
                          )
                        }
                      />
                    ) : (
                      proyector.luminosidad || "N/A"
                    )}
                  </td>
                  <td>
                    {editingRow === proyector.idProyector ? (
                      <input
                        type="text"
                        value={proyector.tipoPantalla}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            proyector.idProyector,
                            "tipoPantalla"
                          )
                        }
                      />
                    ) : (
                      proyector.tipoPantalla
                    )}
                  </td>
                  <td>
                    {editingRow === proyector.idProyector ? (
                      <input
                        type="text"
                        value={proyector.rut || ""}
                        onChange={(e) =>
                          handleInputChange(e, proyector.idProyector, "rut")
                        }
                      />
                    ) : (
                      proyector.rut || "N/A"
                    )}
                  </td>
                  <td>
                    {editingRow === proyector.idProyector ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleSaveRow(proyector)}
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditRow(proyector.idProyector)}
                      >
                        Editar
                      </button>
                    )}
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

export default EditarEliminarMovimientoProyectores;
