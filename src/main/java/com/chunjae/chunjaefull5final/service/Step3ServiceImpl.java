package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.domain.PaperQuestion;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.dto.PaperDTO;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.repository.PaperInfo.PaperInfoRepository;
import com.chunjae.chunjaefull5final.repository.PaperQuestion.PaperQuestionRepository;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class Step3ServiceImpl implements Step3Service{

    private final UserRepository userRepository;
    private final PaperInfoRepository paperInfoRepo;
    private final PaperQuestionRepository questionRepository;

    @Override
    public void savePdf(PaperInfoDTO dto) {

        PaperInfo paperInfo = paperInfoRepo
                .findById(dto.getPaperId())
                .orElseThrow(()-> new IllegalArgumentException("시험지 x"));

        User user = userRepository
                .findById(dto.getUid())
                .orElseThrow(()-> new IllegalArgumentException("유저 x"));

        paperInfo.setUser(user);
        paperInfo.setSaveName(dto.getSaveName());
        paperInfo.setSaveQuestionPath(dto.getSaveQuestionPath());
        paperInfo.setSaveAnswerPath(dto.getSaveAnswerPath());
        paperInfo.setSaveAllPath(dto.getSaveAllPath());

        paperInfoRepo.save(paperInfo);
    }

    @Override
    public void updateQuestion(List<PaperDTO> paper) {
        PaperQuestion paperQuestion;

        for(int i=0; i<paper.size(); i++){
            paperQuestion = questionRepository
                    .findById(paper.get(i).getPqId())
                    .orElseThrow(()-> new IllegalArgumentException("문제 x"));

            paperQuestion.setQuestionLevel(paper.get(i).getDifficultyName());
            paperQuestion.setLargeChapterId(paper.get(i).getLargeChapterId());
            paperQuestion.setLargeChapterName(paper.get(i).getLargeChapterName());
            paperQuestion.setMediumChapterId(paper.get(i).getMediumChapterId());
            paperQuestion.setMediumChapterName(paper.get(i).getMediumChapterName());
            paperQuestion.setSmallChapterId(paper.get(i).getSmallChapterId());
            paperQuestion.setSmallChapterName(paper.get(i).getSmallChapterName());
            paperQuestion.setTopicChapterId(paper.get(i).getTopicChapterId());
            paperQuestion.setTopicChapterName(paper.get(i).getTopicChapterName());
            paperQuestion.setCreatedAt(LocalDateTime.now());
            paperQuestion.setUpdatedAt(LocalDateTime.now());
            paperQuestion.setQuestionUrl(paper.get(i).getQuestionUrl());
            paperQuestion.setAnswerUrl(paper.get(i).getAnswerUrl());
            paperQuestion.setExplainUrl(paper.get(i).getExplainUrl());

            questionRepository.save(paperQuestion);
        }

    }
}
