package com.example.demo.config;

import com.example.demo.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    PeopleService peopleService;

    @Override
    public void run(String... args) throws Exception {
        peopleService.populatePeople();
    }
}