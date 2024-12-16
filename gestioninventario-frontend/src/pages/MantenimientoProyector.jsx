import React, { useState } from "react";
import "../styles/MantenimientoProyector.css";

const MantenimientoProyector = () => {
  const [mantenimientos, setMantenimientos] = useState([
    {
      fecha: "2024-10-01",
      descripcion: "Limpieza general",
      tipoMantenimiento: "Limpieza",
    },
    {
      fecha: "2024-10-15",
      descripcion: "Cambio de lámpara",
      tipoMantenimiento: "Reparación",
    },
    {
      fecha: "2024-11-01",
      descripcion: "Revisión de conectores",
      tipoMantenimiento: "Inspección",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const nuevoMantenimiento = {
      fecha: formData.get("fecha"),
      descripcion: formData.get("descripcion"),
      tipoMantenimiento: formData.get("tipoMantenimiento"),
    };

    if (nuevoMantenimiento.fecha && nuevoMantenimiento.descripcion && nuevoMantenimiento.tipoMantenimiento) {
      setMantenimientos((prevMantenimientos) => [
        ...prevMantenimientos,
        nuevoMantenimiento,
      ]);
      e.target.reset();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-warning text-white text-center">
          <h3>Mantenimiento de Proyector</h3>
        </div>
        <div className="card-body">
          <form id="mantenimientoProyectorForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">
                Fecha
              </label>
              <input type="date" className="form-control" id="fecha" name="fecha" required />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                placeholder="Descripción del mantenimiento"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipoMantenimiento" className="form-label">
                Tipo de Mantenimiento
              </label>
              <input
                type="text"
                className="form-control"
                id="tipoMantenimiento"
                name="tipoMantenimiento"
                placeholder="Ej. Limpieza, Reparación"
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="reset" className="btn btn-secondary me-2">
                Limpiar
              </button>
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h4>Mantenimientos Registrados</h4>
        <table className="table table-bordered table-hover">
          <thead className="table-warning">
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Tipo de Mantenimiento</th>
            </tr>
          </thead>
          <tbody>
            {mantenimientos.map((mantenimiento, index) => (
              <tr key={index}>
                <td>{mantenimiento.fecha}</td>
                <td>{mantenimiento.descripcion}</td>
                <td>{mantenimiento.tipoMantenimiento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MantenimientoProyector;
