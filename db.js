// db.js

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dotenv = require('dotenv');

// Cargar las variables de entorno antes de cualquier otra cosa
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

// Definir la ruta absoluta de la base de datos SQLite
const dbPath = path.resolve(__dirname, "gestion_inventario.db");

// Crear una instancia de la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos SQLite:", err.message);
    process.exit(1); // Detener el servidor si no se puede conectar a la base de datos
  }
  console.log("Conexión exitosa a la base de datos SQLite.");
});

// Habilitar las claves foráneas en SQLite
db.run("PRAGMA foreign_keys = ON;", (err) => {
  if (err) {
    console.error("Error al habilitar las claves foráneas:", err.message);
  } else {
    console.log("Claves foráneas habilitadas.");
  }
});

// Exportar la instancia de la base de datos para usarla en otros archivos
module.exports = db;
