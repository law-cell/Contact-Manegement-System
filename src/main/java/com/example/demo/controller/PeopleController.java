package com.example.demo.controller;

import com.example.demo.DTO.ItemWrapper;
import com.example.demo.model.People;
import com.example.demo.DTO.Value;
import com.example.demo.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1/people")
public class PeopleController {
    public final PeopleService peopleService;

    @Autowired
    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }

    @GetMapping("/getAllPeople")
    public List<People> getItems() {
        return this.peopleService.getAllPeople();
    }

    @GetMapping("/hello")
    public String Hello() {
        return "Hello World";
    }


    @PostMapping("/addNewPeople")
    public ResponseEntity<People> addNewPeople(@RequestBody Value value) {
        People people = value.getValue();
        peopleService.addNewPeople(people);
        return ResponseEntity.ok(people);
    }

    @DeleteMapping("/delete/{peopleId}")
    public ResponseEntity<People> deletePeople(@PathVariable("peopleId") Long id) {
        peopleService.deletePeople(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<People> updatePeople(@PathVariable Long id, @RequestBody People updatePeople) {
        People people = peopleService.updatePeople(id, updatePeople);
        return ResponseEntity.ok(people);
    }
}
