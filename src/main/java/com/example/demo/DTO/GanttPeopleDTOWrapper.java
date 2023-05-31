package com.example.demo.DTO;

import com.example.demo.model.People;
import lombok.Builder;

import java.util.List;

@Builder
public class GanttPeopleDTOWrapper {
    private List<GanttPeopleDTO> result;
    private int count;
    public GanttPeopleDTOWrapper(List<GanttPeopleDTO> result, int count) {
        this.result = result;
        this.count = count;
    }
}
