

const formulario = document.getElementById("formularioLogin");
const contrasena = document.getElementById("contrasena");
const botonVer = document.getElementById("verContrasena");
const mensaje = document.getElementById("mensajeLogin");
const enlaceRecuperar = document.getElementById("enlaceRecuperar");

// Mostrar u ocultar la contraseña
botonVer.addEventListener("click", () => {
    const estaOculta = contrasena.getAttribute("type") === "password";

    contrasena.setAttribute("type", estaOculta ? "text" : "password");

    const icono = botonVer.querySelector("i");

    if (icono) {
        icono.className = estaOculta
            ? "bi bi-eye-slash"
            : "bi bi-eye";
    }

    botonVer.setAttribute(
        "aria-label",
        estaOculta ? "Ocultar contraseña" : "Mostrar contraseña"
    );
});


// Aviso temporal al intentar iniciar sesión
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formulario.reportValidity()) {
        return;
    }

    window.location.href = "dashboard.html";
});

// Aviso temporal para recuperar la contraseña
enlaceRecuperar.addEventListener("click", (evento) => {
    evento.preventDefault();

    mensaje.textContent =
        "La recuperación de contraseña estará disponible al configurar Firebase.";
});
