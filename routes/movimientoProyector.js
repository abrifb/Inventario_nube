const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los movimientos de proyectores
router.get("/", (req, res) => {
    const sql = "SELECT * FROM MovimientoProyector";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error al obtener movimientos de proyectores:", err.message);
            return res.status(500).json({ error: "Error al obtener movimientos de proyectores" });
        }
        res.json(rows);
    });
});

// Agregar un nuevo movimiento de proyector
router.post("/", (req, res) => {
    const { idProyector, fecha, tipo, cantidad, rut_proveedor, rut_usuario } = req.body;

    // Verificar que los datos estén completos
    if (!idProyector || !fecha || !tipo || !cantidad || !rut_proveedor || !rut_usuario) {
        return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
    }

    const sql = `INSERT INTO MovimientoProyector (idProyector, fecha, tipo, cantidad, rut_proveedor, rut_usuario) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [idProyector, fecha, tipo, cantidad, rut_proveedor, rut_usuario], function(err) {
        if (err) {
            console.error("Error al agregar movimiento de proyector:", err.message);
            return res.status(500).json({ error: "Error al agregar movimiento de proyector" });
        }
        res.json({ message: "Movimiento de proyector agregado", id: this.lastID });
    });
});

module.exports = router;
