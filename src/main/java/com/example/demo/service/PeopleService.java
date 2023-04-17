package com.example.demo.service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.People;
import com.example.demo.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PeopleService {

    private final PeopleRepository peopleRepository;

    @Autowired
    public PeopleService(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    public List<People> getAllPeople() {
        return peopleRepository.findAll();
    }

    public void addNewPeople(People people) {
        if (peopleRepository.findPeopleByEmail(people.getEmail()) != null) {
            throw new IllegalArgumentException("Email already exists.");
        }

        peopleRepository.save(people);
    }

    public void deletePeople(Long id) {
        boolean exists = peopleRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Id " + id + "does not exist");
        }
        peopleRepository.deleteById(id);
    }

    @Transactional
    public People updatePeople(Long id, People updatedPeople) {
        Optional<People> existingProduct = getProductById(id);
        if (existingProduct.isPresent()) {
            People people = existingProduct.get();
            people.setName(updatedPeople.getName());
            people.setAge(updatedPeople.getAge());
            people.setEmail(updatedPeople.getEmail());
            return peopleRepository.save(people);
        } else {
            throw new ResourceNotFoundException("Product not found with id " + id);
        }
    }

    public Optional<People> getProductById(Long id) {
        return peopleRepository.findById(id);
    }
}
