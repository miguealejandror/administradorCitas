import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';
let editando;

const administrarCitas = new Citas();
const ui = new UI();

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

// Llenar obj
export function datosCita(e){
    citaObj[e.target.name] = e.target.value;

}
// Validar y agregar una nueva cita
export function nuevaCita(e){
    e.preventDefault();
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');
        administrarCitas.editarCita({...citaObj});
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editando = false;
    } else {
        // ID
        citaObj.id = Date.now();
        // Crear Cita
        administrarCitas.agregarCita({...citaObj});
        ui.imprimirAlerta('Se agregó correctamente');
    }


    reiniciarObj();
    formulario.reset();
    // Mostrar Citas en el HTML
    ui.imprimirCitas(administrarCitas);

}

export function reiniciarObj(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}
export function eliminarCita(id){
    administrarCitas.eliminarCita(id);
    ui.imprimirAlerta('La cita se eliminó correctamente');
    ui.imprimirCitas(administrarCitas);

}

export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    //Lenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    // Llenar Objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    // Cambiar Texto del Boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'

    editando = true;
}