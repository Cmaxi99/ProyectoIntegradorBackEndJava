package com.example.ProyectoIntegradorCantoMaximiliano.service;


import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Odontologo;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.OdontologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {

    @Autowired
    OdontologoRepository odontologoRepository;

    public String guardar(Odontologo odontologo){
        if (odontologoRepository.save(odontologo) != null){
            return "OK";
        }
        else {
            return null;
        }
    }

    public Optional<Odontologo> buscarPorId(Integer id){
        Optional<Odontologo> odontologo = Optional.empty();
        odontologo = odontologoRepository.findById(id);
        return odontologo;
    }

    public boolean eliminar(Integer id){
        if (buscarPorId(id).isPresent()){
            odontologoRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }

    public List<Odontologo> obtenerTodos(){
        return odontologoRepository.findAll();
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
