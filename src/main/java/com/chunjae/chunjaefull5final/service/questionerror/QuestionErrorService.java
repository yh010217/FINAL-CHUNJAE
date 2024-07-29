package com.chunjae.chunjaefull5final.service.questionerror;

import com.chunjae.chunjaefull5final.dto.QuestionErrorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.relational.core.sql.In;

import java.util.Map;

public interface QuestionErrorService {
    Page<QuestionErrorDTO> findError(Pageable pageable);

    QuestionErrorDTO getErrorDetail(Long errorId);

    int errorStatus(Long errorId);

    Map<Long, String> userNames();
}
