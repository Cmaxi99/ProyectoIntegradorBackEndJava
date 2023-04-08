window.addEventListener('load', function(){
    const urlAgregar = '/paciente/registrar';
    const urlListado = '/frontendPaciente/listadoPaciente';
    const botonCancelar = document.querySelector('#cancelar');
    const botonConfirmar = document.querySelector('#confirmar')
    // Se realiza el llamado a las funciones
    botonConfirmar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: `Esta seguro que desea agregar al paciente?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    agregarPaciente(urlAgregar);
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


    function configuracionAgregarPaciente(){
        const inputNombre = document.querySelector('#nombre');
        const inputApellido = document.querySelector('#apellido');
        const inputDni = document.querySelector('#dni');
        const inputFechaIngreso = document.querySelector('#fechaIngreso');
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
                calle: inputCalle.value,
                numero: inputNumero.value,
                localidad: inputLocalidad.value,
                provincia: inputProvincia.value
            }
        };

        const settingsAgregar = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        return settingsAgregar;
    }

    function agregarPaciente(urlAgregar){
        fetch(urlAgregar, configuracionAgregarPaciente())
        .then(response => response.json());
    }
})