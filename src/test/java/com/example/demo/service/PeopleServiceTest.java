package com.example.demo.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class PeopleServiceTest {
    @Mock
    PeopleService peopleService;

    @Test
    public void generateRandomUser() {
        this.peopleService.generateRandomUser();
    }
}