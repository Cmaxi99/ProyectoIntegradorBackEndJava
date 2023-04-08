window.addEventListener('load', function(){
    // Se trae el valor del id pasado por url
    const url = window.location.href;
    const partes = url.split("/");
    const id = parseInt(partes[partes.length - 1]);

    // Se declara las url y las configuraciones para hacer las peticiones
    const urlListado = '/frontendOdontologo/listadoOdontologo';

    const urlPorId = '/odontologos/buscar/' + id;
    const settingsPorId = {
        method: "GET"
    }

    const urlModificarPorId = '/odontologos/modificar/' + id;


    // Se cierra las configuraciones

    const botonCancelar = document.querySelector('#cancelar');
    const botonConfirmar = document.querySelector('#confirmar');
    // Se realiza el llamado a las funciones
    traerOdontologoPorId(urlPorId, settingsPorId);

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
    function traerOdontologoPorId(urlPorId, settingsPorId){
        // La funcion recibe por parametros la url y la settings para realizar la consulta. Se rellenaran los inputs con los datos del id solicitado
        fetch(urlPorId, settingsPorId)
        .then(response => {return response.json();})
        .then(odontologo => {completarInputs(odontologo);})
        .catch(error => console.log(error))
    }

    function completarInputs(odontologo){
        // Esta funcion recibe por parametro el odontologo de la peticion y rellena los inputs con sus datos, sino lanzara un cartel de error y nos enviara al listado nuevamente.
        if(odontologo.nombre != undefined){
            const inputNombre = document.querySelector('#nombre');
            const inputApellido = document.querySelector('#apellido');
            const inputMatricula = document.querySelector('#matricula');

            inputNombre.value = odontologo.nombre;
            inputApellido.value = odontologo.apellido;
            inputMatricula.value = odontologo.matricula;
        } else {
            Swal.fire({
                title: `El odontologo con id = ${id} no fue encontrado.`,
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

    function configuracionModificarOdontologoPorId(){
        const inputNombre = document.querySelector('#nombre');
        const inputApellido = document.querySelector('#apellido');
        const inputMatricula = document.querySelector('#matricula');

        const formData = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            matricula: inputMatricula.value,
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
        fetch(urlModificarPorId, configuracionModificarOdontologoPorId())
        .then(response => response.json());
    }

})



