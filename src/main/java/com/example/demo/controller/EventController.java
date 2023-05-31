package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/event")
public class EventController {
    @Autowired
    EventService eventService;

    @PostMapping("/getAllEvents")
    public List<Event> getAllEvents() {
        return this.eventService.getAllEvent();
    }

    @PostMapping("/addNewEvent")
    public ResponseEntity<Event> addNewEvent(@RequestBody Map<String, Object> jsonMap) throws ParseException {
        String startTime = (String) jsonMap.get("StartTime");
        String endTime = (String) jsonMap.get("EndTime");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        Date startTimeDate = dateFormat.parse(startTime);
        Date endTimeDate = dateFormat.parse(endTime);
        Event newEvent = Event.builder()
                .startTime(startTimeDate)
                .endTime(endTimeDate)
                .build();
        this.eventService.addEvent(newEvent);
        return ResponseEntity.ok(newEvent);
    }

    @PostMapping("/eventCRUD")
    public ResponseEntity<Event> eventCRUD(@RequestBody Map<String, Object> jsonMap) throws ParseException {
        String action = (String) jsonMap.get("action");
        List<Map<String, Object>> addedList = (List<Map<String, Object>>) jsonMap.get("added");
        List<Map<String, Object>> deletedList = (List<Map<String, Object>>) jsonMap.get("deleted");
        List<Map<String, Object>> changedList = (List<Map<String, Object>>) jsonMap.get("changed");
        if ("insert".equals(action) || ("batch".equals(action) && addedList.size() > 0)) {
            //handle date format.
            String startTime = (String) addedList.get(0).get("StartTime");
            String endTime = (String) addedList.get(0).get("EndTime");
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            Date startTimeDate = dateFormat.parse(startTime);
            Date endTimeDate = dateFormat.parse(endTime);
            Event newEvent = Event.builder()
                    .startTime(startTimeDate)
                    .endTime(endTimeDate)
                    .build();
            this.eventService.addEvent(newEvent);
            return ResponseEntity.ok(newEvent);
        } else if ("update".equals(action) || ("batch".equals(action) && changedList.size() > 0)) {
            String startTime = (String) changedList.get(0).get("StartTime");
            String endTime = (String) changedList.get(0).get("EndTime");
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            Date startTimeDate = dateFormat.parse(startTime);
            Date endTimeDate = dateFormat.parse(endTime);
            Integer idInt = (Integer) changedList.get(0).get("id");
            Long id = idInt.longValue();
            Event newEvent = Event.builder()
                    .id(id)
                    .startTime(startTimeDate)
                    .endTime(endTimeDate)
                    .build();
            this.eventService.updateEvent(newEvent);
            return ResponseEntity.ok(newEvent);
        } else if ("remove".equals(action) || ("batch".equals(action) && deletedList.size() > 0)) {
            Integer idInt = (Integer) deletedList.get(0).get("id");
            Long id = idInt.longValue();
            Event event = this.eventService.getEventById(id).get();
            this.eventService.deleteEvent(id);
            return ResponseEntity.ok(event);
        }
        return ResponseEntity.badRequest().build();
    }

}
