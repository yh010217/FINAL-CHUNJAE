package com.chunjae.chunjaefull5final.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueryDSLConfig {

    private EntityManager em;

    public QueryDSLConfig(EntityManager em){
        this.em=em;
    }

    @Bean
    public JPAQueryFactory jpaQueryFactory(){
        JPAQueryFactory queryFactory= new JPAQueryFactory(em);

        return queryFactory;
    }
}
