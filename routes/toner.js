const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los tóneres con información del proveedor
router.get("/", (req, res) => {
  const sql = `
    SELECT Toner.idToner, Toner.marca, Toner.color, Toner.contenido, Toner.impresora, 
           Toner.rut, Proveedor.nombre AS proveedor
    FROM Toner
    LEFT JOIN Proveedor ON Toner.rut = Proveedor.rut_proveedor
  `;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener tóneres:", err.message);
      return res.status(500).json({ error: "Error al obtener tóneres" });
    }
    res.status(200).json(rows);
  });
});

// Obtener un tóner por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const sql = `
    SELECT Toner.idToner, Toner.marca, Toner.color, Toner.contenido, Toner.impresora, 
           Toner.rut, Proveedor.nombre AS proveedor
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

    res.status(200).json(row);
  });
});

// Agregar un nuevo tóner
router.post("/", (req, res) => {
  const { marca, color, contenido, impresora, rut } = req.body;

  if (!marca || !contenido || !impresora) {
    return res.status(400).json({
      error: "Los campos marca, contenido e impresora son obligatorios.",
    });
  }

  const sql = `
    INSERT INTO Toner (marca, color, contenido, impresora, rut)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [marca, color || null, contenido, impresora, rut || null], function(err) {
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

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (!marca || !contenido || !impresora) {
    return res.status(400).json({
      error: "Los campos marca, contenido e impresora son obligatorios.",
    });
  }

  const sql = `
    UPDATE Toner
    SET marca = ?, color = ?, contenido = ?, impresora = ?, rut = ?
    WHERE idToner = ?
  `;

  db.run(sql, [marca, color || null, contenido, impresora, rut || null, id], function(err) {
    if (err) {
      console.error("Error al actualizar tóner:", err.message);
      return res.status(500).json({ error: "Error al actualizar tóner" });
    }

    if (this.changes === 0) { // Usar this.changes en SQLite
      return res.status(404).json({ error: "Tóner no encontrado" });
    }

    res.status(200).json({ message: "Tóner actualizado exitosamente" });
  });
});

// Eliminar un tóner por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const sql = "DELETE FROM Toner WHERE idToner = ?";
  db.run(sql, [id], function(err) {
    if (err) {
      console.error("Error al eliminar tóner:", err.message);
      return res.status(500).json({ error: "Error al eliminar tóner" });
    }

    if (this.changes === 0) { // Usar this.changes en SQLite
      return res.status(404).json({ error: "Tóner no encontrado" });
    }

    res.status(200).json({ message: "Tóner eliminado exitosamente" });
  });
});

module.exports = router;
