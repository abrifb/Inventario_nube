import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditarMovimiento.css";

const EditarMovimiento = () => {
  const [toners, setToners] = useState([]); // Lista de tóners registrados
  const [editingRow, setEditingRow] = useState(null); // Fila que se está editando
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    obtenerToners();
  }, []);

  const obtenerToners = async () => {
    try {
      const response = await axios.get("http://localhost:3000/toners");
      setToners(response.data);
    } catch (error) {
      console.error("Error al obtener tóners:", error);
      setErrorMessage("Error al cargar la lista de tóners.");
    }
  };

  const handleEditRow = (idToner) => {
    setEditingRow(idToner);
  };

  const handleInputChange = (e, idToner, field) => {
    const { value } = e.target;
    setToners((prevToners) =>
      prevToners.map((toner) =>
        toner.idToner === idToner ? { ...toner, [field]: value } : toner
      )
    );
  };

  const handleSaveRow = async (toner) => {
    const { idToner, marca, color, contenido, impresora, rut } = toner;

    if (!marca || !contenido || !impresora) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/toners/${idToner}`, {
        marca,
        color: color || null,
        contenido,
        impresora,
        rut: rut || null,
      });
      setSuccessMessage("Tóner actualizado exitosamente.");
      setEditingRow(null);
      obtenerToners();
    } catch (error) {
      console.error("Error al modificar el tóner:", error);
      setErrorMessage("Error al modificar el tóner.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-danger text-white text-center">
          <h3>Editar Tóner</h3>
        </div>
        <div className="card-body">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          <h4>Tóneres Registrados</h4>
          <table className="table table-bordered table-hover">
            <thead className="table-info">
              <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Color</th>
                <th>Contenido</th>
                <th>Impresora</th>
                <th>Proveedor (RUT)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {toners.map((toner) => (
                <tr key={toner.idToner}>
                  <td>{toner.idToner}</td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="text"
                        value={toner.marca}
                        onChange={(e) =>
                          handleInputChange(e, toner.idToner, "marca")
                        }
                      />
                    ) : (
                      toner.marca
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="text"
                        value={toner.color || ""}
                        onChange={(e) =>
                          handleInputChange(e, toner.idToner, "color")
                        }
                      />
                    ) : (
                      toner.color || "N/A"
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="number"
                        value={toner.contenido}
                        onChange={(e) =>
                          handleInputChange(e, toner.idToner, "contenido")
                        }
                      />
                    ) : (
                      toner.contenido
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="text"
                        value={toner.impresora}
                        onChange={(e) =>
                          handleInputChange(e, toner.idToner, "impresora")
                        }
                      />
                    ) : (
                      toner.impresora
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="number"
                        value={toner.rut || ""}
                        onChange={(e) =>
                          handleInputChange(e, toner.idToner, "rut")
                        }
                      />
                    ) : (
                      toner.rut || "N/A"
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleSaveRow(toner)}
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditRow(toner.idToner)}
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

export default EditarMovimiento;
