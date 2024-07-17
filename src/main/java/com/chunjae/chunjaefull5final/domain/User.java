package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Setter
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column
    private String email;
    @Column
    private String pwd;
    @Column
    private String name;
    @Column
    private String role;
    @Column(name = "school_type")
    private String schoolType;
    @Column(name = "sns_type")
    private String snsType;
    @Column(name = "sns_id")
    private String snsId;

}
