package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.dto.PaperDTO;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;

import java.util.List;

public interface Step3Service {
    void savePdf(PaperInfoDTO dto);

    void updateQuestion(List<PaperDTO> paper);
}
