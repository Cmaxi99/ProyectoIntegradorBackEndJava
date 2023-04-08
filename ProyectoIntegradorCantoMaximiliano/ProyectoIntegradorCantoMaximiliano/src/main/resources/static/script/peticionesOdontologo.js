window.addEventListener('load', function(){
    // Se declara todas las urls con sus respectivas configuraciones para realizar las peticiones a la api.
    const urlTodos = '/odontologos/todos';
    const settingsTodos = {
        method: "GET"
    };

    const urlEliminar = '/odontologos/eliminar/';
    const settingsEliminar = {
            method: "DELETE"
    };

    const urlModificar = '/frontendOdontologo/modificarOdontologo/';

    const urlAgregar = '/frontendOdontologo/agregarOdontologo';
    // Fin de las declaraciones

    // Se realiza la peticion GET para listar todos los odontologos
    fetch(urlTodos, settingsTodos)
    .then(response => {return response.json()})
    .then(odontologos => {
        renderizarOdontologos(odontologos);
    })
    .catch(error => console.log(error));

    // Se crea una funcion que recibe como parametro la respuesta de la peticion y lo renderiza en formato tabla
    function renderizarOdontologos(odontologos){
        const tablaOdontologo = document.querySelector('.tablaOdontologo');
        // Se formatea en fila los odontologos.
        odontologos.forEach(odontologo => {
            tablaOdontologo.innerHTML += `
                <tr>
                    <th scope='row'>${odontologo.id}</th>
                    <td>${odontologo.nombre}</td>
                    <td>${odontologo.apellido}</td>
                    <td>${odontologo.matricula}</td>
                    <td>
                        <button class="editar" value="${odontologo.id}">
                           <i class="fa-solid fa-arrows-rotate"></i>
                        </button>
                    </td>
                    <td>
                        <button class="eliminar" value="${odontologo.id}">
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
                        title: 'Seguro que quieres editar el odontologo?',
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
                      title: 'Seguro que quieres eliminar el odontologo?',
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
                                        'El odontologo a sido eliminado con exito',
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
    const botonAgregar = document.querySelector('#agregarOdontologo');

    botonAgregar.addEventListener('click', function(e){
        e.preventDefault();
        Swal.fire({
            title: 'Seguro que quieres agregar un nuevo odontologo?',
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
    
