package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.domain.PaperQuestion;
import com.chunjae.chunjaefull5final.domain.Subject;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.dto.PaperDTO;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.repository.PaperInfo.PaperInfoRepository;
import com.chunjae.chunjaefull5final.repository.PaperQuestion.PaperQuestionRepository;
import com.chunjae.chunjaefull5final.repository.Subject.SubjectRepository;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class Step3ServiceImpl implements Step3Service{

    private final UserRepository userRepository;
    private final PaperInfoRepository paperInfoRepo;
    private final PaperQuestionRepository questionRepository;
    private final SubjectRepository subjectRepository;

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
        paperInfo.setItemCount(dto.getItemCount());
        paperInfo.setPaperGubun(dto.getPaperGubun());
        paperInfo.setTitle(dto.getTitle());

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

    @Override
    public void saveSettingPdf(PaperInfoDTO dto, List<PaperDTO> paper) {

        User user = userRepository
                .findById(dto.getUid())
                .orElseThrow(()-> new IllegalArgumentException("유저 x"));

        Subject subject = subjectRepository
//                .findById(dto.getSubjectId())
                .findById(1156)
                .orElseThrow(()-> new IllegalArgumentException("유저 x"));

        PaperInfo paperInfo = PaperInfo.builder()
                .paperGubun(dto.getPaperGubun())
                .title(dto.getUid()+"temp"+subject.getSubjectId())
                .itemCount(dto.getItemCount())
                .user(user)
                .subject(subject)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .saveName(dto.getSaveName())
                .saveQuestionPath(dto.getSaveQuestionPath())
                .saveAnswerPath(dto.getSaveAnswerPath())
                .saveAllPath(dto.getSaveAllPath()).build();

        PaperInfo save = paperInfoRepo.save(paperInfo);

        for(int i=0; i<paper.size(); i++){

            PaperQuestion paperQuestion = PaperQuestion.builder()
                    .paperInfo(save)
                    .itemId(paper.get(i).getItemId())
                    .passageUrl(paper.get(i).getPassageUrl())
                    .questionUrl(paper.get(i).getQuestionUrl())
                    .answerUrl(paper.get(i).getAnswerUrl())
                    .explainUrl(paper.get(i).getExplainUrl()).build();

            questionRepository.save(paperQuestion);
        }

    }

}
