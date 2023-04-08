window.addEventListener('load', function(){
    const urlAgregar = '/odontologos/registrar';
    const urlListado = '/frontendOdontologo/listadoOdontologo';
    const botonCancelar = document.querySelector('#cancelar');
    const botonConfirmar = document.querySelector('#confirmar')
    // Se realiza el llamado a las funciones

    botonConfirmar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: `Esta seguro que desea agregar al odontologo?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    agregarOdontologo(urlAgregar);
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


    function configuracionAgregarOdontologo(){
        const inputNombre = document.querySelector('#nombre');
        const inputApellido = document.querySelector('#apellido');
        const inputMatricula = document.querySelector('#matricula');

        const formData = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            matricula: inputMatricula.value,
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

    function agregarOdontologo(urlAgregar){
        fetch(urlAgregar, configuracionAgregarOdontologo())
        .then(response => response.json());
    }
})