
document.addEventListener("DOMContentLoaded", function () {

    const buscador = document.getElementById("buscar-producto");
    const botones = document.querySelectorAll(".filtro");
    const productos = document.querySelectorAll(".producto");
    const sinResultados = document.getElementById("sin-resultados");

    let categoriaActual = "todos";

    // Normalizar texto para buscar sin distinguir acentos
    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // Aplicar buscador y categoría al mismo tiempo
    function filtrarProductos() {

        const busqueda = normalizar(buscador.value);
        let visibles = 0;

        productos.forEach(function (producto) {

            const nombre = normalizar(
                producto.querySelector("h3").textContent
            );

            const categoria = producto.dataset.categoria;

            const coincideBusqueda = nombre.includes(busqueda);

            const coincideCategoria =
                categoriaActual === "todos" ||
                categoria === categoriaActual;

            const mostrar = coincideBusqueda && coincideCategoria;

            producto.hidden = !mostrar;

            if (mostrar) {
                visibles++;
            }

        });

        // Mostrar mensaje si no hay coincidencias
        sinResultados.hidden = visibles > 0;
    }

    // Búsqueda mientras el usuario escribe
    buscador.addEventListener("input", filtrarProductos);

    // Filtros por categoría
    botones.forEach(function (boton) {

        boton.addEventListener("click", function () {

            categoriaActual = boton.dataset.categoria;

            botones.forEach(function (b) {
                b.classList.remove("activo");
            });

            boton.classList.add("activo");

            filtrarProductos();

        });

    });

    // Mostrar todos los productos inicialmente
    filtrarProductos();

});
