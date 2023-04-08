package com.example.ProyectoIntegradorCantoMaximiliano.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class AplicacionController {
    private static final Logger logger = Logger.getLogger(AplicacionController.class);
    @GetMapping("/")
    public String index(){
        logger.info("Se accedio al index de la aplicacion.");
        return "index";
    }
}
