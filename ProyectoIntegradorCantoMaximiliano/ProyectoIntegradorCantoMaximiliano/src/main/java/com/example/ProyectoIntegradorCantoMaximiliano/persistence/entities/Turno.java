package com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "fecha_turno")
    private LocalDate fechaTurno;

    @ManyToOne
    @JoinColumn(name = "odontologo_id")
    private Odontologo odontologo;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    public Turno() {
    }

    public Turno(LocalDate fechaTurno, Odontologo odontologo, Paciente paciente) {
        this.fechaTurno = fechaTurno;
        this.odontologo = odontologo;
        this.paciente = paciente;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public LocalDate getFechaTurno() {
        return fechaTurno;
    }

    public void setFechaTurno(LocalDate fechaTurno) {
        this.fechaTurno = fechaTurno;
    }

    @Override
    public String toString() {
        return "Turno{" +
                "id=" + id +
                ", fechaTurno=" + fechaTurno +
                ", odontologo=" + odontologo +
                ", paciente=" + paciente +
                '}';
    }
}
