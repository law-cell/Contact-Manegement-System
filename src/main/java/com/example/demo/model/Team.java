package com.example.demo.model;

import lombok.*;
import lombok.extern.jackson.Jacksonized;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Jacksonized
@Builder
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class Team {
    @Id
    @SequenceGenerator(
            name = "team_sequence",
            sequenceName = "team_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "team_sequence"
    )
    Long id;

    @NonNull
    String name;

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
    List<People> teamMembers = new ArrayList<>();

}
