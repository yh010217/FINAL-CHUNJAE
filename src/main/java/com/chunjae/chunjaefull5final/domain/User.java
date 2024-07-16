package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor
@Setter
@Builder
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    @Column(nullable = false)
    private String email;
 //   @Column(nullable = false)
    private String pwd;
    @Column(nullable = false)
    private String name;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    @Enumerated(EnumType.STRING)
    @Column(name = "school_type")
    private SchoolType schoolType;
    @Column(name = "sns_type")
    private String snsType;
    @Column(name = "sns_id")
    private String snsId;


}
