package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.service.S3Uploader;
import com.chunjae.chunjaefull5final.service.Step3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class PdfUploadTest {

    private final S3Uploader uploader;
    private final Step3Service service;

    @PostMapping("/upload")
    public @ResponseBody String pdfUpload(@RequestParam("pdfFile") MultipartFile multipartFile) throws IOException {

        String dirName = "pdf_테스트폴더";
        String upload = uploader.upload(multipartFile, dirName);
//        PaperInfoDTO dto = new PaperInfoDTO();
//        dto.setSaveAllPath(upload);
//        dto.setSaveName(multipartFile.getOriginalFilename());
//        service.savePdf(dto);

        return upload;
    }
}
