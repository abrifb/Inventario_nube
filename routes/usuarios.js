const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los usuarios
router.get("/", (req, res) => {
    const sql = "SELECT * FROM Usuario";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error al obtener usuarios:", err.message);
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }
        res.json(rows);
    });
});

// Agregar un nuevo usuario
router.post("/", (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);

    const {
        rut = 99999999,
        digito_verificador = "K",
        nombre = "Usuario",
        apellido = "Desconocido",
        email = "correo@ejemplo.com",
        contrasena = "12345",
        telefono = "0000000000",
        cargo = "Empleado",
        departamento = 0
    } = req.body;

    const sql = `INSERT INTO Usuario (rut, digito_verificador, nombre, apellido, email, contrasena, telefono, cargo, departamento) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(
        sql,
        [rut, digito_verificador, nombre, apellido, email, contrasena, telefono || null, cargo, departamento],
        function(err) {
            if (err) {
                console.error("Error al insertar usuario:", err.message);
                return res.status(500).json({ error: "Error al insertar usuario en la base de datos." });
            }
            res.status(201).json({ 
                message: "Usuario agregado correctamente", 
                id: this.lastID // Usar this.lastID en SQLite
            });
        }
    );
});

// Eliminar usuario
router.delete("/:rut", (req, res) => {
    const { rut } = req.params;

    // Opcional: Validar que 'rut' sea un número entero
    if (isNaN(rut)) {
        return res.status(400).json({ error: "RUT inválido" });
    }

    const sql = "DELETE FROM Usuario WHERE rut = ?";
    db.run(sql, [rut], function(err) {
        if (err) {
            console.error("Error al eliminar usuario:", err.message);
            return res.status(500).json({ error: "Error al eliminar usuario" });
        }

        if (this.changes === 0) { // Usar this.changes en SQLite
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario eliminado correctamente" });
    });
});

module.exports = router;
