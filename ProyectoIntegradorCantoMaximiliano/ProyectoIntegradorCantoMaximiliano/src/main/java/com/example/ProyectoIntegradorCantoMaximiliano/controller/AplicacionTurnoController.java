package com.example.ProyectoIntegradorCantoMaximiliano.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/frontendTurno")
public class AplicacionTurnoController {
    private static final Logger logger = Logger.getLogger(AplicacionTurnoController.class);
    @GetMapping("/listadoTurno")
    public String listarTurno(){
        logger.info("Se accedio al listado de todos los turnos");
        return "listadoTurno";
    }
    @GetMapping("/modificarTurno/{id}")
    public String modificarTurno(){
        logger.info("Se accedio a la modificacion de un turno");
        return "modificarTurno";
    }
    @GetMapping("/agregarTurno")
    public String agregarTurno(){
        logger.info("Se accedio a la vista de agregar un turno");
        return "agregarTurno";
    }
}
