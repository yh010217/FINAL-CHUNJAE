package com.chunjae.chunjaefull5final.repository.QuestionError;

import com.chunjae.chunjaefull5final.domain.QuestionError;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuestionErrorQueryDSL {
    Page<QuestionError> findAllError(Pageable pageable);


}
