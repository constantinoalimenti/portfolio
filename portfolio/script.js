
const botonTema = document.getElementById("btn-tema");

function cambiarTema() {
    document.body.classList.toggle("oscuro");
}

botonTema.addEventListener("click", cambiarTema);


const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador-mensaje");

mensaje.addEventListener("input", () => {
    contador.textContent = mensaje.value.length + " caracteres";
});


function validarNombre(nombre) {
    return nombre.trim().length >= 3;
}

function validarEmail(email) {
    return email.includes("@") && email.includes(".");
}

function validarMensaje(mensaje) {
    return mensaje.trim().length >= 10;
}


const formulario = document.getElementById("form-contacto");

formulario.addEventListener("submit", (event) => {

    event.preventDefault();

    let valido = true;

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;

    const errorNombre = document.getElementById("error-nombre");
    const errorEmail = document.getElementById("error-email");
    const errorMensaje = document.getElementById("error-mensaje");

    if (!validarNombre(nombre)) {
        errorNombre.textContent = "Minimo 3 letras.";
        valido = false;
    } else {
        errorNombre.textContent = "";
    }

    if (!validarEmail(email)) {
        errorEmail.textContent = "El email debe tener @ y punto.";
        valido = false;
    } else {
        errorEmail.textContent = "";
    }

    if (!validarMensaje(mensaje)) {
        errorMensaje.textContent = "Minimo 10 caracteres.";
        valido = false;
    } else {
        errorMensaje.textContent = "";
    }

    if (valido) {
        const resultado = document.getElementById("resultado-form");

        resultado.textContent = "Gracias, " + nombre + "! Tu mensaje fue enviado.";
        resultado.classList.add("ok");
    }

});


const lista = document.getElementById("lista-proyectos");
const estado = document.getElementById("estado-proyectos");

fetch("proyectos.json")
    .then((respuesta) => respuesta.json())
    .then((proyectos) => {

        estado.textContent = "";

        proyectos.forEach((proyecto) => {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("proyecto");

            const titulo = document.createElement("h3");
            titulo.textContent = proyecto.titulo;

            const descripcion = document.createElement("p");
            descripcion.textContent = proyecto.descripcion;

            tarjeta.appendChild(titulo);
            tarjeta.appendChild(descripcion);

            proyecto.tecnologias.forEach((tec) => {

                const etiqueta = document.createElement("span");
                etiqueta.classList.add("etiqueta");
                etiqueta.textContent = tec;

                tarjeta.appendChild(etiqueta);

            });

            lista.appendChild(tarjeta);

        });

    })
    .catch(() => {
        estado.textContent = "No se pudieron cargar los proyectos.";
    });
