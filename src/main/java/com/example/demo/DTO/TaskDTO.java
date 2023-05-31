package com.example.demo.DTO;

import com.example.demo.model.Task;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class TaskDTO {
    Long id;

    @NonNull
    @JsonProperty("taskName")
    String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @NonNull
    @JsonProperty("startDate")
    Date startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @NonNull
    @JsonProperty("endDate")
    Date endDate;

    @NonNull
    @JsonProperty("duration")
    Integer duration;

    @NonNull
    @JsonProperty("progress")
    Integer progress;

    List<Long> resources;

    @JsonIgnore
    private Task parentTask;

    List<Task> subtasks;
}
