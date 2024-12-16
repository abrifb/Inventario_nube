import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // Usuario
  const [password, setPassword] = useState(""); // Contraseña
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página

    try {
      // Datos enviados al backend
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreUsuario: username.trim(), // Quitar espacios extra
          contrasena: password.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json(); // Extraer mensaje de error
        setErrorMessage(error.error || "Credenciales incorrectas");
        return;
      }

      const data = await response.json(); // Procesar la respuesta
      localStorage.setItem("token", data.token); // Guardar el token en localStorage
      onLogin(data); // Notificar al componente padre
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Inicio de Sesión</h2>

        {/* Mostrar mensaje de error */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <input
          type="text"
          placeholder="Correo electrónico"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
