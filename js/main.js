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

mascotaInput.addEventListener('change', datosTurnos);  
propietarioInput.addEventListener('change', datosTurnos);
telefonoInput.addEventListener('change', datosTurnos);
fechaInput.addEventListener('change', datosTurnos);
horaInput.addEventListener('change', datosTurnos);
sintomasInput.addEventListener('change', datosTurnos);

formulario.addEventListener('submit', nuevoTurno);


// Utilizo classes para crear alerta 

class infoUsuario {
    imprimirAlerta(mensaje) {
        
        //Creo el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'text-light', 'p-2', 'alert-danger', 'd-block', 'col-12');

        // Le asigno el mensaje a mostrar
        divMensaje.textContent = mensaje;

        // Seleccione el div #contenido y con el metodo insertBefore creo el nuevo div despues de #contenido
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('agregar-turno')); 

        setTimeout( () => {
            divMensaje.remove();  // Para que desaparezca la alerta luego de 5s
        }, 5000 )
    }
}

class Turnos {
    constructor() {
        this.turnos = [];
    }

    agregarTurno(turno) {
        this.turno = [...this.turnos, turno];

        console.log(this.turnos);
    }
    
}

const informacionUsuario = new infoUsuario();
const administrarTurnos = new Turnos();


let myDataJson = JSON.stringify(administrarTurnos);
localStorage.setItem("DatosUsuarios", myDataJson); // La idea es que una vez quede generado el turno se almacene el la localstorage


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
    const {mascota, propietario, telefono, fecha, hora, sintomas} = objetoTurno;

    // Validar
    if( mascota == '' || propietario == '' || telefono == '' || fecha == '' || hora == '' || sintomas == '') {
        informacionUsuario.imprimirAlerta('Todos los campos son obligatorios');

        return;
    }

    // Reiniciar el objeto para la validacion
    reiniciarObjeto();

    // Crear el turno
    administrarTurnos.agregarTurno({...objetoTurno}); // Uso una copia del objeto global ya que sino cuando creaba mas de 1 turno, se me pisaba el valor del primer turno y creaba 2 iguales.

    // Reiniciar el form
    formulario.reset();
}

function reiniciarObjeto() {
    objetoTurno.mascota = '';
    objetoTurno.propietario = '';
    objetoTurno.telefono = '';
    objetoTurno.fecha = '';
    objetoTurno.hora = '';
    objetoTurno.sintomas = '';
}

// OBSERVACION: Falta generar el HTML con el turno creado pero no logre hacerlo funcionar en base a lo que vimos en la clase de workshop, googlie y encontre que surgerian hacerlo con " Turnos.forEach(cita => {}); " pero tampoco logre estructurar el contenido de adentro.

