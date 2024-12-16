import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CederTonner.css";

const CederTonner = () => {
  const [tonners, setTonners] = useState([]); // Lista de tóners disponibles
  const [selectedTonner, setSelectedTonner] = useState(""); // Tóner seleccionado
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Cargar los tóners al iniciar
    const fetchTonners = async () => {
      try {
        const response = await axios.get("http://localhost:3000/toners");
        setTonners(response.data);
      } catch (error) {
        console.error("Error al obtener tóners:", error);
        setErrorMessage("Error al cargar la lista de tóners.");
      } finally {
        setLoading(false);
      }
    };

    fetchTonners();
  }, []);

  const handleCederTonner = async () => {
    if (!selectedTonner) {
      alert("Por favor, seleccione un tóner.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/toners/${selectedTonner}`);
      setSuccessMessage("Tóner cedido correctamente.");
      setTonners((prevTonners) =>
        prevTonners.filter((tonner) => tonner.idToner !== parseInt(selectedTonner))
      );
      setSelectedTonner(""); // Limpiar selección
    } catch (error) {
      console.error("Error al ceder el tóner:", error);
      setErrorMessage("Error al ceder el tóner.");
    }
  };

  if (loading) {
    return <p>Cargando tóners...</p>;
  }

  return (
    <div className="container">
      <div className="card shadow">
        <div className="card-header text-center">
          <h3>Ceder Tóner</h3>
        </div>
        <div className="card-body">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

          <div className="mb-3">
            <label htmlFor="tonnerSelect" className="form-label">
              Seleccione un tóner para ceder:
            </label>
            <select
              id="tonnerSelect"
              className="form-control"
              value={selectedTonner}
              onChange={(e) => setSelectedTonner(e.target.value)}
            >
              <option value="">Seleccione un tóner</option>
              {tonners.map((tonner) => (
                <option key={tonner.idToner} value={tonner.idToner}>
                  {`${tonner.marca} - ${tonner.color} - ${tonner.impresora} (${tonner.contenido} ml)`}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-danger w-100"
            onClick={handleCederTonner}
          >
            Ceder Tóner
          </button>
        </div>
      </div>

      <div className="row justify-content-center mt-5 tonner-list">
        <div className="col-md-10">
          <h3 className="text-center">Tóneres Disponibles</h3>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Marca</th>
                <th>Color</th>
                <th>Cantidad</th>
                <th>Impresora</th>
              </tr>
            </thead>
            <tbody>
              {tonners.map((tonner) => (
                <tr key={tonner.idToner}>
                  <td>{tonner.marca}</td>
                  <td>{tonner.color}</td>
                  <td>{tonner.contenido}</td>
                  <td>{tonner.impresora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CederTonner;
