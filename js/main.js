// Seleccione los input del formulario

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


// Selecciono el formulario completo y el contenedor donde se mostraria la cita luego

const formulario = document.querySelector('#nuevo-turno');
const contenedorTurnos = document.querySelector('#turno-creado');


//Registro los eventos para poder usar los datos del usuario

eventListener();
function eventListener() {
    mascotaInput.addEventListener('change', datosTurnos);  
    propietarioInput.addEventListener('change', datosTurnos);
    telefonoInput.addEventListener('change', datosTurnos);
    fechaInput.addEventListener('change', datosTurnos);
    horaInput.addEventListener('change', datosTurnos);
    sintomasInput.addEventListener('change', datosTurnos);

    formulario.addEventListener('submit', nuevoTurno);
}

// Utilizo classes para crear alerta 

class infoUsuario {
    imprimirAlerta(mensaje) {
        
        //Creo el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert-danger', 'd-block', 'col-12');

        // Le asigno el mensaje a mostrar
        divMensaje.textContent = mensaje;

        // Seleccione el div #contenido y con el metodo insertBefore creo el nuevo div despues de #contenido
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('agregar-turno'));
    }
}

const informacionUsuario = new infoUsuario();

// El objeto que almacena la info ingresada

const objetoTurno = {
    mascota:'',
    propietario: '',
    telefono: '',
    fecha:'',
    hora:'',
    sintomas:''
}


// Agrega los datos al objetoTurno y luego printea en consola el objeto con la info obtenida

function datosTurnos(e) {
    objetoTurno[e.target.name] = e.target.value;

    console.log(objetoTurno);
}


// Validar form

function nuevoTurno(e) {
    e.preventDefault();

    // Extraer datos del objetoTurno
    const {mascota, propietario, telefono, fecha, hora, sintomas } = objetoTurno;

    // Validar

    if( mascota == '' || propietario == '' || telefono == '' || fecha == '' || hora == '' || sintomas == '') {
        informacionUsuario.imprimirAlerta('Todos los campos son obligatorios');

        return;
    }
}