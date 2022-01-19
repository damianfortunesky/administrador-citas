// Seleccione los input del formulario

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


// Selecciono el formulario completo y el contenedor donde se mostraria la cita luego 
const formulario = document.querySelector('#nuevo-turno');
const contenedorCitas = document.querySelector('#turno-creado');


//Registro los eventos para poder usar los datos del usuario sin usar prompt()
eventListener();
function eventListener() {
    mascotaInput.addEventListener('change', datosTurnos);  // Probe usando input por change pero espameaba  mucho en consola el objeto a medida que agregaba la info.
    propietarioInput.addEventListener('change', datosTurnos);
    telefonoInput.addEventListener('change', datosTurnos);
    fechaInput.addEventListener('change', datosTurnos);
    horaInput.addEventListener('change', datosTurnos);
    sintomasInput.addEventListener('change', datosTurnos);
}

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

// La idea es que para la 2da entrega, al momento de crear el turno aparesca a la derecha del formulario el turno creado (no se como hacerlo aun)