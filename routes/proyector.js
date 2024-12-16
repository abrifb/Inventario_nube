const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los proyectores
router.get("/", (req, res) => {
    const sql = "SELECT * FROM Proyector";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error al obtener proyectores:", err.message);
            return res.status(500).json({ error: "Error al obtener proyectores" });
        }
        res.json(rows);
    });
});

// Obtener un proyector por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    const sql = "SELECT * FROM Proyector WHERE idProyector = ?";
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error("Error al obtener el proyector:", err.message);
            return res.status(500).json({ error: "Error al obtener el proyector" });
        }

        if (!row) {
            return res.status(404).json({ error: "Proyector no encontrado" });
        }

        res.json(row);
    });
});

// Agregar un nuevo proyector
router.post("/", (req, res) => {
    const { modelo, resolucion, luminosidad, tipoPantalla, rut } = req.body;

    if (!modelo) {
        return res.status(400).json({ error: "El modelo es obligatorio" });
    }

    const sql = `INSERT INTO Proyector (modelo, resolucion, luminosidad, tipoPantalla, rut) 
                 VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [modelo, resolucion || null, luminosidad || null, tipoPantalla || null, rut || null], function(err) {
        if (err) {
            console.error("Error al agregar proyector:", err.message);
            return res.status(500).json({ error: "Error al agregar proyector" });
        }
        res.status(201).json({ message: "Proyector agregado", id: this.lastID });
    });
});

// Actualizar un proyector por ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { modelo, resolucion, luminosidad, tipoPantalla, rut } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    if (!modelo) {
        return res.status(400).json({ error: "El modelo es obligatorio" });
    }

    const sql = `UPDATE Proyector 
                 SET modelo = ?, resolucion = ?, luminosidad = ?, tipoPantalla = ?, rut = ? 
                 WHERE idProyector = ?`;

    db.run(sql, [modelo, resolucion || null, luminosidad || null, tipoPantalla || null, rut || null, id], function(err) {
        if (err) {
            console.error("Error al actualizar proyector:", err.message);
            return res.status(500).json({ error: "Error al actualizar proyector" });
        }

        if (this.changes === 0) { // Usar this.changes en SQLite
            return res.status(404).json({ error: "Proyector no encontrado" });
        }

        res.json({ message: "Proyector actualizado" });
    });
});

// Eliminar un proyector por ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    const sql = "DELETE FROM Proyector WHERE idProyector = ?";
    db.run(sql, [id], function(err) {
        if (err) {
            console.error("Error al eliminar proyector:", err.message);
            return res.status(500).json({ error: "Error al eliminar proyector" });
        }

        if (this.changes === 0) { // Usar this.changes en SQLite
            return res.status(404).json({ error: "Proyector no encontrado" });
        }

        res.json({ message: "Proyector eliminado" });
    });
});

module.exports = router;
