const listado = document.getElementById("listado");
const listadoProductos = "productos.json";

//Creamos el array del carrito de compras:

let carrito = [];

/** CARGAMOS CARRITO DESDE EL LOCALSTORAGE **/
//SI hay algo en el localStorage, lo cargamos en el carrito:
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Creamos la función para mostrar los productos:
const contenedorProductos = document.getElementById("contenedorProductos");

fetch(listadoProductos)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        datos.forEach((producto) => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML = `
                            <div class="card">
                                <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3 class="titulo">${producto.nombre}</h3>
                                    <p class="texto">$${producto.precio}</p>
                                    <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                                </div>
                            </div>`;
            contenedorProductos.appendChild(card);
            //Agregar productos al carrito:
            const boton = document.getElementById(`boton${producto.id}`);
            const agregarAlCarrito = (id) => {
                Toastify({
                    text: "Agregaste al carrito",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#E855E6",
                    },
                    offset: {
                        x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
                    },
                    onClick: function () { }, // Callback after click
                }).showToast();
                const productoEnCarrito = carrito.find(
                    (producto) => producto.id === id
                );
                if (productoEnCarrito) {
                    productoEnCarrito.cantidad++;
                } else {
                    const producto = datos.find((producto) => producto.id === id);
                    producto.cantidad = 1;
                    carrito.push(producto);
                }
                //Trabajamos con el localStorage:
                localStorage.setItem("carrito", JSON.stringify(carrito));
                calcularTotal();
            };
            boton.addEventListener("click", () => {
                agregarAlCarrito(producto.id);
            });
        });
    })
    .catch((error) => console.log(error));

//Creamos la función de agregar al carrito.

//Mostrar el carrito de compras:
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

const contenedorCarrito = document.getElementById("contenedorCarrito");

//Función para mostrar el carrillo:
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                        <div class="card">
                            <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                            <div class="card-body">
                                <h3 class="titulo">${producto.nombre}</h3>
                                <p class="texto">$${producto.precio}</p>
                                <p class="texto">${producto.cantidad}</p>
                                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                            </div>
                        </div>`;
        contenedorCarrito.appendChild(card);
        //Eliminar productos del carrito:
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        });
    });
};

//Función que elimina el producto del carrito:

const eliminarDelCarrito = (id) => {
    Toastify({
        text: "Eliminaste del carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#E855E6",
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { }, // Callback after click
    }).showToast();
    const producto = carrito.find((producto) => producto.id === id);
    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
    } else {
        let indice = carrito.indexOf(producto);
        carrito.splice(indice, 1);
    }

    mostrarCarrito();

    //Trabajamos con el localStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Vaciamos todo el carrito de compras:

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    Toastify({
        text: "Vaciaste el carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#FF4EFF",
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { }, // Callback after click
    }).showToast();
    eliminarTodoElCarrito();
});

//Función que elimina todo el carrito:

const eliminarTodoElCarrito = () => {
    carrito = [];
    //localStorage:
    localStorage.clear();
    mostrarCarrito();
};

//Mostramos mensaje con el total de la compra:

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad.
    });
    total.innerHTML = `Total: $${totalCompra}`;
};


