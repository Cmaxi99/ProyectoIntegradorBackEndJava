package com.example.ProyectoIntegradorCantoMaximiliano.controller;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Paciente;
import com.example.ProyectoIntegradorCantoMaximiliano.service.PacienteService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    @Autowired
    PacienteService pacienteService;
    private static final Logger logger = Logger.getLogger(PacienteController.class);
    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody Paciente paciente){
        ResponseEntity<String> respuesta;
        if (pacienteService.guardar(paciente) != null){
            respuesta = ResponseEntity.ok("El paciente fue registrado correctamente.");
            logger.info("El " + paciente.toString() + " fue registrado correctamente");
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El paciente no pudo registrarse correctamente.");
            logger.error("El " + paciente.toString() + " no pudo ser registrado correctamente.");
        }

        return respuesta;
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Paciente>> consultarTodos(){
        logger.info("Se accedio a la informacion de todos los pacientes");
        return ResponseEntity.ok(pacienteService.obtenerTodos());
    }

    @GetMapping("/buscar/{id}")
    public Optional<Object> buscar(@PathVariable Integer id){
        String respuesta = "El paciente con id = " + id + " no fue encontrado.";
        if (pacienteService.buscarPorId(id).isPresent()){
            logger.info("Se accedio a la informacion del paciente con id = " + id + " correctamente.");
            return Optional.ofNullable(pacienteService.buscarPorId(id));
        }
        else {
            logger.error("No se pudo acceder a la informacion del paciente con id = " + id);
            return Optional.of(respuesta);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Integer id){
        ResponseEntity<String> respuesta = null;
        if (pacienteService.eliminar(id)){
            respuesta = ResponseEntity.ok("El paciente con id = " + id + " fue eliminado correctamente.");
            logger.info("Se elimino el registro del paciente con id = " + id + " correctamente");
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El paciente con id = " + id + " ya fue eliminado o no existe.");
            logger.error("No se pudo eliminar el registro del paciente con id = " + id);
        }
        return respuesta;
    }

    @PutMapping ("/modificar/{id}")
    public ResponseEntity<String> modificar(@PathVariable Integer id, @RequestBody Optional<Paciente> pacienteActualizado){
        ResponseEntity<String> respuesta = null;
        Optional<Paciente> paciente = Optional.empty();
        if(pacienteService.modificar(id)){
            paciente = pacienteService.buscarPorId(id);
            paciente.get().setNombre(pacienteService.existencia(pacienteActualizado.get().getNombre(), paciente.get().getNombre()));
            paciente.get().setApellido(pacienteService.existencia(pacienteActualizado.get().getApellido(), paciente.get().getApellido()));
            paciente.get().setDni(pacienteService.existencia(pacienteActualizado.get().getDni(), paciente.get().getDni()));
            paciente.get().setFechaIngreso(pacienteService.existencia(pacienteActualizado.get().getFechaIngreso(), paciente.get().getFechaIngreso()));
            paciente.get().setDomicilio(pacienteService.existencia(pacienteActualizado.get().getDomicilio(), paciente.get().getDomicilio()));
            pacienteService.guardar(paciente.get());
            respuesta = ResponseEntity.ok("El paciente con id = " + id + " fue modificado con exito.");
            logger.info("Se modifico el registro del paciente con id = " + id + " correctamente");
            logger.info(paciente.toString() + " se cambio la informacion por: " + pacienteActualizado.toString());
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El paciente con id = " + id + " no se pudo modificar.");
            logger.error("No se pudo modificar el paciente con id = " + id);
        }

        return respuesta;
    }

}
