package com.chunjae.chunjaefull5final.service.paperinfo;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.repository.PaperInfo.PaperInfoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaperInfoServiceImpl implements PaperInfoService {

    private final PaperInfoRepository paperInfoRepository;

    private final ModelMapper modelMapper;

    private static final Logger log= LoggerFactory.getLogger(PaperInfoService.class);

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
                        .saveQuestionPath(item.getSaveQuestionPath())
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
        if (paperInfo.getUser()!=null){
            dto.setUid(paperInfo.getUser().getUid());
        }
        return dto;
    }

    @Override
    public void updateQuestionPathToNull(Long paperId) {
        paperInfoRepository.updateQuestionPathToNull(paperId);
    }

    @Override
    public void updateSaveAnswerPathToNull(Long paperId) {
        paperInfoRepository.updateSaveAnswerPathToNull(paperId);
    }

    @Override
    public void updateAllPathToNull(Long paperId) {
        paperInfoRepository.updateAllPathToNull(paperId);
    }

    @Override
    public Map<Long, String> userNames() {
        List<Object[]> results=paperInfoRepository.userNames();
        Map<Long,String> userMaps=new HashMap<>();
        for (Object[] result: results){
            Long uid=(Long) result[0];
            String name=(String) result[1];
            userMaps.put(uid,name);
        }
        return userMaps;
    }

    @Override
    public void deletePaper(Long paperId) {
        paperInfoRepository.paperInfoDeleteYn(paperId);
    }


}
