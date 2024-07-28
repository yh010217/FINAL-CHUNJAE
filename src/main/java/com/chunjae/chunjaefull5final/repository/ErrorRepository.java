package com.chunjae.chunjaefull5final.repository;

import com.chunjae.chunjaefull5final.domain.QuestionError;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ErrorRepository extends JpaRepository<QuestionError, Long> {

}
