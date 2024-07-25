package com.chunjae.chunjaefull5final.repository.QuestionError;

import com.chunjae.chunjaefull5final.domain.QuestionError;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionErrorRepository extends JpaRepository<QuestionError, Long>, QuestionErrorQueryDSL {
    @Query(" select q from QuestionError q where q.errorId=:errorId")
    QuestionError findErrorDetail(Long errorId);

    @Override
    Optional<QuestionError> findById(Long aLong);

    @Override
    <S extends QuestionError> S save(S entity);
}
