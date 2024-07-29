package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.repository.PaperInfo.PaperInfoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService{

    private final PaperInfoRepository repository;
    private final ModelMapper modelMapper;

    @Override
    public List<PaperInfoDTO> getList(Long uid) {
        // uid로 PaperInfo 리스트를 조회
        List<PaperInfo> paperInfoList = repository.getList(uid);

        // 각 PaperInfo 객체를 PaperInfoDTO로 변환
        List<PaperInfoDTO> dtoList = paperInfoList.stream()
                .map(item -> modelMapper.map(item, PaperInfoDTO.class))
                .collect(Collectors.toList());

        // 변환된 DTO 리스트 출력
        System.out.println(dtoList + "값");

        // 변환된 DTO 리스트 반환
        return dtoList;
    }


}

