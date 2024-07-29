package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;

import java.util.List;

public interface MainService {
    List<PaperInfoDTO> getList(Long uid);
}
