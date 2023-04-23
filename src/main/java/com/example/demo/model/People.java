package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@Setter
@Getter
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table
@ToString
@Builder
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
}
