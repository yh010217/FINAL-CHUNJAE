package com.chunjae.chunjaefull5final;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ChunjaeFull5FinalApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChunjaeFull5FinalApplication.class, args);
    }

}
