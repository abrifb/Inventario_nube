const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Carga las variables de entorno desde .env
const db = require("./db"); // Conexión a SQLite

// Importación de rutas
const proveedorRoutes = require("./routes/proveedor");
const usuarioRoutes = require("./routes/usuarios");
const tonerRoutes = require("./routes/toner");
const proyectorRoutes = require("./routes/proyector");
const movimientoTonerRoutes = require("./routes/movimientoToner");
const movimientoProyectorRoutes = require("./routes/movimientoProyector");
const loginRoutes = require("./routes/login"); // Importa la ruta del login

// Inicialización de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Confirmar que SQLite se está usando
console.log("Conexión exitosa a la base de datos SQLite.");

// Rutas base
app.use("/proveedores", proveedorRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/toners", tonerRoutes);
app.use("/proyectores", proyectorRoutes);
app.use("/movimientos/toners", movimientoTonerRoutes);
app.use("/movimientos/proyectores", movimientoProyectorRoutes);
app.use("/login", loginRoutes); // Esta línea debe estar aquí y no duplicada

// Ruta principal
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API de gestión de inventario.");
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error("Error del servidor:", err.message);
  res.status(500).json({ error: "Error interno del servidor." });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
