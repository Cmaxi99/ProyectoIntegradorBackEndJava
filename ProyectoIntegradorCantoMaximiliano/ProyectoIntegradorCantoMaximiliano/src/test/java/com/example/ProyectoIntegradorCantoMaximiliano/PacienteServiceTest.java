package com.example.ProyectoIntegradorCantoMaximiliano;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Domicilio;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Odontologo;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Paciente;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.OdontologoRepository;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.PacienteRepository;
import com.example.ProyectoIntegradorCantoMaximiliano.service.OdontologoService;
import com.example.ProyectoIntegradorCantoMaximiliano.service.PacienteService;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class PacienteServiceTest {
    @Autowired
    private PacienteService pacienteService;
    private PacienteRepository pacienteRepository;
    private Paciente paciente;
    @BeforeEach
    public void cargarDatos() throws SQLException {
        LocalDate fechaIngreso = LocalDate.now();
        Domicilio domicilio = new Domicilio("Falsa", "123", "Springfield", "USA");
        Paciente paciente = new Paciente("Fernando", "Belasteguin", 12345678, fechaIngreso, domicilio);
        pacienteService.guardar(paciente);
        Domicilio domicilio1 = new Domicilio("Av. Corrientes", "1234", "Buenos Aires", "Argentina");
        Paciente paciente1 = new Paciente("Juan", "Pérez", 34567890, fechaIngreso, domicilio1);
        pacienteService.guardar(paciente1);
    }

    @Test
    public void guardarRegistro(){
        LocalDate fechaIngreso = LocalDate.now();
        Domicilio domicilio2 = new Domicilio("Bolivia", "456", "Villa pueyrredon", "CABA");
        Paciente paciente2 = new Paciente("María", "González", 23456789, fechaIngreso, domicilio2);
        Assert.assertFalse(pacienteService.guardar(paciente2).isEmpty());
        System.out.println(paciente2);
    }

    @Test
    public void buscarPorId(){
        LocalDate fechaIngreso = LocalDate.now();
        Domicilio domicilio3 = new Domicilio("Calle Falsa", "123", "Springfield", "Estados Unidos");
        Paciente paciente3 = new Paciente("Homero", "Simpson", 12345678, fechaIngreso, domicilio3);
        pacienteService.guardar(paciente3);
        Optional<Paciente> paciente = pacienteService.buscarPorId(1);
        Optional<Paciente> paciente1 = pacienteService.buscarPorId(paciente3.getId());
        Assert.assertTrue(paciente.isPresent() && paciente1.isPresent());
        System.out.println(paciente + " " + paciente1);
    }

    @Test
    public void traerTodos(){
        List<Paciente> pacientes = pacienteService.obtenerTodos();
        Assert.assertFalse(pacientes.isEmpty());
        System.out.println(pacientes);
    }




}
