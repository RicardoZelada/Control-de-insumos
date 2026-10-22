

document.addEventListener("DOMContentLoaded", () => {
    const botonMenu = document.getElementById("menuToggle");
    const botonCerrar = document.getElementById("menuClose");
    const menuLateral = document.getElementById("sidebar");

    if (!botonMenu || !menuLateral) {
        return;
    }

    function abrirMenu() {
        menuLateral.classList.add("menu-abierto");

        botonMenu.setAttribute("aria-expanded", "true");
        botonMenu.setAttribute("aria-label", "Cerrar menú de navegación");
        botonMenu.innerHTML = '<i class="bi bi-x-lg"></i>';
    }

    function cerrarMenu() {
        menuLateral.classList.remove("menu-abierto");

        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.setAttribute("aria-label", "Abrir menú de navegación");
        botonMenu.innerHTML = '<i class="bi bi-list"></i>';
    }

    botonMenu.addEventListener("click", () => {
        const menuEstaAbierto =
            menuLateral.classList.contains("menu-abierto");

        if (menuEstaAbierto) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    });

    if (botonCerrar) {
        botonCerrar.addEventListener("click", cerrarMenu);
    }

    menuLateral.querySelectorAll(".nav-link").forEach((enlace) => {
        enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            cerrarMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            cerrarMenu();
        }
    });
});

