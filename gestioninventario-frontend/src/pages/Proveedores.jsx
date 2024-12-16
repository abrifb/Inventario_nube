import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Proveedores.css";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]); // Lista de proveedores
  const [form, setForm] = useState({
    rut_proveedor: "",
    digito_verificador: "",
    nombre: "",
    direccion: "",
    comuna: "",
    region: "",
    telefono: "",
    email: "",
    tipo: 0, // Valores numéricos: 0 = Toner, 1 = Proyector
  });
  const [isEditing, setIsEditing] = useState(false); // Estado para editar

  // Obtener todos los proveedores al cargar el componente
  useEffect(() => {
    obtenerProveedores();
  }, []);

  const obtenerProveedores = () => {
    axios
      .get("http://localhost:3000/proveedores")
      .then((response) => setProveedores(response.data))
      .catch((error) =>
        console.error("Error al obtener proveedores:", error)
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "tipo" ? parseInt(value, 10) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar un proveedor existente
      axios
        .put(`http://localhost:3000/proveedores/${form.rut_proveedor}`, form)
        .then(() => {
          alert("Proveedor actualizado correctamente");
          obtenerProveedores();
          resetForm();
        })
        .catch((error) =>
          console.error("Error al actualizar proveedor:", error)
        );
    } else {
      // Agregar un nuevo proveedor
      axios
        .post("http://localhost:3000/proveedores", form)
        .then(() => {
          alert("Proveedor agregado correctamente");
          obtenerProveedores();
          resetForm();
        })
        .catch((error) =>
          console.error("Error al agregar proveedor:", error)
        );
    }
  };

  const handleEdit = (proveedor) => {
    setForm(proveedor);
    setIsEditing(true);
  };

  const handleDelete = (rut_proveedor) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      axios
        .delete(`http://localhost:3000/proveedores/${rut_proveedor}`)
        .then(() => {
          alert("Proveedor eliminado correctamente");
          obtenerProveedores();
        })
        .catch((error) =>
          console.error("Error al eliminar proveedor:", error)
        );
    }
  };

  const resetForm = () => {
    setForm({
      rut_proveedor: "",
      digito_verificador: "",
      nombre: "",
      direccion: "",
      comuna: "",
      region: "",
      telefono: "",
      email: "",
      tipo: 0, // Resetear a Toner (0)
    });
    setIsEditing(false);
  };

  return (
    <div className="proveedores-container">
      <h1>Gestión de Proveedores</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="rut_proveedor"
          placeholder="RUT"
          value={form.rut_proveedor}
          onChange={handleChange}
          required
          disabled={isEditing} // Deshabilitar RUT al editar
        />
        <input
          type="text"
          name="digito_verificador"
          placeholder="Dígito Verificador"
          value={form.digito_verificador}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="comuna"
          placeholder="Comuna"
          value={form.comuna}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="region"
          placeholder="Región"
          value={form.region}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
        >
          <option value={0}>Toner</option>
          <option value={1}>Proyector</option>
        </select>
        <button type="submit">
          {isEditing ? "Actualizar" : "Agregar"}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>RUT</th>
            <th>Dígito Verificador</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Comuna</th>
            <th>Región</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.rut_proveedor}>
              <td>{proveedor.rut_proveedor}</td>
              <td>{proveedor.digito_verificador}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.direccion}</td>
              <td>{proveedor.comuna}</td>
              <td>{proveedor.region}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.email}</td>
              <td>{proveedor.tipo === 0 ? "Toner" : "Proyector"}</td>
              <td>
                <button onClick={() => handleEdit(proveedor)}>Editar</button>
                <button onClick={() => handleDelete(proveedor.rut_proveedor)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proveedores;
