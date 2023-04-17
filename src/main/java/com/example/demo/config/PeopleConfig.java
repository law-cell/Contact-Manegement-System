package com.example.demo.config;

import com.example.demo.model.People;
import com.example.demo.repository.PeopleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PeopleConfig {

    @Bean
    CommandLineRunner commandLineRunner(PeopleRepository peopleRepository) {
        return args -> {
            People junhao = new People(
                    "Junhao",
                    23,
                    "junhao@gmail.com"
            );

            People dermot = new People(
                    "Dermot",
                    50,
                    "dermot@gmail.com"
            );

            peopleRepository.saveAll(
                    List.of(junhao, dermot)
            );

        };
    }

}
