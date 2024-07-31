package com.chunjae.chunjaefull5final.repository;

import com.chunjae.chunjaefull5final.domain.PaperQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TempPdfRepo extends JpaRepository<PaperQuestion,Long> {
    @Query(value = "SELECT * FROM paper_question WHERE paper_id = :paperId", nativeQuery = true)
    List<PaperQuestion> findByPaperId(Long paperId);

}