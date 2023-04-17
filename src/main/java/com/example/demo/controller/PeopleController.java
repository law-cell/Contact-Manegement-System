package com.example.demo.controller;

import com.example.demo.model.People;
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

    @GetMapping("/hello")
    public String Hello() {
        return "Hello World";
    }

    @GetMapping("/getAllPeople")
    public List<People> getAllPeople() {
        return peopleService.getAllPeople();
    }

    @PostMapping("/addNewPeople")
    public ResponseEntity<People> addNewPeople(@RequestBody People people) {
        peopleService.addNewPeople(people);
        return ResponseEntity.ok(people);
    }

    @CrossOrigin
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
