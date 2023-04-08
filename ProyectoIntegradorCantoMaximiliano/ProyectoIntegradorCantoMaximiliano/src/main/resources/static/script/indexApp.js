window.addEventListener('load', function(){

    const botonOdontologo = document.querySelector('#botonOdontologo');
    const botonPaciente = document.querySelector('#botonPaciente');
    const botonTurno = document.querySelector('#botonTurno');

    botonOdontologo.addEventListener('click', function(e){
        document.location.replace('/frontendOdontologo/listadoOdontologo');
    })

    botonPaciente.addEventListener('click', function(e){
        document.location.replace('/frontendPaciente/listadoPaciente');
    })

    botonTurno.addEventListener('click', function(e){
        document.location.replace('/frontendTurno/listadoTurno');
    })
})