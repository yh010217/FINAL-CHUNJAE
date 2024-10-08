package com.chunjae.chunjaefull5final.service.paperinfo;

import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface PaperInfoService {
    Page<PaperInfoDTO> findPaper(Pageable pageable);

    Map<Integer, String> subjectNames();

    PaperInfoDTO getPaperDetail(Long paperId);


    void updateQuestionPathToNull(Long paperId);

    void updateSaveAnswerPathToNull(Long paperId);

    void updateAllPathToNull(Long paperId);

    Map<Long,String> userNames();

    void deletePaper(Long paperId);
}
