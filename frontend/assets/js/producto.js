
document.addEventListener("DOMContentLoaded", function () {

    // PRODUCTOS DISPONIBLES
    const productos = {
        1: {
            id: 1,
            nombre: "Camiseta básica blanca",
            categoria: "Camisetas",
            precio: 299,
            imagen: "assets/img/camiseta.jpg",
            descripcion: "Camiseta básica blanca, cómoda y versátil. Perfecta para combinar con cualquier estilo."
        },

        2: {
            id: 2,
            nombre: "Jeans rectos azules",
            categoria: "Pantalones",
            precio: 699,
            imagen: "assets/img/jeans.jpg",
            descripcion: "Jeans rectos de estilo casual. Un básico imprescindible para el día a día."
        },

        3: {
            id: 3,
            nombre: "Chaqueta oversize beige",
            categoria: "Chaquetas",
            precio: 899,
            imagen: "assets/img/chaqueta.jpg",
            descripcion: "Chaqueta oversize beige, moderna y cómoda. Ideal para completar cualquier conjunto."
        },

        4: {
            id: 4,
            nombre: "Sudadera gris",
            categoria: "Sudaderas",
            precio: 549,
            imagen: "assets/img/sudadera.jpg",
            descripcion: "Sudadera gris de estilo urbano, perfecta para un look cómodo e informal."
        }
    };

    // IDENTIFICAR PRODUCTO DESDE LA URL
    const parametros = new URLSearchParams(
        window.location.search
    );

    const id = parametros.get("id") || "1";
    const producto = productos[id];

    if (!producto) {
        document.querySelector(".detalle-producto")
            .innerHTML = `
                <div class="producto-no-encontrado">
                    <h2>Producto no encontrado</h2>
                    <p>La prenda solicitada no existe.</p>
                    <a href="catalogo.html">
                        Volver al catálogo
                    </a>
                </div>
            `;
        return;
    }

    // MOSTRAR INFORMACIÓN
    document.getElementById("producto-imagen").src =
        producto.imagen;

    document.getElementById("producto-imagen").alt =
        producto.nombre;

    document.getElementById("producto-nombre").textContent =
        producto.nombre;

    document.getElementById("producto-categoria").textContent =
        producto.categoria;

    document.getElementById("producto-precio").textContent =
        "$" + producto.precio + " MXN";

    document.getElementById("producto-descripcion").textContent =
        producto.descripcion;

    document.title = producto.nombre + " | Clothy";

    // AÑADIR AL CARRITO
    const boton = document.getElementById("agregar-carrito");

    boton.addEventListener("click", function () {

        const talla = document.getElementById("talla").value;

        const cantidad = Number(
            document.getElementById("cantidad").value
        );

        const mensaje = document.getElementById("mensaje-carrito");

        // VALIDAR TALLA
        if (!talla) {
            mensaje.textContent = "Selecciona una talla.";
            mensaje.style.color = "#c0392b";
            return;
        }

        // VALIDAR CANTIDAD
        if (!Number.isInteger(cantidad) ||
            cantidad < 1 ||
            cantidad > 10) {

            mensaje.textContent =
                "Selecciona una cantidad entre 1 y 10.";

            mensaje.style.color = "#c0392b";
            return;
        }

        // RECUPERAR CARRITO GUARDADO
        let carrito;

        try {
            const guardado = JSON.parse(
                localStorage.getItem("clothy_carrito") || "[]"
            );

            carrito = Array.isArray(guardado) ? guardado : [];

        } catch (error) {
            carrito = [];
        }

        // COMPROBAR SI YA EXISTE
        const existente = carrito.find(function (item) {
            return item.id === producto.id &&
                   item.talla === talla;
        });

        if (existente) {

            if (existente.cantidad + cantidad > 10) {
                mensaje.textContent =
                    "Máximo 10 unidades por talla.";
                mensaje.style.color = "#c0392b";
                return;
            }

            existente.cantidad += cantidad;

        } else {

            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                talla: talla,
                cantidad: cantidad
            });

        }

        // GUARDAR CARRITO
        try {
            localStorage.setItem(
                "clothy_carrito",
                JSON.stringify(carrito)
            );

            mensaje.textContent =
                "¡Producto añadido al carrito correctamente!";

            mensaje.style.color = "#27834b";

        } catch (error) {
            mensaje.textContent =
                "No se pudo guardar el carrito.";
            mensaje.style.color = "#c0392b";
        }

    });

});
