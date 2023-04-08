package com.example.ProyectoIntegradorCantoMaximiliano.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/frontendOdontologo")
public class AplicacionOdontologoController {
    private static final Logger logger = Logger.getLogger(AplicacionOdontologoController.class);
    @GetMapping("/listadoOdontologo")
    public String listarOdontologos(){
        logger.info("Se accedio al listado de todos los odontologos");
        return "listadoOdontologo";
    }
    @GetMapping("/modificarOdontologo/{id}")
    public String modificarOdontologo(){
        logger.info("Se accedio a la modificacion de un odontologo");
        return "modificarOdontologo";
    }
    @GetMapping("/agregarOdontologo")
    public String agregarOdontologo(){
        logger.info("Se accedio a la vista para agregar un odontologo");
        return "agregarOdontologo";
    }

}
