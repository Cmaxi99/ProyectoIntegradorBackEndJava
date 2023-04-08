window.addEventListener('load', function(){
    // Se trae el valor del id pasado por url
    const url = window.location.href;
    const partes = url.split("/");
    const id = parseInt(partes[partes.length - 1]);

    // Se declara las url y las configuraciones para hacer las peticiones
    const urlListado = '/frontendPaciente/listadoPaciente';

    const urlPorId = '/paciente/buscar/' + id;
    const settingsPorId = {
        method: "GET"
    }

    const urlModificarPorId = '/paciente/modificar/' + id;


    // Se cierra las configuraciones

    const botonCancelar = document.querySelector('#cancelar');
    const botonConfirmar = document.querySelector('#confirmar');

    // Se realiza el llamado a las funciones
    traerPacientePorId(urlPorId, settingsPorId);

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
    function traerPacientePorId(urlPorId, settingsPorId){
        // La funcion recibe por parametros la url y la settings para realizar la consulta. Se rellenaran los inputs con los datos del id solicitado
        fetch(urlPorId, settingsPorId)
        .then(response => {return response.json();})
        .then(paciente => {completarInputs(paciente);})
        .catch(error => console.log(error))
    }

    function completarInputs(paciente){
        // Esta funcion recibe por parametro el paciente de la peticion y rellena los inputs con sus datos, sino lanzara un cartel de error y nos enviara al listado nuevamente.
        if(paciente.nombre != undefined){
            const inputNombre = document.querySelector('#nombre');
            const inputApellido = document.querySelector('#apellido');
            const inputDni = document.querySelector('#dni');
            const inputFechaIngreso = document.querySelector('#fechaIngreso');
            const inputIdDomicilio = document.querySelector('#idDomicilio');
            const inputCalle = document.querySelector('#calle');
            const inputNumero = document.querySelector('#altura');
            const inputLocalidad = document.querySelector('#localidad');
            const inputProvincia = document.querySelector('#provincia');

            inputNombre.value = paciente.nombre;
            inputApellido.value = paciente.apellido;
            inputDni.value = paciente.dni;
            inputFechaIngreso.value = paciente.fechaIngreso;
            inputIdDomicilio.value = paciente.domicilio.id;
            inputCalle.value = paciente.domicilio.calle;
            inputNumero.value = paciente.domicilio.numero;
            inputLocalidad.value = paciente.domicilio.localidad;
            inputProvincia.value = paciente.domicilio.provincia;
        } else {
            Swal.fire({
                title: `El paciente con id = ${id} no fue encontrado.`,
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

    function configuracionModificarPacientePorId(){
        const inputNombre = document.querySelector('#nombre');
        const inputApellido = document.querySelector('#apellido');
        const inputDni = document.querySelector('#dni');
        const inputFechaIngreso = document.querySelector('#fechaIngreso');
        const inputIdDomicilio = document.querySelector('#idDomicilio');
        const inputCalle = document.querySelector('#calle');
        const inputNumero = document.querySelector('#altura');
        const inputLocalidad = document.querySelector('#localidad');
        const inputProvincia = document.querySelector('#provincia');

        const formData = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            dni: inputDni.value,
            fechaIngreso: inputFechaIngreso.value,
            domicilio: {
                id: inputIdDomicilio.value,
                calle: inputCalle.value,
                numero: inputNumero.value,
                localidad: inputLocalidad.value,
                provincia: inputProvincia.value
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
        fetch(urlModificarPorId, configuracionModificarPacientePorId())
        .then(response => response.json());
    }

})



