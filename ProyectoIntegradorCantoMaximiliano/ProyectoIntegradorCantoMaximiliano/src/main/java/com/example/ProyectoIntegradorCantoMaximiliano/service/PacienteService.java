package com.example.ProyectoIntegradorCantoMaximiliano.service;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Paciente;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    PacienteRepository pacienteRepository;

    public String guardar(Paciente paciente){
        if(pacienteRepository.save(paciente) != null){
            return "OK";
        }
        else {
            return null;
        }
    }

    public Optional<Paciente> buscarPorId(Integer id){
        Optional<Paciente> paciente = Optional.empty();
        paciente = pacienteRepository.findById(id);
        return paciente;
    }

    public boolean eliminar(Integer id){
        if(buscarPorId(id).isPresent()){
            pacienteRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }

    public List<Paciente> obtenerTodos(){
        return pacienteRepository.findAll();
    }

    public boolean modificar(Integer id){
        return buscarPorId(id).isPresent();
    }

    public <T> T existencia (T parametroActualizado, T parametroActualizar){
        if (parametroActualizado != null){
            if (!parametroActualizado.equals(0)){
                return parametroActualizado;
            }
        }
        return parametroActualizar;
    }
}
