package com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
}
