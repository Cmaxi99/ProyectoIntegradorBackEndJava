package com.example.ProyectoIntegradorCantoMaximiliano.controller;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Odontologo;
import com.example.ProyectoIntegradorCantoMaximiliano.service.OdontologoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/odontologos")
public class OdontologoController {
    @Autowired
    OdontologoService odontologoService;
    private static final Logger logger = Logger.getLogger(OdontologoController.class);

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody Odontologo odontologo){
        ResponseEntity<String> respuesta = null;

        if (odontologoService.guardar(odontologo) != null){
            respuesta = ResponseEntity.ok("El odontologo fue registrado correctamente.");
            logger.info("El " + odontologo.toString() + " fue registrado correctamente.");
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El odontologo no pudo ser registrado correctamente.");
            logger.error("El " + odontologo.toString() + " no pudo ser registrado correctamente.");
        }

        return respuesta;
    }

    @GetMapping("/buscar/{id}")
    public Optional<Object> buscar(@PathVariable Integer id){
        String respuesta = "El odontologo con id = " + id + " no fue encontrado.";
        if (odontologoService.buscarPorId(id).isPresent()){
            logger.info("Se accedio a la informacion del odontologo con id = " + id + " correctamente.");
            return Optional.ofNullable(odontologoService.buscarPorId(id));
        }
        else {
            logger.error("No se pudo acceder a la informacion del odontologo con id = " + id);
            return Optional.of(respuesta);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Integer id){
        ResponseEntity<String> respuesta = null;
        if (odontologoService.eliminar(id)){
            respuesta = ResponseEntity.ok("El odontolo con id = " + id + " fue eliminado correctamente.");
            logger.info("Se elimino el registro del odontologo con id = " + id + " correctamente");
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El odontologo con id = " + id + " ya fue eliminado o no existe.");
            logger.error("No se pudo eliminar el registro del odontologo con id = " + id);
        }
        return respuesta;
    }

    @PutMapping ("/modificar/{id}")
    public ResponseEntity<String> modificar(@PathVariable Integer id, @RequestBody Optional<Odontologo> odontologoActualizado){
        ResponseEntity<String> respuesta = null;
        Optional<Odontologo> odontologo = Optional.empty();
        if(odontologoService.modificar(id)){
            odontologo = odontologoService.buscarPorId(id);
            odontologo.get().setNombre(odontologoService.existencia(odontologoActualizado.get().getNombre(), odontologo.get().getNombre()));
            odontologo.get().setApellido(odontologoService.existencia(odontologoActualizado.get().getApellido(), odontologo.get().getApellido()));
            odontologo.get().setMatricula(odontologoService.existencia(odontologoActualizado.get().getMatricula(), odontologo.get().getMatricula()));
            odontologoService.guardar(odontologo.get());
            respuesta = ResponseEntity.ok("El odontologo con id = " + id + " fue modificado con exito.");
            logger.info("Se modifico el registro del odontologo con id = " + id + " correctamente");
            logger.info(odontologo.toString() + " se cambio la informacion por: " + odontologoActualizado.toString());
        }
        else {
            respuesta = ResponseEntity.internalServerError().body("El odontologo con id = " + id + " no se pudo modificar.");
            logger.error("No se pudo modificar el odontologo con id = " + id);
        }

        return respuesta;
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Odontologo>> consultarTodos(){
        logger.info("Se accedio a la informacion de todos los odontologos");
        return ResponseEntity.ok(odontologoService.obtenerTodos());
    }

}
