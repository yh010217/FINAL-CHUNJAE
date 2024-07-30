package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.dto.QuestionErrorDTO;

public interface ModelService {
    void insertError(QuestionErrorDTO dto, Long uid);
}