package com.example.demo.service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    public List<Event> getAllEvent() {
        return this.eventRepository.findAll();
    }

    public void addEvent(Event event) {
        this.eventRepository.save(event);
    }


    @Transactional
    public void updateEvent(Event updatedEvent) {
        Optional<Event> existingEvent = this.eventRepository.findById(updatedEvent.getId());
        if (existingEvent.isPresent()) {
            Event event = existingEvent.get();
            event.setEndTime(updatedEvent.getEndTime());
            event.setStartTime(updatedEvent.getStartTime());
            eventRepository.save(event);
        } else {
            throw new ResourceNotFoundException("Event not found with id " + updatedEvent.getId());
        }
    }

    public void deleteEvent(Long id) {
        boolean exists = eventRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Id " + id + "does not exist");
        }
        this.eventRepository.deleteById(id);
    }

    public Optional<Event> getEventById(Long id) {
        return this.eventRepository.findById(id);
    }
}
