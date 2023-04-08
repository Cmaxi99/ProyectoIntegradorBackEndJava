package com.example.ProyectoIntegradorCantoMaximiliano;

import com.example.ProyectoIntegradorCantoMaximiliano.persistence.entities.Odontologo;
import com.example.ProyectoIntegradorCantoMaximiliano.persistence.repository.OdontologoRepository;
import com.example.ProyectoIntegradorCantoMaximiliano.service.OdontologoService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class IntegracionOdontologoTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private OdontologoService odontologoService;
    private OdontologoRepository odontologoRepository;
    private Odontologo odontologo;
    @Test
    public void testRegistrarOdontologo() throws Exception {
        Odontologo odontologo = new Odontologo("Maximilian", "Canto", 1234);
        MvcResult response = this.mockMvc.perform(MockMvcRequestBuilders.post("/odontologos/registrar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Jsons.asJsonString(odontologo)))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void testTraerTodosLosOdontologos() throws Exception{
        MvcResult response = this.mockMvc.perform(MockMvcRequestBuilders.get("/odontologos/todos")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();

        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void testTraerOdontologoPorId() throws Exception{
        Odontologo odontologo = new Odontologo("Maximiliano", "Canto", 12345678);
        odontologoService.guardar(odontologo);
        MvcResult response = this.mockMvc.perform(MockMvcRequestBuilders.get("/odontologos/buscar/" + odontologo.getId())
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();

        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void testModificarPorId() throws Exception{
        Odontologo odontologoAModificar = new Odontologo("Maximiliano", "Canto", 12345678);
        odontologoService.guardar(odontologoAModificar);
        Odontologo odontologoModificado = new Odontologo("Agustin", "Tapia", 1234);
        MvcResult response = this.mockMvc.perform(MockMvcRequestBuilders.put("/odontologos/modificar/" + odontologoAModificar.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(Jsons.asJsonString(odontologoModificado)))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void testEliminarPorId() throws Exception{
        Odontologo odontologoAEliminar = new Odontologo("Fernando", "Gonzalez", 12345678);
        odontologoService.guardar(odontologoAEliminar);
        MvcResult response = this.mockMvc.perform(MockMvcRequestBuilders.delete("/odontologos/eliminar/" + odontologoAEliminar.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(Jsons.asJsonString(odontologoAEliminar)))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();

        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }




}


