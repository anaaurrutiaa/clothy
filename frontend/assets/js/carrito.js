
document.addEventListener("DOMContentLoaded", function () {

    const CLAVE = "clothy_carrito";

    const lista = document.getElementById("lista-carrito");
    const carritoVacio = document.getElementById("carrito-vacio");
    const carritoLleno = document.getElementById("carrito-lleno");
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");
    const mensajeCompra = document.getElementById("mensaje-compra");
    const botonFinalizar = document.getElementById("finalizar-compra");

    // PRODUCTOS DEL PROTOTIPO
    const productos = {
        1: {
            nombre: "Camiseta básica blanca",
            precio: 299,
            imagen: "assets/img/camiseta.jpg"
        },
        2: {
            nombre: "Jeans rectos azules",
            precio: 699,
            imagen: "assets/img/jeans.jpg"
        },
        3: {
            nombre: "Chaqueta oversize beige",
            precio: 899,
            imagen: "assets/img/chaqueta.jpg"
        },
        4: {
            nombre: "Sudadera gris",
            precio: 549,
            imagen: "assets/img/sudadera.jpg"
        }
    };

    function obtenerCarrito() {
        try {
            const guardado = JSON.parse(
                localStorage.getItem(CLAVE) || "[]"
            );

            if (!Array.isArray(guardado)) {
                return [];
            }

            return guardado.filter(function (item) {
                return productos[item.id] &&
                    ["S", "M", "L", "XL"].includes(item.talla) &&
                    Number.isInteger(item.cantidad) &&
                    item.cantidad >= 1 &&
                    item.cantidad <= 10;
            }).map(function (item) {
                const producto = productos[item.id];

                return {
                    id: Number(item.id),
                    nombre: producto.nombre,
                    imagen: producto.imagen,
                    precio: producto.precio,
                    talla: item.talla,
                    cantidad: item.cantidad
                };
            });

        } catch (error) {
            return [];
        }
    }

    let carrito = obtenerCarrito();

    function guardarCarrito() {
        try {
            localStorage.setItem(
                CLAVE,
                JSON.stringify(carrito)
            );
            return true;
        } catch (error) {
            mensajeCompra.textContent =
                "No se pudieron guardar los cambios.";
            return false;
        }
    }

    function formatoPrecio(precio) {
        return "$" + precio.toLocaleString("es-MX") + " MXN";
    }

    function renderizarCarrito() {

        lista.innerHTML = "";

        if (carrito.length === 0) {
            carritoVacio.hidden = false;
            carritoLleno.hidden = true;
            return;
        }

        carritoVacio.hidden = true;
        carritoLleno.hidden = false;

        let suma = 0;

        carrito.forEach(function (item, indice) {

            const importe = item.precio * item.cantidad;
            suma += importe;

            const articulo = document.createElement("article");
            articulo.className = "carrito-producto";

            // Los datos se obtienen de nuestro catálogo
            // local de productos, no de HTML externo.
            articulo.innerHTML = `
                <img src="${item.imagen}"
                     alt="${item.nombre}">

                <div class="carrito-producto-info">

                    <h3>${item.nombre}</h3>

                    <p>Talla: ${item.talla}</p>

                    <p class="carrito-precio">
                        ${formatoPrecio(item.precio)}
                    </p>

                    <label for="cantidad-${indice}">
                        Cantidad:
                    </label>

                    <input
                        id="cantidad-${indice}"
                        type="number"
                        min="1"
                        max="10"
                        value="${item.cantidad}"
                        data-indice="${indice}"
                        class="cantidad-carrito">

                    <p class="carrito-importe">
                        Importe: ${formatoPrecio(importe)}
                    </p>

                    <button
                        type="button"
                        class="eliminar-producto"
                        data-indice="${indice}">
                        Eliminar
                    </button>

                </div>
            `;

            lista.appendChild(articulo);
        });

        subtotal.textContent = formatoPrecio(suma);
        total.textContent = formatoPrecio(suma);
    }

    // CAMBIAR CANTIDAD O ELIMINAR
    lista.addEventListener("change", function (evento) {

        if (!evento.target.classList.contains(
            "cantidad-carrito"
        )) {
            return;
        }

        const indice = Number(evento.target.dataset.indice);
        const nuevaCantidad = Number(evento.target.value);

        if (!Number.isInteger(nuevaCantidad) ||
            nuevaCantidad < 1 ||
            nuevaCantidad > 10) {

            alert("La cantidad debe estar entre 1 y 10.");
            renderizarCarrito();
            return;
        }

        const anterior = carrito[indice].cantidad;
        carrito[indice].cantidad = nuevaCantidad;

        if (!guardarCarrito()) {
            carrito[indice].cantidad = anterior;
        }

        renderizarCarrito();
    });

    lista.addEventListener("click", function (evento) {

        if (!evento.target.classList.contains(
            "eliminar-producto"
        )) {
            return;
        }

        const indice = Number(evento.target.dataset.indice);

        const carritoAnterior = [...carrito];

        carrito.splice(indice, 1);

        if (!guardarCarrito()) {
            carrito = carritoAnterior;
        }

        renderizarCarrito();
    });

    // FINALIZAR COMPRA (SIMULACIÓN)
    botonFinalizar.addEventListener("click", function () {

        mensajeCompra.textContent =
            "Esta es una demostración. " +
            "El pago todavía no está implementado.";

    });

    renderizarCarrito();

});
