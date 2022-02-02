//// Seleccione los input del formulario

const mascotaInput = $('#mascota');
const propietarioInput = $('#propietario');
const telefonoInput = $('#telefono');
const fechaInput = $('#fecha');
const horaInput = $('#hora');
const sintomasInput = $('#sintomas');

// Selecciono el formulario completo y el contenedor donde se mostraria la cita luego

const formulario = $('#nuevo-turno');
const contenedorTurnos = $('#turno-creado');


//Registro los eventos para poder usar los datos del usuario

mascotaInput.on('change', datosTurnos);
propietarioInput.on('change', datosTurnos);
telefonoInput.on('change', datosTurnos);
horaInput.on('change', datosTurnos);
sintomasInput.on('change', datosTurnos);

formulario.on('submit', nuevoTurno);


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
        
        
        // const contenido = $('#contenido');
        // contenido.insertBefore(divMensaje, $('agregar-turno'));  OBSERVACION !! En vez de tirar el alert debajo, desaparece todo el form y lo logro entender como deberia quedar para que funcione

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



