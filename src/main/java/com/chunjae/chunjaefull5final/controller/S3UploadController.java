package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.PaperDTO;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.service.S3Uploader;
import com.chunjae.chunjaefull5final.service.Step3Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class S3UploadController {

    private final S3Uploader uploader;
    private final Step3Service service;

    @PostMapping("/upload")
    public @ResponseBody String pdfUpload(@RequestParam("paperId") String paperId
            , @RequestParam("saveName") String saveName
            , @RequestParam("paperList") String paperList
            , @RequestParam("question") MultipartFile questionPdf
            , @RequestParam("answer_only") MultipartFile answerOnlyPdf
            , @RequestParam("answer_explain") MultipartFile answerExplainPdf) {

        PaperInfoDTO dto = new PaperInfoDTO();

//        log.info("=========시험지명 : {}=========", saveName);
//        log.info("=========문제 : {}=========", questionPdf.getOriginalFilename());
//        log.info("=========정답 : {}=========", answerOnlyPdf.getOriginalFilename());
//        log.info("=========해설 : {}=========", answerExplainPdf.getOriginalFilename());
        log.info("=========시험지! : {}=========", paperList);


        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // JSON 배열을 List<PaperDTO>로 변환
            List<PaperDTO> paper = objectMapper.readValue(paperList
                    , objectMapper.getTypeFactory().constructCollectionType(List.class, PaperDTO.class));


            String dirName = "pdf_테스트폴더";
            String upload = uploader.upload(questionPdf, dirName, saveName);
            String upload2 = uploader.upload(answerOnlyPdf, dirName, saveName);
            String upload3 = uploader.upload(answerExplainPdf, dirName, saveName);

            // paper_info
            dto.setPaperId(Long.valueOf(paperId));
            dto.setSaveName(saveName);
            dto.setSaveQuestionPath(saveName+"_"+questionPdf.getOriginalFilename());
            dto.setSaveAnswerPath(saveName+"_"+answerOnlyPdf.getOriginalFilename());
            dto.setSaveAllPath(saveName+"_"+answerExplainPdf.getOriginalFilename());
            dto.setItemCount(paper.size());
            service.savePdf(dto);

            // paper_question
            service.updateQuestion(paper);

            return upload;
        } catch (Exception e) {
            System.out.println(e);
            return "업로드 실패";
        }
    }
}