import React, { useState } from "react";
import "../styles/Reportes.css";

const Reportes = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reportType: "proveedores",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadFilteredReport = () => {
    const { startDate, endDate, reportType } = formData;
    if (!startDate || !endDate || !reportType) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    alert(
      `Descargando reporte: ${reportType}\nDesde: ${startDate}\nHasta: ${endDate}`
    );

    // Aquí puedes realizar la llamada al backend para generar y descargar el reporte.
    // Ejemplo de llamada API:
    // fetch(`http://localhost:3000/reportes?startDate=${startDate}&endDate=${endDate}&reportType=${reportType}`)
    //   .then(response => response.blob())
    //   .then(blob => {
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `${reportType}-${startDate}-${endDate}.pdf`);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //   })
    //   .catch(error => console.error('Error al descargar el reporte:', error));
  };

  return (
    <div className="reportes-container">
      <header>
        <h1>Gestión de Reportes</h1>
      </header>
      <main>
        <section className="filters">
          <h2>Filtrar por Fecha</h2>
          <form id="filterForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="startDate">Fecha Inicio:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />

            <label htmlFor="endDate">Fecha Fin:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />

            <label htmlFor="reportType">Tipo de Reporte:</label>
            <select
              id="reportType"
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              required
            >
              <option value="proveedores">Listado de Proveedores</option>
              
              <option value="movimientosUsuarios">Reportes de Usuarios</option>
              <option value="movimientosInventario">
                Reportes de Movimiento Toner
              </option>
              <option value="movimientosInventario">
                Reportes de Movimiento Proyectores
              </option>
              <option value="toners">Reportes de Toners</option>
              <option value="proyectores">Reportes de Proyectores</option>
              
            </select>

            <button type="button" onClick={downloadFilteredReport}>
              Descargar Reporte
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Reportes;
