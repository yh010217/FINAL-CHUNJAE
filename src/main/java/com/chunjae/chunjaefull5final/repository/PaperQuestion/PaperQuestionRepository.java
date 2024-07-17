package com.chunjae.chunjaefull5final.repository.PaperQuestion;

import com.chunjae.chunjaefull5final.domain.PaperQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperQuestionRepository
        extends JpaRepository<PaperQuestion, Long>, PaperQuestionQueryDSL {




}
