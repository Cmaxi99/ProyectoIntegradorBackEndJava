window.addEventListener('load', function(){
    // Se trae el valor del id pasado por url
    const url = window.location.href;
    const partes = url.split("/");
    const id = parseInt(partes[partes.length - 1]);

    // Se declara las url y las configuraciones para hacer las peticiones
    const urlListado = '/frontendTurno/listadoTurno';

    const urlPorId = '/turno/buscar/' + id;
    const settingsPorId = {
        method: "GET"
    }

    const urlModificarPorId = '/turno/modificar/' + id;

    const urlTodosOdontologos = '/odontologos/todos';
    const settingsTodosOdontologos = {
        method: "GET"
    };

    const urlTodosPacientes = '/paciente/todos';
    const settingsTodosPacientes = {
        method: "GET"
    };
    // Se cierra las configuraciones

    const botonCancelar = document.querySelector('#cancelar');
    const botonConfirmar = document.querySelector('#confirmar');

    // Se realiza el llamado a las funciones
    traerTurnoPorId(urlPorId, settingsPorId);
    traerTodosLosOdontologos(urlTodosOdontologos, settingsTodosOdontologos);
    traerTodosLosPacientes(urlTodosPacientes, settingsTodosPacientes);
    // Se cierra el llamado a las funciones

    botonConfirmar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: `Esta seguro que desea modificar los datos?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    realizarModificacion(urlModificarPorId);
                    window.location.replace(urlListado);
                }
            });
    })

    botonCancelar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: `Esta seguro que desea cancelar la modificacion de los datos?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace(urlListado);
                }
            });
    })

    // Se declaran las funciones
    function traerTurnoPorId(urlPorId, settingsPorId){
        // La funcion recibe por parametros la url y la settings para realizar la consulta. Se rellenaran los inputs con los datos del id solicitado
        fetch(urlPorId, settingsPorId)
        .then(response => {return response.json();})
        .then(turno => {completarSelectsConSeleccionado(turno);})
        .catch(error => console.log(error))
    }

    function completarSelectsConSeleccionado(turno){
        // Esta funcion recibe por parametro el odontologo de la peticion y rellena los inputs con sus datos, sino lanzara un cartel de error y nos enviara al listado nuevamente.
        if(turno.odontologo.nombre != undefined){
            const inputfechaTurno = document.querySelector('#fechaTurno');
            const selectOdontologo = document.querySelector('#selectOdontologo');
            const selectPaciente = document.querySelector('#selectPaciente');

            inputfechaTurno.value = turno.fechaTurno;

            selectOdontologo.innerHTML += `
                <option value=${turno.odontologo.id} selected>${turno.odontologo.nombre + " " + turno.odontologo.apellido}</option>
            `;
            selectPaciente.innerHTML += `
                <option value=${turno.paciente.id} selected>${turno.paciente.nombre + " " + turno.paciente.apellido}</option>
            `;
        } else {
            Swal.fire({
                title: `El turno con id = ${id} no fue encontrado.`,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Volver al listado'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace(urlListado);
                    }
                    else{
                        window.location.replace(urlListado);
                    }
                });
        }
    }

    function configuracionModificarTurnoPorId(){
        const inputFecha = document.querySelector('#fechaTurno');
        const selectOdontologo = document.querySelector('#selectOdontologo');
        const selectPaciente = document.querySelector('#selectPaciente');

        const formData = {
            fechaTurno: inputFecha.value,
            odontologo:{
                id: selectOdontologo.value
            },
            paciente:{
                id: selectPaciente.value
            }
        };

        const settingsModificarPorId = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        return settingsModificarPorId;
    }

    function realizarModificacion(urlModificarPorId){
        fetch(urlModificarPorId, configuracionModificarTurnoPorId())
        .then(response => response.json());
    }

    function traerTodosLosOdontologos(urlTodos, settingsTodos){
        // La funcion recibe por parametros la url y la settings para realizar la consulta. Se rellenaran los inputs con los datos del id solicitado
        fetch(urlTodosOdontologos, settingsTodosOdontologos)
        .then(response => {return response.json();})
        .then(odontologos => {completarSelectOdontologo(odontologos);})
        .catch(error => console.log(error))
    }

    function completarSelectOdontologo(odontologos){
        const selectOdontologo = document.querySelector('#selectOdontologo');
        const idOdontologoOriginal = selectOdontologo.value;
        odontologos.forEach(odontologo => {
            if(odontologo.id != idOdontologoOriginal){
                selectOdontologo.innerHTML += `
                    <option value=${odontologo.id}>${odontologo.nombre + " " + odontologo.apellido}</option>
                `;
            }
        });
    }

    function traerTodosLosPacientes(urlTodos, settingsTodos){
        // La funcion recibe por parametros la url y la settings para realizar la consulta. Se rellenaran los inputs con los datos del id solicitado
        fetch(urlTodosPacientes, settingsTodosPacientes)
        .then(response => {return response.json();})
        .then(pacientes => {completarSelectPaciente(pacientes);})
        .catch(error => console.log(error))
    }

    function completarSelectPaciente(pacientes){
        const selectPaciente = document.querySelector('#selectPaciente');
        const idPacienteOriginal = selectPaciente.value;
        pacientes.forEach(paciente => {
            if(paciente.id != idPacienteOriginal){
                selectPaciente.innerHTML += `
                    <option value=${paciente.id}>${paciente.nombre + " " + paciente.apellido}</option>
                `;
            }
        });
    }
    
})