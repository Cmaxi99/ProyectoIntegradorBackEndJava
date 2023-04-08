package com.example.ProyectoIntegradorCantoMaximiliano;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Domicilio;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Odontologo;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Paciente;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Turno;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.OdontologoRepository;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.PacienteRepository;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.TurnoRepository;
import com.example.ProyectoIntegradorCantoMaximiliano.service.OdontologoService;
import com.example.ProyectoIntegradorCantoMaximiliano.service.PacienteService;
import com.example.ProyectoIntegradorCantoMaximiliano.service.TurnoService;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Optional;

@SpringBootTest
public class TurnoServiceTest {
    @Autowired
    private TurnoService turnoService;
    private TurnoRepository turnoRepository;
    private Turno turno;

    @Autowired
    private OdontologoService odontologoService;
    private OdontologoRepository odontologoRepository;
    private Odontologo odontologo;

    @Autowired
    private PacienteService pacienteService;
    private PacienteRepository pacienteRepository;
    private Paciente paciente;

    @BeforeEach
    public void cargarDatos() throws SQLException {
        Odontologo o = new Odontologo("Maximilian", "Canto", 1234);
        odontologoService.guardar(o);

        LocalDate fechaIngreso = LocalDate.now();
        Domicilio domicilio = new Domicilio("Falsa", "123", "Springfield", "USA");
        Paciente paciente = new Paciente("Fernando", "Belasteguin", 12345678, fechaIngreso, domicilio);
        pacienteService.guardar(paciente);

        LocalDate fechaTurno = LocalDate.now();
        Turno turno = new Turno(fechaTurno, o, paciente);
        turnoService.guardar(turno);

    }

    @Test
    public void guardarRegistro(){
        Odontologo o1 = new Odontologo("Carlos", "Alberto", 1234);
        odontologoService.guardar(o1);

        LocalDate fechaIngreso1 = LocalDate.now();
        Domicilio domicilio1 = new Domicilio("Alvear", "123", "San martin", "BSAS");
        Paciente paciente1 = new Paciente("Agustin", "Tapia", 12345678, fechaIngreso1, domicilio1);
        pacienteService.guardar(paciente1);

        LocalDate fechaTurno1 = LocalDate.now();
        Turno turno1 = new Turno(fechaTurno1, o1, paciente1);
        turnoService.guardar(turno1);
        Assert.assertFalse(turnoService.guardar(turno1).isEmpty());
        System.out.println(turno1);
    }

    @Test
    public void buscarPorId(){
        Odontologo o2 = new Odontologo("Alejandro", "Babile", 1234);
        odontologoService.guardar(o2);

        LocalDate fechaIngreso2 = LocalDate.now();
        Domicilio domicilio2 = new Domicilio("Calle Falsa", "123", "Springfield", "Estados Unidos");
        Paciente paciente2 = new Paciente("Homero", "Simpson", 12345678, fechaIngreso2, domicilio2);
        pacienteService.guardar(paciente2);

        LocalDate fechaTurno2 = LocalDate.now();
        Turno turno2 = new Turno(fechaTurno2, o2, paciente2);
        turnoService.guardar(turno2);

        Optional<Turno> turno = turnoService.buscarPorId(1);
        Optional<Turno> turno1 = turnoService.buscarPorId(turno2.getId());

        Assert.assertTrue(turno.isPresent() && turno1.isPresent());
        System.out.println(turno + " " + turno1);
    }
}
