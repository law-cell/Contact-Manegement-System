package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@Setter
@Getter
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table
@ToString
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class People {
    @Id
    @SequenceGenerator(
            name = "people_sequence",
            sequenceName = "people_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "people_sequence"
    )
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private Integer age;

    @NonNull
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    @JsonIgnore
    private Team team;

    @ManyToMany
    @JsonIgnore
    private List<Task> assignedTasks;
}
