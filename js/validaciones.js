export function validar(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    console.log(input.parentElement)
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacío"
    },

    email: {
        valueMissing: "El campo Email no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },

    password: {
        valueMissing: "El campo Contraseña no puede estar vacío",
        patternMismatch: "Minimo 6 caracteres, máximo 12 caracteres, debe contener una letra minúscula, una letra mayúscula, un némero y no puede contener caracteres especiales"
    },

    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },

    numero: {
        valueMissing: "El campo Numero de Teléfono no puede estar vacío",
        patternMismatch: "El formato requerido es númerico XXXXXXXXXX, 10 números"
    },

    direccion: {
        valueMissing: "El campo Dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener de 10 a 40 caracteres"
    },

    ciudad: {
        valueMissing: "El campo Ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener de 10 a 40 caracteres"
    },

    estado: {
        valueMissing: "El campo Estado no puede estar vacío",
        patternMismatch: "El estado debe contener de 10 a 40 caracteres"
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}