import React, { useState, useEffect } from "react";
import "../styles/IngresarProyector.css";

const IngresarProyector = () => {
  const [proyectores, setProyectores] = useState([]); // Lista de proyectores
  const [proveedores, setProveedores] = useState([]); // Lista de proveedores
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Cargar proveedores al iniciar
    const fetchProveedores = async () => {
      try {
        const response = await fetch("http://localhost:3000/proveedores");
        if (!response.ok) throw new Error("Error al obtener proveedores");
        const data = await response.json();
        setProveedores(data);
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
        setErrorMessage("Error al cargar la lista de proveedores.");
      }
    };

    // Cargar proyectores al iniciar
    const fetchProyectores = async () => {
      try {
        const response = await fetch("http://localhost:3000/proyectores");
        if (!response.ok) throw new Error("Error al obtener proyectores");
        const data = await response.json();
        setProyectores(data);
      } catch (error) {
        console.error("Error al cargar proyectores:", error);
        setErrorMessage("Error al cargar la lista de proyectores.");
      }
    };

    fetchProveedores();
    fetchProyectores();
  }, []);

  const handleAddProyector = async (e) => {
    e.preventDefault();

    const modelo = e.target.modelo.value;
    const resolucion = e.target.resolucion.value;
    const luminosidad = e.target.luminosidad.value;
    const tipoPantalla = e.target.tipoPantalla.value;
    const rut = e.target.rut.value;

    if (!modelo || !tipoPantalla || !rut) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const nuevoProyector = {
      modelo,
      resolucion: resolucion || null,
      luminosidad: luminosidad || null,
      tipoPantalla,
      rut,
    };

    try {
      const response = await fetch("http://localhost:3000/proyectores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProyector),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.error || "Error al agregar el proyector.");
        return;
      }

      const data = await response.json();
      setProyectores([...proyectores, { ...nuevoProyector, idProyector: data.id }]);
      setSuccessMessage("Proyector agregado correctamente.");
      e.target.reset();
    } catch (error) {
      console.error("Error al agregar proyector:", error);
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white text-center">
          <h3>Ingresar Proyector al Inventario</h3>
        </div>
        <div className="card-body">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

          <form id="ingresoForm" onSubmit={handleAddProyector}>
            <div className="mb-3">
              <label htmlFor="modelo" className="form-label">
                Modelo
              </label>
              <input
                type="text"
                className="form-control"
                id="modelo"
                name="modelo"
                placeholder="Ingrese el modelo del proyector"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="resolucion" className="form-label">
                Resolución
              </label>
              <input
                type="text"
                className="form-control"
                id="resolucion"
                name="resolucion"
                placeholder="Ej. 1920x1080 (opcional)"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="luminosidad" className="form-label">
                Luminosidad
              </label>
              <input
                type="text"
                className="form-control"
                id="luminosidad"
                name="luminosidad"
                placeholder="Ej. 3000 lúmenes (opcional)"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoPantalla" className="form-label">
                Tipo de Pantalla
              </label>
              <input
                type="text"
                className="form-control"
                id="tipoPantalla"
                name="tipoPantalla"
                placeholder="Ej. LCD, DLP"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rut" className="form-label">
                Proveedor
              </label>
              <select className="form-control" id="rut" name="rut" required>
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((proveedor) => (
                  <option
                    key={proveedor.rut_proveedor}
                    value={proveedor.rut_proveedor}
                  >
                    {proveedor.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button type="reset" className="btn btn-secondary me-2">
                Limpiar
              </button>
              <button type="submit" className="btn btn-success">
                Ingresar al Inventario
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h4>Proyectores en Inventario</h4>
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>Modelo</th>
              <th>Resolución</th>
              <th>Luminosidad</th>
              <th>Tipo de Pantalla</th>
              <th>Proveedor</th>
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
                <td>{proyector.rut || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngresarProyector;
