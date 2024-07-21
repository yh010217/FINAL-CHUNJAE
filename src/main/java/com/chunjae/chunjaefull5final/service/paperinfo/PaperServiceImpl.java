package com.chunjae.chunjaefull5final.service.paperinfo;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.repository.PaperInfo.PaperInfoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaperServiceImpl implements PaperService{

    private final PaperInfoRepository paperInfoRepository;

    private final ModelMapper modelMapper;

    private static final Logger log= LoggerFactory.getLogger(PaperService.class);

    @Override
    public Page<PaperInfoDTO> findPaper(Pageable pageable) {
        Page<PaperInfo> paperInfoPage = paperInfoRepository.findAllPaper(pageable);
        List<PaperInfoDTO> paperInfoDTOList = paperInfoPage.stream().map(item ->
                PaperInfoDTO.builder()
                        .paperId(item.getPaperId())
                        .paperGubun(item.getPaperGubun())
                        .title(item.getTitle())
                        .itemCount(item.getItemCount())
                        .term(item.getTerm())
                        .uid(item.getUser().getUid())
                        .grade(item.getGrade())
                        .createdAt(item.getCreatedAt())
                        .updateAt(item.getUpdatedAt())
                        .delete_yn(item.getDelete_yn())
                        .saveName(item.getSaveName())
                        .saveAnswerPath(item.getSaveAnswerPath())
                        .saveAllPath(item.getSaveAllPath())
                        .subjectId(item.getSubject().getSubjectId())
                        .build()).collect(Collectors.toList());
        return new PageImpl<>(paperInfoDTOList, pageable, paperInfoPage.getTotalElements());
    }

    @Override
    public Map<Integer, String> subjectNames() {
        List<Object[]> results=paperInfoRepository.subjectName();
        Map<Integer,String> subjMap=new HashMap<>();
        for (Object[] result: results){
            Integer subjectId=(Integer) result[0];
            String subjectname=(String) result[1];
            subjMap.put(subjectId,subjectname);
        }
        return subjMap;
    }

    @Override
    public PaperInfoDTO getPaperDetail(Long paperId) {
        PaperInfo paperInfo=paperInfoRepository.findPaperDetail(paperId);
        PaperInfoDTO dto=modelMapper.map(paperInfo,PaperInfoDTO.class);
        return dto;
    }


}
