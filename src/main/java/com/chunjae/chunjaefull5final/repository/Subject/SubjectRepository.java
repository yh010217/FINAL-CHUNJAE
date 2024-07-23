package com.chunjae.chunjaefull5final.repository.Subject;

import com.chunjae.chunjaefull5final.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository
        extends SubjectQueryDSL , JpaRepository<Subject,Integer> {

}
