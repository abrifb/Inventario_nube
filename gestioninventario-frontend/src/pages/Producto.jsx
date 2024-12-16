import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Producto.css';

const Producto = () => {
    const initialState = {
        idProducto: null,
        nombre: '',
        descripcion: '',
        precio: '',
        stockActual: '',
        fechaIngreso: '',
        idProveedor: '',
    };

    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState(initialState);
    const [proveedores, setProveedores] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleError = (error) => {
        console.error('Error:', error);
        setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
    };

    useEffect(() => {
        obtenerProductos();
        obtenerProveedores();
    }, []);

    const obtenerProductos = () => {
        setLoading(true);
        axios.get('http://localhost:3000/productos')
            .then(response => {
                setProductos(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                handleError(error);
            });
    };

    const obtenerProveedores = () => {
        axios.get('http://localhost:3000/proveedores')
            .then(response => setProveedores(response.data))
            .catch(error => console.error('Error al obtener proveedores:', error));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.precio <= 0 || form.stockActual < 0 || !form.fechaIngreso) {
            alert('Por favor, completa correctamente los campos requeridos');
            return;
        }

        if (isEditing) {
            axios.put(`http://localhost:3000/productos/${form.idProducto}`, form)
                .then(() => {
                    alert('Producto actualizado');
                    obtenerProductos();
                    resetForm();
                })
                .catch((error) => handleError(error));
        } else {
            axios.post('http://localhost:3000/productos', form)
                .then(() => {
                    alert('Producto agregado');
                    obtenerProductos();
                    resetForm();
                })
                .catch((error) => handleError(error));
        }
    };

    const handleEdit = (producto) => {
        setForm(producto);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            axios.delete(`http://localhost:3000/productos/${id}`)
                .then(() => {
                    alert('Producto eliminado');
                    obtenerProductos();
                })
                .catch((error) => handleError(error));
        }
    };

    const resetForm = () => {
        setForm(initialState);
        setIsEditing(false);
    };

    // Buscar el nombre del proveedor por su ID
    const getNombreProveedor = (idProveedor) => {
        const proveedor = proveedores.find((prov) => prov.idProveedor === idProveedor);
        return proveedor ? proveedor.nombre : 'Desconocido';
    };

    return (
        <div>
            <h1>Gestión de Productos</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
                <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
                <input type="number" name="stockActual" placeholder="Stock Actual" value={form.stockActual} onChange={handleChange} required />
                <input type="date" name="fechaIngreso" placeholder="Fecha Ingreso" value={form.fechaIngreso} onChange={handleChange} required />
                
                <select
                    name="idProveedor"
                    value={form.idProveedor}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un proveedor</option>
                    {proveedores.map((proveedor) => (
                        <option key={proveedor.idProveedor} value={proveedor.idProveedor}>
                            {proveedor.nombre}
                        </option>
                    ))}
                </select>

                <button type="submit">{isEditing ? 'Actualizar' : 'Agregar'}</button>
                {isEditing && <button type="button" onClick={resetForm}>Cancelar</button>}
            </form>

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Fecha Ingreso</th>
                            <th>Proveedor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.idProducto}>
                                <td>{producto.idProducto}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.stockActual}</td>
                                <td>{new Date(producto.fechaIngreso).toLocaleDateString()}</td>
                                <td>{getNombreProveedor(producto.idProveedor)}</td>
                                <td>
                                    <button onClick={() => handleEdit(producto)}>Editar</button>
                                    <button onClick={() => handleDelete(producto.idProducto)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Producto;
