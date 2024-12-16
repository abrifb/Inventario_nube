const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los proveedores
router.get("/", (req, res) => {
    const sql = "SELECT * FROM Proveedor";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error al obtener proveedores:", err.message);
            return res.status(500).json({ error: "Error al obtener proveedores" });
        }
        res.json(rows);
    });
});

// Agregar un nuevo proveedor
router.post("/", (req, res) => {
    const { rut_proveedor, digito_verificador, nombre, direccion, comuna, region, telefono, email, tipo } = req.body;

    // Validar campos obligatorios
    if (!rut_proveedor || !digito_verificador || !nombre || !direccion || !comuna || !region || tipo === undefined) {
        return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
    }

    // Convertir 'Toner' o 'Proyector' a 0 o 1
    const tipoNumerico = tipo === "Toner" ? 0 : 1;

    const sql = `
        INSERT INTO Proveedor (rut_proveedor, digito_verificador, nombre, direccion, comuna, region, telefono, email, tipo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            parseInt(rut_proveedor, 10),
            digito_verificador,
            nombre,
            direccion,
            comuna,
            region,
            telefono || null,
            email || null,
            tipoNumerico,
        ],
        function(err) {
            if (err) {
                console.error("Error al agregar proveedor:", err.message);
                return res.status(500).json({ error: "Error al agregar proveedor" });
            }
            res.status(201).json({
                message: "Proveedor agregado correctamente",
                id: this.lastID, // Usar this.lastID en SQLite
            });
        }
    );
});

// Actualizar un proveedor existente
router.put("/:rut_proveedor", (req, res) => {
    const { rut_proveedor } = req.params;
    const { digito_verificador, nombre, direccion, comuna, region, telefono, email, tipo } = req.body;

    if (!digito_verificador || !nombre || !direccion || !comuna || !region || tipo === undefined) {
        return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
    }

    const tipoNumerico = tipo === "Toner" ? 0 : 1;

    const sql = `
        UPDATE Proveedor 
        SET digito_verificador = ?, nombre = ?, direccion = ?, comuna = ?, region = ?, telefono = ?, email = ?, tipo = ?
        WHERE rut_proveedor = ?
    `;

    db.run(
        sql,
        [
            digito_verificador,
            nombre,
            direccion,
            comuna,
            region,
            telefono || null,
            email || null,
            tipoNumerico,
            parseInt(rut_proveedor, 10),
        ],
        function(err) {
            if (err) {
                console.error("Error al actualizar proveedor:", err.message);
                return res.status(500).json({ error: "Error al actualizar proveedor" });
            }

            if (this.changes === 0) { // Usar this.changes en SQLite
                return res.status(404).json({ error: "Proveedor no encontrado" });
            }

            res.json({ message: "Proveedor actualizado correctamente" });
        }
    );
});

// Eliminar un proveedor
router.delete("/:rut_proveedor", (req, res) => {
    const { rut_proveedor } = req.params;

    const sql = "DELETE FROM Proveedor WHERE rut_proveedor = ?";
    db.run(sql, [parseInt(rut_proveedor, 10)], function(err) {
        if (err) {
            console.error("Error al eliminar proveedor:", err.message);
            return res.status(500).json({ error: "Error al eliminar proveedor" });
        }

        if (this.changes === 0) { // Usar this.changes en SQLite
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        res.json({ message: "Proveedor eliminado correctamente" });
    });
});

module.exports = router;
