


document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // ELEMENTOS DEL FORMULARIO DE NUEVO INSUMO
    // ==========================================
  
    const formulario = document.getElementById("formularioProducto");
    const campoNombre = document.getElementById("nombreInsumo");
    const campoStock = document.getElementById("stockInicial");
    const campoEstado = document.getElementById("estadoInsumo");
  
    const botonMostrar = document.getElementById("btnMostrarFormulario");
    const botonCancelar = document.getElementById("btnCancelarInsumo");
    const contenedorFormulario = document.getElementById(
      "contenedorNuevoInsumo"
    );
    const mensajeProducto = document.getElementById("mensajeProducto");
  
    // ==========================================
    // ELEMENTOS DEL FORMULARIO DE ENTRADA
    // ==========================================
  
    const formularioEntrada = document.getElementById("formularioEntrada");
    const campoInsumoEntrada = document.getElementById("insumoEntrada");
    const campoCantidadEntrada = document.getElementById("cantidadEntrada");
    const campoFechaEntrada = document.getElementById("fechaEntrada");
    const campoPeriodoEntrada = document.getElementById("periodoEntrada");
    const mensajeEntrada = document.getElementById("mensajeEntrada");
  
    const listaInsumos = document.getElementById("listaUltimosInsumos");
  
    // ==========================================
    // 1. CATÁLOGO DE INSUMOS
    // ==========================================
    // Estos productos ficticios sirven para probar la interfaz.
    // Crear un producto NO lo agrega al historial de ingresos.
  
    const insumosCreados = [
      {
        codigo: "INS-7K2P9A",
        nombre: "Guantes de procedimiento",
        stock: 150,
        periodo1: 150,
        periodo2: 0,
        estado: "activo",
        ficticio: true
      },
      {
        codigo: "INS-4M8R2B",
        nombre: "Mascarillas quirúrgicas",
        stock: 300,
        periodo1: 300,
        periodo2: 0,
        estado: "activo",
        ficticio: true
      },
      {
        codigo: "INS-9T3L6C",
        nombre: "Jeringas de 5 ml",
        stock: 80,
        periodo1: 80,
        periodo2: 0,
        estado: "activo",
        ficticio: true
      },
      {
        codigo: "INS-2W5N8D",
        nombre: "Gasas estériles",
        stock: 120,
        periodo1: 120,
        periodo2: 0,
        estado: "inactivo",
        ficticio: true
      },
      {
        codigo: "INS-6H1F4E",
        nombre: "Alcohol al 70%",
        stock: 45,
        periodo1: 45,
        periodo2: 0,
        estado: "activo",
        ficticio: true
      }
    ];
  
    // ==========================================
    // 2. HISTORIAL DE ENTRADAS DE STOCK
    // ==========================================
    // Esta lista es independiente del catálogo.
    // Los ejemplos se muestran del más reciente al más antiguo.
  
    const ingresosStock = [
      {
        codigo: "INS-6H1F4E",
        nombre: "Alcohol al 70%",
        stock: 45,
        cantidad: 45,
        fecha: "2026-10-12",
        periodo: 1,
        estado: "activo",
        ficticio: true
      },
      {
        codigo: "INS-2W5N8D",
        nombre: "Gasas estériles",
        stock: 120,
        cantidad: 120,
        fecha: "2026-10-14",
        periodo: 1,
        estado: "inactivo",
        ficticio: true
      },
      {
        codigo: "INS-9T3L6C",
        nombre: "Jeringas de 5 ml",
        stock: 80,
        cantidad: 80,
        fecha: "2026-10-16",
        periodo: 1,
        estado: "activo",
        ficticio: true
      },
      {
        codigo: "INS-4M8R2B",
        nombre: "Mascarillas quirúrgicas",
        stock: 300,
        cantidad: 300,
        fecha: "2026-10-18",
        periodo: 1,
        estado: "activo",
        ficticio: true
      },
      {
        codigo: "INS-7K2P9A",
        nombre: "Guantes de procedimiento",
        stock: 150,
        cantidad: 150,
        fecha: "2026-10-20",
        periodo: 1,
        estado: "activo",
        ficticio: true
      }
    ];
  
    // ==========================================
    // FUNCIONES GENERALES
    // ==========================================
  
    function fechaLocalActual() {
      const ahora = new Date();
      const anio = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, "0");
      const dia = String(ahora.getDate()).padStart(2, "0");
  
      return `${anio}-${mes}-${dia}`;
    }
  
    function generarCodigo() {
      let codigo;
  
      do {
        codigo =
          "INS-" +
          Math.random().toString(36).substring(2, 8).toUpperCase();
      } while (insumosCreados.some(insumo => insumo.codigo === codigo));
  
      return codigo;
    }
  
    function crearElemento(etiqueta, clase, texto) {
      const elemento = document.createElement(etiqueta);
      elemento.className = clase;
      elemento.textContent = texto;
      return elemento;
    }
  
    function formatearFecha(fecha) {
      if (!fecha) return "Sin fecha";
  
      const partes = fecha.split("-");
      if (partes.length !== 3) return fecha;
  
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
  
    function mostrarMensajeProducto(texto, tipo) {
      mensajeProducto.textContent = texto;
      mensajeProducto.className = "form-message " + tipo;
    }
  
    function mostrarMensajeEntrada(texto, tipo) {
      mensajeEntrada.textContent = texto;
      mensajeEntrada.className = "form-message " + tipo;
    }
  
    // ==========================================
    // ACTUALIZAR SELECTOR DE INSUMOS
    // ==========================================
  
    function actualizarSelectorInsumos() {
      const codigoSeleccionado = campoInsumoEntrada.value;
  
      campoInsumoEntrada.replaceChildren();
  
      const opcionInicial = document.createElement("option");
      opcionInicial.value = "";
      opcionInicial.textContent = "Selecciona un insumo";
      campoInsumoEntrada.appendChild(opcionInicial);
  
      insumosCreados
        .filter(insumo => insumo.estado === "activo")
        .forEach(insumo => {
          const opcion = document.createElement("option");
          opcion.value = insumo.codigo;
          opcion.textContent = insumo.nombre;
          campoInsumoEntrada.appendChild(opcion);
        });
  
      if (
        insumosCreados.some(
          insumo =>
            insumo.codigo === codigoSeleccionado &&
            insumo.estado === "activo"
        )
      ) {
        campoInsumoEntrada.value = codigoSeleccionado;
      }
    }
  
    // ==========================================
    // MOSTRAR Y OCULTAR FORMULARIO DE PRODUCTO
    // ==========================================
  
    function limpiarFormularioProducto() {
      formulario.reset();
      campoStock.value = "0";
      mensajeProducto.textContent = "";
      mensajeProducto.className = "form-message";
    }
  
    botonMostrar.addEventListener("click", () => {
      contenedorFormulario.hidden = !contenedorFormulario.hidden;
  
      botonMostrar.setAttribute(
        "aria-expanded",
        String(!contenedorFormulario.hidden)
      );
  
      if (!contenedorFormulario.hidden) {
        campoNombre.focus();
      } else {
        limpiarFormularioProducto();
      }
    });
  
    botonCancelar.addEventListener("click", () => {
      limpiarFormularioProducto();
      contenedorFormulario.hidden = true;
      botonMostrar.setAttribute("aria-expanded", "false");
    });
  
    // ==========================================
    // CREAR NUEVO INSUMO
    // ==========================================
    // IMPORTANTE:
    // Se incorpora al catálogo, no al historial de entradas.
  
    formulario.addEventListener("submit", evento => {
      evento.preventDefault();
  
      const nombre = campoNombre.value.trim();
      const stockTexto = campoStock.value.trim();
      const stock = Number(stockTexto);
      const estado = campoEstado.value;
  
      if (!nombre) {
        mostrarMensajeProducto("Escribe el nombre del insumo.", "error");
        campoNombre.focus();
        return;
      }
  
      if (
        stockTexto === "" ||
        !Number.isSafeInteger(stock) ||
        stock < 0
      ) {
        mostrarMensajeProducto(
          "Ingresa un stock entero válido, igual o mayor que cero.",
          "error"
        );
        campoStock.focus();
        return;
      }
  
      if (
        insumosCreados.some(
          insumo => insumo.nombre.toLowerCase() === nombre.toLowerCase()
        )
      ) {
        mostrarMensajeProducto(
          "Ya existe un insumo con ese nombre en la lista.",
          "error"
        );
        campoNombre.focus();
        return;
      }
  
      const nuevoInsumo = {
        codigo: generarCodigo(),
        nombre,
        stock,
        periodo1: stock,
        periodo2: 0,
        estado,
        ficticio: false
      };
  
      insumosCreados.push(nuevoInsumo);
  
      // Actualizamos el selector, pero NO el historial de ingresos.
      actualizarSelectorInsumos();
  
      mostrarMensajeProducto(
        "Insumo creado correctamente. Código: " + nuevoInsumo.codigo,
        "success"
      );
  
      formulario.reset();
      campoStock.value = "0";
      campoNombre.focus();
    });
  
    // ==========================================
    // REGISTRAR ENTRADA DE STOCK
    // ==========================================
  
    formularioEntrada.addEventListener("submit", evento => {
      evento.preventDefault();
  
      const codigo = campoInsumoEntrada.value;
      const cantidadTexto = campoCantidadEntrada.value.trim();
      const cantidad = Number(cantidadTexto);
      const fecha = campoFechaEntrada.value;
      const periodo = Number(campoPeriodoEntrada.value);
  
      const insumo = insumosCreados.find(
        producto => producto.codigo === codigo
      );
  
      if (!insumo || insumo.estado !== "activo") {
        mostrarMensajeEntrada(
          "Selecciona un insumo activo de la lista.",
          "error"
        );
        campoInsumoEntrada.focus();
        return;
      }
  
      if (
        cantidadTexto === "" ||
        !Number.isSafeInteger(cantidad) ||
        cantidad <= 0
      ) {
        mostrarMensajeEntrada(
          "Ingresa una cantidad entera mayor que cero.",
          "error"
        );
        campoCantidadEntrada.focus();
        return;
      }
  
      if (!fecha) {
        mostrarMensajeEntrada(
          "Selecciona la fecha de ingreso.",
          "error"
        );
        campoFechaEntrada.focus();
        return;
      }
  
      if (periodo !== 1 && periodo !== 2) {
        mostrarMensajeEntrada(
          "Selecciona el período 1 o el período 2.",
          "error"
        );
        campoPeriodoEntrada.focus();
        return;
      }
  
      // Actualizamos el período correspondiente.
      if (periodo === 1) {
        insumo.periodo1 += cantidad;
      } else {
        insumo.periodo2 += cantidad;
      }
  
      // El stock total siempre es la suma de ambos períodos.
      insumo.stock = insumo.periodo1 + insumo.periodo2;
  
      // Guardamos un movimiento independiente en el historial.
      ingresosStock.push({
        codigo: insumo.codigo,
        nombre: insumo.nombre,
        stock: insumo.stock,
        cantidad,
        fecha,
        periodo,
        estado: insumo.estado,
        ficticio: false
      });
  
      actualizarListaIngresos();
  
      mostrarMensajeEntrada(
        `Entrada registrada: ${cantidad} unidades de ${insumo.nombre}.`,
        "success"
      );
  
      formularioEntrada.reset();
      campoFechaEntrada.value = fechaLocalActual();
      campoInsumoEntrada.focus();
    });
  
    // ==========================================
    // MOSTRAR LOS ÚLTIMOS CINCO INGRESOS
    // ==========================================
  
    function actualizarListaIngresos() {
      listaInsumos.replaceChildren();
  
      // Orden cronológico descendente: primero el más reciente.
      const ultimosCinco = [...ingresosStock]
        .sort((a, b) => {
          const diferencia = b.fecha.localeCompare(a.fecha);
  
          if (diferencia !== 0) return diferencia;
  
          return ingresosStock.indexOf(b) - ingresosStock.indexOf(a);
        })
        .slice(0, 5);
  
      if (ultimosCinco.length === 0) {
        const vacio = document.createElement("div");
        vacio.className = "recent-products-empty";
        vacio.textContent = "Todavía no hay entradas de stock registradas.";
        listaInsumos.appendChild(vacio);
        return;
      }
  
      ultimosCinco.forEach(ingreso => {
        const producto = document.createElement("article");
        producto.className = "recent-product";
  
        const encabezado = document.createElement("div");
        encabezado.className = "recent-product-header";
  
        const iconoProducto = document.createElement("div");
        iconoProducto.className = "recent-product-icon";
  
        const icono = document.createElement("i");
        icono.className = "bi bi-box-seam";
        icono.setAttribute("aria-hidden", "true");
        iconoProducto.appendChild(icono);
  
        const informacion = document.createElement("div");
        informacion.className = "recent-product-info";
  
        informacion.appendChild(
          crearElemento("strong", "recent-product-name", ingreso.nombre)
        );
  
        informacion.appendChild(
          crearElemento(
            "span",
            "recent-product-code",
            "Código: " + ingreso.codigo
          )
        );
  
        // Los botones se mantienen visuales por ahora.
        const acciones = document.createElement("div");
        acciones.className = "recent-product-actions";
  
        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "icon-action edit-action";
        editar.title = "Editar";
        editar.setAttribute("aria-label", "Editar " + ingreso.nombre);
        editar.disabled = true;
  
        const iconoEditar = document.createElement("i");
        iconoEditar.className = "bi bi-pencil";
        editar.appendChild(iconoEditar);
  
        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "icon-action delete-action";
        eliminar.title = "Eliminar";
        eliminar.setAttribute("aria-label", "Eliminar " + ingreso.nombre);
        eliminar.disabled = true;
  
        const iconoEliminar = document.createElement("i");
        iconoEliminar.className = "bi bi-trash3";
        eliminar.appendChild(iconoEliminar);
  
        acciones.append(editar, eliminar);
        encabezado.append(iconoProducto, informacion, acciones);
  
        const detalles = document.createElement("div");
        detalles.className = "recent-product-details";
  
        const detalleStock = document.createElement("div");
        detalleStock.append(
          crearElemento("span", "", "Stock actual al ingresar"),
          crearElemento("strong", "", `${ingreso.stock} unidades`)
        );
  
        const detalleCantidad = document.createElement("div");
        detalleCantidad.append(
          crearElemento("span", "", "Cantidad ingresada"),
          crearElemento("strong", "", `${ingreso.cantidad} unidades`)
        );
  
        const detalleFecha = document.createElement("div");
        detalleFecha.append(
          crearElemento("span", "", "Fecha de ingreso"),
          crearElemento("strong", "", formatearFecha(ingreso.fecha))
        );
  
        const detalleEstado = document.createElement("div");
        detalleEstado.appendChild(
          crearElemento("span", "", "Estado del producto")
        );
  
        const estado = crearElemento(
          "strong",
          "product-status" +
            (ingreso.estado === "inactivo" ? " inactive" : ""),
          ingreso.estado === "activo" ? "Activo" : "Inactivo"
        );
  
        detalleEstado.appendChild(estado);
  
        detalles.append(
          detalleStock,
          detalleCantidad,
          detalleFecha,
          detalleEstado
        );
  
        producto.append(encabezado, detalles);
        listaInsumos.appendChild(producto);
      });
  
      const nota = document.createElement("div");
      nota.className = "recent-products-footer";
  
      const iconoNota = document.createElement("i");
      iconoNota.className = "bi bi-info-circle";
  
      const textoNota = document.createElement("span");
      textoNota.textContent =
        "Los ejemplos iniciales son ficticios. Los registros aún no se guardan en Google Sheets.";
  
      nota.append(iconoNota, textoNota);
      listaInsumos.appendChild(nota);
    }
  
    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
  
    campoStock.value = "0";
    campoFechaEntrada.value = fechaLocalActual();
  
    actualizarSelectorInsumos();
    actualizarListaIngresos();
  });
  


  
  