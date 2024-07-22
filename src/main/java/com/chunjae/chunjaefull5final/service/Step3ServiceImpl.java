package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.repository.PaperInfo.PaperInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Step3ServiceImpl implements Step3Service{

    private final PaperInfoRepository paperInfoRepo;

    @Override
    public void savePdf(PaperInfoDTO dto) {

        PaperInfo paperInfo = PaperInfo.builder()
                .saveName(dto.getSaveName())
                .saveAllPath(dto.getSaveAllPath()).build();
        paperInfoRepo.save(paperInfo);
    }
}
