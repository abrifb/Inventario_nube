const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los tóneres con información del proveedor
router.get("/", (req, res) => {
  const sql = `
    SELECT Toner.idToner, Toner.marca, Toner.color, Toner.contenido, Toner.impresora, Proveedor.nombre AS proveedor
    FROM Toner
    LEFT JOIN Proveedor ON Toner.rut = Proveedor.rut_proveedor
  `;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener tóneres:", err.message);
      return res.status(500).json({ error: "Error al obtener tóneres" });
    }
    res.json(rows);
  });
});

// Obtener un tóner específico por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT Toner.idToner, Toner.marca, Toner.color, Toner.contenido, Toner.impresora, Proveedor.nombre AS proveedor
    FROM Toner
    LEFT JOIN Proveedor ON Toner.rut = Proveedor.rut_proveedor
    WHERE Toner.idToner = ?
  `;
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("Error al obtener el tóner:", err.message);
      return res.status(500).json({ error: "Error al obtener el tóner" });
    }

    if (!row) {
      return res.status(404).json({ error: "Tóner no encontrado" });
    }

    res.json(row); // Devuelve solo el objeto encontrado
  });
});

// Agregar un nuevo tóner
router.post("/", (req, res) => {
  const { marca, color, contenido, impresora, rut } = req.body;

  if (!marca || !contenido || !impresora || !rut) {
    return res.status(400).json({
      error: "Los campos marca, contenido, impresora y proveedor son obligatorios.",
    });
  }

  const sql = `
    INSERT INTO Toner (marca, color, contenido, impresora, rut)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [marca, color || null, contenido, impresora, rut], function(err) {
    if (err) {
      console.error("Error al agregar tóner:", err.message);
      return res.status(500).json({ error: "Error al agregar tóner" });
    }
    res.status(201).json({
      message: "Tóner agregado exitosamente",
      id: this.lastID, // Usar this.lastID en SQLite
    });
  });
});

// Actualizar un tóner por ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { marca, color, contenido, impresora, rut } = req.body;

  if (!marca || !contenido || !impresora || !rut) {
    return res.status(400).json({
      error: "Los campos marca, contenido, impresora y proveedor son obligatorios.",
    });
  }

  const sql = `
    UPDATE Toner
    SET marca = ?, color = ?, contenido = ?, impresora = ?, rut = ?
    WHERE idToner = ?
  `;

  db.run(sql, [marca, color || null, contenido, impresora, rut, id], function(err) {
    if (err) {
      console.error("Error al actualizar tóner:", err.message);
      return res.status(500).json({ error: "Error al actualizar tóner" });
    }

    if (this.changes === 0) { // Usar this.changes en SQLite
      return res.status(404).json({ error: "Tóner no encontrado" });
    }

    res.json({ message: "Tóner actualizado exitosamente" });
  });
});

// Eliminar un tóner por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Toner WHERE idToner = ?";
  db.run(sql, [id], function(err) {
    if (err) {
      console.error("Error al eliminar tóner:", err.message);
      return res.status(500).json({ error: "Error al eliminar tóner" });
    }

    if (this.changes === 0) { // Usar this.changes en SQLite
      return res.status(404).json({ error: "Tóner no encontrado" });
    }

    res.json({ message: "Tóner eliminado exitosamente" });
  });
});

module.exports = router;
