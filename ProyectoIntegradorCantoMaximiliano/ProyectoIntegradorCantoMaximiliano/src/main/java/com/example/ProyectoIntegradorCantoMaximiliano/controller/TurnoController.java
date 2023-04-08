package com.example.ProyectoIntegradorCantoMaximiliano.controller;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Turno;
import com.example.ProyectoIntegradorCantoMaximiliano.service.TurnoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turno")
public class TurnoController {
    @Autowired
    TurnoService turnoService;
    private static final Logger logger = Logger.getLogger(Turno.class);

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody Turno turno){
        ResponseEntity<String> respuesta = null;
        if (turnoService.guardar(turno) != null){
            respuesta = ResponseEntity.ok("El turno fue registrado correctamente.");
            logger.info("El " + turno.toString() + " fue registrado correctamente");
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El turno no pudo ser registrado correctamente.");
            logger.error("El " + turno.toString() + " no pudo ser registrado correctamente.");
        }
        return respuesta;
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Turno>> consultarTodos(){
        logger.info("Se accedio a la informacion de todos los turnos");
        return ResponseEntity.ok(turnoService.obtenerTodos());
    }

    @GetMapping("/buscar/{id}")
    public Optional<Object> buscar(@PathVariable Integer id){
        String respuesta = "El turno con id = " + id + " no fue encontrado.";
        if (turnoService.buscarPorId(id).isPresent()){
            logger.info("Se accedio a la informacion del turno con id = " + id + " correctamente.");
            return Optional.ofNullable(turnoService.buscarPorId(id));
        }
        else {
            logger.error("No se pudo acceder a la informacion del turno con id = " + id);
            return Optional.of(respuesta);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String>eliminar(@PathVariable Integer id){
        ResponseEntity<String> respuesta;
        if (turnoService.eliminar(id)){
            respuesta = ResponseEntity.ok("El turno fue eliminado correctamente.");
            logger.info("Se elimino el registro del turno con id = " + id + " correctamente");
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El turno no pudo ser eliminado o ya fue eliminado.");
            logger.error("No se pudo eliminar el registro del turno con id = " + id);
        }
        return respuesta;
    }

    @PutMapping("/modificar/{id}")
    public ResponseEntity<String>modificar(@PathVariable Integer id, @RequestBody Optional<Turno> turnoActualizado){
        ResponseEntity<String> respuesta = null;
        Optional<Turno> turno = Optional.empty();
        if (turnoService.modificar(id)){
            turno = turnoService.buscarPorId(id);
            turno.get().setFechaTurno(turnoService.existencia(turnoActualizado.get().getFechaTurno(), turno.get().getFechaTurno()));
            turno.get().setOdontologo(turnoService.existencia(turnoActualizado.get().getOdontologo(), turno.get().getOdontologo()));
            turno.get().setPaciente(turnoService.existencia(turnoActualizado.get().getPaciente(), turno.get().getPaciente()));
            turnoService.guardar(turno.get());
            respuesta = ResponseEntity.ok("El turno con id = " + id + " fue modificado correctamente.");
            logger.info("Se modifico el registro del turno con id = " + id + " correctamente");
            logger.info(turno.toString() + " se cambio la informacion por: " + turnoActualizado.toString());
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El turno con id = " + id + " no pudo ser modificado correctamente.");
            logger.error("No se pudo modificar el turno con id = " + id);
        }
        return respuesta;
    }
}
