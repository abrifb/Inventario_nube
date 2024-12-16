import React, { useState, useEffect } from "react";
import "../styles/IngresarTonner.css";

const IngresarTonner = () => {
  const [tonners, setTonners] = useState([]); // Lista de tóners
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

    // Cargar tóners al iniciar
    const fetchTonners = async () => {
      try {
        const response = await fetch("http://localhost:3000/toners");
        if (!response.ok) throw new Error("Error al obtener tóners");
        const data = await response.json();
        setTonners(data);
      } catch (error) {
        console.error("Error al cargar tóners:", error);
        setErrorMessage("Error al cargar la lista de tóners.");
      }
    };

    fetchProveedores();
    fetchTonners();
  }, []);

  const handleAddTonner = async (e) => {
    e.preventDefault();

    const marca = e.target.marca.value;
    const color = e.target.color.value;
    const contenido = parseFloat(e.target.contenido.value);
    const impresora = e.target.impresora.value;
    const rut = e.target.rut.value;

    if (!marca || !contenido || !impresora || !rut) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const nuevoToner = {
      marca,
      color: color || null,
      contenido,
      impresora,
      rut,
    };

    try {
      const response = await fetch("http://localhost:3000/toners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoToner),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.error || "Error al agregar el tóner.");
        return;
      }

      const data = await response.json();
      setTonners([...tonners, nuevoToner]);
      setSuccessMessage("Tóner agregado correctamente.");
      e.target.reset();
    } catch (error) {
      console.error("Error al agregar tóner:", error);
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="container mt-5 ingresar-tonner-container">
      <div className="card shadow">
        <div className="card-header bg-success text-white text-center">
          <h3>Ingreso de Tóner al Inventario</h3>
        </div>
        <div className="card-body">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

          <form id="ingresoForm" onSubmit={handleAddTonner}>
            <div className="mb-3">
              <label htmlFor="marca" className="form-label">
                Marca
              </label>
              <input
                type="text"
                className="form-control"
                id="marca"
                name="marca"
                placeholder="Ingrese la marca del tóner"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                placeholder="Ingrese el color del tóner (opcional)"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contenido" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                className="form-control"
                id="contenido"
                name="contenido"
                placeholder="Ingrese la cantidad"
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="impresora" className="form-label">
                Impresora Compatible
              </label>
              <input
                type="text"
                className="form-control"
                id="impresora"
                name="impresora"
                placeholder="Ingrese la impresora compatible"
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
        <h4>Lista de Tóners Disponibles</h4>
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Color</th>
              <th>Cantidad</th>
              <th>Impresora</th>
              <th>Proveedor</th>
            </tr>
          </thead>
          <tbody>
            {tonners.map((tonner) => (
              <tr key={tonner.idToner}>
                <td>{tonner.idToner}</td>
                <td>{tonner.marca}</td>
                <td>{tonner.color || "N/A"}</td>
                <td>{tonner.contenido}</td>
                <td>{tonner.impresora}</td>
                <td>{tonner.rut || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngresarTonner;
