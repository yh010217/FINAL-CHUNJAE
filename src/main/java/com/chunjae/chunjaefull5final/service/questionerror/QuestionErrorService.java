package com.chunjae.chunjaefull5final.service.questionerror;

import com.chunjae.chunjaefull5final.dto.QuestionErrorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuestionErrorService {
    Page<QuestionErrorDTO> findError(Pageable pageable);

    QuestionErrorDTO getErrorDetail(Long errorId);

    int errorStatus(Long errorId);
}
