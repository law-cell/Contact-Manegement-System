package com.example.demo.DTO;

import com.example.demo.model.Task;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Jacksonized
@Builder
public class GanttCrudModel {
    public List<Task> added;
    public List<Task> changed;
    public List<Task> deleted;
    public Object key;
    public String action;
    public String table;
}
