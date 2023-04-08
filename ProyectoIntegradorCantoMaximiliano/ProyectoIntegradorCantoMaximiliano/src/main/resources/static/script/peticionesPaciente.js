window.addEventListener('load', function(){
    // Se declara todas las urls con sus respectivas configuraciones para realizar las peticiones a la api.
    const urlTodos = '/paciente/todos';
    const settingsTodos = {
        method: "GET"
    };

    const urlEliminar = '/paciente/eliminar/';
    const settingsEliminar = {
            method: "DELETE"
    };

    const urlModificar = '/frontendPaciente/modificarPaciente/';

    const urlAgregar = '/frontendPaciente/agregarPaciente';
    // Fin de las declaraciones

    // Se realiza la peticion GET para listar todos los pacientes
    fetch(urlTodos, settingsTodos)
    .then(response => {return response.json()})
    .then(pacientes => {
        renderizarPacientes(pacientes);
    })
    .catch(error => console.log(error));


    function renderizarPacientes(pacientes){

        const tablaPaciente = document.querySelector('.tablaPaciente');
        // Se formateas en fila los pacientes.
        pacientes.forEach(paciente => {
            tablaPaciente.innerHTML += `
                <tr>
                    <th scope='row'>${paciente.id}</th>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.apellido}</td>
                    <td>${paciente.dni}</td>
                    <td>${paciente.fechaIngreso}</td>
                    <td>${paciente.domicilio.id}</td>
                    <td>${paciente.domicilio.calle}</td>
                    <td>${paciente.domicilio.numero}</td>
                    <td>${paciente.domicilio.localidad}</td>
                    <td>${paciente.domicilio.provincia}</td>
                    <td>
                        <button class="editar" value="${paciente.id}">
                           <i class="fa-solid fa-arrows-rotate"></i>
                        </button>
                    </td>
                    <td>
                        <button class="eliminar" value="${paciente.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `
            // Se seleccionan todos los botones editar y eliminar y se le agrega funcionalidad de movimiento y funcionalidad para hacer sus respectivas acciones
            const botonesEditar = document.querySelectorAll('.editar');
            const botonesEliminar = document.querySelectorAll('.eliminar');

            botonesEditar.forEach(botonEditar => {
                botonEditar.addEventListener('mouseover', function(){
                    botonEditar.classList.add('fa-spin');
                });

                botonEditar.addEventListener('mouseout', function(){
                    botonEditar.classList.remove('fa-spin');
                });

                botonEditar.addEventListener('click', function(){
                    let id = this.value;
                    Swal.fire({
                        title: 'Seguro que quieres editar el paciente?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, quiero modificarlo!',
                        cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.replace(urlModificar + id);
                            }
                        })
                })
            })

            botonesEliminar.forEach(botonEliminar => {

                botonEliminar.addEventListener('mouseover', function(){
                    botonEliminar.classList.add('fa-bounce');
                })

                botonEliminar.addEventListener('mouseout', function(){
                    botonEliminar.classList.remove('fa-bounce');
                })

                botonEliminar.addEventListener('click', function(){
                    let id = this.value;
                    Swal.fire({
                      title: 'Seguro que quieres eliminar el paciente?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Si, quiero eliminarlo!',
                      cancelButtonText: 'Cancelar'
                    }).then((result) => {
                      if (result.isConfirmed) {
                            fetch(urlEliminar + id, settingsEliminar)
                            .then(response => {
                                if(response.status == 200){
                                    Swal.fire(
                                        'Eliminado!',
                                        'El paciente a sido eliminado con exito',
                                        'success'
                                    )
                                    const actualizar = setTimeout(function(){
                                        window.location.reload();
                                    }, 2000)
                                }
                            })
                            .catch(error => console.log(error))
                        }
                    })
                })
            });
        });
    }
    // se le agrega funcionalidad al boton agregar
    const botonAgregar = document.querySelector('#agregarPaciente');

    botonAgregar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: 'Seguro que quieres agregar un nuevo paciente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero agregar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace(urlAgregar);
            }
        })
    })
})

    