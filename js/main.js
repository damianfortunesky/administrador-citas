// Selectoress
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita');
formulario.addEventListener('submit', nuevaCita);

let editando = false;

// Eventos                                  
mascotaInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
telefonoInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
horaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);


const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}

function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Clases
class Citas {           // Esta clase es para administrar todo lo referido a las citas creadas
    constructor() {
        this.citas = [] // Necesito el constructor para crear el array
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id); // crea un nuevo array con todos los elementos que cumplan la condición dada por la función 
    }
}

class UI {                          // Esta clase es para la interfaz de usuario, se encarga de todo lo que se imprime en pantalla
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-dark');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#contenido').insertBefore( divMensaje , document.querySelector('.agregar-cita'));

        // Eliminar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
    }

   imprimirCitas({citas}) { 
       
        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Creando elementos
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.innerHTML = `${mascota}`;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

            // Agrega un botón para eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // Agrega la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar'

            // Agrega un botón para editar
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita);

            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar'

            // Agregar al HTML
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        });    
   }

   limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
   }
}

const ui = new UI();                  // Clase ui (user interface) instanciada
const administrarCitas = new Citas(); // Clase Citas instanciada

// Funciones
function nuevaCita(e) {
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === ''  || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando) {
        // Estamos editando
        administrarCitas.editarCita( {...citaObj} );

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    } else {
        // Genero un ID para las class Citas
        citaObj.id = Date.now();
        
        // Agrega la cita
        administrarCitas.agregarCita({...citaObj});

        // Mostrar mensaje 
        ui.imprimirAlerta('Se agregó correctamente')
    }


    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);

    // Reinicia el objeto
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

}

function reiniciarObjeto() {  // Reiniciar el objeto
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita) {

    const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Reiniciar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}
