window.addEventListener('load', function(){
    // Se declara las url y las configuraciones para hacer las peticiones
    const urlListado = '/frontendTurno/listadoTurno';
    const urlAgregar = '/turno/registrar';

    const urlTodosOdontologos = '/odontologos/todos';
    const settingsTodosOdontologos = {
        method: "GET"
    };

    const urlTodosPacientes = '/paciente/todos';
    const settingsTodosPacientes = {
         method: "GET"
    };
    // Se cierra las configuraciones

    // Se llama a las funciones
    traerTodosLosOdontologos(urlTodosOdontologos, settingsTodosOdontologos);
    traerTodosLosPacientes(urlTodosPacientes, settingsTodosPacientes);
    // Se cierra

    const botonCancelar = document.querySelector('#cancelar');
    const botonConfirmar = document.querySelector('#confirmar');

    botonConfirmar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: `Esta seguro que desea agregar el turno?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    agregarTurno(urlAgregar);
                    window.location.replace(urlListado);
                }
            });
    })

    botonCancelar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: `Esta seguro que desea cancelar?`,
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

    function traerTodosLosOdontologos(urlTodos, settingsTodos){
        // La funcion recibe por parametros la url y la settings para realizar la consulta. Se rellenaran los inputs con los datos del id solicitado
        fetch(urlTodosOdontologos, settingsTodosOdontologos)
        .then(response => {return response.json();})
        .then(odontologos => {completarSelectOdontologo(odontologos);})
        .catch(error => console.log(error))
    }

    function completarSelectOdontologo(odontologos){
        const selectOdontologo = document.querySelector('#selectOdontologo');
        odontologos.forEach(odontologo => {
            selectOdontologo.innerHTML += `
                <option value=${odontologo.id}>${odontologo.nombre + " " + odontologo.apellido}</option>
            `;
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
        pacientes.forEach(paciente => {
            selectPaciente.innerHTML += `
                <option value=${paciente.id}>${paciente.nombre + " " + paciente.apellido}</option>
            `;
        });
    }

    function configuracionAgregarTurno(){
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        return settingsModificarPorId;
    }

    function agregarTurno(urlAgregar){
        fetch(urlAgregar, configuracionAgregarTurno())
        .then(response => response.json());
    }
})
    