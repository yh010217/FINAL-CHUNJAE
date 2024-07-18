package com.chunjae.chunjaefull5final.service.paperinfo;

import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaperService {
    Page<PaperInfoDTO> findPaper(Pageable pageable);
}
