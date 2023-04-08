package com.example.ProyectoIntegradorCantoMaximiliano;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Odontologo;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.OdontologoRepository;
import com.example.ProyectoIntegradorCantoMaximiliano.service.OdontologoService;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class OdontologoServiceTest {

    @Autowired
    private OdontologoService odontologoService;
    private OdontologoRepository odontologoRepository;
    private Odontologo odontologo;
    @BeforeEach
    public void cargarDatos() throws SQLException{
        Odontologo o = new Odontologo("Maximilian", "Canto", 1234);
        odontologoService.guardar(o);
        Odontologo o1 = new Odontologo("Alejandro", "Babile", 1234);
        odontologoService.guardar(o1);
    }

    @Test
    public void guardarRegistro(){
        Odontologo o2 = new Odontologo("Franco", "Stupa", 1234);
        Assert.assertFalse(odontologoService.guardar(o2).isEmpty());
        System.out.println(o2);
    }

    @Test
    public void buscarPorId(){
        Odontologo o3 = new Odontologo("Daniel", "Garcia", 1234);
        odontologoService.guardar(o3);
        Optional<Odontologo> odontologo = odontologoService.buscarPorId(1);
        Optional<Odontologo> odontologo1 = odontologoService.buscarPorId(o3.getId());
        Assert.assertTrue(odontologo.isPresent() && odontologo1.isPresent());
        System.out.println(odontologo + " " + odontologo1);
    }

    @Test
    public void traerTodos(){
        List<Odontologo> odontologos = odontologoService.obtenerTodos();
        Assert.assertFalse(odontologos.isEmpty());
        System.out.println(odontologos);
    }





}
