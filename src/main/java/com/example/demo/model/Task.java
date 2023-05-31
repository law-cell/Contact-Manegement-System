package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Jacksonized
@Entity
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
@RequiredArgsConstructor
@Table
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Task {

    @Id
    @SequenceGenerator(
            name = "task_sequence",
            sequenceName = "task_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "task_sequence"
    )
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

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonIgnore
    Task parentTask;

    @ManyToMany
    @JoinTable(
            name = "task_assigned",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "people_id"))
    List<People> resources;


    @OneToMany(mappedBy = "parentTask", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Task> subtasks = new ArrayList<>();
}
