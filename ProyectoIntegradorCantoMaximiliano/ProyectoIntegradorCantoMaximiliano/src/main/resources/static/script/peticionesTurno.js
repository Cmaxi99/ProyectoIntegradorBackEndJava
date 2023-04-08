window.addEventListener('load', function(){

    // Se declara todas las urls con sus respectivas configuraciones para realizar las peticiones a la api.
    const urlTodos = '/turno/todos';
    const settingsTodos = {
        method: "GET"
    };

    const urlEliminar = '/turno/eliminar/';
    const settingsEliminar = {
            method: "DELETE"
    };

    const urlModificar = '/frontendTurno/modificarTurno/';

    const urlAgregar = '/frontendTurno/agregarTurno';
    // Fin de las declaraciones

    // Se realiza la peticion GET para listar todos los turnos
    fetch(urlTodos, settingsTodos)
    .then(response => {return response.json()})
    .then(turnos => {
        renderizarTurnos(turnos);
    })
    .catch(error => console.log(error));


    function renderizarTurnos(turnos){
        const tablaTurno = document.querySelector('.tablaTurno');
        // Se formateas en fila los pacientes.
        turnos.forEach(turno => {
            tablaTurno.innerHTML += `
                <tr>
                    <th scope='row'>${turno.id}</th>
                    <td>${turno.fechaTurno}</td>
                    <td>${turno.odontologo.nombre + " " + turno.odontologo.apellido}</td>
                    <td>${turno.odontologo.matricula}</td>
                    <td>${turno.paciente.nombre + " " + turno.paciente.apellido}</td>
                    <td>${turno.paciente.dni}</td>
                    <td>
                        <button class="editar" value="${turno.id}">
                           <i class="fa-solid fa-arrows-rotate"></i>
                        </button>
                    </td>
                    <td>
                        <button class="eliminar" value="${turno.id}">
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
                        title: 'Seguro que quieres editar el turno?',
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
                      title: 'Seguro que quieres eliminar el turno?',
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
                                        'El turno a sido eliminado con exito',
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

    const botonAgregar = document.querySelector('#agregarTurno');

    botonAgregar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: 'Seguro que quieres agregar un nuevo turno?',
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