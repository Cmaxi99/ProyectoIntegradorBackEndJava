package com.example.ProyectoIntegradorCantoMaximiliano.service;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Turno;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
    @Autowired
    TurnoRepository turnoRepository;

    public String guardar(Turno turno){
        if(turnoRepository.save(turno) != null){
            return "OK";
        }
        else {
            return null;
        }
    }

    public Optional<Turno> buscarPorId(Integer id){
        Optional<Turno> turno = Optional.empty();
        turno = turnoRepository.findById(id);
        return turno;
    }

    public boolean eliminar(Integer id){
        if (buscarPorId(id).isPresent()){
            turnoRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }

    public List<Turno> obtenerTodos(){
        return turnoRepository.findAll();
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
