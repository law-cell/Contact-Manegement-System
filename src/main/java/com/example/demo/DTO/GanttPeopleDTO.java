package com.example.demo.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GanttPeopleDTO {
    private Long id;
    private String name;
}
