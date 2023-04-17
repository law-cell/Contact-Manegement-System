package com.example.demo.controller;

import com.example.demo.model.People;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PeopleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testHello() throws Exception {
        mockMvc.perform(get("/api/v1/people/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World"));
    }

    @Test
    public void testGetAllPeople() throws Exception {
        mockMvc.perform(get("/api/v1/people/getAllPeople"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Dermot"))
                .andExpect(jsonPath("$[0].age").value(50))
                .andExpect(jsonPath("$[0].email").value("dermot@gmail.com"))
                .andExpect(jsonPath("$[1].name").value("John Smith"))
                .andExpect(jsonPath("$[1].age").value(40))
                .andExpect(jsonPath("$[1].email").value("john.smith@example.com"));
    }

    @Test
    public void testAddNewPeople() throws Exception {
        People newPeople = new People("John Smith", 40, "john.smith@example.com");

        mockMvc.perform(post("/api/v1/people/addNewPeople")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newPeople)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Smith"))
                .andExpect(jsonPath("$.age").value(40))
                .andExpect(jsonPath("$.email").value("john.smith@example.com"));
    }

    @Test
    public void testDeletePeople() throws Exception {
        Long idToDelete = 1L;

        mockMvc.perform(delete("/api/v1/people/delete/{peopleId}", idToDelete))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testUpdatePeople() throws Exception {
        Long idToUpdate = 1L;
        People updatedPeople = new People("John Smith", 40, "john.smith@example.com");

        mockMvc.perform(put("/api/v1/people/update/{id}", idToUpdate)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedPeople)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Smith"))
                .andExpect(jsonPath("$.age").value(40))
                .andExpect(jsonPath("$.email").value("john.smith@example.com"));
    }
}
