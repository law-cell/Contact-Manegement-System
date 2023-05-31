package com.example.demo.service;

import com.example.demo.DTO.GanttCrudModel;
import com.example.demo.DTO.GanttPeopleDTO;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.People;
import com.example.demo.model.randomUser.MyResponse;
import com.example.demo.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class PeopleService {

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private RestTemplate restTemplate;

    public PeopleService(PeopleRepository repo)
    {
        // this keyword refers to current instance
        this.peopleRepository = repo;
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

    public List<People> generateRandomUser() {
        String url = "https://randomuser.me/api/?results=2000";

        MyResponse response = restTemplate.getForObject(url, MyResponse.class);
        List<People> peopleList = new ArrayList<>();
        assert response != null;
        for (int i = 0; i < response.getResults().size(); i++) {
            People people = People.builder()
                    .name(response.getResults().get(i).getName().getFirst())
                    .age(response.getResults().get(i).getDob().getAge())
                    .email(response.getResults().get(i).getEmail())
                    .build();

            peopleList.add(people);
        }
        return peopleList;
    }

    public void populatePeople() {
        peopleRepository.saveAll(this.generateRandomUser());
    }

    public Optional<People> getProductById(Long id) {
        return peopleRepository.findById(id);
    }

    public List<GanttPeopleDTO> getAllPeopleDTO() {
        List<People> peopleList = this.getAllPeople();
        List<GanttPeopleDTO> peopleDTOList = new ArrayList<>();
        for (People people : peopleList) {
            GanttPeopleDTO ganttPeopleDTO = GanttPeopleDTO.builder()
                    .id(people.getId())
                    .name(people.getName())
                    .build();
            peopleDTOList.add(ganttPeopleDTO);
        }
        return peopleDTOList;
    }
}
