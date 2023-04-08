package com.example.ProyectoIntegradorCantoMaximiliano.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/frontendPaciente")
public class AplicacionPacienteController {
    private static final Logger logger = Logger.getLogger(AplicacionPacienteController.class);
    @GetMapping("/listadoPaciente")
    public String listarPaciente(){
        logger.info("Se accedio al listado de todos los pacientes");
        return "listadoPaciente";
    }
    @GetMapping("/modificarPaciente/{id}")
    public String modificarPaciente(){
        logger.info("Se accedio a la modificacion de un paciente");
        return "modificarPaciente";
    }
    @GetMapping("/agregarPaciente")
    public String agregarPaciente(){
        logger.info("Se accedio a la vista de agregar un paciente");
        return "agregarPaciente";
    }
}
