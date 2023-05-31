package com.example.demo.controller;

import com.example.demo.DTO.GanttPeopleDTO;
import com.example.demo.DTO.GanttPeopleDTOWrapper;
import com.example.demo.DTO.ItemWrapper;
import com.example.demo.DTO.Value;
import com.example.demo.model.People;
import com.example.demo.service.PeopleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v2/people")
public class PeopleV2Controller {

    @Autowired
    public PeopleService peopleService;

    @PostMapping("/getAllPeople")
    public ItemWrapper getItems(@RequestBody Map<String, Object> jsonMap) {
        List<People> items = peopleService.getAllPeople();// your code to get the items
        if (jsonMap.containsKey("skip") && jsonMap.containsKey("take")) {
            int skip = (Integer) jsonMap.get("skip");
            int take = (Integer) jsonMap.get("take");
            List<People> subItems = items.subList(skip, skip + take);
            return new ItemWrapper(subItems, items.size());
        }
        return new ItemWrapper(items, items.size());
    }

    @PostMapping("/addNewPeople")
    public ResponseEntity<People> addNewPeople(@RequestBody Value value) {
        People people = value.getValue();
        peopleService.addNewPeople(people);
        return ResponseEntity.ok(people);
    }

    @PostMapping("/delete")
    public ResponseEntity<People> deletePeople(@RequestBody Map<String, Object> jsonMap) {
        Integer idInt = (Integer) jsonMap.get("key");
        Long id = idInt.longValue();
        peopleService.deletePeople(id);
        return ResponseEntity.noContent().build();
    }

//    @PostMapping("/update")
//    public ResponseEntity<People> updatePeople(@RequestBody Map<String, Object> jsonMap) throws IOException {
//        Integer idInt = (Integer) jsonMap.get("key");
//        Long id = idInt.longValue();
//        People updatePeople = new People();
//
//        Map<String, ?> value = (Map<String, ?>) jsonMap.get("value");
//        updatePeople.setName((String)value.get("name"));
//        updatePeople.setAge((Integer) value.get("age"));
//        updatePeople.setEmail((String) value.get("email"));
//        People people = peopleService.updatePeople(id, updatePeople);
//        return ResponseEntity.ok(people);
//    }

    @PostMapping("/update")
    public ResponseEntity<People> updatePeople(@RequestBody Map<String, Object> jsonMap) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String json = "";
        try {
            json = mapper.writeValueAsString(jsonMap.get("value"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        People updatePeople = mapper.readValue(json, People.class);
        People people = peopleService.updatePeople(updatePeople.getId(), updatePeople);
        return ResponseEntity.ok(people);
    }

    @GetMapping("/getPeopleDTO")
    public List<GanttPeopleDTO> getPeopleDTO() {
        List<GanttPeopleDTO> ganttPeopleDTOList = this.peopleService.getAllPeopleDTO();
        return ganttPeopleDTOList;
    }

}
