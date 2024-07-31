package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.domain.PaperGubun;
import com.chunjae.chunjaefull5final.dto.PaperDTO;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import com.chunjae.chunjaefull5final.service.S3Uploader;
import com.chunjae.chunjaefull5final.service.Step3Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
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
    private final JWTUtil jwtUtil;

    @PostMapping("/upload")
    public @ResponseBody String pdfUpload(
            HttpServletRequest request
            , @RequestParam("paperId") String paperId
            , @RequestParam("saveName") String saveName
            , @RequestParam("paperList") String paperList
            , @RequestParam("question") MultipartFile questionPdf
            , @RequestParam("answerExplain") MultipartFile answerExplainPdf
            , @RequestParam("all") MultipartFile allPdf) {

        Long uid = jwtUtil.getUidByRequest(request);
        PaperInfoDTO dto = new PaperInfoDTO();
        log.info("===========s3 컨트롤러 : {}", paperId);

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // JSON 배열을 List<PaperDTO>로 변환
            List<PaperDTO> paper = objectMapper.readValue(paperList
                    , objectMapper.getTypeFactory().constructCollectionType(List.class, PaperDTO.class));


            String dirName = "pdf_테스트폴더";
            String upload = uploader.upload(questionPdf, dirName, saveName);
            String upload2 = uploader.upload(answerExplainPdf, dirName, saveName);
            String upload3 = uploader.upload(allPdf, dirName, saveName);

            // paper_info
            if(paperId=="" || "".equals(paperId)){
                /* 선택한 시험지 */
                dto.setPaperGubun(PaperGubun.Edit);
                dto.setTitle(paper.get(0).getSetPaperTitle());
                dto.setSubjectId(paper.get(0).getSubjectId());
                dto.setUid(uid);
                dto.setSaveName(saveName);
                dto.setSaveQuestionPath(saveName+"_"+questionPdf.getOriginalFilename());
                dto.setSaveAnswerPath(saveName+"_"+answerExplainPdf.getOriginalFilename());
                dto.setSaveAllPath(saveName+"_"+allPdf.getOriginalFilename());
                dto.setItemCount(paper.size());
                service.saveSettingPdf(dto, paper);
            }else {
                /* 신규 시험지 */
                dto.setUid(uid);
                dto.setPaperId(Long.valueOf(paperId));
                dto.setSaveName(saveName);
                dto.setSaveQuestionPath(saveName+"_"+questionPdf.getOriginalFilename());
                dto.setSaveAnswerPath(saveName+"_"+answerExplainPdf.getOriginalFilename());
                dto.setSaveAllPath(saveName+"_"+allPdf.getOriginalFilename());
                dto.setItemCount(paper.size());
                service.savePdf(dto);
            }



            // paper_question
            service.updateQuestion(paper);
            log.info("===========s3 컨트롤러 : {}", dto.getUid());

            return "업로드 성공!";
        } catch (Exception e) {
            System.out.println(e);
            return "업로드 실패";
        }
    }
}